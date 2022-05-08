import React, { useEffect, useState } from 'react'
import * as FaIcons from 'react-icons/fa';
import './Delivery.css'
import { getDeliveryByBillID, updateDeliveryState, createDelivery } from "../controllers/delivery.controller";
import { toast } from 'react-toastify';
import dayjs from 'dayjs';

export default function Delivery() {

    const [billNumber, setBillNumber] = useState();
    const [deliveryState, setDeliveryState] = useState(false);
    const [btnDisable, setBtnDisable] = useState(false); 
    const [editMode, setEditMode] = useState(false);
    const [stateEditable, setStateEditable] = useState(false);

    //form data
    const [deliveryNumber, setDeliveryNumber] = useState();
    const [deliveryVanNumber, setDeliveryVanNumber] = useState();
    const [driverNumber, setDriverNumber] = useState(); 
    const [delState, setDelState] = useState(); 
    const [customerName, setCustomerName] = useState(); 
    const [customerContact, setCustomerContact] = useState(); 
    const [customerAddress, setCustomerAddress] = useState(); 
    const [deliveryCharge, setDeliveryCharge] = useState(); 

    const [stateObj, setStateObj] = useState([]);


    useEffect(() => {

    }, [])

    const onClickSearch = async (e) => {
        try {
            e.preventDefault();
            
            let del = await getDeliveryByBillID(billNumber);

            if(del?.data?.delivery == null) {
                toast.error(del?.data?.message);

                //set values
                setDeliveryNumber("");
                setDeliveryVanNumber("");
                setDriverNumber("");
                setDelState("Created");
                setCustomerName("");
                setCustomerContact("");
                setCustomerAddress("");
                setDeliveryCharge("");
                setStateObj([]);
                setEditMode(false);
                setStateEditable(true);

                setDeliveryState(false);
            }
            else {
                console.log(del?.data);
                //set values
                setDeliveryNumber(del?.data?.delivery?.deliveryNumber);
                setDeliveryVanNumber(del?.data?.delivery?.deliveryVanNumber);
                setDriverNumber(del?.data?.delivery?.driverContactNumber);
                setDelState(del?.data?.delivery?.state[del?.data?.delivery?.state?.length - 1].state);
                setCustomerName(del?.data?.delivery?.customerName);
                setCustomerContact(del?.data?.delivery?.customerContactNumber);
                setCustomerAddress(del?.data?.delivery?.customerAddress);
                setDeliveryCharge(del?.data?.delivery?.deliveryCharge);
                //state obj
                setStateObj(del?.data?.delivery?.state);
                setDeliveryState(true);
                setEditMode(true);
            }

        } catch (error) {
            // console.log(error.message);
            toast.error("Something went wrong!");
        }
    }

    const onCreateClick = async (e) => {
        try {
            e.preventDefault();

            let newState = [];
            newState.push({
                state: "Created",
                date: dayjs().format("YYYY-MM-DD"),
                time: dayjs().format("h:mm A")
            })

            setStateObj(newState);
            setDeliveryState(true);
            setBtnDisable(true);

            const newObj = {
                billNumber: billNumber,
                deliveryNumber: deliveryNumber,
                deliveryVanNumber: deliveryVanNumber,
                driverContactNumber: driverNumber,
                customerName: customerName,
                customerContactNumber: customerContact,
                customerAddress: customerAddress,
                deliveryCharge: deliveryCharge,
                state: newState
            }

            let cre = await createDelivery(newObj);

            toast.success("Delivery Created!");

        } catch (error) {
            toast.error("Something Went Wrong!")
        }
    }

    const onEditClick = async (e) => {
        try {
            e.preventDefault();

            let newState = [...stateObj];
            newState.push({
                state: delState,
                date: dayjs().format("YYYY-MM-DD"),
                time: dayjs().format("h:mm A")
            })

            let up = await updateDeliveryState(deliveryNumber, {
                state: newState
            });
            setStateObj(newState);
            setBtnDisable(true);

            toast.success("Delivery State Updated!");
        } catch (error) {
            toast.error("Something Went Wrong!")
        }
    }

  return (
    <div>
        <div className="card mx-3 my-3 shadow-sm rounded">
            <div className="card-body">
                <h3>Delivery Window</h3>
            </div>
        </div>

        <div>
            <div className="row mx-3 my-3">
                <div className='col-6'>
                    <div className="shadow p-3 bg-body rounded">
                        <form>
                            <div className="mb-3">
                                <label htmlFor="billNumber" className="form-label">Bill Number</label>
                                <input type="number" min="0" className="form-control" 
                                    value={billNumber} onChange={(e) => {setBillNumber(e.target.value)}}
                                    disabled={btnDisable}
                                    id="billNumber" name="billNumber" placeholder=""/>
                                <button className='my-3 btn btn-success' onClick={(e) => {onClickSearch(e)}}>
                                    <FaIcons.FaSearchengin></FaIcons.FaSearchengin>
                                </button>
                                </div>
                                <div className="row mb-3">
                                    <div className='col-6'>
                                        <label htmlFor="deliveryNumber" className="form-label">Delivery Number</label>
                                        <input type="number" className="form-control" 
                                            disabled={btnDisable}
                                            value={deliveryNumber} onChange={(e) => {setDeliveryNumber(e.target.value)}}
                                            id="deliveryNumber" name="deliveryNumber"/>
                                    </div>
                                    <div className='col-6'>
                                        <label htmlFor="deliveryVanNumber" className="form-label">Delivery Van Number</label>
                                        <input type="text" className="form-control" 
                                            disabled={btnDisable}
                                            value={deliveryVanNumber} onChange={(e) => {setDeliveryVanNumber(e.target.value)}}
                                            id="deliveryVanNumber" name="deliveryVanNumber"/>
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className='col-6'>
                                        <label htmlFor="driverNumber" className="form-label">Driver Contact Number</label>
                                        <input type="text" className="form-control" 
                                            disabled={btnDisable}
                                            value={driverNumber} onChange={(e) => {setDriverNumber(e.target.value)}}
                                            id="driverNumber" name="driverNumber"/>
                                    </div>
                                    <div className='col-6'>
                                        <label htmlFor="deliveryState" className="form-label">Delivery State</label>
                                        <select id="deliveryState" disabled={btnDisable || stateEditable}
                                            value={delState} onChange={(e) => {setDelState(e.target.value)}}
                                            className="form-select">
                                            <option value="Created">Created</option>
                                            <option value="Ready">Ready</option>
                                            <option value="On Delivery">On Delivery</option>
                                            <option value="Delivered">Delivered</option>
                                            <option value="Cancelled">Cancelled</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className='col-6'>
                                        <label htmlFor="customerName" className="form-label">Customer Name</label>
                                        <input type="text" className="form-control" disabled={btnDisable}
                                            value={customerName} onChange={(e) => {setCustomerName(e.target.value)}}
                                            id="customerName" name="customerName"/>
                                    </div>
                                    <div className='col-6'>
                                        <label htmlFor="customerContact" className="form-label">Customer Contact Number</label>
                                        <input type="text" className="form-control" disabled={btnDisable}
                                            value={customerContact} onChange={(e) => {setCustomerContact(e.target.value)}}
                                            id="customerContact" name="customerContact"/>
                                    </div>
                                </div>
                                <div className='mb-3'>
                                    <label htmlFor="customerAddress" className="form-label">Customer Address</label>
                                    <input type="text" className="form-control" disabled={btnDisable}
                                        value={customerAddress} onChange={(e) => {setCustomerAddress(e.target.value)}}
                                        id="customerAddress" name="customerAddress"/>
                                </div>
                                <div className='row mb-3'>
                                    <div className='col-6'>
                                        <label htmlFor="DeliveryCharge" className="form-label">Delivery Charge</label>
                                        <input type="text" className="form-control" disabled={btnDisable}
                                            value={deliveryCharge} onChange={(e) => {setDeliveryCharge(e.target.value)}}
                                            id="DeliveryCharge" name="DeliveryCharge"/>
                                    </div>
                                    <div className='col-6'>
                                        <label htmlFor="submitBtn" style={{color: 'white'}} className="form-label">...</label>
                                        {
                                            editMode ? 
                                            <button type="submit" id='submitBtn' 
                                            onClick={(e) => {onEditClick(e)}}
                                            disabled={btnDisable}
                                            className="btn btn-success form-control">Edit</button> 
                                            : 
                                            <button type="submit" id='submitBtn' 
                                            onClick={(e) => {onCreateClick(e)}}
                                            disabled={btnDisable}
                                            className="btn btn-primary form-control">Create</button>
                                        }
                                    </div>
                                </div>
                        </form>
                    </div>
                </div>
                <div className='col-6'>
                    <div className="shadow p-3 bg-body rounded">
                        <div className="container">                      
                            <div className="row text-center justify-content-center mb-5">
                                <div className="col-xl-6 col-lg-8">
                                    <h2 className="font-weight-bold">Delivery State</h2>
                                    <p className="text-muted">Order Delivery State can be seen from here</p>
                                </div>
                            </div>

                            {
                                deliveryState ? 

                                <div className="row">
                                    <div className="col">
                                        <div className="timeline-steps aos-init aos-animate" data-aos="fade-up">
                                            {
                                                stateObj.map(i => {
                                                    return (
                                                        <div className="timeline-step">
                                                            <div className="timeline-content" data-toggle="popover" data-trigger="hover" data-placement="top" title="" data-content="And here's some amazing content. It's very engaging. Right?" data-original-title="2003">
                                                                <div className="inner-circle"></div>
                                                                <p className="h6 mt-3 mb-1">{i?.state}</p>
                                                                <p className="h6 text-muted mb-0 mb-lg-0">{i?.date}</p>
                                                                <p className="h6 text-muted mb-0 mb-lg-0">{i?.time}</p>
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                </div>
                                
                                :
                                
                                <div className='row' style={{textAlign: "center"}}>
                                    <FaIcons.FaExclamationTriangle style={{color: 'red'}}></FaIcons.FaExclamationTriangle>
                                    <h3 className='text-muted'>No Delivery Details Available</h3>
                                </div>
                            }

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
