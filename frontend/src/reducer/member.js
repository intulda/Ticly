import {
    LOGIN_MODAL_OPEN,
    LOGIN_MODAL_CLOSE,
    LOGIN_FAILURE,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGOUT_REQUEST, LOGOUT_SUCCESS, LOGOUT_FAILURE
} from "../action/member";

export const initialState = {
    isLoginModalOpen: false,
    isLoggedIn: sessionStorage.getItem("userInfo") != null ? true : false,
    fetchingUpdate: false,
    user: sessionStorage.getItem("userInfo") != null ? JSON.parse(sessionStorage.getItem("userInfo")) : {}
}

const reducer = (state = initialState, action) => {
    console.log(action.type);
    switch (action.type) {
        case LOGIN_MODAL_OPEN:
            return {
                ...state,
                isLoginModalOpen: true
            }
        case LOGIN_MODAL_CLOSE:
            return {
                ...state,
                isLoginModalOpen: false
            }
        case LOGIN_REQUEST:
            return {
                ...state,
                fetchingUpdate: true
            }
        case LOGIN_SUCCESS:
            return {
                ...state,
                isLoggedIn: true,
                isLoginModalOpen: false,
                fetchingUpdate: false,
                user: action.data
            }
        case LOGIN_FAILURE:
            return {
                ...state,
                fetchingUpdate: false
            }
        case LOGOUT_REQUEST:
            return {
                ...state,
                fetchingUpdate: true,
            }
        case LOGOUT_SUCCESS:
            return {
                ...state,
                isLoggedIn: false,
                fetchingUpdate: false,
                user: {},
            }
        case LOGOUT_FAILURE:
            return {
                ...state
            }
        default:
           return state;
    }
}

export default reducer;