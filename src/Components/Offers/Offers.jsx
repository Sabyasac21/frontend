import React from 'react';
import './Offers.css';
import exclusive_image from '../Assests/exclusive_image.png'

const Offers = () => {
  return (
    <section className='offers section-shell'>
        <div className="offers-left">
            <span className="section-kicker">Limited access pricing</span>
            <h1>Exclusive offers built for high-intent shoppers.</h1>
            <p>
              A focused promotion block that puts your best-selling inventory in front of shoppers with clear urgency.
            </p>
            <button>Check best sellers</button>
        </div>
        <div className="offers-right">
            <img src={exclusive_image} alt=''/>
        </div>
    </section>
  )
}

export default Offers
