import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/Navbar.css'

export default function Navbar() {
  return (
    <nav className="navbar">
        <div className="container-navbar">
          <a className="navbar-brand" href="#">Adoption</a>
          <div>
              <ul>

                <li className="nav-item">
                    <Link className='btn' to="/addanimal">Add Animal</Link>
                </li>
              
              </ul>
          </div>
        </div>
    </nav>
  )
}