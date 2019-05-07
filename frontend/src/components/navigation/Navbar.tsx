import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => (
    <header className="navbar">
        <div className="navbar__logo">
            <h1>Event Booking</h1>
        </div>
        <nav className="navbar__items">
            <ul>
                <li>
                    <NavLink to="/auth">Auth</NavLink>
                </li>
                <li>
                    <NavLink to="/events">Events</NavLink>
                </li>
                <li>
                    <NavLink to="/bookings">Bookings</NavLink>
                </li>
            </ul>
        </nav>
    </header>
)

export default Navbar;