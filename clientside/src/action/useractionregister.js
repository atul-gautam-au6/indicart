import Cookies from 'js-cookie'
const { USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_FAIL } = require("../actionType")
const { default: Axios } = require("axios")

const registerin =(name,email,password)=>async(dispatch)=>{
    dispatch({type:USER_REGISTER_REQUEST,payload:{name,email,password}})
    try {
        const {data} = await Axios.post('/api/users/register',{name,email,password})
        dispatch({type:USER_REGISTER_SUCCESS,payload:data})
        Cookies.set('UserInfo',JSON.stringify(data))
    } catch (error) {
        dispatch({type:USER_REGISTER_FAIL,payload:error.message})
        
    }
}
export default registerin