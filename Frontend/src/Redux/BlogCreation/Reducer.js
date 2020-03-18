import {
    FETCH_CREATE_REQUEST,
    FETCH_CREATE_SUCCESS,
    FETCH_CREATE_FAILURE
} from './Action'

const initialState = {
    isLoading: false,
    query: "",
    response: "",
    error: ""
}

const blogCreationReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_CREATE_REQUEST:
            return {
                ...state,
                isLoading: true,
                query: action.query
            }

        case FETCH_CREATE_SUCCESS:
            return {
                isLoading: false,
                response: action.data,
                error: state.error
            }

        case FETCH_CREATE_FAILURE:
            return {
                isLoading: false,
                response: state.data,
                error: action.error
            }
        
        default:
            return state
    }
}

export default blogCreationReducer