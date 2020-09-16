import {ARTICLE_SEARCH_FAILURE, ARTICLE_SEARCH_REQUEST, ARTICLE_SEARCH_SUCCESS} from "../action/acticle";


const initialState = {
    isFetchingUpdate: false,
    categories: []
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