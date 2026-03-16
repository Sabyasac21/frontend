import React from 'react';
import './Item.css';
import { Link } from 'react-router-dom';

const Items = (props) => {
  return (
    <div className='item'>
        <Link className='item-media' to={`/product/${props.id}`}>
          <img onClick={window.scrollTo(0, 0)} src={props.image} alt={props.name}/>
        </Link>
        <div className="item-body">
          <span className="item-label">Curated pick</span>
          <p>{props.name}</p>
          <div className='item-prices'>
              <div className="item-price-new">
                  ${props.new_price}
              </div>
              <div className="item-price-old">
                  ${props.old_price}
              </div>
          </div>
        </div>
    </div>
  )
}

export default Items
