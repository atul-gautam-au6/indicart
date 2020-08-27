import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {ProductsaveAction, deleteProduct} from '../action/productsave'
import listProduct from '../action/productAction';
import Axios from 'axios';
// import { response } from 'express';

const ProductcreateScreen = (props) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [id,setId] = useState('')
    const [name,setName] = useState('')
    const [category,setCategory] = useState('')
    const [brand,setBrand] = useState('')
    const [Mrp,setMRp] = useState('')
    const [price,setPrice] = useState('')
    const [offers,setOffers] = useState('')
    const [image,setImage] = useState('')
    const [countInStack,setCountInStack] = useState('')
    const [pack_size,setPack_size] = useState('')
   const [description,setDescription] = useState('')
    const [uploading,setUploading] = useState(false)
   const [numRevies,setNumRevies] = useState('')
   const [rating,setRating] = useState('')

   const productlist = useSelector(state=>state.productList)
   const {loading,products,error} = productlist
   const productSave = useSelector(state=>state.productSave)
   const {loading:loadingSave,success:successSave,errorSave} = productSave

   const productDelete = useSelector((state)=>state.productDelete)
   const {loading:loadingDelete,success:successDelete,error:errorDelete} = productDelete
   
   
    const dispatch = useDispatch();
    // const redirect = props.location.search?props.location.search.split("=")[1]:'/'
// eslint-disable-next-line 
    useEffect(() => {
        if(successSave){
            setModalVisible(false);
        }
        dispatch(listProduct())
        return () => {
            // cleanup
        }
    }, [successSave,successDelete])
    const  openModal = (product)=>{
        console.log(product)
        setModalVisible(true);
        setId(product._id);
        setName(product.name)
        setCategory(product.category)
        setBrand(product.brand)
        setMRp(product.Mrp)
        setPrice(product.price)
        setOffers(product.offers)
        setImage(product.image)
        setCountInStack(product.countInStack)
        setDescription(product.description)
    }
    
    const deleteHandler= (product) =>{
        dispatch(deleteProduct(product._id))
    }
    const uploadFileHandler = (e)=>{
        const file = e.target.files[0];
        const bodyFormData = new FormData()
        bodyFormData.append('image',file)
        setUploading(true)
        Axios.post('/api/uploads',bodyFormData,{
            headers:{
                'Content-type':'multipart/form-data'
            }
        })
        .then((response)=>{
            setImage(response.data)
            setUploading(false)
        })
        .catch((err)=>{
            console.log(err.message)
            setUploading(false)
        })
    }

    const submitHandler=(e)=>{
        e.preventDefault()
        dispatch(ProductsaveAction({
            _id:id,
            name,
            category,
            brand,
            Mrp,
            price,
            offers,
            image,
            countInStack,
            description
        }))
    }
    
    // registerinwithGoogle(dispatch(name,emaildata,tokenid,googleid))
    return (
        <div className="content content-marined">
            <div className="product-header">
                <h3>Products</h3>
                 <button className="button primary" onClick={() => openModal({})}>
          Create Product
        </button>
            </div>
            {modalVisible &&(
            <div className='form'>
           <form onSubmit={submitHandler}> 
                <ul className="form-container">
                    <li>
                        <h2>Ceate-Product</h2>
                    </li>
                    <li>
                        {
                            loadingSave && <img src='/image/giiflogo.gif' />
                        }
                        {
                            errorSave && <div>{errorSave}</div>
                        }
                    </li>
                    <li>
                        <label htmlFor='name'>Name</label>
                        <input type="text" value={name} name="name" id="name" onChange={(e)=>setName(e.target.value)} />
                    </li>
                    <li>
                        <label htmlFor='category'>Category</label>
                        <input type="text" value={category} name="category" id="category" onChange={(e)=>setCategory(e.target.value)} />
                    </li>
                    <li>
                        <label htmlFor='brand'>Brand</label>
                        <input type="text" value={brand} name="brand" id="brand" onChange={(e)=>setBrand(e.target.value)} />
                    </li>
                    <li>
                        <label htmlFor='Mrp'>MRP</label>
                        <input type="number" value={Mrp} name="Mrp" id="Mrp" onChange={(e)=>setMRp(e.target.value)} />
                    </li>
                    <li>
                        <label htmlFor='price'>Price</label>
                        <input type="number" value={price} name="price" id="price" onChange={(e)=>setPrice(e.target.value)} />
                    </li>
                    <li>
                        <label htmlFor='offers'>Offers(optional)</label>
                        <input type="text" value={offers} name="offers" id="offers" onChange={(e)=>setOffers(e.target.value)} />
                    </li>
                    <li>
                        <label htmlFor='image'>Image</label>
                        <input type="text" value={image} name="image" id="image" onChange={(e)=>setImage(e.target.value)} />
                        <input type='file' onChange={uploadFileHandler}></input>
                        {uploading&&<div>uploading...</div>}
                    </li>
                    <li>
                        <label htmlFor='countInStack'>QTY</label>
                        <input type="number" value={countInStack} name="countInStack" id="countInStack" onChange={(e)=>setCountInStack(e.target.value)} />
                    </li>
                    
                    <li>
                        <label htmlFor='description'>Description</label>
                        <input type="text" value={description} name="description" id="description" onChange={(e)=>setDescription(e.target.value)} />
                    </li>
                    <li>
                        <button type="submit" className="button primary">
                            {id ? 'Update' : 'Create'}
                        </button>
                    </li>
                    <li>
                        <button
                            type="button"
                            onClick={() => setModalVisible(false)}
                            className="button secondary"
                            >
                            Back
                        </button>
                     </li>
                  
                   
                </ul>
           </form>
        </div>
            )}
            <div className="product-list">
                <table className="table">
                    <thead>
                        <tr>
                            
                        <th>ID</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Category</th>
                        <th>Brand</th>
                        <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product)=>(
                            
                        <tr key={product._id}>
                            <td>{product._id}</td>
                            <td>{product.name}</td>
                            <td>{product.price}</td>
                            <td>{product.category}</td>
                            <td>{product.brand}</td>
                            <td>
                                <button className="button" onClick={()=>openModal(product)}>Edit</button>{' '}
                                <button className="button" onClick={()=> deleteHandler(product)}>Delete</button>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
       
            
    )
}

export default ProductcreateScreen
