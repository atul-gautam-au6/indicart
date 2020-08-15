import Cookies from 'js-cookie'
const { USER_SIGN_REQUEST,USER_SIGN_SUCCESS,USER_SIGN_FAIL, USER_SIGNREQGOOGLE_REQUEST, USER_SIGNREQGOOGLE_FAIL, USER_SIGNREQGOOGLE_SUCESS, } = require("../actionType")
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


// export default signin