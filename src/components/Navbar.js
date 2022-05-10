import React, { useState, useEffect } from "react";
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import './Navbar.css';
import { IconContext } from 'react-icons';
import { getUserdetails, checkSignedIn, signOut } from '../controllers/user.controller'
function Navbar() {
  const [sidebar, setSidebar] = useState(false);
  const [user, setUser] = useState({});
  const [login, setLogin] = useState(false);
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
  return (
    <div>
      <IconContext.Provider value={{ color: '#fff' }}>
        <div className='navbar' style={{ justifyContent: 'space-between' }}>
          <Link to='#' className='menu-bars'>
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>

          <h3 className='light mx-5 mt-3' style={{ color: "white" }}>PoliWeb</h3>

          <div style={{ color: 'white', marginTop: '10px', marginRight: '10px' }} >
            <p className="p-0 m-0" style={{ fontSize: '12px' }}>{login && user.fullName} <FaIcons.FaSignOutAlt onClick={SignOut} style={{marginLeft:'3px',}} /></p>
            <p className="p-0 m-0" style={{ fontSize: '10px' }}>{login && user.email}</p>
            
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
    </div>
  );
}

export default Navbar;
