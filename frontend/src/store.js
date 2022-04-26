import {
  createStore,
  combineReducers,
  applyMiddleware,
} from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  productListReducers,
  productDetailsReducers,
} from "./reducers/productReducers";
import { cartReducer } from "./reducers/cardReducers";
import { userLoginReducers } from "./reducers/userReducers";

export const STORAGE_NAME = "cartItems";
export const STORAGE_NAME_USER_INFO = "userInfo";

const reducer = combineReducers({
  productList: productListReducers,
  productDetail: productDetailsReducers,
  cart: cartReducer,
  userLogin: userLoginReducers,
});

const cartItemsFromStorage = localStorage.getItem(
  STORAGE_NAME
)
  ? JSON.parse(localStorage.getItem(STORAGE_NAME))
  : [];

const userInfoFromStorage = localStorage.getItem(
  STORAGE_NAME_USER_INFO
)
  ? JSON.parse(localStorage.getItem(STORAGE_NAME_USER_INFO))
  : null;

const initialState = {
  cart: { cartItems: cartItemsFromStorage },
  userLogin: { userInfo: userInfoFromStorage },
};
const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
