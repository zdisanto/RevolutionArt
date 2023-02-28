import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet, NavLink, Link, useNavigate} from 'react-router-dom';
import icon from '../../assets/icon.png';
import {IoStorefront} from "react-icons/io5";
import {CiLogout} from "react-icons/ci";

import * as actionType from '../../constants/actionTypes';

const SellerManagement = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [seller, setSeller] = useState(JSON.parse(localStorage.getItem('seller_profile')));
  const gallery = seller.result.gallery_name;

  const myActive ="bg-green-200";

  function highlight({isActive}){
    return isActive? `list-group-item ${myActive}` : "list-group-item";
  }

  const s_logout = () => {
    dispatch({ type: actionType.S_LOGOUT });

    navigate('/');

    setSeller(null);
  };

  return (
    <div>
      <div className="flex">
        {/* side bar */}
        <div className="w-1/4 h-screen p-4">
          <Link to="/">
            <img src={icon} alt="icon" className='h-20 mx-auto pt-2'/>
          </Link>
          <ul>
            <li>
              <NavLink to="/sellerCenter/dashboard" className={highlight} >Dashboard</NavLink>
            </li>
            <li>
              <NavLink to="/sellerCenter/delete" className={highlight} >Delete Account</NavLink>
            </li>
          </ul>
          <div class="flex justify-center" onClick={s_logout}>
            <CiLogout class="absolute bottom-4 h-8 w-8 rounded-l hover:bg-gray-200" />
          </div>
        </div>
        {/* display area */}
        <div className="w-3/4 h-screen bg-white">
          <div className='flex bg-gray-200 w-full h-10'>
            <p className='flex justify-center items-center w-3/4 text-xl font-bold'>Seller Management Center<IoStorefront className='ml-3'/></p>
            <p className='flex justify-center items-center w-1/4'>Welcome,<span className='font-bold text-black ml-2'>{gallery}</span></p>
          </div>
          <div className='w-full h-full bg-gray-100'>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
    );
}

export default SellerManagement;

