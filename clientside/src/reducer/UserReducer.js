const { USER_SIGN_REQUEST, USER_SIGN_SUCCESS, USER_SIGN_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_FAIL, USER_SIGNREQGOOGLE_REQUEST, USER_SIGNREQGOOGLE_SUCESS, USER_SIGNREQGOOGLE_FAIL } = require("../actionType");

export const userSignInReducer =(state={},action)=>{
    switch(action.type){
        case USER_SIGN_REQUEST:
            return {loading:true}
        case USER_SIGN_SUCCESS:
            return {loading:false,userInfo:action.payload}
        case USER_SIGN_FAIL:
            return {loading:false,error:action.payload}
        default: return state
    }
}
export const userRegisterInReducer =(state={},action)=>{
    switch(action.type){
        case USER_REGISTER_REQUEST:
            return {loading:true}
        case USER_REGISTER_SUCCESS:
            return {loading:false,userInfo:action.payload}
        case USER_REGISTER_FAIL:
            return {loading:false,error:action.payload}
        default: return state
    }
}
export const userRegisterInGoogleReducer=(state={},action)=>{
    switch(action.type){
        case USER_SIGNREQGOOGLE_REQUEST:
            return {loading:true}
        case USER_SIGNREQGOOGLE_SUCESS:
            return {loading:false,userInfo:action.payload}
        case USER_SIGNREQGOOGLE_FAIL:
            return {loading:false,error:action.payload}
        default: return state
    }
}
