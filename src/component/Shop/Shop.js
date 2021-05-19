import React, { useState } from 'react';
import fakeData from '../../fakeData';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css'

const Shop = () => {
    const fakeData10 = fakeData.slice(0, 10);
    const [products, setProducts] = useState(fakeData10)
    const [chart, setChart] = useState([])
    const handleAddProduct=(product)=>{
        const newChart = [...chart,product];
        setChart(newChart);
    }
    return (
        <div className="shop-container">
            <div className="product-container">
                {
                products.map(product =>
                  <Product 
                    product={product}
                    handleAddProduct={handleAddProduct}>
                  </Product>)
                }
            </div>
            <div className="chart-container">
                <Cart cart={chart}></Cart>
            </div>
            
        </div>
    );
};

export default Shop;