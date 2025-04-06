
// is file me sare side effects jaise ki api call karte hai 

// isme 2 generator functions hote hai jinko worker saga and and watcher saga ===wather saga action ko
//sunta hai
import { REGISTER_FAILURE, REGISTER_SUCCESS, REGISTER_USER } from "./actiontypes"
import {put,call,takeLatest} from 'redux-saga/effects'
import axios from 'axios'

function* registerUserSaga(action){
    try {
        const response=yield call(()=>
        axios.post("https://jsonplaceholder.typicode.com/users",action.payload)
    )
    yield put({type:REGISTER_SUCCESS,payload:response.data})

    } catch (error) {
        yield put({type:REGISTER_FAILURE,payload:error.message})
    }
}


// ye wala  REGISTER_USER  is action ko sunte rahega and jab bhi ye trigger hogi tabl registerUserSaga ko call karega
 export function* watchRegisterUser(){
    yield takeLatest(REGISTER_USER,registerUserSaga)

}