import { UnfoldLessOutlined } from '@material-ui/icons';
import React, { useState, useEffect, useRef} from 'react';
import { useNavigate, Link, NavLink, Outlet } from 'react-router-dom';

import logo from '../../assets/icon.png';
import text from '../../assets/revolutionArtWebpage.png';

const SellerCenter = () => {
    const [selectedLink, setSelectedLink] = useState('profile');

    const handleLinkClick = (link) => {
        setSelectedLink(link);
    };
    const myActive ="flex bg-black text-white";

    function highlight({isActive}){
      return isActive? `list-group-item ${myActive}` : "list-group-item";
    }
   return (
        <div className='flex'>
            <div className='flex flex-col items-center justify-center w-2/6 h-screen bg-gray-200 p-6'>
                <Link to="/" className='flex flex-col h-2/5 items-center justify-center'>
                    <img src={logo} alt="icon" className='w-20 object-contain'/>
                    <img src={text} alt="icon" className='w-24 object-contain'/>
                </Link>
                <p className='h-3/5 text-3xl font-bold'>Welcome to Seller Center</p>
            </div>
            <div className='flex flex-col w-4/6 h-screen'>
                <nav className='flex h-16 justify-center items-center'>
                    <span className='flex w-1/2 h-full justify-center items-center text-black font-bold cursor-pointer' >
                        <NavLink to="/sellerAuth/login" className={highlight} onClick={() => handleLinkClick('login')}>LOGIN</NavLink>
                    </span>
                    <span className='flex w-1/2 h-full justify-center items-center text-black font-bold cursor-pointer' >
                        <NavLink to="/sellerAuth/register" className={highlight} onClick={() => handleLinkClick('register')}>REGISTER</NavLink>
                    </span>
                </nav>
                <div className='flex-grow'>
                    <Outlet/>
                </div>
            </div>
        </div>
    )
};


export default SellerCenter;
