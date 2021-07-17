import { combineReducers } from "redux";
import { cartReducer } from './cartReducer';
import { mainReducer } from './mainReducer';


export const rootReducer = combineReducers({
    cartReducer,
    mainReducer,
})