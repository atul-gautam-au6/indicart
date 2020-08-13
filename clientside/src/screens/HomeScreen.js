import React, {  useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import  listProduct  from '../action/productAction';


const HomeScreen = (props) => {

    const productList = useSelector(state=>
      state.productList
    );
    const {products,loading,error} = productList
    const dispatch = useDispatch()

    useEffect(()=>{
      dispatch(listProduct())
      return ()=>{
        //
      }
    },[])

    return (
      loading ? <img src='/image/giiflogo.gif' />:
      error ? <div>{error}</div> :
        <ul className="products">
             {
               products.map(product=>(
                  <li key={product._id}>
                      <div className="product">
                      <Link to={'/products/'+product._id}>
                        <img src={product.image} alt="Product" className="product-image" />
                        </Link>
                          <div className="product-name">
                                 
                                <Link to={'/products/'+product._id}>{product.name}</Link>
                            </div>
                          <div className="product-brand">{product.brand}</div>
                          <div className="product-price">${product.price}</div>
                          <div className="product-rating">{product.rating} start({product.numReviews} Review)</div>
                      </div>
                  </li>
               ))
             }
               
              
           </ul>
    )
}

export default HomeScreen
