
import React from 'react';
import './card.css'; 
import { getAds } from '../../config/firebase';

function Card(props) {
  const { description, price,title, imageUrl, onClick } = props;

  return (
    <div className="card" onClick={onClick}>
      <img className='imgc' src={imageUrl} alt="Ad Image" />
      <div>
        <h5 className='text'>
          <br />
          Title: {title}<br/>
        Description:  {description}<br />
          <br /> Price: {price}
          <br/>
        </h5>
      </div>
    </div>
  );
}

export default Card;
