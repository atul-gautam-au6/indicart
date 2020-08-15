import { PRODUCT_LIST_REQ, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAIL, PRODUCT_DETAILS_REQ, PRODUCT_DETAILS_SUCCESS, PRODUCT_DETAILS_FAIL, PRODUCT_SAVE_REQUEST, PRODUCT_SAVE_SUCCESS, PRODUCT_SAVE_FAIL } from "../actionType";

export function productListReducer(state={products:[]},action){

    switch (action.type) {
        case PRODUCT_LIST_REQ:
            return {loading:true,product:[]}
        
        case PRODUCT_LIST_SUCCESS:
            return {loading:false,products:action.payload};

        case PRODUCT_LIST_FAIL:
            return {loading:false,error:action.payload}            
    
        default:
            return state;
    }
}

export function productDetailReducer(state={products:{}},action){

    switch (action.type) {
        case PRODUCT_DETAILS_REQ:
            return {loading:true}
        
        case PRODUCT_DETAILS_SUCCESS:
            return {loading:false,products:action.payload};

        case PRODUCT_DETAILS_FAIL:
            return {loading:false,error:action.payload}            
    
        default:
            return state;
    }
}
export function productSaveReducer(state={product:{}},action){

    switch (action.type) {
        case PRODUCT_SAVE_REQUEST:
            return {loading:true}
        
        case PRODUCT_SAVE_SUCCESS:
            return {loading:false,success:true ,products:action.payload};

        case PRODUCT_SAVE_FAIL:
            return {loading:false,error:action.payload}            
    
        default:
            return state;
    }
}
