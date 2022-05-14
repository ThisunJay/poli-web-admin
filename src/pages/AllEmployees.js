import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import './BillingReport.css'
import { Link } from 'react-router-dom';
import Spinner from '../components/spinner';
import Navbar from '../components/Navbar'
import { getAllEmployees, deleteOneEmployee } from '../controllers/employee.api.controller'
import * as FaIcons from 'react-icons/fa';
import Modal from 'react-modal';

export default function AllEmployees() {

    const [tableData, setTableData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalIsOpen, setIsOpen] = useState(false);
    const [delObj, setDelObj] = useState(null);

    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = async () => {
        try {
            let us = await getAllEmployees();
            // console.log(us);
            setTableData(us?.data?.data);
            setLoading(false);
        } catch (error) {
            toast.error("Fetching Data Failed!");
        }
    }

    const openModal = (obj) => {
        setDelObj(obj)
        setIsOpen(true);
    }

    const closeModal = () => {
        setDelObj(null);
        setIsOpen(false);
    }

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
        },
    };

    const onDeleteClicked = async () => {
        try {
            let del = await deleteOneEmployee(delObj?._id);
            closeModal();
            toast.success("Employee Deleted!");
            await fetchData();
        } catch (error) {
            toast.error("Employee Delete Failed!");
            console.log(error);
        }
    }

  return (
    <div>
        <Navbar />

        <div className='container'>
            <div className="card my-4 shadow-sm rounded">
                <div className="card-body">
                    <h3>Employees</h3>
                </div>
            </div>

            <div className="shadow p-3 bg-body rounded">
        <button className='btn btn-primary mb-1'><Link to="/createEmployee?mode=Create" style={{color: 'white', textDecoration: 'none'}}>New</Link></button>
            <div className='tableFixHead'>
                <table className="table">
                    <thead>
                        <tr>
                            <th className='text text-center' style={{backgroundColor: 'white'}} scope="col">#</th>
                            <th className='text text-center' style={{backgroundColor: 'white'}} scope="col">Full Name</th>
                            <th className='text text-center' style={{backgroundColor: 'white'}} scope="col">Address</th>
                            <th className='text text-center' style={{backgroundColor: 'white'}} scope="col">NIC</th>
                            <th className='text text-center' style={{backgroundColor: 'white'}} scope="col">Phone</th>
                            <th className='text text-center' style={{backgroundColor: 'white'}} scope="col">Email</th>
                            <th className='text text-center' style={{backgroundColor: 'white'}} scope="col">Position</th>
                            <th className='text text-center' style={{backgroundColor: 'white'}} scope="col">Department</th>
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
                                        <td className='text text-center'>{i?.address}</td>
                                        <td className='text text-center'>{i?.nic}</td>
                                        <td className='text text-center'>{i?.phone}</td>
                                        <td className='text text-center'>{i?.email}</td>
                                        <td className='text text-center'>{i?.position}</td>
                                        <td className='text text-center'>{i?.department}</td>
                                        <td className='text text-center'>
                                            <Link to={"/createEmployee?mode=Edit&id="+i?._id}>
                                                <FaIcons.FaPen 
                                                    style={{cursor: 'pointer', color: 'green'}}
                                                />
                                            </Link>
                                            <FaIcons.FaTrash className='mx-2'
                                                onClick={(e) => openModal(i)}
                                                    style={{cursor: 'pointer', color: 'red'}}
                                                />
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

        <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Example Modal"
        >
            <div className='container'>
                <div className='row text text-center'>
                    <p>Are you sure you want to delete <b>{delObj?.fullName}</b> ?</p>
                    <div>
                        <span className="badge bg-success px-2 mx-3" 
                            style={{cursor: 'pointer'}} onClick={(e) => onDeleteClicked()}>Yes</span>
                        <span className="badge bg-danger px-2 mx-3" style={{cursor: 'pointer'}} onClick={closeModal}>No</span>
                    </div>
                </div>
            </div>
      </Modal>
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
