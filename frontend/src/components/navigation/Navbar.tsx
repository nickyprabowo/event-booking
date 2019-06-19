import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import { ContextConsumer } from "../../context/auth-context";
import './Navbar.css';

const Navbar = () => (
    <ContextConsumer >
        {(context) => (
            <header className="navbar">
                <div className="navbar__logo">
                    <h1>EVBook</h1>
                </div>
                <nav className="navbar__items">
                    <ul>
                        {!context.token && <li>
                            <NavLink to="/auth">Auth</NavLink>
                        </li>}
                        <li>
                            <NavLink to="/event">Events</NavLink>
                        </li>
                        {context.token &&
                            <Fragment>
                            <li>
                                <NavLink to="/booking">My Bookings</NavLink>
                            </li>
                            <li>
                                <button onClick={context.logout}>Logout</button>
                            </li>
                            </Fragment>
                        }
                    </ul>
                </nav>
            </header>
        )}
    </ContextConsumer>
)

export default Navbar;