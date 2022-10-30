import React from 'react'
import { Link } from 'react-router-dom'

function CardItemWellsh(props)  {
    
    return (
        <>
        <li className='cards__item__wellsh'>
        <Link className='cards__item__link__wellsh' to={props.path}>
            <figure className='cards__item__pic-wrap__wellsh' data-catagory-bella ={props.label}>
                <img 
                    src={props.src}
                    alt='Wellsh Image'
                    className='cards__item__img__wellsh'/>
                </figure>
                 <div className='cards__item__info__wellsh'>
                     <h5 className= 'cards__item__text__wellsh'>{props.text}</h5>
                 </div>
        </Link>
        </li>
        </>
    );
}

export default CardItemWellsh;

