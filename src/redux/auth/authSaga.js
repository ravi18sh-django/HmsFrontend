import { call, put, takeLatest } from "redux-saga/effects";
import { loginApi, forgotPasswordApi } from "../../api/auth";
import { loginRequest, loginSuccess, loginFailure, forgetPasswordRequest, forgetPasswordSuccess, forgetPasswordFailure } from "./authSlice";

function* handleLogin(action) {
    try {
        //console.log('action ', action);
        
        const data = yield call(loginApi, action.payload);        
        if(data.message==='Login successful'){
            yield put(loginSuccess(data));
        }else{
            yield put(loginFailure(data?.message || "Login failed"));
        }
        
    } catch (error) {
                 
        yield put(loginFailure(error.response?.data?.message || "Login failed"));
    }
}


function* handleforgetPassword(action){
    try {
        const data = yield call (forgotPasswordApi, action.payload);
        yield put(forgetPasswordSuccess(data));        
    } catch (error) {
        yield put(forgetPasswordFailure(error.response?.data?.message || "Forget password failed"));        
    }
}

export default function* authSaga() {
    //console.log('loginRequest.type : ',loginRequest.type);    
    yield takeLatest(loginRequest.type, handleLogin);
    yield takeLatest(forgetPasswordRequest.type,handleforgetPassword);
}
