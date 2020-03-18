import {
    FETCH_CATEGORY_REQUEST,
    FETCH_CATEGORY_SUCCESS,
    FETCH_CATEGORY_FAILURE,
    
} from './Action'

const initialState = {
    isLoading: false,
    query: "",
    categoryList: [],
    error: "",
    message: ""
}

const categoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_CATEGORY_REQUEST:
            return {
                ...state,
                isLoading: true,
                query: action.query
            }

        case FETCH_CATEGORY_SUCCESS:
            return {
                isLoading: false,
                categoryList: action.data,
                message: action.data,
                error: state.error
            }

        case FETCH_CATEGORY_FAILURE:
            return {
                isLoading: false,
                categoryList: state.data,
                error: action.error
            }


        default:
            return state
    }
}

export default categoryReducer

