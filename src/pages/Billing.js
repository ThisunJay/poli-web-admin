import React, { useEffect, useState } from 'react';
import * as FaIcons from 'react-icons/fa';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { getAllAvailableItems } from '../controllers/item.controller'
import { createBill } from '../controllers/bill.controller'

function Billing() {

    const[itemDropdown, setItemDropdown] = useState([]);
    const[billTableItems, setBillTableItems] = useState([]);

    //form data
    const[id, setId] = useState();
    const[contactNumber, setContactNumber] = useState("");
    const[selectedItem, setSelectedItem] = useState();
    const[fullAmount, setFullAmount] = useState(0);
    const[discount, setDiscount] = useState(0);
    const[discountAmount, setDiscountAmount] = useState(0);
    const[price, setPrice] = useState();
    const[quantity, setQuantity] = useState();

    //disable buttons 
    const[btnDisable, setBtnDisable] = useState(false);

    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = async () => {
        let items = await getAllAvailableItems();
        setItemDropdown(items?.data?.items);
    }

    const onSubmitClick = async (e) => {
        e.preventDefault();
        // toast.success("Data Added")
        if(!id) {
            toast.error("Please enter a bill number")
            return false;
        }
        else if(!contactNumber) {
            toast.error("Please enter a contact number")
            return false;
        }
        else if(!selectedItem) {
            toast.error("Please select an item")
            return false;
        }
        else if(!quantity) {
            toast.error("Please enter a quantity")
            return false;
        }
        let selItem = JSON.parse(selectedItem);

        if(parseInt(selItem?.quantityIn) < parseInt(quantity)) {
            toast.error("Not enough quantity");
            return false;
        }

        if(billTableItems.length == 0) {
            setBillTableItems([{...selItem, quantity, value: parseFloat(selItem?.sellingPrice) * parseFloat(quantity)}]);
        }
        else {
            setBillTableItems([...billTableItems, {...selItem, quantity, value: parseFloat(selItem?.sellingPrice) * parseFloat(quantity)}])
        }
        
        toast.info('Added to bill');
    }

    const minusBtnClick = (newList) => {
        setBillTableItems(newList);
        setDiscount(0);
        setDiscountAmount(0);
    }

    const plusbtnClick = (newList) => {
        setBillTableItems(newList);
        setDiscount(0);
        setDiscountAmount(0);
    }

    const calculateTotal = (arr) => {
        let total = 0;
        for (let i = 0; i < arr.length; i++) {
            total = total + parseFloat(arr[i].value);
        }
        return total.toFixed(2);
    }

    const calculateDiscountAmount = (e) => {
        e.preventDefault();
        let tot = parseFloat(calculateTotal(billTableItems));
        tot = tot - (tot / 100) * discount; 
        setDiscountAmount(tot);
    }

    const printBill = async () => {
        try {
            const createBillObj = {
                id: id,
                contactNumber: contactNumber,
                billItems: billTableItems,
                fullAmount: discount == 0 ? parseFloat(calculateTotal(billTableItems)) : discountAmount,
                discountPercentage: parseFloat(discount),
                discountedAmount: (parseFloat(calculateTotal(billTableItems)) / 100) * discount
            }

            console.log(createBillObj);

            let created = await createBill(createBillObj);

            toast.success("Bill Created");
        } catch (error) {
            toast.error("Something went wrong!");
        }
    }

  return (
      <>
        <div className=''>
            <div className="card mx-3 my-3 shadow-sm rounded">
                <div className="card-body">
                    <h3>Billing Window</h3>
                </div>
            </div>

            <div className=''>
                <div className="row mx-3 my-3">
                    <div className='col-5'>
                        <div className="shadow p-3 bg-body rounded">
                            <h4 className='my-3 mx-2'>Product</h4>

                            <div className='px-4'>
                                <form>
                                    <div className="mb-3">
                                        <label htmlFor="billNumber" className="form-label">Bill Number</label>
                                        <input type="number" className="form-control" id="billNumber" 
                                            disabled={billTableItems?.length > 0 ? true : false} 
                                            value={id} onChange={(e) => { setId(e.target.value) }}/>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="contactNumber" className="form-label">Contact Number</label>
                                        <input type="text" className="form-control" id="contactNumber"
                                            disabled={billTableItems?.length > 0 ? true : false} 
                                            value={contactNumber} onChange={(e) => {setContactNumber(e.target.value)}} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="items" className="form-label">Items</label>
                                        <select id="items" className="form-select"
                                            value={selectedItem} onChange={async (e) => {
                                                setSelectedItem(e.target.value);
                                                let it = JSON.parse(e.target.value);
                                                setPrice(it?.sellingPrice)
                                            }}>
                                            <option value="">Select an Item</option>
                                            {
                                                itemDropdown.map(i => {
                                                    return (
                                                        <option value={JSON.stringify(i)}>{i.name}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="quantity" className="form-label">Quantity</label>
                                        <input type="number" min="1" step="1" className="form-control" 
                                            id="quantity" name="quantity" placeholder=""
                                            value={quantity} onChange={(e) => {setQuantity(e.target.value)}}/>
                                      </div>
                                      <div className="mb-3">
                                        <label htmlFor="price" className="form-label">Price</label>
                                        <input type="number" min="0.0" step="0.01" className="form-control" 
                                            id="price" name="price" placeholder="0.0" disabled
                                            value={price} onClick={(e) => {setPrice(e.target.value)}}/>
                                      </div>
                                    <button type="submit" disabled={btnDisable} className="btn btn-primary" onClick={(e) => {onSubmitClick(e)}}>Submit</button>
                                </form>
                            </div>
                        </div>

                        <div className="shadow p-3 my-4 bg-body rounded">
                            <div>
                                <h4>Bill Options</h4>
                                <div>
                                
                                    <div className="mb-3">
                                        <label htmlFor="discount" className="form-label">Discount Percentage</label>
                                        <input type="number" min="0" max="100" className="form-control" 
                                            value={discount} onChange={(e) => {setDiscount(e.target.value)}}
                                            id="discount" name="discount" placeholder="0"/>
                                    </div>
                                    <button type="submit" className="btn btn-primary" disabled={btnDisable} onClick={(e) => calculateDiscountAmount(e)}>Calculate</button>
                                    <button type="button" className="btn btn-danger mx-3" disabled={btnDisable} onClick={(e) => {
                                        setDiscount(0);
                                        setDiscountAmount(0);
                                    }}>Remove</button>
                                
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-7">
                        {/* <h4 className='my-3 mx-2'>Bill Details</h4> */}
                        <div className="shadow p-3 bg-body rounded">
                            <table className="table">
                                <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Item</th>
                                    <th scope="col">Quantity</th>
                                    <th scope="col">Price</th>
                                    <th scope="col">Actions</th>
                                </tr>
                                </thead>

                                <tbody>
                                    {/* <p>{JSON.stringify(billTableItems)}</p> */}
                                    {
                                        billTableItems?.length > 0 ? 
                                        billTableItems.map((i, index) => {
                                            return (
                                                <tr key={index}>
                                                    <th scope="row">{index + 1}</th>
                                                    <td>{i?.name}</td>
                                                    <td>{i?.quantity}</td>
                                                    <td>{parseFloat(i?.value).toFixed(2)}</td>
                                                    <td>
                                                        <ul className="list-inline">
                                                            <li className="list-inline-item">
                                                                {/* <button className="fa fa-plus btn btn-light" style={{color: "green"}}></button> */}
                                                                {!btnDisable ? 
                                                                    <FaIcons.FaPlus style={{cursor: "pointer", color: "green"}} 
                                                                    onClick={(e) => {
                                                                        let newList = [...billTableItems];
                                                                        let clickedItem = newList[index];
                                                                        clickedItem.quantity = parseInt(clickedItem.quantity) + 1;
                                                                        clickedItem.value = clickedItem.value + clickedItem.sellingPrice;
                                                                        newList[index] = clickedItem;
                                                                        plusbtnClick(newList);
                                                                    }}
                                                                />
                                                                 :
                                                                 <span className="badge bg-dark">Disabled</span>
                                                                 }
                                                            </li>
                                                            <li className="list-inline-item">
                                                                {/* <button className="fa fa-minus btn btn-light" style={{color: "red"}}></button> */}
                                                                {
                                                                    !btnDisable ? 
                                                                    <FaIcons.FaMinus style={{cursor: "pointer", color: "red"}}
                                                                    onClick={(e) => {
                                                                        let newList = [...billTableItems];
                                                                        let clickedItem = newList[index];
                                                                        if(parseInt(clickedItem.quantity) == 1) {
                                                                            console.log(index);
                                                                            newList = newList.filter(i => {
                                                                                if(i.id == clickedItem.id) {
                                                                                    return false;
                                                                                }
                                                                                else {
                                                                                    return true;
                                                                                }
                                                                            })
                                                                            minusBtnClick(newList);
                                                                        }
                                                                        else {
                                                                            clickedItem.quantity = parseInt(clickedItem.quantity) - 1;
                                                                            clickedItem.value = clickedItem.value - clickedItem.sellingPrice;
                                                                            newList[index] = clickedItem;
                                                                            minusBtnClick(newList);
                                                                        }
                                                                    }}
                                                                />
                                                                :
                                                                ""
                                                                }
                                                            </li>
                                                        </ul>
                                                    </td>
                                                </tr>
                                            );
                                        }) : spinner()
                                    }
                                    {
                                        billTableItems?.length > 0 ? 
                                            <>
                                                <tr>
                                                    <td colSpan="3">
                                                        <h5>Discounted Amount </h5>
                                                    </td>
                                                    <td><h5>{
                                                            discountAmount.toFixed(2)
                                                        }</h5></td>
                                                    <td></td>
                                                </tr>

                                                <tr>
                                                    <td colSpan="3">
                                                        <h5>Total Price </h5>
                                                    </td>
                                                    <td><h5>{
                                                            calculateTotal(billTableItems)
                                                        }</h5></td>
                                                    <td></td>
                                                </tr>

                                                <tr>
                                                    <td colSpan="3">
                                                        <button type="button" disabled={btnDisable} onClick={(e) => {
                                                            printBill() 
                                                            setBtnDisable(true)
                                                        }} 
                                                            className="btn btn-success mx-3">Print Bill</button>
                                                    </td>
                                                    <td></td>
                                                    <td></td>
                                                </tr>
                                            </> 
                                            
                                            : ""
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </>
  );
}



const spinner = () => {
    return (
        <tr>
            <td colSpan={5}>
                <div className="d-flex justify-content-center mx-4 my-4">
                    <div className='row' style={{textAlign: "center"}}>
                        <FaIcons.FaExclamationTriangle style={{color: 'red'}} className="my-3"></FaIcons.FaExclamationTriangle>
                        <h3 className='text-muted'>No Items in the cart</h3>
                    </div>
                </div>
            </td>
        </tr>
    )
}

export default Billing;