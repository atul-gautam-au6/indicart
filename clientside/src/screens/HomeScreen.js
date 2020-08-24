import React, {  useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import  listProduct  from '../action/productAction';
// import Rating from '../components/Rating.js';
import StarRating from 'react-star-rating'
import { listProducts, listProductsSearch } from '../action/productsave';

const HomeScreen = (props) => {
const [searchKeyword,setSearchKeyword] = useState('')
const [sortOrder , setSortOrder] = useState('')

const category = props.match.params.id?props.match.params.id:''
// console.log(category)
    const productList = useSelector(state=>
      state.productList
    );
    const {products,loading,error} = productList
    const dispatch = useDispatch()

// eslint-disable-next-line
    useEffect(()=>{
      dispatch(listProduct(category))
      return ()=>{
        //
      }
    },[category])

    const submitHandler = (e)=>{
      e.preventDefault();
      dispatch(listProductsSearch(category,searchKeyword,sortOrder))
    }
    const sortHandler=(e)=>{
      setSortOrder(e.target.value)
      dispatch(listProductsSearch(category,searchKeyword,sortOrder))
    }

    return (
      <>
      {category&&<h2>{category}</h2>}
      <ul className="filter">
        <li>
            <form onSubmit={submitHandler}>
                <input name="searchKeyword" 
                onChange={(e) => setSearchKeyword(e.target.value)}
                />
                <button type="submit">Search</button>
            </form>
        </li>
        <li>
          Sort By{ ' ' }
          <select name="sortOrder" onChange={sortHandler}>
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
                          {/* <StarRating name="medium-rating" caption="Medium!" size={50} totalStars={5} rating={4} /> */}
                          {/* <StarRating name="react-star-rating" caption="Rate this component!" totalStars={5} />                          */}
                           {/* <Rating
                            value={4}
                            text={product.numReviews + ' reviews'}
                          /> */}
                          </div>
                      </div>
                  </li>
               ))
             }
               
              
           </ul>)
       
       
       }
       </>
    )
}

export default HomeScreen
