import React, { useEffect, useState } from 'react';
import './BillingReport.css'
import Spinner from '../components/spinner';
import { getAllBills } from '../controllers/bill.controller'
import { CSVLink, CSVDownload } from "react-csv";
const dayjs = require('dayjs')

function BillingReport() {

    const [loading, setLoading] = useState(true);
    const [tableData, setTableData] = useState([]);
    const [csvData, setCsvData] = useState([]);
    
    const fetchData = async () => {
        let data = await getAllBills();
        // console.log(data?.data?.bills);
        setTableData(data?.data?.bills);
        
        setCsvData(data?.data?.bills);

        setLoading(false);
    }
    
    useEffect(() => {
        fetchData()
    }, [])


    return (
        <>
            <div className='container'>
                <div className="card my-4 shadow-sm rounded">
                    <div className="card-body">
                        <h3>Billing Report</h3>
                    </div>
                </div>
                    
                <div className="shadow p-3 bg-body rounded">
                    <div className='tableFixHead'>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th style={{backgroundColor: 'white'}} scope="col">Bill Number</th>
                                    <th style={{backgroundColor: 'white'}} scope="col">Contact Number</th>
                                    <th style={{backgroundColor: 'white'}} scope="col"># Items</th>
                                    <th style={{backgroundColor: 'white'}} scope="col">Total Amount</th>
                                    <th style={{backgroundColor: 'white'}} scope="col">Date</th>
                                    <th style={{backgroundColor: 'white'}} scope="col">Time</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    loading ? spinner() : tableData.map((i, index) => {
                                        return (
                                            <tr key={index}>
                                                <th scope="row">{i.id}</th>
                                                <td>{i.contactNumber}</td>
                                                <td>{i.billItems.length}</td>
                                                <td>{i.fullAmount}</td>
                                                <td>{dayjs(i.date).format("YYYY-MM-DD")}</td>
                                                <td>{dayjs(i.date).format("h:mm A")}</td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
                <CSVLink data={csvData} 
                    headers={[
                        {label: 'Object ID', key: '_id'},
                        {label: 'Bill ID', key: 'id'},
                        {label: 'Contact Number', key: 'contactNumber'},
                        {label: 'Full Amount', key: 'fullAmount'},
                        {label: 'Items', key: 'billItems'},
                        {label: 'Discount Amount', key: 'discountedAmount'},
                        {label: 'Discount Percentage', key: 'discountPercentage'},
                        {label: 'Date', key: 'date'},
                        {label: 'Version', key: '__v'}
                    ]}
                    filename={`Billing Report - ${dayjs().format('YYYY-MM-DD')}`}>
                        <button className='btn btn-success mt-4'>Export to excel
                        </button>
                </CSVLink>
            </div>
        </>
    );
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

export default BillingReport;