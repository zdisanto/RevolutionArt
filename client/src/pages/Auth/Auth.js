import React from 'react';
import { Link, Outlet} from 'react-router-dom';
import GoogleLogin from 'react-google-login';
import share from '../../assets/share.mp4';
import { FcGoogle } from 'react-icons/fc';
import icon from '../../assets/icon.png'

const Auth = () => {
  //const navigate = useNavigate();
  const responseGoogle = () => {};

  return (
    <div className="flex items-center flex-col h-screen">
      <div className="relative w-full h-full">
        {/* Video Card background */}
        <video src={share} type="video/mp4" loop controls={false} muted autoPlay className="w-full h-full object-cover"/>
        <div className="h-full w-full bg-blackOverlay">
          {/* Pay component */} 
            {/* Card body */}
            <div className="flex relative px-auto pt-auto sm:px-6 my-auto mx-auto lg:px-8 h-full w-5/6">
              <div className='bg-white px-8 py-8 my-auto rounded-lg'> 
                    <Link to="/">
                          <img src={icon} alt="icon" className='h-20 mx-auto pt-2'/>
                    </Link>
                    <div className='flex justify-center relative h-auto rounded divide-x divide-gray-200'>
                        {/* signin */}
                        <div className='px-20 w-3/6'>
                            <div className="relative flex-1 py-5 text-xl text-center font-bold">SIGNIN</div>
                            {/* Sign In form */}
                            <div className="space-y-4">
                                {/* <!-- Email --> */}
                                <div>
                                        <label class="block text-sm font-medium mb-1" for="card-email">Email <span class="text-red-500">*</span></label>
                                        <input id="card-email" class="text-sm text-gray-800 bg-white border rounded leading-5 py-2 px-3 border-gray-200 hover:border-gray-300 shadow-sm placeholder-gray-400 focus:ring-0 w-full" type="email" placeholder="xxx@company.com" />
                                </div>
                                {/* <!-- Password --> */}
                                <div>
                                        <label class="block text-sm font-medium mb-1" for="card-name">Password <span class="text-red-500">*</span></label>
                                        <input id="card-name" class="text-sm text-gray-800 bg-white border rounded leading-5 py-2 px-3 border-gray-200 hover:border-gray-300 shadow-sm placeholder-gray-400 focus:ring-0 w-full" type="text" placeholder="xxxxxxxxxx" />
                                </div>
                                <a href="#" class="mt-4 block text-sm text-center font-medium text-gray-400 hover:underline"> Forgot your password? </a>
                            </div>
                            {/*Button*/}
                            <div class="mt-6">
                                    <div class="mb-4">
                                        <button class="font-thin text-sm inline-flex items-center justify-center px-3 py-2 border border-transparent rounded leading-5 shadow-sm transition duration-150 ease-in-out w-full bg-gray-700 hover:bg-gray-900 text-white focus:outline-none focus-visible:ring-2">SUBMIT</button>
                                    </div>
                            </div>
                            {/* google */}
                            <div>
                                      <a className='font-thin text-center mx-32 text-gray-400 text-sm'>- Or Join With -</a>
                                      <GoogleLogin
                                        clientId={`${process.env.REACT_APP_GOOGLE_API_TOKEN}`}
                                        render={(renderProps) => (
                                          <button
                                            type="button"
                                            onClick={renderProps.onClick}
                                            className="rounded-lg cursor-pointer outline-none"
                                            disabled={renderProps.disabled}
                                          >
                                              <FcGoogle className="text-5xl mx-40 my-3 rounded-full  hover:bg-gray-200" />
                                          </button>
                                        )}
                                        onSuccess={responseGoogle}
                                        onFailure={responseGoogle}
                                        cookiePolicy="single_host_origin"
                                      />
                            </div>
                        </div>
                        {/* register */}
                        <div className='px-20 w-3/6'>
                            <div className="relative flex-1 py-5 text-xl text-center font-bold">REGISTER</div>
                            {/* Sign In form */}
                            <div className="space-y-4">
                                {/* <!-- Email --> */}
                                <div>
                                        <label class="block text-sm font-medium mb-1" for="card-email">Email <span class="text-red-500">*</span></label>
                                        <input id="card-email" class="text-sm text-gray-800 bg-white border rounded leading-5 py-2 px-3 border-gray-200 hover:border-gray-300 shadow-sm placeholder-gray-400 focus:ring-0 w-full" type="email" placeholder="xxx@company.com" />
                                </div>
                                {/* <!-- Password --> */}
                                <div>
                                        <label class="block text-sm font-medium mb-1" for="card-name">Password <span class="text-red-500">*</span></label>
                                        <input id="card-name" class="text-sm text-gray-800 bg-white border rounded leading-5 py-2 px-3 border-gray-200 hover:border-gray-300 shadow-sm placeholder-gray-400 focus:ring-0 w-full" type="text" placeholder="xxxxxxxxxx" />
                                </div>
                                <div>
                                        <label class="block text-sm font-medium mb-1" for="card-name">Confirm Password <span class="text-red-500">*</span></label>
                                        <input id="card-name" class="text-sm text-gray-800 bg-white border rounded leading-5 py-2 px-3 border-gray-200 hover:border-gray-300 shadow-sm placeholder-gray-400 focus:ring-0 w-full" type="text" placeholder="xxxxxxxxxx" />
                                </div>
                            </div>
                            {/*Button*/}
                            <div class="mt-6">
                                    <div class="mb-4">
                                        <button class="font-thin text-sm inline-flex items-center justify-center px-3 py-2 border border-transparent rounded leading-5 shadow-sm transition duration-150 ease-in-out w-full bg-gray-700 hover:bg-gray-900 text-white focus:outline-none focus-visible:ring-2">SUBMIT</button>
                                    </div>
                            </div>
                        </div>
                    </div>
              </div>
            </div>
        </div>
      </div>
    </div>
  );
}

export default Auth

