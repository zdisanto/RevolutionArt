import React from 'react';
// import '../App.css';
import './Section.css';

function Section() {
    return (
    <div className='section-container'>

        <video loop autoPlay muted>
        <source src={require('./video.mp4')} type="video/mp4" />
        </video>
        <div className='section-full-heading'>
        <h2 className='section-heading'>Revolutionizing The Way World Views <span className='art-span-section'>Art</span></h2>
         <h6 className='title-two'>Find art works from the most popular artisits of this year.</h6>
         <button className="bg-orange-500 hover:bg-gray-700 text-white  py-2 px-10 border border-white-700 rounded">
  Browse Mores
</button>
      </div>
    </div>
  );
}

export default Section;
