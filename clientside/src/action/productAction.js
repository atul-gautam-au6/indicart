const { PRODUCT_LIST_REQ, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAIL} = require("../actionType");
const { default: Axios } = require("axios");

 const  listProduct = ()=> async (dispatch) =>{
    try {
       dispatch({type:PRODUCT_LIST_REQ}) ;
       const {data} = await Axios.get('/api/products')
       dispatch({type:PRODUCT_LIST_SUCCESS,payload:data})
    } catch (error) {
        dispatch({type:PRODUCT_LIST_FAIL,payload:error.message})
    }
}


export default listProduct