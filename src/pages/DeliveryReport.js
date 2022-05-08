import React, { useEffect, useState } from 'react'
import './BillingReport.css'
import Spinner from '../components/spinner';
import { getAllDeliveries } from '../controllers/delivery.controller'
import { CSVLink, CSVDownload } from "react-csv";
const dayjs = require('dayjs')

export default function DeliveryReport() {

    const [loading, setLoading] = useState(true);
    const [tableData, setTableData] = useState([]);
    const [csvData, setCsvData] = useState([]);

    const fetchData = async () => {
        let data = await getAllDeliveries();
        // console.log(data?.data?.deliveries);
        setTableData(data?.data?.deliveries);
        setCsvData(data?.data?.deliveries);
        setLoading(false);
    }

    useEffect(() => {
        fetchData();
    }, [])

  return (
    <div className='container'>
        <div className="card my-4 shadow-sm rounded">
            <div className="card-body">
                <h3>Delivery Report</h3>
            </div>
        </div>

        <div className="shadow p-3 bg-body rounded">
                <div className='tableFixHead'>
                    <table className="table">
                        <thead>
                            <tr>
                                <th style={{backgroundColor: 'white'}} scope="col">Bill Number</th>
                                <th style={{backgroundColor: 'white'}} scope="col">Delivery Number</th>
                                <th style={{backgroundColor: 'white'}} scope="col">Delivery Van Number</th>
                                <th style={{backgroundColor: 'white'}} scope="col">Driver Contact Number</th>
                                <th style={{backgroundColor: 'white'}} scope="col">Customer Name</th>
                                <th style={{backgroundColor: 'white'}} scope="col">Customer Contact Number</th>
                                <th style={{backgroundColor: 'white'}} scope="col">Delivery State</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                loading ? spinner() : tableData.map((i, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{i.billNumber}</td>
                                            <td>{i.deliveryNumber}</td>
                                            <td>{i.deliveryVanNumber}</td>
                                            <td>{i.driverContactNumber}</td>
                                            <td>{i.customerName}</td>
                                            <td>{i.customerContactNumber}</td>
                                            <td>{getState(i.state[i.state.length - 1].state)}</td>
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
                    {label: 'Delivery Number', key: 'deliveryNumber'},
                    {label: 'Bill ID', key: 'billNumber'},
                    {label: 'Customer Contact Number', key: 'customerContactNumber'},
                    {label: 'Customer Name', key: 'customerName'},
                    {label: 'Delivery Charge', key: 'deliveryCharge'},
                    {label: 'Delivery Van Number', key: 'deliveryVanNumber'},
                    {label: 'Driver Contact Number', key: 'driverContactNumber'},
                    {label: 'Date', key: 'date'},
                    {label: 'Version', key: '__v'}
                ]}
                filename={`Delivery Report - ${dayjs().format('YYYY-MM-DD')}`}>
                    <button className='btn btn-success mt-4'>Export to excel
                    </button>
            </CSVLink>
    </div>
  )
}

const getState = (state) => {
    switch (state) {
        case "Created":
            return <span className="badge bg-primary">Created</span>
        case "Ready":
            return <span className="badge bg-info">Ready</span>
        case "On Delivery":
            return <span className="badge bg-secondary">On Delivery</span>
        case "Delivered":
            return <span className="badge bg-success">Delivered</span>
        case "Cancelled":
            return <span className="badge bg-danger">Cancelled</span>
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