import { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {

    const [menuOpen, setMenuOpen] = useState(false);

    const closeMenu = () => {
        setMenuOpen(false);
    };

    return (

        <nav className="navbar">

            <div className="navbar-container">

                {/* Mobile top bar */}

                <div className="navbar-top">

                    <button
                        className="hamburger-button"
                        onClick={() => setMenuOpen(!menuOpen)}
                        aria-label="Toggle navigation menu"
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>


                    <Link
                        to="/"
                        className="logo"
                        onClick={closeMenu}
                    >
                        <span className="logo-icon">+</span>

                        <span className="logo-text">
                            Blood Donor
                            <strong>Finder</strong>
                        </span>
                    </Link>

                </div>


                {/* Navigation */}

                <ul
                    className={`nav-links ${
                        menuOpen ? "mobile-menu-open" : ""
                    }`}
                >

                    <li>
                        <Link to="/" onClick={closeMenu}>
                            Home
                        </Link>
                    </li>

                    <li>
                        <Link to="/register" onClick={closeMenu}>
                            Register
                        </Link>
                    </li>

                    <li>
                        <Link to="/search" onClick={closeMenu}>
                            Search Donors
                        </Link>
                    </li>

                    <li>
                        <Link to="/donors" onClick={closeMenu}>
                            Donors
                        </Link>
                    </li>

                    <li>
                        <Link to="/blood-requests" onClick={closeMenu}>
                            Blood Requests
                        </Link>
                    </li>

                    <li>
                        <Link
                            to="/blood-request"
                            className="emergency-link"
                            onClick={closeMenu}
                        >
                            Emergency Request
                        </Link>
                    </li>

                </ul>

            </div>

        </nav>
    );
}

export default Navbar;