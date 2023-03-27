import React, { useState, useEffect, useRef} from 'react';
import {Error, ErrorOutline} from '@material-ui/icons';
import Alert from '@mui/material/Alert';
import {useForm} from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Link} from 'react-router-dom';
import { GoogleLogin} from 'react-google-login';
import { gapi } from 'gapi-script';
import share from '../../assets/share.mp4';
import icon from '../../assets/icon.png'

import { register, login } from '../../actions/auth';
import { AUTH } from '../../constants/actionTypes';

const clientId = '1075004676615-o2kfd7afjtffl4iq8p9t4jbff2t9k330.apps.googleusercontent.com';
const initialState = { email: '', password: '', confirmPassword: '', phone: '', username: ''};

const Auth = () => {
  const [formData, setFormData] = useState(initialState);
  const {register: register1, handleSubmit: handleSubmit1, formState:{errors:errors1}} =useForm({mode: "onBlur"});
  const {register: register2, handleSubmit: handleSubmit2, formState:{errors:errors2}, watch} =useForm({mode: "onBlur"});

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const ref_login = useRef();
  const ref_register = useRef();

  useEffect(() => {
    const initClient = () => {
          gapi.client.init({
          clientId: clientId,
          scope: ''
        });
     };
     gapi.load('client:auth2', initClient);
 });

  const handleChange = (e) => setFormData({...formData, [e.target.name]: e.target.value});
 
  const handleRegister = (data) => {
    //e.preventDefault();
    dispatch(register(data, ref_register));
  };
  const handleLogin = (data) => {
    //e.preventDefault();
    dispatch(login(data, navigate, ref_login));
  };
  const googleSuccess = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;
    try {
      dispatch({ type: AUTH, data: { result, token } });

      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };
  const googleError = (error) => alert('Google Sign In was unsuccessful. Try again later'+error);
  return (
    <div className="flex items-center flex-col h-screen">
      <div className="relative w-full h-full">
        {/* Video Card background */}
        <video src={share} type="video/mp4" loop controls={false} muted autoPlay className="w-full h-full object-cover"/>
        <div className="h-full w-full bg-blackOverlay"> 
            {/* Card body */}
            <div className="flex relative">
              <div className='bg-white mx-44 my-36 px-10 pb-20 pt-10 rounded-lg w-9/12 h-5/6'> 
                    <Link to="/">
                          <img src={icon} alt="icon" className='h-20 mx-auto pt-2'/>
                    </Link>
                    <div className='flex justify-center relative h-auto rounded divide-x divide-gray-200'>
                        {/* signin */}
                        <form className='px-20 w-3/6' onSubmit={handleSubmit1(handleLogin)}>
                            <div className="relative flex-1 py-5 text-xl text-center font-bold">SIGNIN</div>
                            <div className="space-y-4">
                                {/* <!-- Email --> */}
                                <div>
                                        <label className="block text-sm font-medium mb-1" for="card-email">Email <span className="text-red-500">*</span></label>
                                        <input 
                                          name="email"  
                                          className="text-sm text-gray-800 bg-white border rounded leading-5 py-2 px-3 border-gray-200 hover:border-gray-300 shadow-sm placeholder-gray-400 focus:ring-0 w-full" 
                                          type="email" 
                                          placeholder="xxx@company.com" 
                                          {...register1("email",
                                            {
                                              required: true,
                                              pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                                            })}
                                        />
                                </div>
                                {errors1.email && <p className='text-red-600 text-xs'>Please input valid email address</p>}
                                {/* <!-- Password --> */}
                                <div>
                                        <label className="block text-sm font-medium mb-1" for="card-name">Password <span className="text-red-500">*</span></label>
                                        <input 
                                          name="password" 
                                          className="text-sm text-gray-800 bg-white border rounded leading-5 py-2 px-3 border-gray-200 hover:border-gray-300 shadow-sm placeholder-gray-400 focus:ring-0 w-full" 
                                          type="password" 
                                          placeholder="xxxxxxxxxx" 
                                          {...register1("password", {
                                            required: true,
                                            pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15}$/
                                          })}
                                        />
                                </div>
                                {errors1.password && <p className='text-red-600 text-xs'>Password must contains capital letter, lowercase letter, digit and the length bettwen 6 and 15</p>}
                                {/* <Link to='/forgetPwd' className="mt-4 block text-sm text-center font-medium text-gray-400 hover:underline"> Forgot your password? </Link> */}
                            </div>
                            {/*Button*/}
                            <div className="mt-6">
                                    <div className="mb-4">
                                        <button type="submit" className="font-thin text-sm inline-flex items-center justify-center px-3 py-2 border border-transparent rounded leading-5 shadow-sm transition duration-150 ease-in-out w-full bg-gray-700 hover:bg-gray-900 text-white focus:outline-none focus-visible:ring-2">SUBMIT</button>
                                        <Alert icon={<Error/>} className='invisible mt-2' ref={ref_login} severity="error"></Alert>
                                    </div>
                            </div>
                            {/* google */}
                            <div>
                            <GoogleLogin 
                              clientId={clientId} 
                              buttonText="Sign in with Google" 
                              onSuccess={googleSuccess} 
                              onFailure={googleError} 
                              cookiePolicy={"single_host_origin"} 
                            />
                            </div>
                        </form>
                        {/* register */}
                        <form className='px-20 w-3/6' onSubmit={handleSubmit2(handleRegister)}>
                            <div className="relative flex-1 py-5 text-xl text-center font-bold">REGISTER</div>
                            <div className="space-y-4">
                                {/* <!-- Email --> */}
                                <div>
                                        <label class="block text-sm font-medium mb-1" for="card-email">Email <span class="text-red-500">*</span></label>
                                        <input 
                                          name="email"  
                                          class="text-sm text-gray-800 bg-white border rounded leading-5 py-2 px-3 border-gray-200 hover:border-gray-300 shadow-sm placeholder-gray-400 focus:ring-0 w-full" 
                                          type="email" 
                                          placeholder="xxx@company.com" 
                                          onChange={handleChange}
                                          {...register2("email",
                                            {
                                              required: true,
                                              pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                                            })}
                                        />
                                </div>
                                {errors2.email && <p className='text-red-600 text-xs'>Please input valid email address</p>}
                                {/* <!-- Password --> */}
                                <div>
                                        <label className="block text-sm font-medium mb-1" for="card-name">Password <span className="text-red-500">*</span></label>
                                        <input 
                                          name="password" 
                                          className="text-sm text-gray-800 bg-white border rounded leading-5 py-2 px-3 border-gray-200 hover:border-gray-300 shadow-sm placeholder-gray-400 focus:ring-0 w-full" 
                                          type="password" 
                                          placeholder="xxxxxxxxxx" 
                                          onChange={handleChange}
                                          {...register2("password",{
                                            required: true,
                                            pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15}$/
                                          })}
                                        />
                                </div>
                                {errors2.password && <p className='text-red-600 text-xs'>Password must contains capital letter, lowercase letter, digit and the length bettwen 6 and 15</p>}
                                {/* confirmPassword */}
                                <div>
                                  <label className="block text-sm font-medium mb-1" for="card-name">Confirm Password <span className="text-red-500">*</span></label>
                                  <input 
                                    name="confirmPassword" 
                                    className="text-sm text-gray-800 bg-white border rounded leading-5 py-2 px-3 border-gray-200 hover:border-gray-300 shadow-sm placeholder-gray-400 focus:ring-0 w-full" 
                                    type="password" 
                                    placeholder="xxxxxxxxxx"
                                    onChange={handleChange}
                                    {...register2("confirmPassword",{
                                      required: true,
                                      validate:(value)=>{
                                        if(watch('password')!=value) return "The password does not match"
                                      }
                                    })}
                                  />
                                </div>
                                {errors2.confirmPassword && <p className='text-red-600 text-xs'>{errors2.confirmPassword.message}</p>}
                                {/* phone */}
                                <div>
                                        <label class="block text-sm font-medium mb-1" for="card-email">Phone</label>
                                        <input 
                                          name="phone"  
                                          class="text-sm text-gray-800 bg-white border rounded leading-5 py-2 px-3 border-gray-200 hover:border-gray-300 shadow-sm placeholder-gray-400 focus:ring-0 w-full" 
                                          type="phone" 
                                          placeholder="xxx-xxx-xxxx" 
                                          onChange={handleChange}
                                          {...register2("phone",
                                            {
                                              required: false,
                                              pattern: /^\d{3}-\d{3}-\d{4}$/
                                            })}
                                        />
                                </div>
                                {errors2.phone && <p className='text-red-600 text-xs'>Please input valid 10-digit phone</p>}
                                {/* username */}
                                <div>
                                        <label class="block text-sm font-medium mb-1" for="card-email">Username</label>
                                        <input 
                                          name="username"  
                                          class="text-sm text-gray-800 bg-white border rounded leading-5 py-2 px-3 border-gray-200 hover:border-gray-300 shadow-sm placeholder-gray-400 focus:ring-0 w-full" 
                                          type="text" 
                                          placeholder="username" 
                                          onChange={handleChange}
                                          {...register2("username",
                                            {
                                              required: false,
                                              pattern: /^\w{1,10}$/

                                            })}
                                        />
                                </div>
                                {errors2.username && <p className='text-red-600 text-xs'>No more than 10 letter or digit</p>}
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
              </div>
            </div>
        </div>
      </div>
    </div>
  );
}

export default Auth

