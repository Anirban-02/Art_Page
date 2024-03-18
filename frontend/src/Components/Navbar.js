import React,{useState} from 'react';
import {NavLink} from 'react-router-dom';
import '../Css/Navbar.css'
import Searchbar from './Searchbar';
function Navbar() {
  const [click,setClick]=useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);
  return (
    <>
      <nav className='navbar'>
        <div className="nav-container">
          <div className='navbar-logo'>
            <NavLink to="/">
              <img src='./img/icon.png' alt=''/>
            </NavLink>
          </div>
          <div className='line'></div>
          <div className='title'>
            <p>Awesome Arts</p>
          </div>
          <div className='menu-icon' onClick={handleClick}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
          </div>
          <Searchbar/>
          <ul className={click?'nav-menu active': 'nav-menu'}>
            <li className='nav-item'>
              <NavLink to='/' className='nav-links' onClick={closeMobileMenu}>
                Home
              </NavLink>
            </li>
            <li className='nav-item'>
              <NavLink to='/about' className='nav-links' onClick={closeMobileMenu}>
                About
              </NavLink>
            </li>
            <li className='nav-item'>
              <NavLink to='/gallery' className='nav-links' onClick={closeMobileMenu}>
                Gallery
              </NavLink>
            </li>
            <li className='nav-item'>
              <NavLink to='/buy' className='nav-links' onClick={closeMobileMenu}>
                Buy
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Navbar ;
