import React, { useState, useEffect, useRef} from 'react';
import {Error, ErrorOutline} from '@material-ui/icons';
import Alert from '@mui/material/Alert';
import {useForm} from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { resetPwd } from '../actions/auth';

const user = JSON.parse(localStorage.getItem('profile'));
const activate= user?.result? true:false;

const initialState = { email: '', password: '', confirmPassword: '' };
const ForgetPassword = () => {
    const [formData, setFormData] = useState(initialState);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const ref_resetPwd = useRef();

    const {register: register, handleSubmit: handleSubmit, formState:{errors:errors}, watch} =useForm({mode: "onBlur"});

    const handleChange = (e) => setFormData({...formData, [e.target.name]: e.target.value});

    const handleResetPwd= (data) => {
        //e.preventDefault();
        dispatch(resetPwd(data, navigate, ref_resetPwd));
      };
  return (
    <div className='flex justify-center'>
        <form className='w-1/3' onSubmit={handleSubmit(handleResetPwd)}>
            <div className="relative flex-1 py-5 text-xl text-center font-bold">Set New Password</div>
            <div className="space-y-4">
                {/* <!-- Email --> */}
                <div>
                        <label class="block text-sm font-medium mb-1" for="card-email">Email <span class="text-red-500">*</span></label>
                        <input 
                            name="email"  
                            class="text-sm text-gray-800 bg-white border rounded leading-5 py-2 px-3 border-gray-200 hover:border-gray-300 shadow-sm placeholder-gray-400 focus:ring-0 w-full" 
                            type="email" 
                            placeholder="xxx@company.com" 
                            value={activate ? user.result.email : null}
                            onChange={activate ? null : handleChange}
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
                            onChange={handleChange}
                            {...register("password",{
                            required: true,
                            pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15}$/
                            })}
                        />
                </div>
                {errors.password && <p className='text-red-600 text-xs'>Password must contains capital letter, lowercase letter, digit and the length bettwen 6 and 15</p>}
                {/* confirmPassword */}
                <div>
                    <label className="block text-sm font-medium mb-1" for="card-name">Confirm Password <span className="text-red-500">*</span></label>
                    <input 
                    name="confirmPassword" 
                    className="text-sm text-gray-800 bg-white border rounded leading-5 py-2 px-3 border-gray-200 hover:border-gray-300 shadow-sm placeholder-gray-400 focus:ring-0 w-full" 
                    type="password" 
                    placeholder="xxxxxxxxxx"
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
                        <Alert icon={<ErrorOutline fontSize="inherit"/>} className='invisible mt-4' ref={ref_resetPwd} severity="error"></Alert>
                    </div>
            </div>
        </form>
    </div>
  )
}

export default ForgetPassword
