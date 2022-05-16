import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Navbar from '../components/Navbar';
import * as FaIcons from 'react-icons/fa';
import { useLocation } from 'react-router-dom';
import { getAllClients } from '../controllers/client.api.controller'
import { getAllBonds } from '../controllers/bond.api.controller'
import { createLoan } from '../controllers/loan.api.controller'
import dayjs from 'dayjs';

export default function CreateLoan() {

    const [type, settype] = useState("")
    const [date, setdate] = useState()
    const [dueDate, setdueDate] = useState();
    const [amount, setamount] = useState();
    const [fullAmount, setfullAmount] = useState();
    const [instalmentAmount, setinstalmentAmount] = useState();
    const [numberOfInstalments, setnumberOfInstalments] = useState();
    const [interestRate, setinterestRate] = useState();
    const [bondId, setbondId] = useState("");
    const [clientId, setclientId] = useState("");

    //dropdown values
    const [clients, setClients] = useState([]);
    const [bonds, setBonds] = useState([]);

    const validate = () => {
        if(type == "") {
            toast.error("Please enter type!");
            return false;
        }
        else if(!date) {
            toast.error("Please enter a date!");
            return false;
        }
        else if(!dueDate) {
            toast.error("Please enter a due date!");
            return false;
        }
        else if(!amount) {
            toast.error("Please enter a amount!");
            return false;
        }
        else if(!numberOfInstalments) {
            toast.error("Please enter number Of instalments!");
            return false;
        }
        else if(!interestRate) {
            toast.error("Please enter a interest rate!");
            return false;
        }
        else if(clientId == "") {
            toast.error("Please enter a client!");
            return false;
        }

        return true;
    }

    useEffect(() => {
        fetchDropdownData();
    }, []);

    const fetchDropdownData = async () => {
        try {
           let cl = await getAllClients();
           let bo = await getAllBonds();

           setClients(cl?.data?.data);
           setBonds(bo?.data?.data);
        } catch (error) {
            console.log(error);
        }
    }

    const onIntresetRateChanged = (e) => {
        setinterestRate(e.target.value);

        let tot = parseFloat(amount) + parseFloat(parseFloat(amount) * parseFloat(e.target.value) / 100);

        setfullAmount(tot);
    }

    const onNumberOfInstalmentsChanged = (e) => {
        setnumberOfInstalments(e.target.value);

        let ins = (parseFloat(fullAmount) / parseFloat(e.target.value));

        setinstalmentAmount(ins);
    }

    const onCreateClicked = async () => {
        try {
            if(validate()) {
                
                const data = {
                    type: type,
                    date: dayjs(date).format("YYYY-MM-DD"),
                    dueDate: dayjs(dueDate).format("YYYY-MM-DD"),
                    amount: amount,
                    fullAmount: fullAmount,
                    instalmentAmount: instalmentAmount,
                    numberOfInstalments: numberOfInstalments,
                    interestRate: interestRate,
                    clientId: clientId,
                    bondId: bondId,
                }

                console.log(data);

                let lo = await createLoan(data);

                toast.success("Loan Created!");
                window.location.replace("/allLoans");
            }
        } catch (error) {
            toast.error("Loan create failed!");
            console.log(error);
        }
    }

  return (
    <div>
        <Navbar />

        <div className='container'>
          <div className='row'>
            <div className='col-2'></div>
            <div className='col-8'>
              <div className='card my-4 shadow-sm rounded'>
                <div className='card-body'>
                  <h3 className='text-center'>Create Loan</h3> <hr/>

                  <form>

                    <div className='row mb-3'>
                        <div className='col-6'>
                            <label className='form-label' htmlFor='ltype'>Loan Type</label>
                            <input type="text" id='ltype' value={type} onChange={(e) => settype(e.target.value)}
                            className="form-control"/>
                        </div>
                        <div className='col-6'>
                            <label className='form-label' htmlFor='cdate'>Date</label>
                            <input type="date" id='cdate' value={date} onChange={(e) => setdate(e.target.value)}
                            className="form-control"/>
                        </div>
                    </div>
                    
                    <div className='row mb-3'>
                        <div className='col-6'>
                            <label className='form-label' htmlFor='dueDate'>Due Date</label>
                            <input type="date" id='dueDate' value={dueDate} onChange={(e) => setdueDate(e.target.value)}
                            className="form-control"/>
                        </div>
                        <div className='col-6'>
                            <label className='form-label' htmlFor='amount'>Loan Amount</label>
                            <input type="number" id='amount' value={amount} onChange={(e) => setamount(e.target.value)}
                            className="form-control"/>
                        </div>
                    </div>
                    
                    <div className='row mb-3'>
                        <div className='col-6'>
                            <label className='form-label' htmlFor='interestRate'>Interest Rate</label>
                            <input type="number" id='interestRate' min={0} max={100} value={interestRate}
                                onChange={(e) => onIntresetRateChanged(e)}
                            className="form-control"/>
                        </div>
                        <div className='col-6'>
                            <label className='form-label' htmlFor='famount'>Full Amount</label>
                            <input type="number" id='famount' value={fullAmount} onChange={(e) => setfullAmount(e.target.value)}
                            className="form-control" disabled/>
                        </div>
                    </div>
                    
                    <div className='row mb-3'>
                        <div className='col-6'>
                            <label className='form-label' htmlFor='numberOfInstalments'>Number Of Instalments</label>
                            <input type="number" id='numberOfInstalments' value={numberOfInstalments} 
                                onChange={(e) => onNumberOfInstalmentsChanged(e)}
                            className="form-control"/>
                        </div>
                        <div className='col-6'>
                            <label className='form-label' htmlFor='iamount'>Instalment Amount</label>
                            <input type="number" id='iamount' value={instalmentAmount} onChange={(e) => setinstalmentAmount(e.target.value)}
                            className="form-control" disabled/>
                        </div>
                    </div>
                    
                    <div className='row mb-3'>
                        <div className='col-6'>
                            <label className='form-label' htmlFor='client'>Client</label>
                            <select id='client' value={clientId} onChange={(e) => setclientId(e.target.value)} 
                                className="form-select">
                                <option value="">Please Select a Client</option>
                                {
                                    clients.map(i => {
                                        return <option value={i?._id}>{i?.fullName}</option>
                                    })
                                }
                            </select>
                        </div>
                        <div className='col-6'>
                            <label className='form-label' htmlFor='bond'>Bond</label>
                            <select id='bond' value={bondId} onChange={(e) => setbondId(e.target.value)} 
                                className="form-select" disabled={clientId == "" ? true : false}>
                                <option value="">Please Select a Bond</option>
                                {
                                    bonds.filter(i => {
                                        if(i?.clientId == clientId && i?.released == false) {
                                            return true;
                                        }
                                        else {
                                            return false;
                                        }
                                    }).map(i => {
                                        return <option value={i?._id}>{i?.name} - {i?.type}</option>
                                    })
                                }
                            </select>
                        </div>
                    </div>

                    <button type="button" className="btn btn-primary" onClick={(e) => onCreateClicked()}>Create</button>
                    <button type="button" className="btn btn-danger mx-3" onClick={(e) => {
                      window.location.replace("/allLoans");
                    }}>Cancel</button>

                  </form>

                </div>
              </div>
            </div>
            <div className='col-2'></div>
          </div>
      </div>

    </div>
  )
}
