import React from 'react';
import orderImage from '../../images/giphy.gif'
const PlaceOrder = () => {
    const imgStyle ={
        display: "block",
        marginLeft: "auto",
        marginRight: "auto"
    }
    return (
        
        <div style={{margin:"0 auto"}}>
            <img style ={imgStyle} src={orderImage} alt="" />
        </div>
    );
};

export default PlaceOrder;