import { Link } from 'react-router-dom';
import React, { useState, useEffect } from "react";

function NavBar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const [dropdownOpen, setDropdownOpen] = useState(false); // State for dropdown menu

    const navStyle = {
        width: '100%',
        backgroundColor: 'black',
        padding: '5px',
        borderBottom: '1px solid #ddd',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 1000,  // Ensures it stays on top
    };

    const ulStyle = {
        listStyleType: 'none',
        margin: 0,
        padding: '0.5% 0',
        display: isMobile && !menuOpen ? 'none' : 'flex', // Hide on mobile if menu is not open
        justifyContent: 'flex-end', // Align to the left
        alignItems: 'center',
        flexWrap: "wrap",
    };

    const liStyle = {
        margin: '0 5px', // Reduce the space between items
        flexBasis: 'auto',
    };

    const footerStyle = {
        backgroundColor: 'black',
        color: 'yellow',
        textAlign: 'center',
        padding: '5px 0',
        position: 'fixed',
        bottom: 0,
        left: 0,
        width: '100%',
        borderTop: '1px solid yellow',
    };

    const hamburgerStyle = {
        display: isMobile ? "block" : "none", // Show hamburger icon only on mobile
        cursor: "pointer",
        marginLeft: 'auto', // Align to the right
    };

    const menuStyle = {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        top: "100%",
        left: 0,
        width: "100%",
        backgroundColor: "black",
        padding: "10px",
        zIndex: 1001,
    };

    const dropdownStyle = {
        position: 'relative',
        display: 'inline-block',
    };

    const dropdownMenuStyle = {
        display: dropdownOpen ? 'block' : 'none',
        position: 'absolute',
        backgroundColor: 'black',
        minWidth: '160px',
        zIndex: 1001,
        border: '1px solid yellow',
        borderRadius: '5px',
    };

    const handleMenuToggle = () => {
        setMenuOpen(!menuOpen);
    };

    const handleDropdownToggle = () => {
        setDropdownOpen(!dropdownOpen);
    };

    // Handle window resize to toggle mobile menu visibility
    useEffect(() => {
        const handleResize = () => {
            const mobile = window.innerWidth < 768;
            setIsMobile(mobile); // Set mobile state based on window width
            if (!mobile) {
                setMenuOpen(false); // Close menu when switching to desktop
            }
        };

        window.addEventListener("resize", handleResize);
        handleResize(); // Initial check

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <div>
            <nav style={navStyle}>
                <ul style={ulStyle}>
                    <li style={liStyle}><Link to="/"><h4 style={{ color: "yellow" }}>Home</h4></Link></li>
                    <li style={liStyle}>
                        
                    </li>
                    <li style={liStyle}><Link to="/bookings"><h4 style={{ color: "yellow" }}>Booking</h4></Link></li>
                    {/* <li style={liStyle}><Link to="/noPage"><h4 style={{ color: "yellow" }}>NoPage</h4></Link></li> */}
                    {/* <li style={liStyle}><Link to="/history"><h4 style={{ color: "yellow" }}>History</h4></Link></li> */}
                    <li style={liStyle}><Link to="/profile"><h4 style={{ color: "yellow" }}>Profile</h4></Link></li>
                    {/* <li style={liStyle}><Link to="/payment"><h4 style={{ color: "yellow" }}>Payment</h4></Link></li> */}
                    <li style={liStyle}><Link to="/adminProfile"><h4 style={{ color: "yellow" }}>AdminProfile</h4></Link></li>
                </ul>
                <div style={hamburgerStyle} onClick={handleMenuToggle}>
                    <span style={{ display: "block", width: "25px", height: "3px", background: "yellow", margin: "4px" }}></span>
                    <span style={{ display: "block", width: "25px", height: "3px", background: "yellow", margin: "4px" }}></span>
                    <span style={{ display: "block", width: "25px", height: "3px", background: "yellow", margin: "4px" }}></span>
                </div>
                {menuOpen && isMobile && (
                    <div style={menuStyle}>
                        <ul>
                            <li style={liStyle}><Link to="/"><h4 style={{ color: "yellow" }}>Home</h4></Link></li>
                            <li style={liStyle}><Link to="/signin"><h4 style={{ color: "yellow" }}>SignIn</h4></Link></li>
                            <li style={liStyle}><Link to="/signup"><h4 style={{ color: "yellow" }}>SignUp</h4></Link></li>
                            <li style={liStyle}><Link to="/bookings"><h4 style={{ color: "yellow" }}>Booking</h4></Link></li>
                            {/* <li style={liStyle}><Link to="/noPage"><h4 style={{ color: "yellow" }}>NoPage</h4></Link></li> */}
                            {/* <li style={liStyle}><Link to="/history"><h4 style={{ color: "yellow" }}>History</h4></Link></li> */}
                            {/* <li style={liStyle}><Link to="/profile"><h4 style={{ color: "yellow" }}>Profile</h4></Link></li> */}
                            <li style={liStyle}><Link to="/payment"><h4 style={{ color: "yellow" }}>Payment</h4></Link></li>
                            <li style={liStyle}><Link to="/adminProfile"><h4 style={{ color: "yellow" }}>AdminProfile</h4></Link></li>
                        </ul>
                    </div>
                )}
            </nav>
            <footer style={footerStyle}>
                <p>© 2024 The Hotel App. All rights reserved.</p>
            </footer>
        </div>
    );
}

export default NavBar;
