import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import { AiOutlineClose } from 'react-icons/ai';

import Header from '../../components/Header/Header';
import CardsWellsh from '../../components/Cards/CardsWellsh';
import Footer from '../../components/Footer/Footer';
import Section from '../../components/Hero/Section';
import AllArtworks from '../../components/ArtworksDisplay/AllArtworks';

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className="relative dark:bg-main-dark-bg">
        <div>
          <Header onButtonClick={toggleModal} />
        </div>
        <div>
            <Section/>
            <CardsWellsh/>
            <AllArtworks/>
            <div className='flex items-center justify-center'>
              <Modal 
                isOpen={isModalOpen} 
                onRequestClose={toggleModal} 
                contentLabel="Example Modal" 
                className='bg-white absolute w-1/2 h-1/2 left-1/4 right-1/4 top-1/4 bottom-1/4 rounded-lg'
                appElement={document.getElementById('root')}
                overlayClassName="fixed inset-0 bg-gray-500 bg-opacity-75"
              >
                <div className="flex justify-end">
                  <button className="text-xl text-gray-500 hover:text-black" onClick={toggleModal}>
                    <AiOutlineClose />
                  </button>
                </div>
                <div className="h-1/6 text-xl text-center">
                  LOGIN/REGISTER
                </div>
                <div className='flex h-4/6'>
                  <Link to="/auth" className='flex items-center justify-center w-1/2 rounded-2xl mx-4 hover:bg-gray-200'>
                    <p className='text-3xl'>As A Buyer</p>
                  </Link>
                  <Link to="/sellerAuth" className='flex items-center justify-center w-1/2 rounded-2xl mx-4 hover:bg-gray-200'>
                    <p className='text-3xl'>As A Seller</p>
                  </Link>
                </div>
                {/* <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={toggleModal}>
                  Close
                </button> */}
              </Modal>
            </div>
        </div>
        <div>
            <Footer/>
        </div>
    </div>
  )
}

export default Home
