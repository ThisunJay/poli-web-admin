import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import Navbar from '../components/Navbar'
import { createUserAPI } from '../controllers/user.api.controller'

export default function CreateUser() {

  //form elements
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [userType, setUserType] = useState("");
  const [conPassword, setConPassword] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {

  },[])

  const onSubmitClicked = async (e) => {
    try {
      e.preventDefault();

      if(validatation()) {
        const data = {
          fullName: fullName,
          email: email,
          userName: userName,
          contactNumber: contactNumber,
          userType: userType,
          password: password
        }

        let res = await createUserAPI(data);

        toast.success("User Created");

        setFullName("");
        setEmail("");
        setUserName("");
        setContactNumber("");
        setUserType("");
        setConPassword("");
        setPassword("");
      }
    } catch (error) {
      console.log("Submit ERROR: ", error);
      toast.error("Something went wrong");
    }
  }

  const onCancelClicked = async (e) => {
    e.preventDefault();
    setFullName("");
    setEmail("");
    setUserName("");
    setContactNumber("");
    setUserType("");
    setConPassword("");
    setPassword("");

    window.location.replace("/allUsers");
  }

  const validatation = () => {
    if(fullName == "") {
      toast.error("Please Enter Full Name");
      return false;
    }
    else if(email == "") {
      toast.error("Please Enter Email");
      return false;
    }
    else if(userName == "") {
      toast.error("Please Enter User Name");
      return false;
    }
    else if(contactNumber == "") {
      toast.error("Please Enter Contact Number");
      return false;
    }
    else if(userType == "") {
      toast.error("Please Enter User Type");
      return false;
    }
    else if(conPassword == "") {
      toast.error("Please Enter Confirm Password");
      return false;
    }
    else if(password == "") {
      toast.error("Please Enter Password");
      return false;
    }

    if(password != conPassword) {
      toast.error("Password and Confirm Password Don't Macth");
      return false;
    }

    return true;
  }
  
  return (
    <div>
      <Navbar />
      <div className='container'>
        <div className='row'>
          <div className='col-2'></div>
          <div className='col-8'>
            <div className='card mt-5 shadow shadow-m'>
              <div className='card-body'>
                <h3 className='text-center'>Create User</h3> <hr/>

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
                      <input type="email" id='email' value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="form-control"/>
                    </div>
                  </div>

                  <div className='row mb-3'>
                    <div className='col-6'>
                      <label className='form-label' htmlFor='userName'>User Name</label>
                      <input type="text" id='userName' value={userName}
                        onChange={(e) => setUserName(e.target.value)} 
                        className="form-control"/>
                    </div>
                    <div className='col-6'>
                      <label className='form-label' htmlFor='contact'>Contact Number</label>
                      <input type="text" id='contact' value={contactNumber}
                        onChange={(e) => setContactNumber(e.target.value)} 
                        className="form-control"/>
                    </div>
                  </div>
                  
                  <div className='row mb-3'>
                    <div className='col-6'>
                      <label className='form-label' htmlFor='pwd'>Password</label>
                      <input type="password" id='pwd' value={password}
                        onChange={(e) => setPassword(e.target.value)} 
                        className="form-control"/>
                    </div>
                    <div className='col-6'>
                      <label className='form-label' htmlFor='cpwd'>Confirm Password</label>
                      <input type="password" id='cpwd' value={conPassword}
                        onChange={(e) => setConPassword(e.target.value)} 
                        className="form-control"/>
                    </div>
                  </div>

                  <div className='row mb-3'>
                    <div className='col-6'>
                      <label className='form-label' htmlFor='utype'>User Type</label>
                      {/* <input type="password" id='utype' className="form-control"/> */}
                      <select className='form-select' value={userType}
                          onChange={(e) => setUserType(e.target.value)}
                        >
                        <option value="">Please Select One</option>
                        <option value="Admin">Admin</option>
                        <option value="Collector">Collector</option>
                        <option value="Customer">Customer</option>
                        <option value="Owner">Owner</option>
                      </select>
                    </div>
                  </div>

                  <button type="button" onClick={(e) => onSubmitClicked(e)} className="btn btn-primary">Create User</button>
                  <button type="button" onClick={(e) => onCancelClicked(e)} className="btn btn-danger mx-3">Cancel</button>
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
