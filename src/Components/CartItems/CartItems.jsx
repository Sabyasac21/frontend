import React, { useContext, useState } from 'react'
import './CartItems.css'
import { ShopContext } from '../../Context/ShopContext';
import remove_icon from '../Assests/cart_cross_icon.png'
import { useDialog } from '../../Context/DialogContext';
const CartItems = () => {
    const {getTotalCartAmount, all_product, cartItems, removeFromCart} = useContext(ShopContext)
    const [cartNotice, setCartNotice] = useState("");
    const [removingItemId, setRemovingItemId] = useState(null);
    const { showConfirm, showAlert } = useDialog();

    const handleRemove = async (itemId, itemName) => {
        const confirmed = await showConfirm({
            title: "Remove item from cart?",
            message: `${itemName} will be removed from your cart. You can add it again later from the product page.`,
            confirmLabel: "Remove item",
            cancelLabel: "Keep item",
            tone: "warning",
        });
        if (!confirmed) {
            return;
        }

        setRemovingItemId(itemId);
        const result = await removeFromCart(itemId);
        if (result?.success) {
            setCartNotice(`${itemName} was removed from your cart.`);
        } else {
            setCartNotice(result?.error || `We couldn't remove ${itemName}.`);
            await showAlert({
                title: "We couldn't update your cart",
                message: result?.error || `Please try removing ${itemName} again in a moment.`,
                confirmLabel: "Close",
                tone: "error",
            });
        }
        setRemovingItemId(null);
    };

  return (
    <div className='cartitems'>
        {cartNotice ? <div className="cartitems-notice">{cartNotice}</div> : null}
        <div className="cartitems-format-main">
            <p>Products</p>
            <p>Title</p>
            <p>Price</p>
            <p>Quantity</p>
            <p>Total</p>
            <p>Remove</p>
        </div>
        <hr />
        {all_product.map((e)=>{
            if (cartItems[e.id]>0)
                {
                    return <div>
                        <div className="cartitems-format cartitems-format-main">
                            <img src={e.image} alt='' className='carticon-product-icon'/>
                            <p style={{fontSize:'small'}}>{e.name}</p>
                            <p>${e.new_price}</p>
                            <button className='cartitems-quantity'>{cartItems[e.id]}</button>
                            <p>${e.new_price*cartItems[e.id]}</p>
                            <button
                                type="button"
                                className='cartitems-remove-button'
                                disabled={removingItemId === e.id}
                                onClick={()=>{handleRemove(e.id, e.name)}}
                            >
                                <img src={remove_icon} alt='Remove from cart'/>
                            </button>
                        </div>
                        <hr />
                    </div>
                }
                return null
        })}
        <div className="cartitems-down">
            <div className="cartitems-total">
                <h1>Cart Totals</h1>
                <div>
                    <div className="cartitems-total-item">
                        <p>Subtotal</p>
                        <p>${getTotalCartAmount()}</p>
                    </div>
                    <hr />
                    <div className="cartitems-total-item">
                        <p>Shipping Fee</p>
                        <p>Free</p>
                    </div>
                    <hr />
                    <div className="cartitems-total-item">
                        <h3>Total</h3>
                        <h3>${getTotalCartAmount()}</h3>
                    </div>

                </div>
                <button>PROCEED TO CHECK OUT</button>
            </div>
            <div className="cartitems-promocode">
                <p>If you have any code , enter it here</p>
                <div className="cartitems-promobox">
                    <input type='text' placeholder='promo code'/>
                    <button>Submit</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default CartItems
