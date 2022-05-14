import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Navbar from '../components/Navbar';
import * as FaIcons from 'react-icons/fa';
import { useLocation } from 'react-router-dom';
import { getOneClient, updateClient, createClient } from '../controllers/client.api.controller'

export default function CreateClient() {

  const search = useLocation().search;
  const mode = new URLSearchParams(search).get('mode');
  const id = new URLSearchParams(search).get('id');
  const [editMode, setEditMode] = useState(false);

  //form values
  const [objId, setObjId] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [nic, setNic] = useState("");
  const [phone, setPhone] = useState("");
  const [job, setJob] = useState("");
  const [workplace, setWorkplace] = useState("");

  useEffect(() => {
    if(mode == "Edit") {
      fetchClientData();
      setEditMode(true);
    }
  }, [])

  const fetchClientData = async () => {
    try {
      let cl = await getOneClient(id);
      // setClient(cl?.data?.data);
      setFieldValues(cl?.data?.data);
      // console.log(cl?.data?.data);
    } catch (error) {
      console.log(error);
    }
  }

  const setFieldValues = (client) => {
    setObjId(client?._id);
    setFullName(client?.fullName);
    setEmail(client?.email);
    setAddress(client?.address);
    setNic(client?.nic);
    setPhone(client?.phone);
    setJob(client?.job);
    setWorkplace(client?.workplace);
  }

  const onCreateClicked = async () => {
    try {
      const data = {
        fullName,
        email,
        address,
        nic,
        phone,
        job,
        workplace
      }

      let res = await createClient(data);

      toast.success("New Client Created!");
      window.location.replace("/allClients");
    } catch (error) {
      toast.error("Client Creation Failed!")
      console.log(error);
    }
  }
  
  const onUpdateClicked = async () => {
    try {
      const data = {
        fullName,
        email,
        address,
        nic,
        phone,
        job,
        workplace
      }

      // console.log(data);

      let res = await updateClient(objId, data);

      toast.success("Client Updated!");
      window.location.replace("/allClients");
    } catch (error) {
      toast.error("Client Update Failed!")
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
                  <h3 className='text-center'>{mode} Client</h3> <hr/>

                  <form>

                    <div className='row mb-3'>
                      <div className='col-6'>
                        <label className='form-label' htmlFor='fullName'>Full Name</label>
                        <input type="text" id='fullName' value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          className="form-control"/>
                      </div>
                      <div className='col-6'>
                        <label className='form-label' htmlFor='email'>Email</label>
                        <input type="email" id='email'value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="form-control"/>
                      </div>
                    </div>

                    <div className='row mb-3'>
                      <div className='col-12'>
                        <label className='form-label' htmlFor='address'>Address</label>
                        <input type="text" id='address' value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          className="form-control"/>
                      </div>
                    </div>
                    
                    <div className='row mb-3'>
                      <div className='col-6'>
                        <label className='form-label' htmlFor='nic'>NIC</label>
                        <input type="text" id='nic' value={nic}
                          onChange={(e) => setNic(e.target.value)}
                          className="form-control"/>
                      </div>
                      <div className='col-6'>
                        <label className='form-label' htmlFor='phone'>Phone</label>
                        <input type="text" id='phone' value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="form-control"/>
                      </div>
                    </div>
                    
                    <div className='row mb-3'>
                      <div className='col-6'>
                        <label className='form-label' htmlFor='job'>Job</label>
                        <input type="text" id='job' value={job}
                          onChange={(e) => setJob(e.target.value)}
                          className="form-control"/>
                      </div>
                      <div className='col-6'>
                        <label className='form-label' htmlFor='workplace'>Workplace</label>
                        <input type="text" id='workplace' value={workplace}
                          onChange={(e) => setWorkplace(e.target.value)}
                          className="form-control"/>
                      </div>
                    </div>

                    {
                      editMode ? <button type="button" className="btn btn-success" onClick={(e) => onUpdateClicked()} >Update</button> : 
                      <button type="button" className="btn btn-primary" onClick={(e) => onCreateClicked()}>Create</button>
                    }
                    <button type="button" className="btn btn-danger mx-3" onClick={(e) => {
                      window.location.replace("/allClients");
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
