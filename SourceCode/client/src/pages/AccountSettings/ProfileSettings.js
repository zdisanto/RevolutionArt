import React, { useState, useEffect, useRef} from 'react';
import {Error, ErrorOutline} from '@material-ui/icons';
import Alert from '@mui/material/Alert';
import {useForm} from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Link} from 'react-router-dom';

import { updateInfo } from '../../actions/auth';

const ProfileSettings = () => {
  const user = JSON.parse(localStorage.getItem('profile')).result;

  const [profile, setProfile] = useState({
    phone: '',
    username: '',
  });

  // useEffect(() => {
  //   const fetchUser = async () => {
  //     const response = await api.getUserInfo();
  //     setUser(response.data);
  //   }
  //   fetchUser();
  // }, []);
  
  
  
  return (
    <div className='flex justify-center'>
      <div className='w-2/3'>
              <label className="block text-sm font-medium mb-1" for="card-email">Email:</label>
              <div className='w-full h-10 pl-4 bg-gray-200 rounded-md flex items-center'>{user.email}</div>
              <form className='flex flex-col pt-2 my-6 rounded-lg'>
                <label>
                  Phone (Optional):
                  <input
                    className='pl-4 h-10 mt-1 bg-gray-50 w-full rounded-md'
                    placeholder='XXX-XXX-XXXX'
                  />
                </label>
                <label className='pt-3'>
                  Username (Optional):
                  <input
                    className='pl-4 h-10 mt-1 bg-gray-50 w-full rounded-md'
                    placeholder='XXXXXXX'
                  />
                </label>
                <div className="pt-10">
                        <button type="submit" className="font-thin text-sm inline-flex items-center justify-center px-3 py-2 border border-transparent rounded leading-5 shadow-sm transition duration-150 ease-in-out w-full bg-green-200 hover:bg-green-500 text-white focus:outline-none focus-visible:ring-2">SUBMIT</button>
                        <Alert icon={<ErrorOutline fontSize="inherit"/>} className='invisible mt-4' severity="error"></Alert>
                </div>
              </form>
      </div>
    </div>
  )
}

export default ProfileSettings;
