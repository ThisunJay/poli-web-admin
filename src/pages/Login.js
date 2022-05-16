import React, { useState, useEffect } from "react";
import { login, checkSignedIn, setCookies } from '../controllers/user.controller'
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import * as FaIcons from 'react-icons/fa';
function Login() {

  const [emailval, setEmailval] = useState("");
  const [passval, setPassval] = useState("");



  //on email change
  const emailValueChange = (e) => {
    setEmailval(e.currentTarget.value);
  };

  //on password change
  const passValueChange = (e) => {
    setPassval(e.currentTarget.value);
  };

  //On submit button
  const onLogin = async (e) => {
    e.preventDefault();
    let data = {
      "email": emailval,
      "password": passval
    }
    login(data).then(res => {
      const loginData = res.data
      setCookies(loginData.token, loginData.user)
      window.location.replace("/Home");
    }).catch(err => {
      setEmailval('')
      setPassval('')
      toast.error("Invalid credentials")
    })
  }


  useEffect(() => {
    let alreadyLogin = checkSignedIn()
    console.log(alreadyLogin);
    if (alreadyLogin) {
      window.location.replace('/Home')
    }
  }, []);


  return (
    <div>
      <div className="container" style={{ justifyContent: 'space-around', display: 'flex' }}>


        <div style={{ width: '500px' }}>
          <h1 style={{ textAlign: 'center', color: 'white' }}>LOGIN</h1>
          <div className='card shadow p-3 mb-5 bg-body rounded'>
            <div className='card-body'>

              <form onSubmit={onLogin}>
                <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
                  <input type="email" className="form-control" name="emailval"
                    aria-describedby="emailHelp" onChange={emailValueChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                  <input type="password" className="form-control" name="passval"
                    onChange={passValueChange} />
                </div>
                {/* <div className="mb-3 form-check">
                  <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                  <label className="form-check-label" htmlFor="exampleCheck1">Remember me</label>
                </div> */}
                <button type="submit" className="btn btn-primary">Login</button>

                <Link to="/showLoan">
                  <button type="button" className="btn btn-success mx-3"><FaIcons.FaHubspot /> Client Portal</button>
                </Link>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
