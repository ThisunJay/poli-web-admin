import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import Navbar from '../components/Navbar'
import { getAllClients } from '../controllers/client.api.controller'
import { getLoanForClient, getOneLoanDetails, createCollectionAPI } from '../controllers/loan.api.controller'

export default function CreateCollection() {

    //form values
    const [clientId, setClientId] = useState("");
    const [loanId, setLoanId] = useState("");
    const [remainingAmount, setRemainingAmount] = useState("");
    const [amount, setAmount] = useState("");
    const [date, setDate] = useState();

    //dropdowns
    const [clients, setClients] = useState([]);
    const [loans, setLoans] = useState([]);

    useEffect(() => {
        fetchDropdownData();
    }, [])

    const fetchDropdownData = async () => {
        try {
            let cls = await getAllClients();
            setClients(cls?.data?.data);
        } catch (error) {
            // console.log(error);
            setClients([]);
            setLoans([]);
        }
    }

    const onClientChanged = async (id) => {
        try {
            if(id == "") {
                setLoans([]);
                setRemainingAmount("");
                setAmount("");    
            }
            else {
                let lons = await getLoanForClient(id);
                setLoans(lons?.data?.data);
                setRemainingAmount("");
                setAmount("");
            }
        } catch (error) {
            setLoans([]);
        }
    } 

    const onLoanChanged = async (id) => {
        try {
            if(id == "") {
                setRemainingAmount("");
                setAmount("");   
            }
            else {
                let lon = await getOneLoanDetails(id);
                // console.log(lon);
                setRemainingAmount(lon?.data?.data?.loan?.remainingAmount);
                setAmount(lon?.data?.data?.loan?.instalmentAmount);
            }
        } catch (error) {
            setRemainingAmount("");
            setAmount("");
        }
    }

    const onClearClicked = () => {
        setClientId("");
        setLoanId("");
        setLoans([]);
        setDate();
        setRemainingAmount("");
        setAmount("");
    }

    const onSubmitClicked = async () => {
        try {
            if(validate()) {
                const data = {
                    loanId: loanId,
                    date: dayjs(date).format("YYYY-MM-DD"),
                    amount: parseFloat(amount)
                }
                let col = await createCollectionAPI(data);

                onClearClicked();
                toast.success("Collection Created!");
            }
        } catch (error) {
            toast.error("Collection Create Failed!");
            console.log(error);
        }
    }

    const validate = () => {
        if(clientId == "") {
            toast.error("Please enter a client!");
            return false;
        }
        else if(loanId == "") {
            toast.error("Please enter a Loan!");
            return false;
        }
        else if(amount == "") {
            toast.error("Please enter an Amount!");
            return false;
        }

        return true;
    }

  return (
    <div>
        <Navbar />

        <div className='container'>
            <div className="card my-4 shadow-sm rounded">
                <div className="card-body">
                    <h3 className='text text-center'>Add Collection</h3>
                </div>
            </div>
        </div>

        <div className='container'>
            <div className="card my-4 shadow-sm rounded">
                <div className="card-body">
                    <form>
                        <div className="mb-3">
                            <label htmlFor="clients" className="form-label">Clients</label>
                            <select className='form-select' id='clients' value={clientId} onChange={(e) => {
                                setClientId(e.target.value);
                                onClientChanged(e.target.value);
                            }}>
                                <option value="">Select a Client</option>
                                {
                                    clients.map((i, index) => {
                                        return <option value={i?._id}>{i?.fullName}</option>
                                    })
                                }
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="loans" className="form-label">Loans</label>
                            <select className='form-select' id='loans' onChange={(e) => {
                                setLoanId(e.target.value)
                                onLoanChanged(e.target.value)
                                }} value={loanId}>
                                <option value="">Select a Loan</option>
                                {
                                    loans.map((i, index) => {
                                        return <option value={i?._id}>{i?.type}</option>
                                    })
                                }
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="cdate" className="form-label">Date</label>
                            <input type="date" id='cdate' className='form-control' value={date} onChange={(e) => setDate(e.target.value)}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="remainingAmount" className="form-label">Remaining Amount</label>
                            <input type="number" id='remainingAmount' value={remainingAmount} className='form-control' disabled/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="amount" className="form-label">Amount</label>
                            <input type="number" id='amount' value={amount} 
                                onChange={(e) => setAmount(e.target.value)} className='form-control' />
                        </div>

                        <button type='button' className='btn btn-primary' onClick={(e) => onSubmitClicked()}>Submit</button>
                        <button type='button' className='btn btn-danger mx-3' onClick={(e) => onClearClicked()}>Clear</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}
