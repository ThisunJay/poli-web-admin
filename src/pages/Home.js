import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { getAllCollectors, getAllUsers, getAllClients } from '../controllers/dashboard.controller'

export default function Home() {

  useEffect(() => {
    fetchCollectors();
  }, [])

  const fetchCollectors = async () => {
    try {
      let cols = await getAllCollectors();
      let users = await getAllUsers();
      let clis = await getAllClients();
      setAdmins(users?.data?.data?.filter(i => {
        if(i.userType == "Admin") {
          return true;
        }
        else {
          return false;
        }
      })?.length);
      setCols(cols?.data?.data?.length);
      setClients(clis?.data?.data?.length);
      setCollectors(cols?.data?.data);
    } catch (error) {
      console.log(error);
    }
  }

  const [Collectors, setCollectors] = useState([]);
  const [admins, setAdmins] = useState(0);
  const [cols, setCols] = useState(0);
  const [clients, setClients] = useState(0);

  return (
    <div>
        <Navbar />
        <div className='container'>
            <div className='row'>
              <div className='col-12'>
                <div className="card my-4 shadow-sm rounded">
                    <div className="card-body">
                        <h3>Dashboard</h3>
                    </div>
                </div>
              </div> 
            </div>

            <div className='row'>
              <div className='col-6'>
                <div className="card shadow-sm rounded">
                    <div className="card-body">
                      <h4>System Users by Type</h4>
                      <div className='row my-3'>
                        <div className='col-4'>
                          <div className='card shadow-sm rounded'>
                            <div className="card-body text text-center">
                              Number of Admins
                              <h2>{admins}</h2>
                            </div>
                          </div>
                        </div>
                        <div className='col-4'>
                          <div className='card shadow-sm rounded'>
                            <div className="card-body text text-center">
                              Number of Collectors
                              <h2>{cols}</h2>
                            </div>
                          </div>
                        </div>
                        <div className='col-4'>
                          <div className='card shadow-sm rounded'>
                            <div className="card-body text text-center">
                              Number of Clients
                              <h2>{clients}</h2>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                </div>
              </div>
              <div className='col-6'>
                <div className="card shadow-sm rounded">
                    <div className="card-body">
                      <h4>Collectors</h4>
                        <table className='table'>
                          <thead>
                            <tr>
                              <th>#</th>
                              <th>Full Name</th>
                              <th>Contact Number</th>
                              <th>User Name</th>
                            </tr>
                          </thead>
                          <tbody>
                            {
                              Collectors.map((i, index) => {
                                return (
                                  <tr className={index % 2 == 0 ? "" : "table-info"}>
                                    <td>{index + 1}</td>
                                    <td>{i?.fullName}</td>
                                    <td>{i?.contactNumber}</td>
                                    <td>{i?.userName}</td>
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
