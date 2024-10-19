import { Link } from 'react-router-dom';
import React, { useState, useEffect } from "react";

function NavBar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const [dropdownOpen, setDropdownOpen] = useState(false); // State for dropdown menu

    const navStyle = {
        width: '100%',
        backgroundColor: 'black',
        padding: ' 15px',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 1000,
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.3)',
    };

    const ulStyle = {
        listStyleType: 'none',
        marginTop: -40,
        padding: 0,
        display: isMobile && !menuOpen ? 'none' : 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        flexWrap: "wrap",
    };

    const liStyle = {
        margin: '0 15px',
        position: 'relative', // To position dropdowns
    };

    const footerStyle = {
        backgroundColor: 'black',
        color: 'yellow',
        textAlign: 'center',
        padding: '10px 0',
        position: 'fixed',
        bottom: 0,
        left: 0,
        width: '100%',
        borderTop: '1px solid yellow',
    };

    const hamburgerStyle = {
        display: isMobile ? "block" : "none",
        cursor: "pointer",
        marginLeft: 'auto',
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

    const handleMenuToggle = () => {
        setMenuOpen(!menuOpen);
    };

    // Handle window resize to toggle mobile menu visibility
    useEffect(() => {
        const handleResize = () => {
            const mobile = window.innerWidth < 768;
            setIsMobile(mobile);
            if (!mobile) {
                setMenuOpen(false);
            }
        };

        window.addEventListener("resize", handleResize);
        handleResize();

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <div>
            <nav style={navStyle}>
                <div style={{ backgroundImage: `url(${require("../res/Preview2.png")})`,width:"50px",height:"50px",borderRadius:"100%",marginTop:"0px",marginLeft:"50px"}}></div>
                <ul style={ulStyle}>

                    <li style={liStyle}>
                        <Link to="/" style={linkStyle}>Home</Link>
                    </li>
                    <li style={liStyle}>
                        <Link to="/accomodation" style={linkStyle}>Accommodation</Link>
                    </li>
                    <li style={liStyle}>
                        <Link to="/profile" style={linkStyle}>Profile</Link>
                    </li>
                    <li style={liStyle}>
                        <Link to="/adminProfile" style={linkStyle}>AdminProfile</Link>
                    </li>
                </ul>
                <div style={hamburgerStyle} onClick={handleMenuToggle}>
                    <span style={hamburgerSpanStyle}></span>
                    <span style={hamburgerSpanStyle}></span>
                    <span style={hamburgerSpanStyle}></span>
                </div>
                {menuOpen && isMobile && (
                    <div style={menuStyle}>
                        <ul style={{ listStyleType: 'none', padding: 0 }}>
                            <li style={liStyle}><Link to="/" style={linkStyle}>Home</Link></li>
                            <li style={liStyle}><Link to="/signin" style={linkStyle}>SignIn</Link></li>
                            <li style={liStyle}><Link to="/signup" style={linkStyle}>SignUp</Link></li>
                            <li style={liStyle}><Link to="/payment" style={linkStyle}>Payment</Link></li>
                        </ul>
                    </div>
                )}
            </nav>
            <footer style={footerStyle}>
                <p>© 2024 The Hotel App. All rights reserved.</p>
                <div style={{ marginTop: "10px", display: "flex", justifyContent: "center", gap: "15px" }}>
                    <a href="/privacy" style={footerLinkStyle}>Privacy Policy</a>
                    <a href="/terms" style={footerLinkStyle}>Terms of Service</a>
                    <a href="/contact" style={footerLinkStyle}>Contact Us</a>
                </div>
            </footer>
        </div>
    );
}

const linkStyle = {
    color: "yellow",
    textDecoration: "none",
    fontSize: "18px",
    transition: "color 0.3s",
};

const footerLinkStyle = {
    color: "yellow",
    textDecoration: "none",
    fontSize: "14px",
    transition: "color 0.3s",
};

const hamburgerSpanStyle = {
    display: "block",
    width: "25px",
    height: "3px",
    background: "yellow",
    margin: "4px",
};

export default NavBar;
