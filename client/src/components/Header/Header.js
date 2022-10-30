import React, { useState} from 'react';
import { Link } from 'react-router-dom';
import { CiCamera, CiSearch, CiShoppingCart, CiStar, CiUser, CiCircleChevDown } from "react-icons/ci";

import logo from '../../assets/icon.png';
import text from '../../assets/revolutionArtWebpage.png';

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
                            className='bg-primary pt-2.5 mr-2 md:text-md font-medium border border-gray-400 focus:outline-none focus:border-1 focus:border-black hover:border-black w-[100px] md:w-[400px] rounded-lg  md:top-0'
                            placeholder='Search Here'
                        />
                        <button onClick={handleSearch} className='md:right-5 right-6 top-5 border-gray-400 py-2 text-2xl text-gray-500 hover:text-black'><CiSearch /></button>
                    </form>
                </div>
                <div className='block flex items-center pr-10 gap-5 text-2xl'>
                    <button title='AddNew'><CiCamera/></button>
                    <button title='ShoppingCart'><CiShoppingCart/></button>
                    <button title='ShoppingCart'><CiStar/></button>
                    <button title='PersonalCenter'><CiUser/></button>
                </div>
                <div className="flex items-center gap-2 cursor-pointer p-1 rounded-lg">
                    <p>
                        <span className="text-gray-400 text-10">Hi,</span>{' '}
                        <span className="text-gray-500 ml-1 text-10">Shanshan</span>
                    </p>
                    <CiCircleChevDown className="text-gray-500 text-14" />
                </div>
            </div>
            <nav className='flex items-center justify-between bg-gray-600 text-white px-40 h-full'>
                <ul className='flex gap-12 items-stretch h-full'>
                    <li className='group'> 
                        <a className='btn'>New Arrials</a>
                    </li>
                    <li className='group'> 
                        <a className='bnt'>Best Sellers</a>
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