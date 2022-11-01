import React from 'react'

import Header from '../../components/Header/Header';
import CardsWellsh from '../../components/Cards/CardsWellsh';
import Footer from '../../components/Footer/Footer';
import Section from '../../components/Hero/Section';

const Home = () => {
  return (
    <div className="relative dark:bg-main-dark-bg">
        <div>
          <Header/>
        </div>
        <div>
            <Section/>
            <CardsWellsh/>
        </div>
        <div>
            <Footer/>
        </div>
    </div>
  )
}

export default Home
