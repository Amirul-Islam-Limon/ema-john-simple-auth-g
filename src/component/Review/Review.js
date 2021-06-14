import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import ReviewItem from '../ReviewItem/ReviewItem';
import './Review.css'
import {Link, useHistory} from 'react-router-dom'

const Review = () => {
   const [cart, setCart] =useState([])
    useEffect(()=>{
        const savedCart = getDatabaseCart()
        const productKeys = Object.keys(savedCart)

        const cartProduct = productKeys.map(key=>{
            const cartProduct = fakeData.find(product => product.key === key)
            cartProduct.quantity= savedCart[key];
            return cartProduct
        })
        setCart(cartProduct);
    },[])
    const removeProduct=(productKey)=>{
        const newCart = cart.filter(pd => pd.key != productKey)
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