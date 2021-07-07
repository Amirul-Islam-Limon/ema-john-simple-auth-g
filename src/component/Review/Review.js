import React, { useEffect, useState } from 'react';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import ReviewItem from '../ReviewItem/ReviewItem';
import './Review.css'
import {Link, useHistory} from 'react-router-dom'

const Review = () => {
   const [cart, setCart] =useState([])
//    console.log(cart)
    useEffect(()=>{
        const savedCart = getDatabaseCart()
        const productKeys = Object.keys(savedCart)
        // console.log(productKeys)

        fetch('https://sheltered-savannah-45789.herokuapp.com/productsByKeys',{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(productKeys)
        })
        .then(res=> res.json())
        .then(data=>setCart(data));
    },[])
    const removeProduct=(productKey)=>{
        const newCart = cart.filter(pd => pd.key !== productKey)
        setCart(newCart);
        removeFromDatabaseCart(productKey)
    }

    const history = useHistory()
    const handleProceedCheckout=()=>{
        history.push('/shipment')
    }

    return (
        <div className="review-container">
            <div className="reviewItem-container">
                {
                    cart.map(pd=> <ReviewItem
                        product={pd}
                        removeProduct={removeProduct}
                        ></ReviewItem>)
                }
            </div>
            <div className="placeOrder-container">
                <Cart cart={cart}>
               <button onClick={handleProceedCheckout} className="chart-button">Proceed Checkout</button>
                </Cart>
            </div>   
        </div>
    );
};

export default Review;