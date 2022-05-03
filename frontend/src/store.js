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
import {
  userLoginReducers,
  userRegisterReducers,
  userDetailsReducers,
  userUpdateProfileReducers,
} from "./reducers/userReducers";

export const STORAGE_NAME = "cartItems";
export const STORAGE_NAME_USER_INFO = "userInfo";
export const STORAGE_NAME_SHIPPING_ADDRESS =
  "shippingAddress";

const reducer = combineReducers({
  productList: productListReducers,
  productDetail: productDetailsReducers,
  cart: cartReducer,
  userLogin: userLoginReducers,
  userRegister: userRegisterReducers,
  userDetails: userDetailsReducers,
  userUpdateProfile: userUpdateProfileReducers,
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

const shippingAddressFromStorage = localStorage.getItem(
  STORAGE_NAME_SHIPPING_ADDRESS
)
  ? JSON.parse(
      localStorage.getItem(STORAGE_NAME_SHIPPING_ADDRESS)
    )
  : {};

const initialState = {
  cart: {
    cartItems: cartItemsFromStorage,
    shippingAddress: shippingAddressFromStorage,
  },
  userLogin: { userInfo: userInfoFromStorage },
};
const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
