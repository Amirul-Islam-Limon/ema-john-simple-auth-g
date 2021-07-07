import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css'


const Shop = () => {
    const [products, setProducts] = useState([])
    const [chart, setChart] = useState([])

    useEffect(()=>{
        fetch('https://sheltered-savannah-45789.herokuapp.com/products')
        .then(res=> res.json())
        .then(data=> setProducts(data))
    },[])

    useEffect(()=>{
        const addededProduct = getDatabaseCart()
        const addededProductKey = Object.keys(addededProduct)
        fetch('https://sheltered-savannah-45789.herokuapp.com/productsByKeys',{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(addededProductKey)
        })
        .then(res=> res.json())
        .then(data=>setChart(data));
    },[]);

    const handleAddProduct=(product)=>{
        console.log(product);
        const sameProduct = chart.find(pd=> pd.key=== product.key)
        let count = 1
        if(sameProduct){
            count = product.quantity + 1;
            sameProduct.quantity = count;
            const others = chart.filter(pd => pd.key !== sameProduct.key)
            let newChart = [...others,sameProduct]
            setChart(newChart)
        }
        else{
            product.quantity = 1;
            let newChart = [...chart,product]
            setChart(newChart)
        }
        
        
        addToDatabaseCart(product.key,count)
    }
    // console.log(chart)
    return (
        <div className="shop-container">
            <div className="product-container">
                {
                products.map(product =>
                  <Product 
                    product={product}
                    id={product._id}
                    showButton={true}
                    handleAddProduct={handleAddProduct}>
                  </Product>)
                }
            </div>
            <div className="chart-container">
                <Cart cart={chart}>
                <Link to="review"><button className="chart-button">Review Order</button></Link>
                </Cart>
            </div>
            
        </div>
    );
};

export default Shop;