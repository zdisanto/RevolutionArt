import React, { useState, useEffect, useRef} from 'react';
import {Error, ErrorOutline} from '@material-ui/icons';
import Alert from '@mui/material/Alert';
import {useForm} from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Link} from 'react-router-dom';

import { s_login } from '../../actions/seller_auth';

const S_Login = () => {
  const {register: register, handleSubmit: handleSubmit, formState:{errors:errors}} =useForm({mode: "onBlur"});

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const ref_login = useRef();

  const handleLogin = (data) => {
    //e.preventDefault();
    dispatch(s_login(data, navigate, ref_login));
  };
  return (
    <div className='h-full w-full'>
      <form className='px-48 pt-10' onSubmit={handleSubmit(handleLogin)}>
        <div className="space-y-4">
            {/* <!-- Email --> */}
            <div>
                    <label className="block text-sm font-medium mb-1" for="card-email">Email <span className="text-red-500">*</span></label>
                    <input 
                      name="email"  
                      className="text-sm text-gray-800 bg-white border rounded leading-5 py-2 px-3 border-gray-200 hover:border-gray-300 shadow-sm placeholder-gray-400 focus:ring-0 w-full" 
                      type="email" 
                      placeholder="xxx@company.com" 
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
                    <label className="block text-sm font-medium mb-1" for="card-name">Password <span className="text-red-500">*</span></label>
                    <input 
                      name="password" 
                      className="text-sm text-gray-800 bg-white border rounded leading-5 py-2 px-3 border-gray-200 hover:border-gray-300 shadow-sm placeholder-gray-400 focus:ring-0 w-full" 
                      type="password" 
                      placeholder="xxxxxxxxxx" 
                      {...register("password", {
                        required: true,
                        pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15}$/
                      })}
                    />
            </div>
            {errors.password && <p className='text-red-600 text-xs'>Password must contains capital letter, lowercase letter, digit and the length bettwen 6 and 15</p>}
            {/* <p className="mt-4 block text-sm text-center font-medium text-gray-400 hover:underline"> Forgot your password? </p> */}
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

export default S_Login
