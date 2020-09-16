import {ARTICLE_SEARCH_FAILURE, ARTICLE_SEARCH_REQUEST, ARTICLE_SEARCH_SUCCESS} from "../action/acticle";

let user = null;
if(sessionStorage.getItem("userInfo") != null) {
    user = JSON.parse(sessionStorage.getItem("userInfo"));
}

const initialState = {
    isFetchingUpdate: false,
    categories:  user != null ? user.userInfo.categories : ['개발', '디자인', '경제'],
    list: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ARTICLE_SEARCH_REQUEST:
            return {
                ...state,
                isFetchingUpdate: true
            }
        case ARTICLE_SEARCH_SUCCESS:
            return {
                ...state,
                list: action.data,
                isFetchingUpdate: false
            }
        case ARTICLE_SEARCH_FAILURE:
            return {
                ...state,
                isFetchingUpdate: false
            }
        default:
            return state
    }
}

export default reducer;