import React, { useState} from 'react';
import { Link } from 'react-router-dom';
import { CiCamera, CiSearch, CiShoppingCart, CiStar, CiUser } from "react-icons/ci";

import logo from '../../images/icon.png';
import text from '../../images/revolutionArtWebpage.png';

const Navbar = () => {
    const [searchValue, setSearchValue] = useState('');
    const handleSearch = () =>{

    }

    return (
        <div>
            <div className='flex flex-row max-h-40 min-h-40 justify-between bg-gray-100'>
                <Link to="/" className='flex gap-0 pl-10 items-center'>
                    <img src={logo} alt="icon" className='flex-auto h-16 pt-2'/>
                    <img src={text} alt="icon" className='flex-auto h-52'/>
                </Link>
                <div className='flex md:block pt-16 items-center'>
                    <form onSubmit={handleSearch}>
                        <input
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                            className='bg-primary p-2 mr-4 md:text-md font-medium border border-gray-100 focus:outline-none focus:border-2 focus:border-gray-300 w-[100px] md:w-[330px] rounded-lg  md:top-0'
                            placeholder='Search Here'
                        />
                        <button onClick={handleSearch} className='md:right-5 right-6 top-5 border-l-2 border-gray-300 px-4 py-1 text-2xl text-gray-500'><CiSearch /></button>
                    </form>
                </div>
                <div className='flex items-center pr-10 gap-10'>
                    <CiCamera/>
                    <CiStar/>
                    <CiShoppingCart/>
                    <CiUser/>
                </div>
            </div>
            <div className='flex items-center justify-between bg-gray-800 text-gray-500 px-40 h-full'>
                <ul className='flex gap-12 items-stretch h-full'>
                    <li> 
                        <a className='block h-full flex items-center px-4 hover:text-white'>New Arrials</a>
                    </li>
                    <li className='block h-full flex items-center px-4 hover:text-white opacity-0 hidden'> 
                        <a>Best Sellers</a>
                        <ul className='absolute visible opacity-100'>
                            <li><a className='py-2 px-4 text-white'>Best Selling Categories</a></li>
                            <li><a className='py-2 px-4 text-white'>Art Movement</a></li>
                            <li><a className='py-2 px-4 text-white'>Best Sellers By Price</a></li>
                        </ul>
                    </li>
                    <li> 
                        <a className='block h-full flex items-center px-4 hover:text-white'>Trends</a>
                    </li>
                    <li> 
                        <a className='block h-full flex items-center px-4 hover:text-white'>Gallery Walls</a>
                    </li>
                    <li> 
                        <a className='block h-full flex items-center px-4 hover:text-white'>Artists</a>
                    </li>
                    <li> 
                        <a className='block h-full flex items-center px-4 hover:text-white'>Photography</a>
                    </li>
                    <li> 
                        <a className='block h-full flex items-center px-4 hover:text-white'>Subjects</a>
                    </li>
                    <li> 
                        <a className='block h-full flex items-center px-4 hover:text-white'>Customization</a>
                    </li>
                </ul>
            </div>
        </div>
  );
};

export default Navbar;