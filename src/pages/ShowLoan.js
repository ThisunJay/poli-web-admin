import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Spinner from '../components/spinner';
import { Link } from 'react-router-dom';
import * as FaIcons from 'react-icons/fa';
import { getLoanForClient, getByLoanId } from '../controllers/loan.api.controller'
import dayjs from 'dayjs';

export default function ShowLoan() {

    const [email, setEmail] = useState("");
    const [nic, setNic] = useState("");
    const [remainingAmount, setRemainingAmount] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [selLoan, setSelLoan] = useState("");
    const [loading, setLoading] = useState(true);

    //dropdown details
    const [loans, setLoans] = useState([]);
    const [collections, setCollections] = useState([]);

    const validate = () => {
        if(email == "") {
            toast.error("Please Enter a Email!");
            return false;
        }
        else if(nic == "") {
            toast.error("Please Enter a NIC!");
            return false;
        }

        return true;
    }

    const onSubmitClicked = async () => {
        try {
            if(validate()) {
                const data = {
                    email,
                    nic
                }
                let loan = await getLoanForClient(data);

                // console.log(loan);
                toast.success("Loan Details Found!");
                setLoans(loan?.data?.data);
            }
        } catch (error) {
            toast.error("No Loan Details Found!")
            setLoans([]);
            console.log(error);
        }
    }

    const colTableData = async (id) => {
        try {
            if(id == "") {
                setCollections([]);
            }
            else {
                let tabDta = await getByLoanId(JSON.parse(id)?._id);
                setCollections(tabDta?.data?.data);
            }
            // let tabDta = await getByLoanId(JSON.parse(id)?._id);
            // console.log(tabDta);
        } catch (error) {
            setCollections([]);
            console.log(error);
        }
    }

  return (
    <div className='container'>
        <div className='row'>
            <div className="card my-4 shadow-sm rounded">
                <div className="card-body">
                    <h3><Link to="/"> <FaIcons.FaArrowLeft className='mx-3' /></Link>Check Loan Details</h3>
                </div>
            </div>
        </div>
        <div className='row'>
            <div className='col-6'>
                <div className="card my-4 shadow-sm rounded">
                    <div className="card-body">
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
                            <input type="email" className="form-control"
                                value={email} onChange={(e) => setEmail(e.target.value)}
                                id='exampleInputEmail1' name="emailval"/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="nic" className="form-label">NIC</label>
                            <input type="text" value={nic} onChange={(e) => setNic(e.target.value)}
                                className="form-control" id='nic'/>
                        </div>   
                        <div className="mb-3">
                            <label htmlFor="loan" className="form-label">Loan</label>
                            <select className='form-select' onChange={async (e) => {
                                                                setSelLoan(e.target.value);
                                                                await colTableData(e.target.value)
                                                            }}
                                 value={selLoan} disabled={loans.length > 0 ? false : true}>
                                <option value="">Please Select a Loan</option>
                                {
                                    loans.map(i => {
                                        return <option key={i?.loan?._id} value={JSON.stringify(i?.loan)}>{i?.loan?.type}</option>
                                    })
                                }
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="remainingAmount" className="form-label">Remaining Amount</label>
                            <input type="text" value={selLoan == "" ? "" : JSON.parse(selLoan)?.remainingAmount?.toFixed(2)}
                                className="form-control" id='remainingAmount' disabled/>
                        </div> 
                        <div className="mb-3">
                            <label htmlFor="dueDate" className="form-label">Due Date</label>
                            <input type="text" value={selLoan == "" ? "" : dayjs(JSON.parse(selLoan)?.dueDate).format("YYYY-MM-DD")}
                                className="form-control" id='dueDate' disabled/>
                        </div> 
                        {/* <p>{JSON.stringify(collections)}</p> */}
                        <button type="button" className="btn btn-primary" onClick={(e) => onSubmitClicked()}><FaIcons.FaSearch /> Find Loans</button>   
                    </div>
                </div>
            </div>
            <div className='col-6'>
                <div className="card my-4 shadow-sm rounded">
                    <div className="card-body">
                        <table className='table'>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Collection Date</th>
                                    <th>Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    collections.map((i, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{dayjs(i?.date).format("YYYY-MM-DD")}</td>
                                                <td>{i?.amount?.toFixed(2)}</td>
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
  )
}
