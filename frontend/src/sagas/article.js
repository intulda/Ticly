import {all, put, takeLatest, call, fork} from 'redux-saga/effects';
import {ARTICLE_SEARCH_FAILURE, ARTICLE_SEARCH_REQUEST, ARTICLE_SEARCH_SUCCESS} from "../action/acticle";
import axios from 'axios';

function getArticle(data) {
    return axios('/api/articleBoard/findLatestMyTypeArticle', {
        method: 'POST',
        data: JSON.stringify(data.categories),
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

function* searchArticle(action) {
    try {
        const result = yield call(getArticle, action.data);
        yield put({
            type: ARTICLE_SEARCH_SUCCESS,
            data: result.data
        })
    } catch (err) {
        yield put({
            type: ARTICLE_SEARCH_FAILURE,
            data: err.response.data
        })
    }
}

function* searchArticleRequest() {
    yield takeLatest(ARTICLE_SEARCH_REQUEST, searchArticle)
}

export default function* articleSaga() {
    yield all([
        fork(searchArticleRequest),
    ])
}