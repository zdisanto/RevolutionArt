import React from 'react'

const Footer = () => {
  return (
    <div className='bg-gray-800'>
      <div className='py-10 text-center text-white font-bold text-sm'>
        RevolutionArt.com
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
            <p className='content_sub3'>Customers (galleries on the backend) are provided with an online customer service which answers their technical questions.</p>
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
            <p className='content_sub3'>We welcome people who love art, technology and life to join our team. We, a diverse team, welcome everyone with a dream.</p>
            <a className='content_sub4' herf="#">Read More</a>
          </div>
        </div>
        </div>
      </div>
      <div className='py-10 text-center text-white text-xs'>
      © 2022 All rights reserved by RevolutionArt.com
      </div>
    </div>
  )
}

export default Footer
