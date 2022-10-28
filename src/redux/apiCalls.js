import React from 'react'
import { publicRequest } from '../requestMethod';
import { loginFailure, loginSucess,loginStart } from './userRedux'
import jwt_decode from "jwt-decode";

export const login = async (dispatch,user) => {
 dispatch(loginStart());
 try{
    const res =await publicRequest.post("/authenticate",user)
    const decoded = jwt_decode(res.data);
    console.log(decoded);
    localStorage.setItem('token', res.data);
    dispatch(loginSucess(res.data));
 }
 catch(err){
    dispatch(loginFailure());
 }
}

 