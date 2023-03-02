import React, { useEffect, useState } from "react";
import { Outlet, NavLink, Link, useParams } from 'react-router-dom';
import icon from '../../assets/icon.png';

const AccountSettings = () => {
  const [user, setUser] = useState();

  const myActive ="bg-green-200";

  function highlight({isActive}){
    return isActive? `list-group-item ${myActive}` : "list-group-item";
  }

  return (
    <div>
      <div className="flex">
        {/* side bar */}
        <div className="w-1/4 h-screen bg-gray-200 p-4">
          <Link to="/">
            <img src={icon} alt="icon" className='h-20 mx-auto pt-2'/>
          </Link>
          <ul>
            <li>
              <NavLink to="/accountsettings/profile" className={highlight} >Profile</NavLink>
            </li>
            <li>
              <NavLink to="/accountsettings/delete" className={highlight} >Delete Account</NavLink>
            </li>
          </ul>
        </div>
        {/* display area */}
        <div className="w-3/4 h-screen bg-white p-4">
          <Outlet />
        </div>
      </div>
    </div>
    );
}

export default AccountSettings;

