import React, { Component } from 'react'
import { Route, Switch, Link } from 'react-router-dom'
import ErrorPage from '../Components/ErrorPage'
import Home from '../Components/Home'
import Login from '../Components/Login'
import Signup from '../Components/Signup'
import Details from '../Components/Details'
import { connect } from 'react-redux'
import {logout} from '../Redux/Action'
import Blog from '../Components/Blog'
import CreateBlog from '../Components/CreateBlog'

class Routes extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
        }
    }

    signOut = (e) => {
        e.preventDefault()
        localStorage.clear()
        this.props.logout()
    }
    
    
    render() {
        // console.log(this.props.isToken)
        return (
            <>
            {
            this.props.ifToken ?
            (
                <div className = "container-fluid bg-dark p-3">
                    <Link to = "/" className = "ml-4 text-white">Home</Link>
                    <button className = "float-right" onClick = {this.signOut}>Sign Out</button>
                </div>
                
                
            ) :
            (
                <div className = "container-fluid bg-dark p-3">
                    <Link to = "/" className = "ml-4 text-white">Home</Link>
                    <Link to = "/auth/login" className = "ml-4 text-white">Login</Link>
                    <Link to = "/auth/signup" className = "ml-4 text-white">Signup</Link>
                </div>
            )
            }

                <Switch>
                    <Route exact path = "/" component = {Home} />
                    <Route exact path = "/:id" render = {props => <Blog {...props}  />} />
                    <Route path = "/auth/login" component = {Login} />
                    <Route path = "/auth/signup" component = {Signup} />
                    <Route path = "/auth/details" component = {Details} />
                    <Route path = "/blog/create" component = {CreateBlog} />
                    <Route component = {ErrorPage} />
                </Switch>
            </>
        )
    }
}


const mapStateToProps = (state) => ({
    ifToken: state.reducer.ifToken,
    state: state
})

const mapDispatchToProps = (dispatch) => ({
    logout: () => dispatch(logout())
})

export default connect(mapStateToProps, mapDispatchToProps) (Routes)

