import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Navbar from '../components/Navbar';
import * as FaIcons from 'react-icons/fa';
import { useLocation } from 'react-router-dom';
import { getAllUsers, createEmployee, updateEmployee, getOneEmployee } from '../controllers/employee.api.controller'

export default function CreateEmployee() {

    const search = useLocation().search;
    const mode = new URLSearchParams(search).get('mode');
    const id = new URLSearchParams(search).get('id');
    const [editMode, setEditMode] = useState(false);

    //form values
  const [objId, setObjId] = useState("");
  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [nic, setNic] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [position, setPosition] = useState("");
  const [department, setDepartment] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [userId, setUserId] = useState("");

  //dropdown values
  const [sysUsers, setSysUsers] = useState([]);

  const fetchDropdownData = async () => {
      try {
          let drUs = await getAllUsers();
          setSysUsers(drUs?.data?.data);
      } catch (error) {
          toast.error("Dropdown fetch failed!")
          setSysUsers([]);
      }
  }

  const validate = () => {
      if(fullName == "") {
        toast.error("Please Enter Full Name!");
        return false;
      }
      else if(email == "") {
        toast.error("Please Enter an Email!");
        return false;
      }
      else if(address == "") {
        toast.error("Please Enter a Address!");
        return false;
      }
      else if(nic == "") {
        toast.error("Please Enter a NIC!");
        return false;
      }
      else if(phone == "") {
        toast.error("Please Enter a Phone Number!");
        return false;
      }
      else if(department == "") {
        toast.error("Please Enter a Department!");
        return false;
      }
      else if(position == "") {
        toast.error("Please Enter a Position!");
        return false;
      }
      else if(additionalInfo == "") {
        toast.error("Please Enter Additional Info!");
        return false;
      }

      return true;
  }

  const onCreateClicked = async () => {
      try {
          const data = {
            fullName,
            address,
            nic,
            phone,
            email,
            position,
            department,
            additionalInfo,
            userId
          }

          if(validate()) {
            let emp = await createEmployee(data);
            toast.success("New Employee Created!");
            window.location.replace("/allEmployees");
          }
      } catch (error) {
        toast.error("Employee Creation Failed!")
        console.log(error);
      }
  }

  const onUpdateClicked = async () => {
      try {
        const data = {
            fullName,
            address,
            nic,
            phone,
            email,
            position,
            department,
            additionalInfo,
            userId
        }

        if(validate()) {
            let emp = await updateEmployee(objId, data);
            toast.success("Employee Updated!");
            window.location.replace("/allEmployees");
        }
      } catch (error) {
        toast.error("Employee Update Failed!")
        console.log(error);
      }
  }

  useEffect(() => {
    fetchDropdownData();
    if(mode == "Edit") {
        setEditMode(true);
        fetchEmployeeData();
    }
  }, [])

  const fetchEmployeeData = async () => {
      try {
          let emp = await getOneEmployee(id);

          setObjId(emp?.data?.data?._id)
          setFullName(emp?.data?.data?.fullName)
          setAddress(emp?.data?.data?.address)
          setNic(emp?.data?.data?.nic)
          setPhone(emp?.data?.data?.phone)
          setEmail(emp?.data?.data?.email)
          setPosition(emp?.data?.data?.position)
          setDepartment(emp?.data?.data?.department)
          setAdditionalInfo(emp?.data?.data?.additionalInfo)
          setUserId(emp?.data?.data?.userId)
      } catch (error) {
        console.log(error);
      }
  }

  return (
    <div>
        <Navbar/>

        <div className='container'>
          <div className='row'>
            <div className='col-2'></div>
            <div className='col-8'>
              <div className='card my-4 shadow-sm rounded'>
                <div className='card-body'>
                  <h3 className='text-center'>{mode} Employee</h3> <hr/>

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
                      <div className='col-6'>
                        <label className='form-label' htmlFor='address'>Address</label>
                        <input type="text" id='address' value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          className="form-control"/>
                      </div>
                      <div className='col-6'>
                        <label className='form-label' htmlFor='systemUser'>System User</label>
                          <select className='form-select' id="systemUser" value={userId} onChange={(e) => setUserId(e.target.value)}>
                            <option value="">Select a User</option>
                            {sysUsers.map(i => {
                                return (
                                    <option key={i?._id} value={i?._id}>{i?.fullName}</option>
                                )
                            })}
                          </select>
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
                        <label className='form-label' htmlFor='dept'>Department</label>
                        <input type="text" id='dept' value={department}
                          onChange={(e) => setDepartment(e.target.value)}
                          className="form-control"/>
                      </div>
                      <div className='col-6'>
                        <label className='form-label' htmlFor='pos'>Position</label>
                        <input type="text" id='pos' value={position}
                          onChange={(e) => setPosition(e.target.value)}
                          className="form-control"/>
                      </div>
                    </div>

                    <div className='row mb-3'>
                        <div className='col-12'>
                            <label className='form-label' htmlFor='info'>Additional Info</label>
                            {/* <input type="text" id='pos' value={position}
                                onChange={(e) => setPosition(e.target.value)}
                                className="form-control"/> */}
                            <textarea id="info" value={additionalInfo} 
                                onChange={(e) => setAdditionalInfo(e.target.value)}
                                className='form-control'/>
                        </div>
                    </div>

                    {
                      editMode ? <button type="button" className="btn btn-success" onClick={(e) => onUpdateClicked()}>Update</button> : 
                      <button type="button" className="btn btn-primary" onClick={(e) => onCreateClicked()}>Create</button>
                    }
                    <button type="button" className="btn btn-danger mx-3" onClick={(e) => {
                      window.location.replace("/allEmployees");
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
