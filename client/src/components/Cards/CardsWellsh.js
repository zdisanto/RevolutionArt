import React from 'react';
import CardItemWellsh from './CardItemWellsh';
import './CardsWellsh.css';

function CardsWellsh() {
    return (
        <div className='cards__wellsh'>
          <h1>Revolutionary Arts <span>This Month</span></h1> 
        <div className="cards__container__wellsh">
            <div className="cards__wrapper__wellsh">
                <ul className="cards__items__wellsh">
                    <CardItemWellsh
                    src='https://images.pexels.com/photos/1293125/pexels-photo-1293125.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
                    text='ASIA NOW'
                    /> 
                     <CardItemWellsh
                    src='https://images.pexels.com/photos/2425036/pexels-photo-2425036.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
                    text='1-64 LONDON'
                    />  
                    <CardItemWellsh
                    src='https://images.pexels.com/photos/1266808/pexels-photo-1266808.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
                    text='Art Tai'
                    /> 
                </ul>
                <ul className="cards__items__wellsh">
                     <CardItemWellsh
                    src='https://images.pexels.com/photos/2807495/pexels-photo-2807495.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
                    text='Renumeration'
                    /> 
                     <CardItemWellsh
                    src='https://images.pexels.com/photos/6424244/pexels-photo-6424244.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
                    text='Liberty'
                    /> 
                     <CardItemWellsh
                    src='https://cdn.pixabay.com/photo/2019/12/15/08/14/body-painting-4696539_1280.jpg'
                    text='Tenen'
                    /> 
                </ul>
            </div>
        </div>
        </div>
    );
}

export default CardsWellsh;

