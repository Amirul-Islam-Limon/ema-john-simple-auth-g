import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
import logo from '../../images/logo.png'
import './Header.css'

const Header = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext)
    return (
        <div className="header">
            <img src={logo} alt="" />
            <nav>
                <Link to="/shop"><a href="">Shop</a></Link>
                <Link to="/review"><a href="">Order Review</a></Link>
                <Link to="/inventory"><a href="">Manage Inventory</a></Link>
                <button onClick={()=> setLoggedInUser({})}>Sign out</button>
            </nav>
        </div>
    );
};

export default Header;