import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import './BillingReport.css'
import { Link } from 'react-router-dom';
import Spinner from '../components/spinner';
import Navbar from '../components/Navbar'
import * as FaIcons from 'react-icons/fa';
import { getAllLoans } from '../controllers/loan.api.controller'
const dayjs = require('dayjs');

export default function AllLoans() {

    const [tableData, setTableData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = async () => {
        try {
            let us = await getAllLoans();
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
                    <h3>Loans</h3>
                </div>
            </div>

            <div className="shadow p-3 bg-body rounded">
            <button className='btn btn-primary mb-1'><Link to="/createLoan" style={{color: 'white', textDecoration: 'none'}}>New</Link></button>
                <div className='tableFixHead'>
                    <table className="table">
                        <thead>
                            <tr>
                                <th className='text text-center' style={{backgroundColor: 'white'}} scope="col">#</th>
                                <th className='text text-center' style={{backgroundColor: 'white'}} scope="col">Type</th>
                                <th className='text text-center' style={{backgroundColor: 'white'}} scope="col">Due Date</th>
                                <th className='text text-center' style={{backgroundColor: 'white'}} scope="col">Amount</th>
                                <th className='text text-center' style={{backgroundColor: 'white'}} scope="col">Instalment Amount</th>
                                <th className='text text-center' style={{backgroundColor: 'white'}} scope="col">Remaining Amount</th>
                                <th className='text text-center' style={{backgroundColor: 'white'}} scope="col">Interest Rate</th>
                                <th className='text text-center' style={{backgroundColor: 'white'}} scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                loading ? spinner() : tableData.map((i, index) => {
                                    return (
                                        <tr key={index}>
                                            <td scope="row" className='text text-center'><b>{index + 1}</b></td>
                                            <td className='text text-center'>{i?.type}</td>
                                            <td className='text text-center'>{
                                                dayjs(i?.dueDate).format("YYYY-MM-DD") >= dayjs().format("YYYY-MM-DD") ? 
                                                <b>{dayjs(i?.dueDate).format("YYYY-MM-DD")}</b> : 
                                                <span className="badge bg-danger">{dayjs(i?.dueDate).format("YYYY-MM-DD")}</span>
                                            }</td>
                                            <td className='text text-center'>{i?.amount?.toFixed(2)}</td>
                                            <td className='text text-center'>{i?.instalmentAmount?.toFixed(2)}</td>
                                            <td className='text text-center'>{i?.remainingAmount?.toFixed(2)}</td>
                                            <td className='text text-center'>{i?.interestRate} %</td>
                                            <td className='text text-center'>
                                                <Link to={"/loanDetails?id="+i?._id}>
                                                    <FaIcons.FaEye className='mx-2'
                                                        style={{cursor: 'pointer', color: 'blue'}}
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
