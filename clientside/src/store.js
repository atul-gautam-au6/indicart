import {createStore,combineReducers, compose, applyMiddleware} from "redux";
import thunk from 'redux-thunk'
import Cookies from "js-cookie"
import {productListReducer, productDetailReducer, productSaveReducer, productDeleteReducer, productReviewSaveReducer} from "./reducer/productReducer";
import cartReducer from "./reducer/cartReducer";
import { userSignInReducer, userRegisterInReducer, userUpdateReducer } from "./reducer/UserReducer";
import { myOrderListReducer, orderCreateReduce, orderdetailsReducer, orderPayReducer, orderListReducer, orderDeleteReducer } from "./reducer/orderReducer";

const cartItems = Cookies.getJSON("cartItems")||[]
const userInfo = Cookies.getJSON("UserInfo")||null

const intialState={cart:{cartItems,shipping:{},payment:{}},userSignin:{userInfo}}
const reducer =  combineReducers({
    productList:productListReducer,
    productdetailList: productDetailReducer,
    cart:cartReducer,
    userSignin:userSignInReducer,
    userRegister:userRegisterInReducer,
    productSave:productSaveReducer,
    userUpdate:userUpdateReducer,
    productDelete:productDeleteReducer,
    productReviewSave:productReviewSaveReducer,
    orderDetails:orderdetailsReducer,
    ordercreate:orderCreateReduce,
    myOrderList:myOrderListReducer,
    orderPay: orderPayReducer,
    orderList: orderListReducer,
    orderDelete: orderDeleteReducer
    
})
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__||compose
const store = createStore(reducer,intialState,composeEnhancer(applyMiddleware(thunk)))
export default store;