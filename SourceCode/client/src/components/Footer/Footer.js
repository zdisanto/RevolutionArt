import React from 'react'

import {CiFacebook, CiInstagram, CiLinkedin, CiTwitter, CiYoutube} from "react-icons/ci";

const Footer = () => {
  return (
    <div className='bg-gray-800'>
      <div className='py-5 text-white '>
          <div className='flex justify-center py-3 text-2xl'>
            <CiFacebook/>
            <CiInstagram/> 
            <CiLinkedin/>
            <CiTwitter/>
            <CiYoutube/>
          </div>
      </div>
      <div className='flex px-40'>
        <div className='container'>
        <div className='card group'>
          <div className='content group'>
            {/*<h2 className='content_sub1'>01</h2>*/}
            <h3 className='content_sub2'>Get to Know Us</h3>
            <p className='content_sub3'>Revolution Art is an online art gallery, It is a user-friendly website, giving the customer the chance to buy art safely and easily from home.</p>
            <a className='content_sub4' herf="#">Read More</a>
          </div>
        </div>
        </div>
        <div className='container group'>
        <div className='card'>
          <div className='content'>
            {/*<h2 className='content_sub1'>02</h2>*/}
            <h3 className='content_sub2'>Customer Service</h3>
            <p className='content_sub3'>Customers (galleries on the backend) are provided with an online customer service which answers their technical yes yes yes questions.</p>
            <a className='content_sub4' herf="#">Read More</a>
          </div>
        </div>
        </div>
        <div className='container group'>
        <div className='card'>
          <div className='content'>
            {/*<h2 className='content_sub1'>03</h2>*/}
            <h3 className='content_sub2'>Cooperate with Us</h3>
            <p className='content_sub3'>Delivery service which is provided by the Revolution Art with the third party and none of the customers  are involved in the shipping process. </p>
            <a className='content_sub4' herf="#">Read More</a>
          </div>
        </div>
        </div>
        <div className='container group'>
        <div className='card'>
          <div className='content'>
            {/*<h2 className='content_sub1'>04</h2>*/}
            <h3 className='content_sub2'>Work with Us</h3>
            <p className='content_sub3'>We welcome people who love art, technology and life to join our team. We, a diverse team, welcome everyone with a yes yes dream.</p>
            <a className='content_sub4' herf="#">Read More</a>
          </div>
        </div>
        </div>
      </div>
      <div className='text-center text-white py-5'>
        <button className='text-xs right-8 bottom-8'>© 2022 All rights reserved by RevolutionArt.com</button>
      </div>
    </div>
  )
}

export default Footer
