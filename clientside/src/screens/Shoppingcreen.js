import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import CheckoutSteps from '../components/CheckoutSteps';
import { saveshipping } from '../action/shippingAction';

const Shoppingcreen = (props) => {
   const [address,setAddress] = useState('')
   const [city,setCity] = useState('')
   const [postelcode,setPostelCode] = useState('')
   const [country,setCountry] = useState('')

//    const userRegister = useSelector(state=>state.userRegister)
//    const {loading,userInfo,error} =userRegister
    const dispatch = useDispatch();

    const submitHandler=(e)=>{
        e.preventDefault()
        dispatch(saveshipping(address, city,postelcode,country))
        props.history.push('/payment')
    }
    

    return (
        
        <div>
            <CheckoutSteps step1 step2></CheckoutSteps>
            <div className='form'>
           <form onSubmit={submitHandler}> 
                <ul className="form-container">
                    <li>
                        <h2>Shipping</h2>
                    </li>
                   
                    <li>
                        <label htmlFor='address'>Address</label>
                        <input type="address" name="address" id="address" onChange={(e)=>setAddress(e.target.value)} />

                    </li>
                    <li>
                        <label htmlFor='city'>City</label>
                        <input type="city" name="city" id="city" onChange={(e)=>setCity(e.target.value)} />

                    </li>
                    <li>
                        <label htmlFor='postelcode'>Postel-Code</label>
                        <input type="postelcode" name="postelcode" id="postelcode" onChange={(e)=>setPostelCode(e.target.value)} />

                    </li>
                    <li>
                        <label htmlFor='country'>Country</label>
                        <input type="country" name="country" id="country" onChange={(e)=>setCountry(e.target.value)} />

                    </li>
                    <li>
                        <button type="submit" className="button primary">Continue</button>
                    </li>
                   
                </ul>
           </form>
        </div>
        </div>
        
            
    )
}

export default Shoppingcreen
