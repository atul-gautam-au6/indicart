import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import detailsProduct from '../action/productDetailsAction';

const ProductScreens = (props) => {
    // console.log(props)
    // console.log(props.match.params.id)
    const [qty,setQty] = useState(1)
    const productDetails = useSelector(state =>
        
        state.productdetailList
        )
    const {products,loading,error}=productDetails
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(detailsProduct(props.match.params.id))
        return () => {
            //cleanup
        }
    }, [])
const handleAddToCart = () =>{
    props.history.push("/cart/"+props.match.params.id+"?qty="+qty)
}

    return (
        <div >
            <div className="back-to-result">
                <Link to="/" >Back TO Result</Link>
            </div>
            {
                loading ? <div>loading...</div> :
                error ? <div>{error} </div> :(
                    <div className="details">
                <div className="details-image">
                    <img src={products.image} alt="product" />
                </div>
                <div className="details-info">
                    <ul>
                        <li>
                            <h4>{products.name}</h4>
                        </li>
                        <li>
                            {products.rating} Stars ({products.numReviews} Reviews)
                        </li>
                        <li>
                            Price:<b>${products.price}</b>
                        </li>
                        Description:
                        {products.description}
                    </ul>
                </div>
                <div className="details-action">
                    <ul>
                        <li>
                            price:{products.price}
                        </li>
                        <li>
                            Status:{ products.countInStack >0 ? "In Stack" :"Unavailable" }
                        </li>
                        <li>
                            Qty:<select value={qty} onChange={e=>{
                                setQty(e.target.value)
                            }}>
                                {
                                    [...Array(products.countInStack).keys()].map(x=>
                                            <option key={x+1} value={x+1}>{x+1}</option>
                                        )
                                }
                            </select>
                        </li>
                        <li>
                            {
                                products.countInStack >0 && 
                                <button onClick={handleAddToCart} className="button primary">Add to Cart</button>

                            }
                        </li>
                    </ul>
                </div>
           </div>
                )
            }
           

        </div>
            
    )
}

export default ProductScreens
