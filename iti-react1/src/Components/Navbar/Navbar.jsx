import React from 'react'
import { Link } from 'react-router-dom';
import '../Navbar/Navbar.module.css'
import logo from '../../images/helmet.png';
export default function Navbar() {
  return (
    <>
    <nav className="navbar py-4" style={{ backgroundColor: 'transparent', opacity: 0.75 }}>
      <div className="container-fluid d-flex justify-content-between align-items-center">
        <Link className="navbar-brand d-flex align-items-center fw-bold" to="/">
          <img src={logo} alt="Logo" width="35" height="30" className="d-inline-block align-text-top me-2 mx-5" />
          ConstrCut
        </Link>
        
        <ul className="navbar-nav flex-row">
          <li className="nav-item mx-3">
            <Link className="nav-link active" aria-current="page" to="/">Home</Link>
          </li>
          <li className="nav-item mx-3">
            <Link className="nav-link active" aria-current="page" to="/services">Services</Link>
          </li>
          <li className="nav-item mx-3">
            <Link className="nav-link" to="/blog">Blog</Link>
          </li>
          <li className="nav-item mx-4">
            <Link className="nav-link" to="/shop">Shop Now</Link>
          </li>
        </ul>
      </div>
    </nav>
    </>
  );
}