import Cookies from 'js-cookie'
const { USER_SIGN_REQUEST,USER_SIGN_SUCCESS,USER_SIGN_FAIL } = require("../actionType")
const { default: Axios } = require("axios")

const signin =(email,password)=>async(dispatch)=>{
    dispatch({type:USER_SIGN_REQUEST,payload:{email,password}})
    try {
        const {data} = await Axios.post('/api/users/signin',{email,password})
        dispatch({type:USER_SIGN_SUCCESS,payload:data})
        Cookies.set('UserInfo',JSON.stringify(data))
    } catch (error) {
        dispatch({type:USER_SIGN_FAIL,payload:error.message})
        
    }
}
export default signin