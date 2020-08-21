import React, {  useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import  listProduct  from '../action/productAction';
import Rating from '../components/Rating.js';


const HomeScreen = (props) => {

    const productList = useSelector(state=>
      state.productList
    );
    const {products,loading,error} = productList
    const dispatch = useDispatch()
// eslint-disable-next-line
    useEffect(()=>{
      dispatch(listProduct())
      return ()=>{
        //
      }
    },[])

    return (
      <>
      <ul className="filter">
        <li>
            <form>
                <input name="searchKeyword" />
                <button type="submit">Search</button>
            </form>
        </li>
        <li>
          Sort By{ ' ' }
          <select name="sortOrder">
                  <option value="">Newest</option>
                  <option value="lowest">Lowest</option>
                  <option value="highest">Highest</option>
          </select>
        </li>
      </ul>
      {loading ? (<img src='/image/giiflogo.gif' />):
      error ? (<div>{error}</div> ):
       ( <ul className="products">
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
                          <div className="product-price">Rs. {product.price}</div>
                          <div className="product-rating"> 
                            <Rating value={product.rating} text={product.numReviews + ' reviews'} />
                          </div>
                      </div>
                  </li>
               ))
             }
               
              
           </ul>
       )}
       </>
    )
}

export default HomeScreen
