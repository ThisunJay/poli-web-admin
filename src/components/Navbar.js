import React, { useState, useEffect } from "react";
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import './Navbar.css';
import { IconContext } from 'react-icons';
import { getUserdetails, checkSignedIn, signOut } from '../controllers/user.controller'
import { resetPassword } from '../controllers/user.api.controller'
import Modal from 'react-modal';
import { toast } from "react-toastify";

function Navbar() {
  const [sidebar, setSidebar] = useState(false);
  const [user, setUser] = useState({});
  const [login, setLogin] = useState(false);

  const [modalIsOpen, setIsOpen] = useState(false);
  const [resPassword, setResPassword] = useState("");

  useEffect(() => {
    let alreadyLogin = checkSignedIn()
    if (alreadyLogin) {
      console.log(alreadyLogin);
      setLogin(true)
      let ss = getUserdetails()
      setUser(ss)
      console.log(login && user.fullName);
    }

  }, []);
  const showSidebar = () => setSidebar(!sidebar);

  const SignOut = () =>{
    signOut()
    window.location.replace("/");
  }

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

  const openModal = () => {
    setIsOpen(true);
  }

  const closeModal = () => {
    setIsOpen(false);
  }

  const onClickPasswordReset = async () => {
    try {
      if(resPassword == "") {
        toast.error("Please Enter a New Password!");
        return false;
      }

      let res = await resetPassword({
        password: resPassword
      });

      toast.success("Password Updated!");

      SignOut();

    } catch (error) {
      toast.error("Password reset failed!");
      console.log(error);
    }
  }

  return (
    <div>
      <IconContext.Provider value={{ color: '#fff' }}>
        <div className='navbar' style={{ justifyContent: 'space-between' }}>
          <Link to='#' className='menu-bars'>
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>

          <h3 className='light mx-5 mt-3' style={{ color: "white" }}>PoliWeb</h3>

          {/* {
            SidebarData.map((item, index) => {
              return <h1>{item.path}</h1>
            })
          } */}
          
          <div style={{ color: 'white', marginTop: '10px', marginRight: '10px' }} >
            <p className="p-0 m-0" style={{ fontSize: '12px' }}>{login && user.fullName} <FaIcons.FaSignOutAlt onClick={SignOut} style={{marginLeft:'3px', cursor: 'pointer'}} /></p>
            <p className="p-0 m-0" style={{ fontSize: '10px' }}>{login && user.email}</p>
            <p className="p-0 m-0" style={{ fontSize: '12px' }}>
              <span className="badge bg-success" onClick={(e) => openModal()} style={{cursor: "pointer"}}>Reset Password <FaIcons.FaPen/>
              </span>
            </p>
          </div>
        </div>
        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'} style={{ position: 'absolute', zIndex: '9' }}>
          <ul className='nav-menu-items' onClick={showSidebar}>
            <li className='navbar-toggle'>
              <Link to='#' className='menu-bars'>
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </IconContext.Provider>


      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="container">
          <div className="row">
            <h5 className="mx-3 text text-center">Reset Password</h5>
          </div>
          <div className="row mb-3">
            <label className="form-label" htmlFor="respwd">New Password</label>
            <input type="password" id="respwd"
              value={resPassword} onChange={(e) => setResPassword(e.target.value)} 
              placeholder="Enter New Password..." className="form-control" />
          </div>
          <div className="row mb-3">
              <button className="btn btn-primary" onClick={(e) => onClickPasswordReset()}>Reset</button>
          </div>
          <div className="row mb-3">
              <button className="btn btn-danger" onClick={closeModal}>Cancel</button>
          </div>
        </div>
      </Modal>

    </div>
  );
}

export default Navbar;
