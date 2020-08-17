import { MY_ORDER_LIST_REQUEST, MY_ORDER_LIST_SUCCESS, MY_ORDER_LIST_FAIL } from "../actionType";

export const myOrderListReducer =(state={orders:[]},action)=>{

    switch (action.type) {
        case MY_ORDER_LIST_REQUEST:
            return {loading:true}
        case MY_ORDER_LIST_SUCCESS:
            return {loading:false,orders:action.payload}
        case MY_ORDER_LIST_FAIL:
            return {loading:false,error:action.payload}
        default:
            return state;
    }

}