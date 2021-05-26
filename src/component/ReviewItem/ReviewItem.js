import React from 'react';
import './ReviewItem.css'

const ReviewItem = (props) => {
    // console.log(props.product)
    const {name,price, quantity,key} = props.product
    return (
        <div className="review-order">
            <h4 className="product-name">{name}</h4>
            <p>Price: {price}</p>
            <p><small>Quantity: {quantity}</small></p>
            <button onClick={()=>props.removeProduct(key)} className="chart-button">Remove Item</button>
        </div>
    );
};

export default ReviewItem;