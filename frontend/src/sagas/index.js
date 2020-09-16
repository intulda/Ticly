import { all, fork, call, take, put, takeEvery, takeLatest, throttle } from 'redux-saga/effects';

import memberSaga from "./member";

export default function* rootSaga() {
    yield all([
        fork(memberSaga),
    ])
}

//take: ex)take('LOG_IN') 로그인 액션이 실행될때까지 기다리겠다
//fork: 함수 실행 (비동기)
//call: 함수 실행 (동기)
//all: 동시 함수 실행