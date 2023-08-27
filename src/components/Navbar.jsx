import React from 'react'

// assets
import logo from '../assets/frog.svg'
import { NavLink } from 'react-router-dom'

const Navbar = ({ userName }) => {
    return (
        <nav>
            <NavLink to='/' aria-label='Home'>
                <img src={logo} alt="" height={30}/>
                <span>MoneyTracker</span>
            </NavLink>
        </nav>
    )
}

export default Navbar