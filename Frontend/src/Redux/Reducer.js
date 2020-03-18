import {
    FETCH_REGISTER_REQUEST,
    FETCH_REGISTER_SUCCESS,
    FETCH_REGISTER_FAILURE,
    LOGOUT,
    FETCH_BLOGS_REQUEST,
    FETCH_BLOGS_SUCCESS,
    FETCH_BLOGS_FAILURE
} from './Action'

const initialState = {
    isLoading: false,
    ifToken: "",
    query: "",
    data: [],
    login_response: [],
    error: "",
    blogs: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_REGISTER_REQUEST:
            return {
                ...state,
                isLoading: true,
                query: action.query
            }
        
        case FETCH_REGISTER_SUCCESS:
            const loginResponse = JSON.stringify(action.data)
            localStorage.setItem("loginResponse", loginResponse)
            if(action.data.message === "Signin Successful!") {
                return {
                    isLoading: false,
                    data: action.data,
                    error: state.error,
                    ifToken: action.data.token,
                    isLogin: true,
                }
            } else {
                return {
                    isLoading: false,
                    data: action.data,
                    error: state.error,
                }
            }
            
        
        case FETCH_REGISTER_FAILURE:
            return {
                isLoading: false,
                data: state.data,
                error: action.error
            }

        case LOGOUT:
            return {
                ifToken: ""
            }

        case FETCH_BLOGS_REQUEST:
            return {
                ...state,
                query: action.query
            }
        case FETCH_BLOGS_SUCCESS:
            return {
                ...state,
                blogs: action.data
            }
        case FETCH_BLOGS_FAILURE:
            return {
                ...state,
                error: action.error
            }

        default:
            return state
    }
}

export default reducer