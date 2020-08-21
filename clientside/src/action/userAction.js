import Cookies from 'js-cookie'
const { USER_SIGN_REQUEST,USER_SIGN_SUCCESS,USER_SIGN_FAIL, USER_SIGNREQGOOGLE_REQUEST, USER_SIGNREQGOOGLE_FAIL, USER_SIGNREQGOOGLE_SUCESS, USER_LOGOUT, USER_UPDATE_REQEST, USER_UPDATE_SUCCESS, USER_UPDATE_FAIL, PRODUCT_REVIEW_SAVE_REQUEST, PRODUCT_REVIEW_SAVE_SUCCESS, PRODUCT_REVIEW_SAVE_FAIL, } = require("../actionType")
const { default: Axios } = require("axios")

export const signin =(email,password)=>async(dispatch)=>{
     dispatch({type:USER_SIGN_REQUEST,payload:{email,password}})
    try {
        const {data} = await Axios.post('/api/users/signin',{email,password})
        if(!data){
            dispatch({type:USER_SIGN_FAIL,payload:'Invalid Credentials'})
        }
        dispatch({type:USER_SIGN_SUCCESS,payload:data})
        Cookies.set('UserInfo',JSON.stringify(data))
    } catch (error) {
        dispatch({type:USER_SIGN_FAIL,payload:'Invalid Credentials'})
        
    }
}
export const logout = () =>(dispatch) =>{
    Cookies.remove("userInfo");
    dispatch({type:USER_LOGOUT})
}

export const update = ({userId,name,email,password})=>async(dispatch,getState)=>{
    const {userSignin:{userInfo}} = getState()
        dispatch({type:USER_UPDATE_REQEST, payload:{userId,name,email,password}})
        try {
            const {data} = await Axios.put('/api/users/'+userId,{name,email,password},{
                headers:{Authorization:'Bearer'+userInfo.token}
            });
            dispatch({type:USER_UPDATE_SUCCESS,payload:data})
            Cookies.set('userInfo',JSON.stringify(data))
        } catch (error) {
            dispatch({ type: USER_UPDATE_FAIL, payload: error.message });
        }
}


export const saveProductReview =(productId,review)=>async(dispatch,getState)=>{
    try {
        const {userSignin:{userInfo:{token}}}=getState()

        dispatch({type:PRODUCT_REVIEW_SAVE_REQUEST,payload:review}) 

        const {data} = await Axios.post(`/api/products/${productId}/reviews`,review,{
            headers:{
                Authorization:'Bearer'+token
            }
        })
        dispatch({type:PRODUCT_REVIEW_SAVE_SUCCESS, payload:data})
    } catch (error) {
        dispatch({ type: PRODUCT_REVIEW_SAVE_FAIL, payload: error.message });
    }
}