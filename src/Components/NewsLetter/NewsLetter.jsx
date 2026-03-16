import React from 'react';
import './NewsLetter.css';

const NewsLetter = () => {
  return (
    <section className='newsletter section-shell'>
        <span className="section-kicker">Retention layer</span>
        <h1>Stay close to each release without chasing every drop.</h1>
        <p>Join the list for first-look launches, private discounts, and product edits worth opening.</p>
        <div className="newsletter-form">
            <input type='email' placeholder='Enter your email'/>
            <button>Subscribe</button>
        </div>
    </section>
  )
}

export default NewsLetter
