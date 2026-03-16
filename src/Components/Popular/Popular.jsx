import React, { useEffect, useState } from 'react';
import './Popular.css';
import Items from '../Items/Items';
// import NewCollections from '../NewCollections/NewCollections';

const Popular = () => {
  const [popularProducts, setPopularProducts] = useState([]);
  useEffect(()=>{
    fetch('https://backend-ovfj.onrender.com/popularinwomen')
    .then((res)=>res.json())
    .then(data=>setPopularProducts(data))
  }, [])

  return (
    <section className='popular section-shell' id="collections">
        <div className="section-heading">
          <span className="section-kicker">Best selling right now</span>
          <h1 className="section-title">Popular in women</h1>
          <p className="section-copy">
            Elevated staples and polished layering pieces with strong everyday wearability.
          </p>
        </div>
        <div className="popular-item">
            {popularProducts.map((item, i)=>{
                return <Items key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price = {item.old_price}/>
            })}
        </div>
    </section>
  )
}

export default Popular
