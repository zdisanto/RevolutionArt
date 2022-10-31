import React, { useState} from 'react';
import { Link } from 'react-router-dom';
import { CiCamera, CiMail, CiBellOn, CiWallet, CiSettings, CiCircleQuestion, CiHeart, CiDollar, CiLocationOn, CiSearch, CiShoppingCart, CiStar, CiUser, CiCircleChevDown } from "react-icons/ci";

import logo from '../../assets/icon.png';
import text from '../../assets/revolutionArtWebpage.png';
import profile from '../../assets/profile.jpg';

const Header = () => {
    const [searchValue, setSearchValue] = useState('');
    const handleSearch = () =>{}

    return (
        <div>
            <div className='flex flex-row max-h-28 min-h-28 px-6 justify-between bg-gray-100'>
                <Link to="/" className='flex gap-0 pl-10 items-center'>
                    <img src={logo} alt="icon" className='flex-auto h-16 pt-2'/>
                    <img src={text} alt="icon" className='flex-auto h-52'/>
                </Link>
                <div className='flex md:block pt-10 items-center'>
                    <form onSubmit={handleSearch}>
                        <input
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                            className='bg-primary pt-2.5 mr-2 md:text-md font-thin border border-gray-400 hover:border-black w-[100px] md:w-[400px] rounded-lg  md:top-0'
                            placeholder='Search Here'
                        />
                        <button onClick={handleSearch} className='md:right-5 right-6 top-5 border-gray-400 py-2 text-2xl text-gray-500 hover:text-black'><CiSearch /></button>
                    </form>
                </div>
                <div className="flex items-center cursor-pointer p-1">
                    {/* Shoppingcart */}
                    <div className='flex items-center pr-10 gap-5 text-2xl'>
                        <div className='group'>
                            <CiShoppingCart title='ShoppingCart'/>
                            <ul className='absolute py-1 invisible group-hover:visible transition duration-75 ease-in-out'>
                                <li className=" text-center absolute text-xl overflow-auto h-56 right-0 top-0 bg-white p-3 w-72">
                                    {/* divider */}
                                    <div className='px-3 py-3 text-sm text-center hover:bg-gray-100'>
                                        <p><b className='underline'>Log In</b> to view your shopping bag!</p>
                                    </div>
                                    {/* divider */}
                                </li>
                            </ul>
                        </div>
                    </div>
                    {/* Messages */}
                    <div className='flex first-letter:items-center pr-10 gap-5 text-2xl'>
                        <div className='group'>
                            <CiMail title='Messages'/>
                            <ul className='absolute py-1 invisible group-hover:visible transition duration-75 ease-in-out'>
                                <li className="absolute divide-y divide-gray-200 text-xl overflow-auto h-56 right-0 top-0 bg-white p-3 w-72">
                                    <div>
                                        <p className='font-bold text-sm text-center pb-2'>Messages</p>
                                    </div>
                                    {/* divider */}
                                    <div className='px-3 py-3 text-xs hover:bg-gray-100'>
                                        <p className="font-bold mb-1">Last Call!</p>
                                        <p>The "Art in Focus" will be host on Nov4 at Whitney in NYC! <em className='underline text-blue-700'>Click to know more!</em></p>
                                    </div>
                                    {/* divider */}
                                    <div className='px-3 py-3 text-xs hover:bg-gray-100'>
                                        <p className="font-bold mb-1">Order Confirmation!</p>
                                        <p>Dear Customer, Your Order NY122102 is just confirmed by its seller! <em className='underline text-blue-700'>View More!</em></p>
                                    </div>
                                    {/* divider */}
                                    <div className='px-3 py-3 text-xs hover:bg-gray-100'>
                                        <p className="font-bold mb-1">Someone Comments Your Works!</p>
                                        <p>Hey! Someone looks very interested in your works, reply to chat! <em className='underline text-blue-700'>More details!</em></p>
                                    </div>
                                    {/* divider */}
                                </li>
                            </ul>
                        </div>
                    </div>
                    {/* Profile */}
                    <div className='flex pr-10 gap-5'>
                        <div className='group'>
                            <CiUser title='PersonalCenter' className='text-2xl'/>
                            <ul className='absolute py-1 invisible group-hover:visible transition duration-75 ease-in-out'>
                            <li className="absolute divide-y divide-gray-200 text-xl overflow-auto h-56 right-0 top-0 bg-white p-3 w-72">
                                {/* settings */}
                                <div className="flex h-20 mt-2 pb-2">
                                    <img className="rounded-full h-16 w-16" src={profile} alt="user-profile"/>
                                    <div className='pl-5 pt-2'>
                                        <p className="font-bold text-sm">RevolutionArt</p>
                                        <p className="text-gray-600 text-sm font-thin">revolutionart@gmail.com</p>
                                    </div>
                                </div>
                                {/* divider */}
                                <div className='flex pl-6 py-2 hover:bg-gray-100'>
                                    <CiSettings src={profile} alt="user-profile"/>
                                    <p className="text-sm pl-10">Account Settings</p>
                                </div>
                                {/* divider */}
                                <div className='flex pl-6 py-2 hover:bg-gray-100'>
                                    <CiStar src={profile} alt="user-profile"/>
                                    <p className="text-sm pl-10">Favorites</p>
                                </div>
                                {/* divider */}
                                <div className='flex pl-6 py-2 hover:bg-gray-100'>
                                    <CiDollar src={profile} alt="user-profile"/>
                                    <p className="text-sm pl-10">Transactions</p>
                                </div>
                                {/* divider */}
                                <div className='flex pl-6 py-2 hover:bg-gray-100'>
                                    <CiWallet src={profile} alt="user-profile"/>
                                    <p className="text-sm pl-10">My Wallet</p>
                                </div>
                                {/* divider */}
                                <div className='flex pl-6 py-2 hover:bg-gray-100'>
                                    <CiLocationOn src={profile} alt="user-profile"/>
                                    <p className="text-sm pl-10">Address Management</p>
                                </div>
                                {/* divider */}
                                <div className='flex pl-6 py-2 hover:bg-gray-100'>
                                    <CiCircleQuestion src={profile} alt="user-profile"/>
                                    <p className="text-sm pl-10">Ask Help</p>
                                </div>
                                {/* divider */}
                            </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <nav className='flex bg-gray-800 text-white px-32 h-full'>
                <ul className='flex gap-12 items-stretch h-full py-2'>
                    <li className='group'> 
                        <a className='btn'>New Arrials</a>
                    </li>
                    <li className='group'> 
                        <a className='bnt font-thin'>Best Sellers</a>
                        <ul className='sub1'>
                            <li><a className='sub2'>{'>'} Best Selling Categories</a></li>
                            <li><a className='sub2'>{'>'} Art Movement</a></li>
                            <li><a className='sub2'>{'>'} Best Sellers By Price</a></li>
                        </ul>
                    </li>
                    <li className='group'> 
                        <a className='btn'>Trends</a>
                    </li>
                    <li className='group'> 
                        <a className='btn'>Gallery Walls</a>
                    </li>
                    <li className='group'> 
                        <a className='btn'>Artists</a>
                    </li>
                    <li className='group'> 
                        <a className='btn'>Photography</a>
                    </li>
                    <li className='group'> 
                        <a className='btn'>Subjects</a>
                    </li>
                    <li className='group'> 
                        <a className='btn'>Customization</a>
                    </li>
                </ul>
            </nav>
        </div>
  );
};

export default Header;