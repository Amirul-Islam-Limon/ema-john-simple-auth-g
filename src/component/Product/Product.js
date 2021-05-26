import React from "react";
import ReactDOM from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartPlus } from '@fortawesome/free-solid-svg-icons'
import "./Product.css";
import { Link } from "react-router-dom";

const Product = (props) => {
  // console.log(props);
  const { name, img, seller, price, stock, key } = props.product;
  return (
    <div className="product">
      <div className="product-img">
        <img src={img} alt="" />
      </div>
      <div className="product-information">
        <h4 className="product-name"><Link to={"/product/"+key}>{name}</Link></h4>
        <p>
          <small>by:{seller}</small>
        </p>
        <p>${price}</p>
        <p>
          <small>Only {stock} left in stock-order soon</small>
        </p>
         {
           props.showButton && <button onClick={()=>
            props.handleAddProduct(props.product)}
            className="chart-button">
            <FontAwesomeIcon icon={faCartPlus} />
            Add to chart
          </button>
         }
      </div>
    </div>
  );
};

export default Product;
