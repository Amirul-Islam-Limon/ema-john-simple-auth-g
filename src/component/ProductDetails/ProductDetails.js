import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Product from '../Product/Product';

const ProductDetails = () => {
    const [products, setProducts]= useState({})
    const {productKey} = useParams()
    useEffect(()=>{
        fetch('https://sheltered-savannah-45789.herokuapp.com/products/'+productKey)
        .then(res=>res.json())
        .then(data=>setProducts(data))
    },[productKey])
    const product =products.find(pd=> pd.key === productKey);
    
    return (
        <div>
            <h1>Your Product Details!</h1>
            <Product showButton={false} product={product}></Product>
        </div>
    );
};

export default ProductDetails;