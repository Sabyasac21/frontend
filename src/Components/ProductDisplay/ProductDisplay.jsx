import React, { useContext, useEffect, useState } from 'react';
import './ProductDisplay.css';
import star_icon from '../Assests/star_icon.png';
import star_dull_icon from '../Assests/star_dull_icon.png'
import { ShopContext } from '../../Context/ShopContext';
import { useNavigate } from 'react-router-dom';

const ProductDisplay = (props) => {
    const {product} = props
    const {addToCart, cartItems, isAuthenticated} = useContext(ShopContext)
    const navigate = useNavigate();
    const [selectedSize, setSelectedSize] = useState("");
    const [statusMessage, setStatusMessage] = useState("");
    const [statusType, setStatusType] = useState("");
    const sizes = ["S", "M", "L", "XL", "XXL"];

    useEffect(() => {
        setSelectedSize("");
        setStatusMessage("");
        setStatusType("");
    }, [product?.id]);

    if (!product) {
        return null;
    }

    const selectedQuantity = cartItems?.[product.id] || 0;

    const showStatus = (message, type) => {
        setStatusMessage(message);
        setStatusType(type);
    };

    const handleAddToCart = async () => {
        if (!isAuthenticated()) {
            showStatus("Please log in to add items to your cart.", "warning");
            setTimeout(() => navigate('/login'), 600);
            return;
        }

        if (!selectedSize) {
            showStatus("Select a size before adding this product.", "warning");
            return;
        }

        const result = await addToCart(product.id);
        if (result.success) {
            showStatus(`Added size ${selectedSize} to your cart.`, "success");
            return;
        }

        showStatus(result.error || "Unable to add this item right now.", "error");
    };

  return (
    <div className='productdisplay'>
        <div className="productdisplay-left">
            <div className="productdisplay-img-list">
                <img src={product.image} alt=''/>
                <img src={product.image} alt=''/>
                <img src={product.image} alt=''/>
                <img src={product.image} alt=''/>
            </div>
            <div className="productdisplay-img">
                <img className='productdisplay-main-img' src={product.image} alt=''/>
            </div>
        </div>
        <div className="productdisplay-right">
            <h1>{product.name}</h1>
            <div className="productdisplay-right-star">
                <img src={star_icon} alt=''/>
                <img src={star_icon} alt=''/>
                <img src={star_icon} alt=''/>
                <img src={star_icon} alt=''/>
                <img src={star_dull_icon} alt=''/>
                <p>(122)</p>
            </div>
            <div className="productdisplay-right-prices">
                <div className="productdisplay-right-price-old">${product.old_price}</div>
                <div className="productdisplay-right-price-new">${product.new_price}</div>
            </div>
            <div className="productdisplay-right-description">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam itaque sint quae aliquid commodi placeat voluptatum temporibus.
            </div>
            <div className="productdisplay-right-size">
                <h1>Select Size</h1>
                <div className="productdisplay-right-sizes">
                    {sizes.map((size)=>(
                        <button
                            key={size}
                            type="button"
                            className={selectedSize === size ? 'productdisplay-size-option active' : 'productdisplay-size-option'}
                            onClick={() => setSelectedSize(size)}
                        >
                            {size}
                        </button>
                    ))}
                </div>
            </div>
            <button className="productdisplay-addtocart" onClick={handleAddToCart}>
                {selectedQuantity > 0 ? `ADD ANOTHER • ${selectedQuantity} IN CART` : 'ADD TO CART'}
            </button>
            {statusMessage ? (
                <div className={`productdisplay-status ${statusType}`}>
                    {statusMessage}
                </div>
            ) : null}
            {selectedQuantity > 0 ? (
                <div className="productdisplay-cart-indicator">
                    This product is already in your cart. Adding again increases quantity.
                </div>
            ) : null}
            <p className='productdisplay-right-category'><span>Category :</span>Women, T-Shirt, Crop Top</p>
            <p className='productdisplay-right-category'><span>Tags :</span>Modern, Latest</p>
        </div>
    </div>
  )
}

export default ProductDisplay
