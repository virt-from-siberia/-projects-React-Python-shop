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

export const STORAGE_NAME = "cartItems";

const reducer = combineReducers({
  productList: productListReducers,
  productDetail: productDetailsReducers,
  cart: cartReducer,
});

const cartItemsFromStorage = localStorage.getItem(
  STORAGE_NAME
)
  ? JSON.parse(localStorage.getItem(STORAGE_NAME))
  : [];

const initialState = {
  cart: { cartItems: cartItemsFromStorage },
};
const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
