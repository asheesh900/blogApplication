import axios from 'axios'

// action.types
const FETCH_CREATE_REQUEST = "FETCH_CREATE_REQUEST"
const FETCH_CREATE_SUCCESS = "FETCH_CREATE_SUCCESS"
const FETCH_CREATE_FAILURE = "FETCH_CREATE_FAILURE"


// action creators
const fetchPostRequest = query => {
    return {
        type: FETCH_CREATE_REQUEST,
        query: query || ""
    }
}

const fetchPostSuccess = data => {
    return {
        type: FETCH_CREATE_SUCCESS,
        data: data
    }
}

const fetchPostFailure = error => {
    return {
        type: FETCH_CREATE_FAILURE,
        error: error
    }

}

// action to fetch the data
const createBlogAction = (payloadBlogInfo, payloadUrl, token) => {
    return dispatch => {
        dispatch(fetchPostRequest)
        return axios
            .post(payloadUrl, payloadBlogInfo, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token
                }
            })
            .then(res => {
                alert("post request for blog creation success")
                return dispatch (fetchPostSuccess(res.data))
            })
            .catch(err => dispatch(fetchPostFailure(err)))
    }
}

export {
    createBlogAction,
    fetchPostRequest,
    fetchPostSuccess,
    fetchPostFailure,
    FETCH_CREATE_REQUEST,
    FETCH_CREATE_SUCCESS,
    FETCH_CREATE_FAILURE
}