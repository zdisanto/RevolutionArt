import React, { useState, useEffect, useRef} from 'react';
import {Error, ErrorOutline} from '@material-ui/icons';
import Alert from '@mui/material/Alert';
import {useForm} from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Link} from 'react-router-dom';

import { updateInfo } from '../../actions/auth';

//const initialState = { id: '', email: '', password: ''};

const ProfileSettings = () => {
  const user = JSON.parse(localStorage.getItem('profile'));
  const [formData, setFormData] = useState({email: user.result.email, password: user.result.password});
  //console.log(formData.result.email);
  const {register: register, handleSubmit: handleSubmit, formState:{errors:errors}, watch} =useForm({mode: "onBlur"});

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const ref_login = useRef();

  const handleChange = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value
    }));
    //setFormData({...formData, [e.target.name]: e.target.value});
  } 

  const handleUpdate = (data) => {
    //e.preventDefault();
    dispatch(updateInfo(data, navigate, ref_login));
  };
  return (
    <div className='h-full w-full'>
      <form className='px-48' onSubmit={handleSubmit(handleUpdate)}>
        <div className='bg-gray-200 h-12 text-center pt-10 pb-16 rounded-xl'>Edit General Information</div>
        <div className="space-y-4 pt-8">
            {/* <!-- Email --> */}
            <div>
                    <label className="block text-sm font-medium mb-1" for="card-email">Edit Email <span className="text-red-500">*</span></label>
                    <input 
                      name="email"  
                      className="text-sm text-gray-800 bg-white border rounded leading-5 py-2 px-3 border-gray-200 hover:border-gray-300 shadow-sm placeholder-gray-400 focus:ring-0 w-full" 
                      type="email" 
                      placeholder="xxx@company.com" 
                      value={formData.email}
                      onChange={handleChange}
                      {...register("email",
                        {
                          required: true,
                          pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                        })}
                    />
            </div>
            {errors.email && <p className='text-red-600 text-xs'>Please input valid email address</p>}
            {/* <!-- Password --> */}
            <div>
                    <label className="block text-sm font-medium mb-1" for="card-name">Update Password <span className="text-red-500">*</span></label>
                    <input 
                      name="password" 
                      className="text-sm text-gray-800 bg-white border rounded leading-5 py-2 px-3 border-gray-200 hover:border-gray-300 shadow-sm placeholder-gray-400 focus:ring-0 w-full" 
                      type="password" 
                      placeholder="xxxxxxxxxx" 
                      value={formData.password}
                      onChange={handleChange}
                      {...register("password", {
                        required: true,
                        pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15}$/
                      })}
                    />
            </div>
            {errors.password && <p className='text-red-600 text-xs'>Password must contains capital letter, lowercase letter, digit and the length bettwen 6 and 15</p>}
            {/* <p className="mt-4 block text-sm text-center font-medium text-gray-400 hover:underline"> Forgot your password? </p> */}
            {/* confirmPassword */}
            <div>
              <label className="block text-sm font-medium mb-1" for="card-name">Confirm Updated Password <span className="text-red-500">*</span></label>
              <input 
                name="confirmPassword" 
                className="text-sm text-gray-800 bg-white border rounded leading-5 py-2 px-3 border-gray-200 hover:border-gray-300 shadow-sm placeholder-gray-400 focus:ring-0 w-full" 
                type="password" 
                placeholder="xxxxxxxxxx"
                value={formData.password}
                onChange={handleChange}
                {...register("confirmPassword",{
                  required: true,
                  validate:(value)=>{
                    if(watch('password')!=value) return "The password does not match"
                  }
                })}
              />
            </div>
            {errors.confirmPassword && <p className='text-red-600 text-xs'>{errors.confirmPassword.message}</p>}
        </div>
        {/*Button*/}
        <div className="mt-6">
          <div className="mb-4">
              <button type="submit" className="font-thin text-sm inline-flex items-center justify-center px-3 py-2 border border-transparent rounded leading-5 shadow-sm transition duration-150 ease-in-out w-full bg-gray-700 hover:bg-gray-900 text-white focus:outline-none focus-visible:ring-2">SUBMIT</button>
              <Alert icon={<Error/>} className='invisible mt-2' severity="error"></Alert>
          </div>
        </div>
      </form>
    </div>
  )
}

export default ProfileSettings;
