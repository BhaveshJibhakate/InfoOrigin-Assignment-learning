
import {createStore,applyMiddleware,combineReducers} from 'redux'

import userReducer from './reducer'
import { watchRegisterUser } from './saga'
import  createSagaMiddleware  from 'redux-saga'
import { composeWithDevTools } from 'redux-devtools-extension';


//first create instance of sagamiddleware using createSagaMiddleware and then store it in some variable
const sagaMiddleware=createSagaMiddleware()

//will create combine reducer
const rootReducer =combineReducers({
    user:userReducer
})


//now will crate store with saga middleware
// const store=createStore(rootReducer,composeWithDevTools(applyMiddleware(sagaMiddleware)))
const store=createStore(rootReducer,applyMiddleware(sagaMiddleware))

sagaMiddleware.run(watchRegisterUser)

export default store;