//import { Button } from '@material-ui/core';
import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import './CarouselContainer.css'

function IndividualIntervalsExample() {
  return (
    <Carousel>
      {/* <div class="carousel-inner"> */}
      <Carousel.Item interval={3000}>
        <div class='item'>
        <img 
          className="d-block w-100"
          src="https://images.pexels.com/photos/7013725/pexels-photo-7013725.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt="First slide"
        />
        <Carousel.Caption>
        <div class="carousel-caption d-none d-md-block">
          <h1>Revolutionizing The Way World Views <span class="art-span">Art</span></h1> 
          <p>Find art works from the most popular artisits of this year.</p>
          <button class="btn btn-light btn-lg">Browse Works</button>
        </div>
        </Carousel.Caption>
        </div>
      </Carousel.Item>
      <Carousel.Item interval={3000}>
      <div class='item'>
        <img
          className="d-block w-100"
          src="https://images.pexels.com/photos/9176780/pexels-photo-9176780.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt="Second slide"
        />
        <Carousel.Caption>
        <div class="carousel-caption d-none d-md-block">
          <h1>Collect art from the world's <span className='art-span-orange'>leading artists</span></h1> 
          <p>Register for updates on available works, market new, and more</p>
          <button class="btn btn-light btn-lg">Sign Up</button>
        </div>
        </Carousel.Caption>
      </div>
      </Carousel.Item>
      <Carousel.Item interval={3000}>
      <div class='item'>
        <img
          className="d-block w-100"
          src="https://images.pexels.com/photos/3560997/pexels-photo-3560997.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt="Third slide"
        />
        <Carousel.Caption>
        <div class="carousel-caption d-none d-md-block">
          <h1><span className='art-span-blue'>Sell</span> Works from Your Collection</h1> 
          <p>Earn more when you sell from your collections</p>
          <button class="btn btn-light btn-lg">Learn More</button>
        </div>
        </Carousel.Caption>
      </div>
      </Carousel.Item>
      {/* </div> */}
    </Carousel>
  );
}

export default IndividualIntervalsExample;