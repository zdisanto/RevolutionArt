import React, { useState, useEffect, useRef} from 'react';
import {Error, ErrorOutline, PhotoSizeSelectLargeRounded} from '@material-ui/icons';
import Alert from '@mui/material/Alert';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Link} from 'react-router-dom';

import { s_getInfo, s_updateInfo} from '../../actions/seller_auth';

const GeneralInfo = () => {
  const seller = JSON.parse(localStorage.getItem('seller_profile')).result;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const ref_retrieve = useRef();
  const ref_updateInfo = useRef();

  const [profile, setProfile] = useState({
    name: '',
    gallery_name: '',
    phone: '',
  });

  useEffect(()=>{
    async function fetchProfile(){
      try {
        const data = await dispatch(s_getInfo(seller._id, ref_retrieve));
        setProfile({
          name: data.name,
          gallery_name: data.gallery_name,
          phone: data.phone,
        });
      }catch(error){
        console.log(error);
      }
    }
    fetchProfile();
  }, [dispatch, seller._id, ref_retrieve]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(s_updateInfo(seller._id, profile, ref_updateInfo));
  };

  return (
    <div className='flex justify-center'>
      <div className='w-2/3'>
              <label className="block text-sm font-medium mb-1" for="card-email">Email:</label>
              <div className='w-full h-10 pl-4 bg-gray-200 rounded-md flex items-center'>{seller.email}</div>
              <form className='flex flex-col pt-2 my-6 rounded-lg' onSubmit={handleSubmit}>
                <label className='pt-3'>
                  Name:
                  <input
                    className='pl-4 h-10 mt-1 bg-gray-50 w-full rounded-md'
                    type="text"
                    value={profile.name}
                    placeholder='Revolution'
                    onChange={(e) => setProfile({...profile, name: e.target.value})}
                  />
                </label>
                <label className='pt-3'>
                  Gallery Name:
                  <input
                    className='pl-4 h-10 mt-1 bg-gray-50 w-full rounded-md'
                    type="text"
                    value={profile.gallery_name}
                    placeholder='Revolution Gallery'
                    onChange={(e) => setProfile({...profile, gallery_name: e.target.value})}
                  />
                </label>
                <label>
                  Phone:
                  <input
                    className='pl-4 h-10 mt-1 bg-gray-50 w-full rounded-md'
                    type="text"
                    value={profile.phone}
                    placeholder='XXX-XXX-XXXX'
                    onChange={(e) => setProfile({...profile, phone: e.target.value})}
                  />
                </label>
                <div className="pt-10">
                        <button type="submit" className="font-thin text-sm inline-flex items-center justify-center px-3 py-2 border border-transparent rounded leading-5 shadow-sm transition duration-150 ease-in-out w-full bg-green-200 hover:bg-green-600 text-white focus:outline-none focus-visible:ring-2">Confirm Update</button>
                        <Alert className='invisible mt-4' ref={ref_updateInfo} severity="success"></Alert>
                </div>
              </form>
      </div>
    </div>
  )
}

export default GeneralInfo;
