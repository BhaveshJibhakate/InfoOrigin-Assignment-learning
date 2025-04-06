//yaha par hum action creator banayenge
import { REGISTER_USER,REGISTER_SUCCESS,REGISTER_FAILURE } from "./actiontypes"


export const registerUser=(userData)=>({
    type:REGISTER_USER,
    payload: userData
})

export const registerSuccess=(User)=>({
    type:REGISTER_SUCCESS,
    payload:User
})

export const registerFailure=(error)=>({
    type:REGISTER_FAILURE,
    payload:error
})

//ye action creators functional component me use honge action ko dispatch karne ke liye
