export const LOGIN = 'LOGIN';
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGIN_MODAL_OPEN = 'LOGIN_MODAL_OPEN';
export const LOGIN_MODAL_CLOSE = 'LOGIN_MODAL_CLOSE';
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE';

export const loginRequestAction = (email, password) => {
    return {
        type: LOGIN_REQUEST,
        data: {
            email: email,
            password: password
        }
    }
}

export const logoutRequestAction = () => {
    return {
        type: LOGOUT_REQUEST,
    }
}

export const loginModalOpen = () => {
    return {
        type: LOGIN_MODAL_OPEN
    }
}

export const loginModalClose = () => {
    return {
        type: LOGIN_MODAL_CLOSE
    }
}