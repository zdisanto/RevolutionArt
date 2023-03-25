import React, { useState, useEffect, useRef} from 'react';
import {DataUsageOutlined, Error, ErrorOutline} from '@material-ui/icons';
import Alert from '@mui/material/Alert';
import {useForm} from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Link} from 'react-router-dom';
import Modal from 'react-modal';
import { AiOutlineClose } from 'react-icons/ai';

import { s_login, forgotPwd } from '../../actions/seller_auth';

const S_Login = () => {
  const {register: register, handleSubmit: handleSubmit, formState:{errors:errors}} =useForm({mode: "onBlur"});
  const {register: register1, handleSubmit: handleSubmit1, formState:{errors:errors1}} =useForm({mode: "onBlur"});

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const ref_login = useRef();
  const ref_verifyEmail = useRef();

  const handleLogin = (data) => {
    //e.preventDefault();
    dispatch(s_login(data, navigate, ref_login));
  };

  const handleResetPwd = (data) => {
    //e.preventDefault();
    dispatch(forgotPwd(data, ref_verifyEmail));
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
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
        <div onClick={toggleModal} className="mt-4 block text-sm text-center font-medium text-gray-400 hover:underline"> Forgot your password? </div>
        {/*Button*/}
        <div className="mt-6">
          <div className="mb-4">
              <button type="submit" className="font-thin text-sm inline-flex items-center justify-center px-3 py-2 border border-transparent rounded leading-5 shadow-sm transition duration-150 ease-in-out w-full bg-gray-700 hover:bg-gray-900 text-white focus:outline-none focus-visible:ring-2">SUBMIT</button>
              <Alert icon={<Error/>} className='invisible mt-2' severity="error"></Alert>
          </div>
        </div>
      </form>
      <div className='flex items-center justify-center'>
              <Modal 
                isOpen={isModalOpen} 
                onRequestClose={toggleModal} 
                contentLabel="Example Modal" 
                className='bg-white absolute w-1/2 h-1/2 left-1/4 right-1/4 top-1/4 bottom-1/4 rounded-lg'
                overlayClassName="fixed inset-0 bg-gray-500 bg-opacity-75"
              >
                <div className="flex justify-end">
                  <button className="text-xl text-gray-500 hover:text-black" onClick={toggleModal}>
                    <AiOutlineClose />
                  </button>
                </div>
                <div className="h-1/6 text-xl text-center">
                  Forget Password?
                </div>
                <form className='px-24 w-full bg-white' onSubmit={handleSubmit1(handleResetPwd)}>
                  <div className=''>
                    <div>
                        <label className="block text-sm font-medium mb-1" for="card-email">Email Address<span className="text-red-500">*</span></label>
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
                  </div>
                  {/*Button*/}
                  <div className="mt-6">
                    <div className="mb-4">
                        <button type="submit" className="font-thin text-sm inline-flex items-center justify-center px-3 py-2 border border-transparent rounded leading-5 shadow-sm transition duration-150 ease-in-out w-full bg-blue-400 hover:bg-blue-600 text-white focus:outline-none focus-visible:ring-2">SUBMIT</button>
                        <Alert icon={<Error/>} className='invisible mt-2' ref={ref_verifyEmail} severity="error"></Alert>
                    </div>
                  </div>
                </form>
                {/* <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={toggleModal}>
                  Close
                </button> */}
              </Modal>
      </div>
    </div>
  )
}

export default S_Login
