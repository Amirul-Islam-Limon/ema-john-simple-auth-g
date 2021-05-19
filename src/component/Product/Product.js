import React from "react";
import ReactDOM from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartPlus } from '@fortawesome/free-solid-svg-icons'
import "./Product.css";

const Product = (props) => {
//   console.log(props.handleAddProduct);
  const { name, img, seller, price, stock } = props.product;
  return (
    <div className="product">
      <div className="product-img">
        <img src={img} alt="" />
      </div>
      <div className="product-information">
        <h4 className="product-name">{name}</h4>
        <p>
          <small>by:{seller}</small>
        </p>
        <p>${price}</p>
        <p>
          <small>Only {stock} left in stock-order soon</small>
        </p>
        <button onClick={()=>props.handleAddProduct(props.product)} className="chart-button">
            
             <FontAwesomeIcon icon={faCartPlus} />
              Add to chart</button>
      </div>
    </div>
  );
};

export default Product;
