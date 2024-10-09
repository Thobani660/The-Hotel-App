import { Link } from 'react-router-dom';

function NavBar() {
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
        padding: '0.5%',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
    };

    const liStyle = {
        margin: '0 15px',
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

    return (
        <div>
            <nav style={navStyle}>
                <ul style={ulStyle}>
                    <li style={liStyle}><Link to="/"><h4 style={{color:"yellow"}}>Home</h4></Link></li>
                    <li style={liStyle}><Link to="/signin"><h4 style={{color:"yellow"}}>SignIn</h4></Link></li>
                    <li style={liStyle}><Link to="/signup"><h4 style={{color:"yellow"}}>SignUp</h4></Link></li>
                    <li style={liStyle}><Link to="/Booking"><h4 style={{color:"yellow"}}>Booking</h4></Link></li>
                    <li style={liStyle}><Link to="/noPage"><h4 style={{color:"yellow"}}>NoPage</h4></Link></li>
                    <li style={liStyle}><Link to="/history"><h4 style={{color:"yellow"}}>history</h4></Link></li>
                    <li style={liStyle}><Link to="/profile"><h4 style={{color:"yellow"}}>Profile</h4></Link></li>
                    <li style={liStyle}><Link to="/payment"><h4 style={{color:"yellow"}}>Payment</h4></Link></li>
                </ul>
            </nav>
            <footer style={footerStyle}>
                <p>© 2024 Shopping List App. All rights reserved.</p>
            </footer>
        </div>
    );
}

export default NavBar;
