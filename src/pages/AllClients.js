import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import './BillingReport.css'
import { Link } from 'react-router-dom';
import Spinner from '../components/spinner';
import Navbar from '../components/Navbar'
import { getAllClients } from '../controllers/client.api.controller'
import * as FaIcons from 'react-icons/fa';
import { CSVLink, CSVDownload } from "react-csv";
import dayjs from 'dayjs';

export default function AllClients() {

    const [tableData, setTableData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = async () => {
        try {
            let us = await getAllClients();
            setTableData(us?.data?.data);
            setLoading(false);
        } catch (error) {
            toast.error("Fetching Data Failed!");
        }
    }

  return (
    <div>
        <Navbar/>
        <div className='container'>
            <div className="card my-4 shadow-sm rounded">
                <div className="card-body">
                    <h3>Clients</h3>
                </div>
            </div>

            <div className="shadow p-3 bg-body rounded">
                <button className='btn btn-primary mb-1'><Link to="/createClient?mode=Create" style={{color: 'white', textDecoration: 'none'}}>New</Link></button>
                <CSVLink data={tableData} 
                    headers={[
                        {label: 'Object ID', key: '_id'},
                        {label: 'Full Name', key: 'fullName'},
                        {label: 'Address', key: 'address'},
                        {label: 'NIC', key: 'nic'},
                        {label: 'Phone Number', key: 'phone'},
                        {label: 'Email', key: 'email'},
                        {label: 'Job', key: 'job'},
                        {label: 'Workplace', key: 'workplace'},
                    ]}
                    filename={`Clients Report - ${dayjs().format('YYYY-MM-DD')}`}>
                        <button className='btn btn-success mx-3'>Export to Excel
                        </button>
                </CSVLink>
                    <div className='tableFixHead'>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th className='text text-center' style={{backgroundColor: 'white'}} scope="col">#</th>
                                    <th className='text text-center' style={{backgroundColor: 'white'}} scope="col">Full Name</th>
                                    <th className='text text-center' style={{backgroundColor: 'white'}} scope="col">Email</th>
                                    <th className='text text-center' style={{backgroundColor: 'white'}} scope="col">Address</th>
                                    <th className='text text-center' style={{backgroundColor: 'white'}} scope="col">NIC</th>
                                    <th className='text text-center' style={{backgroundColor: 'white'}} scope="col">Phone</th>
                                    <th className='text text-center' style={{backgroundColor: 'white'}} scope="col">Job</th>
                                    <th className='text text-center' style={{backgroundColor: 'white'}} scope="col">Workplace</th>
                                    <th className='text text-center' style={{backgroundColor: 'white'}} scope="col">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    loading ? spinner() : tableData.map((i, index) => {
                                        return (
                                            <tr key={index}>
                                                <td scope="row" className='text text-center'><b>{index + 1}</b></td>
                                                <td className='text text-center'>{i?.fullName}</td>
                                                <td className='text text-center'>{i?.email}</td>
                                                <td className='text text-center'>{i?.address}</td>
                                                <td className='text text-center'>{i?.nic}</td>
                                                <td className='text text-center'>{i?.phone}</td>
                                                <td className='text text-center'>{i?.job}</td>
                                                <td className='text text-center'>{i?.workplace}</td>
                                                <td className='text text-center'>
                                                    <Link to={"/createClient?mode=Edit&id="+i?._id}>
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
