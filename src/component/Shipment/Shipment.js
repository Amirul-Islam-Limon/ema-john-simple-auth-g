import React, { useContext,useState } from 'react';
import './Shipment.css'
import { useForm } from 'react-hook-form';
import { UserContext } from '../../App';
import { getDatabaseCart } from '../../utilities/databaseManager';
import ProcessPament from '../ProcessPament/ProcessPament';

const Shipment = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext)
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [shippingData, setShippingData]=useState(null)
    const onSubmit = data =>{
          setShippingData(data)
      }
    
    const handlePaymentSuccess=(paymentId)=>{
        const savedCart = getDatabaseCart()
        const orderDetails = {...loggedInUser,product:savedCart,paymentId,shipment:shippingData,orderTime:new Date()}

          fetch('https://sheltered-savannah-45789.herokuapp.com/addOrder',{
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(orderDetails)
        })
        .then(res=> res.json())
        .then(data=>{
          if(data){
            alert("Your Order Place Successfully")
            console.log(data)
          }
        })
        .catch(error=>{
          console.log(error)
        })
    }

  return (
   <div className="row">
        <div style={{display:shippingData?'none':'block'}} className="col-md-6">
            <form className="shipment-form" onSubmit={handleSubmit(onSubmit)}>
              <input  defaultValue={loggedInUser.name} {...register("name", { required: true })} placeholder="Your name" />
              {errors.name && <span className="error">Name field is required</span>}

              <input defaultValue={loggedInUser.email}  {...register("email", { required: true })} placeholder="Your email"  />
              {errors.email && <span className="error">Email field is required</span>}

              <input {...register("address", { required: true })} placeholder="Your address"  />
              {errors.address && <span className="error">address field is required</span>}

              <input {...register("mobile", { required: true })}  placeholder="Your mobile" />
              {errors.mobile && <span className="error">Name field is required</span>}

              <input type="submit" />
            </form>
        </div>

        <div style={{display:shippingData?'block':'none'}} className="col-md-6">
            <ProcessPament handlePayment={handlePaymentSuccess}></ProcessPament>
        </div>
   </div>
  );
};

export default Shipment;