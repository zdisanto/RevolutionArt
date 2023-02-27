import React, { useState, useRef} from 'react';
import {ErrorOutline} from '@material-ui/icons';
import Alert from '@mui/material/Alert';
import {useForm} from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { s_register } from '../../actions/seller_auth';

const initialState = { name: '', gallery_name: '', email: '', phone: '', password: '', confirmPassword: '' };

const S_Register = () => {
  const [formData, setFormData] = useState(initialState);
  const {register: register, handleSubmit: handleSubmit, formState:{errors:errors}, watch} =useForm({mode: "onBlur"});

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const ref_register = useRef();

  const handleChange = (e) => setFormData({...formData, [e.target.name]: e.target.value});

  const handleRegister = (data) => {
    //e.preventDefault();
    dispatch(s_register(data, navigate, ref_register));
  };

  return (
    <div className='h-full w-full'>
      <form className='px-48 pt-10' onSubmit={handleSubmit(handleRegister)}>
        <div className="space-y-4">
            {/* <!-- Name --> */}
            <div>
              <label class="block text-sm font-medium mb-1" for="card-email">Name <span class="text-red-500">*</span></label>
              <input 
                name="name"  
                class="text-sm text-gray-800 bg-white border rounded leading-5 py-2 px-3 border-gray-200 hover:border-gray-300 shadow-sm placeholder-gray-400 focus:ring-0 w-full" 
                type="name" 
                placeholder="Alex Yax" 
                onChange={handleChange}
                {...register("name",
                  {
                    required: true,
                    pattern: /^[A-Za-zÀ-ÖØ-öø-ſ']+([- ][A-Za-zÀ-ÖØ-öø-ſ']+)*$/

                  })}
              />
            </div>
            {errors.name && <p className='text-red-600 text-xs'>Please input valid name, such as Shanshan Li</p>}
            {/* <!-- Gallery Name --> */}
            <div>
              <label class="block text-sm font-medium mb-1" for="card-email">Gallery Name (Optional)</label>
              <input 
                name="gallery_name"  
                class="text-sm text-gray-800 bg-white border rounded leading-5 py-2 px-3 border-gray-200 hover:border-gray-300 shadow-sm placeholder-gray-400 focus:ring-0 w-full" 
                type="gallery_name" 
                placeholder="Momo Gallery" 
                onChange={handleChange}
                {...register("gallery_name",
                  {
                    required: false,
                    pattern: /^[A-Za-zÀ-ÖØ-öø-ſ']+([- ][A-Za-zÀ-ÖØ-öø-ſ']+)*$/

                  })}
              />
            </div>
            {errors.gallery_name && <p className='text-red-600 text-xs'>Please input valid gallery name, such as Momo Gallery</p>}
            {/* <!-- Email --> */}
            <div>
              <label class="block text-sm font-medium mb-1" for="card-email">Email <span class="text-red-500">*</span></label>
              <input 
                name="email"  
                class="text-sm text-gray-800 bg-white border rounded leading-5 py-2 px-3 border-gray-200 hover:border-gray-300 shadow-sm placeholder-gray-400 focus:ring-0 w-full" 
                type="email" 
                placeholder="xxx@company.com" 
                onChange={handleChange}
                {...register("email",
                  {
                    required: true,
                    pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                  })}
              />
            </div>
            {errors.email && <p className='text-red-600 text-xs'>Please input valid email address</p>}
            {/* <!-- Phone Number --> */}
            <div>
              <label class="block text-sm font-medium mb-1" for="card-email">Phone<span class="text-red-500">*</span></label>
              <input 
                name="phone"  
                class="text-sm text-gray-800 bg-white border rounded leading-5 py-2 px-3 border-gray-200 hover:border-gray-300 shadow-sm placeholder-gray-400 focus:ring-0 w-full" 
                type="phone" 
                placeholder="646-976-2345" 
                onChange={handleChange}
                {...register("phone",
                  {
                    required: true,
                    pattern: /^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/
                  })}
              />
            </div>
            {errors.phone && <p className='text-red-600 text-xs'>Please input valid 10-digit phone number such as 646-975-1268 or 6469751268</p>}
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
                    <Alert icon={<ErrorOutline fontSize="inherit"/>} className='invisible mt-4' ref={ref_register} severity="error"></Alert>
                </div>
        </div>
      </form>
    </div>
  )
}

export default S_Register
