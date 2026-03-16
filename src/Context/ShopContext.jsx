import React, { createContext, useState } from "react";
import { useEffect } from "react";

export const ShopContext = createContext(null)
const getDefaultCart = ()=>{
    let cart = {}
    for (let index = 0; index < 300+1; index++) {
        cart[index] = 0
        
    }
    return cart
}

const ShopContextProvider = (props)=>{
    const [all_product, setAll_Product] = useState([]);
    const [cartItems, setCartItems] = useState(getDefaultCart())
    const isAuthenticated = () => Boolean(localStorage.getItem('auth-token'));
    
    useEffect(()=>{
        fetch('https://backend-ovfj.onrender.com/allproducts')
        .then((res)=>res.json())
        .then((data)=>setAll_Product(data))

        if (isAuthenticated()){
            fetch('https://backend-ovfj.onrender.com/getcart', {
                method:'POST',
                headers:{
                    Accept:'application/form-data',
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'Content-Type': 'Application/json'
                },
                body:'',
            }).then(res=>res.json())
            .then((data)=>setCartItems(data))
        }
    }, [])

    const addToCart = async (itemId)=>{
        if (!isAuthenticated()) {
            return { success: false, requiresAuth: true };
        }

        setCartItems((prev)=>({...prev, [itemId]:prev[itemId]+1}))
        try {
            const response = await fetch('https://backend-ovfj.onrender.com/addtocart', {
                method:'POST',
                headers:{
                    Accept:'application/form-data',
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({'ItemId':itemId})
            })
            const data = await response.json().catch(() => ({}))
            if (!response.ok) {
                setCartItems((prev)=>({...prev, [itemId]:Math.max((prev[itemId] || 1)-1, 0)}))
                return { success: false, error: data.errors || data.error || 'Unable to add item to cart' };
            }
            return { success: true, data };
        } catch (error) {
            setCartItems((prev)=>({...prev, [itemId]:Math.max((prev[itemId] || 1)-1, 0)}))
            return { success: false, error: 'Unable to add item to cart' };
        }
    }
    

    const removeFromCart = async (itemId)=>{
        if (!isAuthenticated()) {
            return { success: false, requiresAuth: true };
        }

        setCartItems((prev)=>({...prev, [itemId]:Math.max(prev[itemId]-1, 0)}))
        try {
            const response = await fetch('https://backend-ovfj.onrender.com/removefromcart', {
                method:'POST',
                headers:{
                    Accept:'application/form-data',
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({'ItemId':itemId})
            })
            const data = await response.json().catch(() => ({}))
            if (!response.ok) {
                setCartItems((prev)=>({...prev, [itemId]:(prev[itemId] || 0)+1}))
                return { success: false, error: data.errors || data.error || 'Unable to remove item from cart' };
            }
            return { success: true, data };
        } catch (error) {
            setCartItems((prev)=>({...prev, [itemId]:(prev[itemId] || 0)+1}))
            return { success: false, error: 'Unable to remove item from cart' };
        }
    }

    const getTotalCartAmount = ()=>{
        let totalAmount =0
        for(const item in cartItems){
            if(cartItems[item]>0){
                let itemInfo = all_product.find((product)=>product.id===Number(item))
                if (itemInfo) {
                    totalAmount+=itemInfo.new_price * cartItems[item]
                }
            }
        }return totalAmount
    }

    const getTotalCartItems = ()=>{
        let totalItem = 0
        for(const item in cartItems){
            if(cartItems[item]>0){
                totalItem+=cartItems[item]
            }
        }
        return totalItem
    }

    const contextValue = {getTotalCartItems, getTotalCartAmount,all_product, cartItems, addToCart, removeFromCart, isAuthenticated}
    

    

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;
