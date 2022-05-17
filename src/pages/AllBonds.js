import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import './BillingReport.css'
import { Link } from 'react-router-dom';
import Spinner from '../components/spinner';
import Navbar from '../components/Navbar'
import { getAllBonds } from '../controllers/bond.api.controller'
import * as FaIcons from 'react-icons/fa';
import { CSVLink, CSVDownload } from "react-csv";
import dayjs from 'dayjs';

export default function AllBonds() {

    const [tableData, setTableData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = async () => {
        try {
            let us = await getAllBonds();
            setTableData(us?.data?.data);
            setLoading(false);
        } catch (error) {
            toast.error("Fetching Data Failed!");
        }
    }

  return (
    <div>
        <Navbar />

        <div className='container'>

            <div className="card my-4 shadow-sm rounded">
                <div className="card-body">
                    <h3>Bonds</h3>
                </div>
            </div>

            <div className="shadow p-3 bg-body rounded">
            <button className='btn btn-primary mb-1'><Link to="/createBond?mode=Create" style={{color: 'white', textDecoration: 'none'}}>New</Link></button>
            <CSVLink data={tableData} 
                headers={[
                    {label: 'Object ID', key: '_id'},
                    {label: 'Client ID', key: 'clientId'},
                    {label: 'Name', key: 'name'},
                    {label: 'Details', key: 'details'},
                    {label: 'Type', key: 'type'},
                    {label: 'Released', key: 'released'},
                ]}
                filename={`Bonds Report - ${dayjs().format('YYYY-MM-DD')}`}>
                    <button className='btn btn-success mx-3'>Export to Excel
                    </button>
            </CSVLink>
                <div className='tableFixHead'>
                    <table className="table">
                        <thead>
                            <tr>
                                <th className='text text-center' style={{backgroundColor: 'white'}} scope="col">#</th>
                                <th className='text text-center' style={{backgroundColor: 'white'}} scope="col">Name</th>
                                <th className='text text-center' style={{backgroundColor: 'white'}} scope="col">Details</th>
                                <th className='text text-center' style={{backgroundColor: 'white'}} scope="col">Type</th>
                                <th className='text text-center' style={{backgroundColor: 'white'}} scope="col">Released</th>
                                <th className='text text-center' style={{backgroundColor: 'white'}} scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                loading ? spinner() : tableData.map((i, index) => {
                                    return (
                                        <tr key={index}>
                                            <td scope="row" className='text text-center'><b>{index + 1}</b></td>
                                            <td className='text text-center'>{i?.name}</td>
                                            <td className='text text-center'>{i?.details}</td>
                                            <td className='text text-center'>{i?.type}</td>
                                            <td className='text text-center'>
                                                {JSON.stringify(i?.released) == "true" ? 
                                                    <span className="badge bg-success">YES</span>
                                                : <span className="badge bg-primary">NO</span>}
                                            </td>
                                            <td className='text text-center'>
                                                <Link to={"/createBond?mode=Edit&id="+i?._id}>
                                                    <FaIcons.FaPen 
                                                        style={{cursor: 'pointer', color: 'green'}}
                                                    />
                                                </Link>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>    
        </div>
    </div>
  )
}

const spinner = () => {
    return (
        <tr>
            <td colSpan={6}>
                <Spinner></Spinner>
            </td>
        </tr>
    )
}