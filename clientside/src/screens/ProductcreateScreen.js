import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {ProductsaveAction} from '../action/productsave'

const ProductcreateScreen = (props) => {
   const [category,setCategory] = useState('')
   const [name,setName] = useState('')
   const [description,setDescription] = useState('')
   const [brand,setBrand] = useState('')
   const [pack_size,setPack_size] = useState('')
   const [Mrp,setMRp] = useState('')
   const [price,setPrice] = useState('')
   const [offers,setOffers] = useState('')
   const [image,setImage] = useState('')
   const [numRevies,setNumRevies] = useState('')
   const [rating,setRating] = useState('')
   const [countInStock,setCountInStock] = useState('')
   const productSave = useSelector(state=>state.productSave)
   const {loading:loadingSave,success:successSave,errorSave} = productSave
    const dispatch = useDispatch();
    // const redirect = props.location.search?props.location.search.split("=")[1]:'/'


      


    useEffect(() => {
       
        return () => {
            //cleanup
        }
    }, [])
    const submitHandler=(e)=>{
        e.preventDefault()
        dispatch(ProductsaveAction({category,name,description,brand,pack_size,
            Mrp,price,offers,image,numRevies,rating ,countInStock}))
    }
    
    // registerinwithGoogle(dispatch(name,emaildata,tokenid,googleid))
    return (
        <div className='form'>
           <form onSubmit={submitHandler}> 
                <ul className="form-container">
                    <li>
                        <h2>Ceate-Product</h2>
                    </li>
                    <li>
                        {
                            loadingSave && <div>loading...</div>
                        }
                        {
                            errorSave && <div>{errorSave}</div>
                        }
                    </li>
                    <li>
                        <label htmlFor='name'>Name</label>
                        <input type="name" name="name" id="name" onChange={(e)=>setName(e.target.value)} />
                    </li>
                    <li>
                        <label htmlFor='category'>Category</label>
                        <input type="name" name="category" id="category" onChange={(e)=>setCategory(e.target.value)} />
                    </li>
                    <li>
                        <label htmlFor='brand'>Brand</label>
                        <input type="name" name="brand" id="brand" onChange={(e)=>setBrand(e.target.value)} />
                    </li>
                    <li>
                        <label htmlFor='Mrp'>MRP</label>
                        <input type="name" name="Mrp" id="Mrp" onChange={(e)=>setMRp(e.target.value)} />
                    </li>
                    <li>
                        <label htmlFor='price'>Price</label>
                        <input type="name" name="price" id="price" onChange={(e)=>setPrice(e.target.value)} />
                    </li>
                    <li>
                        <label htmlFor='offers'>Offers(optional)</label>
                        <input type="name" name="offers" id="offers" onChange={(e)=>setOffers(e.target.value)} />
                    </li>
                    <li>
                        <label htmlFor='image'>Image</label>
                        <input type="name" name="image" id="image" onChange={(e)=>setImage(e.target.value)} />
                    </li>
                    <li>
                        <label htmlFor='qty'>QTY</label>
                        <input type="name" name="qty" id="qty" onChange={(e)=>setCountInStock(e.target.value)} />
                    </li>
                    <li>
                        <label htmlFor='size'>Size</label>
                        <input type="name" name="size" id="size" onChange={(e)=>setPack_size(e.target.value)} />
                    </li>
                    <li>
                        <label htmlFor='description'>Description</label>
                        <input type="name" name="description" id="description" onChange={(e)=>setDescription(e.target.value)} />
                    </li>
                  
                    <li>
                        <button type="submit" className="button primary">Create</button>
                    </li>
                    
                </ul>
           </form>
        </div>
            
    )
}

export default ProductcreateScreen
