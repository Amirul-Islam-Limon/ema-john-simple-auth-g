import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import fakeData from '../../fakeData';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css'


const Shop = () => {
    
    const fakeData10 = fakeData.slice(0, 10);
    const [products, setProducts] = useState(fakeData10)
    const [chart, setChart] = useState([])

    useEffect(()=>{
        const addededProduct = getDatabaseCart()
        const addededProductKey = Object.keys(addededProduct)
        const totalProduct = addededProductKey.map(pdKeys=>{
            const product=fakeData.find(product=> product.key === pdKeys)
            product.quantity = addededProduct[pdKeys]
            return product;
        })
        setChart(totalProduct);
    },[])

    const handleAddProduct=(product)=>{
        const sameProduct = chart.find(pd=> pd.key=== product.key)
        let count = 1
        if(sameProduct){
            count = product.quantity + 1;
            sameProduct.quantity = count;
            const others = chart.filter(pd => pd.key != sameProduct.key)
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
                    key={product.key}
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