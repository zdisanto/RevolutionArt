import React, { useState, useEffect, useRef} from 'react';
import {Error, ErrorOutline} from '@material-ui/icons';
import Alert from '@mui/material/Alert';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Link} from 'react-router-dom';

import { getInfo, updateInfo} from '../../actions/auth';

const ProfileSettings = () => {
  const user = JSON.parse(localStorage.getItem('profile')).result;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const ref_retrieve = useRef();
  const ref_updateInfo = useRef();

  const [profile, setProfile] = useState({
    phone: '',
    username: '',
  });

  useEffect(()=>{
    async function fetchProfile(){
      try {
        const data = await dispatch(getInfo(user._id, ref_retrieve));
        setProfile({
          phone: data.phone,
          username: data.username,
        });
      }catch(error){
        console.log(error);
      }
    }
    fetchProfile();
  }, [dispatch, user._id, ref_retrieve]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateInfo(user._id, profile, ref_updateInfo));
  };

  return (
    <div className='flex justify-center'>
      <div className='w-2/3'>
              <label className="block text-sm font-medium mb-1" for="card-email">Email:</label>
              <div className='w-full h-10 pl-4 bg-gray-200 rounded-md flex items-center'>{user.email}</div>
              <form className='flex flex-col pt-2 my-6 rounded-lg' onSubmit={handleSubmit}>
                <label>
                  Phone (Optional):
                  <input
                    className='pl-4 h-10 mt-1 bg-gray-50 w-full rounded-md'
                    type="text"
                    value={profile.phone}
                    placeholder='XXX-XXX-XXXX'
                    onChange={(e) => setProfile({...profile, phone: e.target.value})}
                  />
                </label>
                <label className='pt-3'>
                  Username (Optional):
                  <input
                    className='pl-4 h-10 mt-1 bg-gray-50 w-full rounded-md'
                    type="text"
                    value={profile.username}
                    placeholder='XXXXXXX'
                    onChange={(e) => setProfile({...profile, username: e.target.value})}
                  />
                </label>
                <div className="pt-10">
                        <button type="submit" className="font-thin text-sm inline-flex items-center justify-center px-3 py-2 border border-transparent rounded leading-5 shadow-sm transition duration-150 ease-in-out w-full bg-green-200 hover:bg-green-600 text-white focus:outline-none focus-visible:ring-2">SUBMIT</button>
                        <Alert className='invisible mt-4' ref={ref_updateInfo} severity="success"></Alert>
                </div>
              </form>
      </div>
    </div>
  )
}

export default ProfileSettings;
