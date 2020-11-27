import {combineReducers,createStore,applyMiddleware} from 'redux';
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";
//import Reducer
import LevelOneReducer from './LevelOneReducer';
import UserReducer from './UserReducer';
import ErrorReducer from './ErrorReducer';
const store=createStore(combineReducers({LevelOneReducer,UserReducer,ErrorReducer}),composeWithDevTools(applyMiddleware(thunk)));
export default store;