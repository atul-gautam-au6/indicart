import Cookies from 'js-cookie'
const { USER_SIGN_REQUEST,USER_SIGN_SUCCESS,USER_SIGN_FAIL, USER_SIGNREQGOOGLE_REQUEST, USER_SIGNREQGOOGLE_FAIL, USER_SIGNREQGOOGLE_SUCESS, } = require("../actionType")
const { default: Axios } = require("axios")

export const signin =(email,password)=>async(dispatch)=>{
     dispatch({type:USER_SIGN_REQUEST,payload:{email,password}})
    try {
        const {data} = await Axios.post('/api/users/signin',{email,password})
        dispatch({type:USER_SIGN_SUCCESS,payload:data})
        Cookies.set('UserInfo',JSON.stringify(data))
    } catch (error) {
        dispatch({type:USER_SIGN_FAIL,payload:error.message})
        
    }
}
export const registerinwithGoogle =(name,email,token,googleid)=>async(dispatch)=>{
    dispatch({type:USER_SIGNREQGOOGLE_REQUEST,payload:{name,email,token,googleid}})
    try {
        const {data} = await Axios.post('/api/users/register',{name,email,token,googleid})
        console.log(data)
        dispatch({type:USER_SIGNREQGOOGLE_SUCESS,payload:data})
        Cookies.set('UserInfo',JSON.stringify(data))
    } catch (error) {
        dispatch({type:USER_SIGNREQGOOGLE_FAIL,payload:error.message})
        
    }
}


// export default signin