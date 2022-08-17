import Data from './data'
import Cart from './cart'
import Qty from './qty'
import WishList from './wishlist'
import Login from './login'
import { combineReducers } from 'redux'


const rootReducer = combineReducers({
   Data,
   Cart,
   Qty,
   WishList,
   Login
})

export default rootReducer
