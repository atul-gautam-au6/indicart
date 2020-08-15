import { PRODUCT_SAVE_REQUEST, PRODUCT_SAVE_SUCCESS, PRODUCT_SAVE_FAIL } from "../actionType";

const { default: Axios } = require("axios");

export const ProductsaveAction = (product) =>async(dispatch,getState)=>{
    try {
        dispatch({type:PRODUCT_SAVE_REQUEST,payload:product})
        const {userSignin:{userInfo}} = getState()
        console.log(userInfo)
        console.log(product)
        const {data} = await Axios.post('/api/product',product,{
            headers:{
                'Authorization':'Bearer'+userInfo.token
            }
        })
        dispatch({type:PRODUCT_SAVE_SUCCESS,payload:data})
    } catch (error) {
        dispatch({type:PRODUCT_SAVE_FAIL,payload:error.message})
    }
}


