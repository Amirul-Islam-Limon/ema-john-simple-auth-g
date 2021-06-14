import React, { useContext } from 'react';
import './Shipment.css'
import { useForm } from 'react-hook-form';
import { UserContext } from '../../App';

const Shipment = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext)
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = data => console.log(data);

  console.log(watch("example")); // watch input value by passing the name of it

  return (
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
  );
};

export default Shipment;