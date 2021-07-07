import React from 'react';


const Cart = (props) => {
    // console.log(props)
    const productPrice = props.cart.reduce((total, product)=> total + product.price*1,0)
    let shippingCost = 6.99;
    if(productPrice > 35){
        shippingCost = 0
    }
    else if(productPrice > 15){
        shippingCost = 4.5;
    }
    else{
        shippingCost = 0;
    }

    const tax = productPrice / 10;
    return (
        <div>
            <h3 >Order Summary</h3>
            <p ><big>Items ordered:{props.cart.length}</big></p>
            <p><small>price:{(productPrice).toFixed(2)}</small></p>
            <p><small>Shipping Cost:{shippingCost}</small></p>
            <p><small>VAT + Tax :{(tax).toFixed(2)}</small></p>
            <h4>Total Price:{Math.ceil(productPrice + shippingCost + tax)}</h4>
            <br />
            {
                props.children
            }
        </div>
    );
};

export default Cart;