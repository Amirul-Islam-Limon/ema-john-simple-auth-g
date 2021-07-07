import React from 'react';
const Inventory = () => {
    const handleAddProduct=()=>{
        const product = {}
        fetch("https://sheltered-savannah-45789.herokuapp.com/addProduct",{
            method: 'POST',
            headers:{'Content-Type': 'application/json'},
            body: JSON.stringify(product)
        })
    }
    return (
        <div>
            <button onClick={handleAddProduct}>Add Product</button>
        </div>
    );
};

export default Inventory;