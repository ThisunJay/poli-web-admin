import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Navbar from '../components/Navbar';
import * as FaIcons from 'react-icons/fa';
import Spinner from '../components/spinner';
import { useLocation } from 'react-router-dom';
import { getOneLoanDetails, updateLoan } from '../controllers/loan.api.controller';
import { updateBond } from '../controllers/bond.api.controller';
import dayjs from 'dayjs';
import './BillingReport.css'

export default function LoanDetails() {

    const search = useLocation().search;
    const id = new URLSearchParams(search).get('id');

    //page data
    const [tableData, setTableData] = useState([]);
    const [loading, setLoading] = useState(true);

    const [client, setClient] = useState();
    const [loan, setLoan] = useState();
    const [bond, setBond] = useState();

    useEffect(() => {
        fetchPageData();
    }, [])

    const fetchPageData = async () => {
        try {
            let pd = await getOneLoanDetails(id);

            setTableData(pd?.data?.data?.collections);
            setLoading(false);
            setClient(pd?.data?.data?.client);
            setBond(pd?.data?.data?.bond);
            setLoan(pd?.data?.data?.loan);
        } catch (error) {
            console.log(error);
        }
    }

    const onMarkasPaidClicked = async () => {
        try {
            const data = {
                paid: true
            }

            let loanUpdate = await updateLoan(loan?._id, data);

            toast.success("Loan marked as paid off!!");
            window.location.replace("/allLoans");
        } catch (error) {
            toast.error("Update Failed!")
            console.log(error);
        }
    }

  return (
    <div>
        <Navbar />

        <div className='container'>
            <div className='row'>
                <div className="card my-4 shadow-sm rounded">
                    <div className="card-body">
                        <h3>Loan Details</h3>
                    </div>
                </div>
            </div>
        </div>

        <div className='container'>
            <div className='row'>
                <div className='col-6'>
                    <div className="card shadow-sm rounded">
                        <div className="card-body">
                            <h5>Basic Details - 
                            {
                                loan?.paid ? <span className="badge bg-success">Paid Off</span> : <span className="badge bg-danger">Not Paid Off</span>
                            }
                                </h5> <hr></hr>

                            <div className='row mb-3'>
                                <div className='col-6'>
                                    <label className='form-label' htmlFor='name'>Client Name</label>
                                    <input type="text" id='name' value={client?.fullName} className="form-control" disabled/>
                                </div>
                                <div className='col-6'>
                                    <label className='form-label' htmlFor='pno'>Phone Number</label>
                                    <input type="text" id='pno' value={client?.phone} className="form-control" disabled/>
                                </div>
                            </div>
                            <div className='row mb-3'>
                                <div className='col-6'>
                                    <label className='form-label' htmlFor='ltype'>Loan Type</label>
                                    <input type="text" id='ltype' value={loan?.type} className="form-control" disabled/>
                                </div>
                                <div className='col-6'>
                                    <label className='form-label' htmlFor='remainingAmount'>Remaining Amount</label>
                                    <input type="text" id='remainingAmount' value={loan?.remainingAmount?.toFixed(2)} className="form-control" disabled/>
                                </div>
                            </div>
                            <div className='row mb-3'>
                                <div className='col-6'>
                                    <label className='form-label' htmlFor='bondDetails'>Bond Details</label>
                                    <input type="text" id='bondDetails' value={bond?.name + bond?.type} className="form-control" disabled/>
                                </div>
                                <div className='col-6'>
                                    <label className='form-label' htmlFor='remainingAmount'>Released</label>
                                    <input type="text" id='remainingAmount' value={bond?.released} className="form-control" disabled/>
                                </div>
                            </div>

                            {
                                parseFloat(loan?.remainingAmount) == 0 && !(loan?.paid) ? 
                                    <button type="button" className="btn btn-primary" onClick={(e) => onMarkasPaidClicked()}>Mark as Paid</button> 
                                        : 
                                    <button type="button" className="btn btn-primary" disabled>Mark as Paid</button>
                            }
                            
                        </div>
                    </div>
                </div>
                <div className='col-6'>
                    <div className="card shadow-sm rounded">
                        <div className="card-body">
                            <h5>Collection Details</h5> <hr></hr>

                            <table className="table" style={{height: '285px', overflowY: 'scroll', display: 'inherit', overflowX: 'scroll'}}>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Date</th>
                                        <th>Amount</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        loading ? spinner() : tableData.map((i, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td scope="row" className='text'><b>{index + 1}</b></td>
                                                    <td className='text'>{dayjs(i?.date).format("YYYY-MM-DD")}</td>
                                                    <td className='text'><b>{i?.amount?.toFixed(2)}</b></td>
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
        </div>
    </div>
  )
}

const spinner = () => {
    return (
        <tr>
            <td colSpan={3}>
                <Spinner></Spinner>
            </td>
        </tr>
    )
}