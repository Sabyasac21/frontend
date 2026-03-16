import React, { useEffect, useState } from 'react';
import './NewCollections.css';
// import new_collections from  '../Assests/new_collections'
import Items from '../Items/Items';

const NewCollections = () => {
  const [new_collection, setNew_collection] = useState([]);
  useEffect(()=>{
    fetch('https://backend-ovfj.onrender.com/newcollections')
    .then((response)=>response.json())
    .then((data)=>setNew_collection(data))
  }, [])
  return (
    <section className='new-collections section-shell'>
        <div className="section-heading">
          <span className="section-kicker">Fresh drop</span>
          <h1 className="section-title">New collections</h1>
          <p className="section-copy">
            Recent additions selected to keep the catalogue feeling current, clear, and premium.
          </p>
        </div>
        <div className="collections">
            {new_collection.map((item, i)=>{
                return <Items key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price = {item.old_price}/>
            })}
        </div>
    </section>
  )
}

export default NewCollections
