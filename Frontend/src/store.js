import {createStore, applyMiddleware, compose, combineReducers} from 'redux'
import thunk from 'redux-thunk'
import reducer from './Redux/Reducer'
import categoryReducer from './Redux/Categories/Reducer'
import blogCreationReducer from './Redux/BlogCreation/Reducer'

const rootReducer = combineReducers({reducer, categoryReducer, blogCreationReducer})

const store = createStore(rootReducer,
    compose(applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    ));
export {store};