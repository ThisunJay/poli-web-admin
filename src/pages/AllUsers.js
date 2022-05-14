import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import Spinner from '../components/spinner';
import Navbar from '../components/Navbar'
import './BillingReport.css'
import { getAllUsers } from '../controllers/user.api.controller'
import * as FaIcons from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';

export default function AllUsers() {

    const [tableData, setTableData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = async () => {
        try {
            let us = await getAllUsers();
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
                        <h3>Users</h3>
                        
                    </div>
                </div>
                    
                <div className="shadow p-3 bg-body rounded">
                <button className='btn btn-primary mb-1'><Link to="/createUser" style={{color: 'white', textDecoration: 'none'}}>New</Link></button>
                    <div className='tableFixHead'>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th className='text text-center' style={{backgroundColor: 'white'}} scope="col">#</th>
                                    <th className='text text-center' style={{backgroundColor: 'white'}} scope="col">Full Name</th>
                                    <th className='text text-center' style={{backgroundColor: 'white'}} scope="col">User Name</th>
                                    <th className='text text-center' style={{backgroundColor: 'white'}} scope="col">User Type</th>
                                    <th className='text text-center' style={{backgroundColor: 'white'}} scope="col">Email</th>
                                    <th className='text text-center' style={{backgroundColor: 'white'}} scope="col">Contact Number</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    loading ? spinner() : tableData.map((i, index) => {
                                        return (
                                            <tr key={index}>
                                                <td scope="row" className='text text-center'><b>{index + 1}</b></td>
                                                <td className='text text-center'>{i.fullName}</td>
                                                <td className='text text-center'>{i.userName}</td>
                                                <td className='text text-center'>{getUserType(i.userType)}</td>
                                                <td className='text text-center'>{i.email}</td>
                                                <td className='text text-center'>{i.contactNumber}</td>
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

const getUserType = (type) => {
    switch (type) {
        case "Admin":
            return <span className="badge bg-primary">Admin</span>
        case "Customer":
            return <span className="badge bg-info">Customer</span>
        case "Owner":
            return <span className="badge bg-secondary">Owner</span>
        case "Collector":
            return <span className="badge bg-success">Collector</span>
    }
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