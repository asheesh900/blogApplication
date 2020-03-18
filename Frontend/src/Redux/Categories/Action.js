import axios from 'axios'

// action.type
const FETCH_CATEGORY_REQUEST = "FETCH_CATEGORY_REQUEST"
const FETCH_CATEGORY_SUCCESS = "FETCH_CATEGORY_SUCCESS"
const FETCH_CATEGORY_FAILURE = "FETCH_CATEGORY_FAILURE"
const POST_CREATED_CATEGORY = "POST_CREATED_CATEGORY"

// action creators
const fetchGetRequest = query => {
    return {
        type: FETCH_CATEGORY_REQUEST,
        query: query || ""
    }
}

const fetchGetSuccess = data => {
    return {
        type: FETCH_CATEGORY_SUCCESS,
        data: data
    }
}

const fetchGetFailure = error => {
    return {
        type: FETCH_CATEGORY_FAILURE,
        error: error
    }
}

// action to fetch the data
const getCategories = (payloadUrl) => {
    return dispatch => {
        dispatch(fetchGetRequest)
        return axios
            .get(payloadUrl)
            .then(res => {
                // alert("get request success")
                // console.log(res.data)
                return dispatch(fetchGetSuccess(res.data))
            })
            .catch(err => dispatch(fetchGetFailure(err)))
    }
}

const createCategoryAction = (payloadCategoryInfo, payloadUrl) => {
    return dispatch => {
        // dispatch(fetchGetRequest)
        return axios
            .post(payloadUrl, payloadCategoryInfo)
            .then(res => {
                alert(res.data.message)
                // return dispatch(fetchGetSuccess(res.data))
            })
            .catch(err => console.log(err))
    }
}

export {
    createCategoryAction,
    getCategories,
    fetchGetRequest,
    fetchGetSuccess,
    fetchGetFailure,
    FETCH_CATEGORY_REQUEST,
    FETCH_CATEGORY_SUCCESS,
    FETCH_CATEGORY_FAILURE,
    POST_CREATED_CATEGORY
}