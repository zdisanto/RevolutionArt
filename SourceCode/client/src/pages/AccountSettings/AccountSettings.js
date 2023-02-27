import { useState } from 'react';
import { Outlet, NavLink, Link } from 'react-router-dom';
import icon from '../../assets/icon.png';

const AccountSettings = () => {
  const [selectedLink, setSelectedLink] = useState('profile');

  const handleLinkClick = (link) => {
    setSelectedLink(link);
  };

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
            <li onClick={() => handleLinkClick('profile')} >
              <NavLink to="/accountsettings/profile" className={highlight} >Profile</NavLink>
            </li>
            <li onClick={() => handleLinkClick('delete')} >
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

