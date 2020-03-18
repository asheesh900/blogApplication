import axios from 'axios'

// actions
const FETCH_REGISTER_REQUEST = 'FETCH_REGISTER_REQUEST'
const FETCH_REGISTER_SUCCESS = 'FETCH_REGISTER_SUCCESS'
const FETCH_REGISTER_FAILURE = 'FETCH_REGISTER_FAILURE'
const LOGOUT = "LOGOUT"


// action creators
const fetchPostRequest = query => {
    return {
        type: FETCH_REGISTER_REQUEST,
        query: query || ""
    }
}

const fetchPostSuccess = data => {
    console.log("fetch post success action called")
    return {
        type: FETCH_REGISTER_SUCCESS,
        data: data
    }
}

const fetchPostFailure = error => {
    console.log("fetch post failure action called")
    return {
        type: FETCH_REGISTER_FAILURE,
        error: error
    }
}

// action to fetch the data
const registerUser = (payloadUserInfo, payloadUrl) => {
    return dispatch => {
        dispatch(fetchPostRequest)
        return axios
            .post(payloadUrl, payloadUserInfo)
            .then(res => {
                alert(res.data.message)
            })
            .catch(err => dispatch(fetchPostFailure(err)))

    }
}

const checkUser = (payloadUserCredential, payloadLoginUrl) => {
    return dispatch => {
        dispatch(fetchPostRequest)

        return axios
            .post(payloadLoginUrl, payloadUserCredential)
            .then(res => {
                alert(res.data.message)
                return dispatch(fetchPostSuccess(res.data))
            })
            .catch(err => dispatch(fetchPostFailure(err)))
    }
}

const logout = () => {
    return {
        type: LOGOUT
    }
}

const FETCH_BLOGS_REQUEST = "FETCH_BLOGS_REQUEST"
const FETCH_BLOGS_SUCCESS = "FETCH_BLOGS_SUCCESS"
const FETCH_BLOGS_FAILURE = "FETCH_BLOGS_FAILURE"

const fetchBlogsRequest = query => {
    return {
        type: FETCH_BLOGS_REQUEST,
        query: query || ""
    }
}

const fetchBlogsSuccess = data => {
    return {
        type: FETCH_BLOGS_SUCCESS,
        data: data
    }
}

const fetchBlogsFailure = error => {
    return {
        type: FETCH_BLOGS_FAILURE,
        error: error
    }
}

const getBlogs = (payload) => {
    return dispatch => {
        dispatch(fetchBlogsRequest)

        return axios
            .get(payload)
            .then(res => {
                // alert(res.data)
                return dispatch(fetchBlogsSuccess(res.data))
            })
            .catch(err => dispatch(fetchBlogsFailure(err)))
    }
}

export {
    
    logout,
    registerUser,
    checkUser,
    fetchPostFailure,
    fetchPostRequest,
    fetchPostSuccess,
    FETCH_REGISTER_FAILURE,
    FETCH_REGISTER_SUCCESS,
    FETCH_REGISTER_REQUEST,
    LOGOUT,
    FETCH_BLOGS_REQUEST,
    FETCH_BLOGS_SUCCESS,
    FETCH_BLOGS_FAILURE,
    fetchBlogsRequest,
    fetchBlogsSuccess,
    fetchBlogsFailure,
    getBlogs
}

