import {LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT_REQUEST, LOGOUT_SUCCESS, LOGOUT_FAILURE} from '../action/member';
import {all, fork, put, call, takeLatest, delay} from 'redux-saga/effects';

import axios from 'axios';

function loginAPI(data) {
    return axios('/api/member/signin',{
        method: 'POST',
        data: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

function* login(action) {
    console.log(action);
    try {
        const result = yield call(loginAPI, action.data);
        sessionStorage.setItem("userInfo", JSON.stringify(result.data));
        yield put({
            type: LOGIN_SUCCESS,
            data: result.data
        });
    } catch (err) {
        yield put({
            type: 'LOGIN_FAILURE',
            data: err.response.data
        })
    }
}

function* watchLogin() {
    yield takeLatest(LOGIN_REQUEST, login);
}

function* logout(action) {
    try {
        // const result = yield call(loginAPI, action.data);
        sessionStorage.removeItem("userInfo");
        delay(1000);
        yield put({
            type: LOGOUT_SUCCESS,
        });
    } catch (err) {
        yield put({
            type: LOGOUT_FAILURE,
        })
    }
}

function* watchLogout() {
    yield takeLatest(LOGOUT_REQUEST, logout);
}

export default function* memberSaga() {
    yield all([
        fork(watchLogin),
        fork(watchLogout),
    ])
}