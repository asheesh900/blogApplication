import React, { Component } from 'react'
import { connect } from 'react-redux'
import {getBlogs} from '../Redux/Action'
import Card from './Card'

class Home extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             readMore: "Read More...",
             blogs: []
        }
    }
    
    componentDidMount() {
        const blogs_url = `http://127.0.0.1:5000/`
        this.props.getBlogs(blogs_url)
        this.setState({
            blogs: this.props.blogs.blogs
        })
    }

    componentDidUpdate() {
        const blogs_url = `http://127.0.0.1:5000/`
        this.props.getBlogs(blogs_url)
    }


    render() {
        console.log(this.props.blogs.blogs)
        return (
            this.props.blogs.blogs ?
            (
                <div className = "text-center my-4">
                    <h1 className = "">Blogs</h1>
                    <div className="container my-4">
                        <div className="row m-3">
                            {
                                this.props.blogs.blogs.map(ele => {
                                    return <Card btn = {this.state.readMore} blog = {ele} key = {ele.id} />
                                })
                            }
                        </div>
                    </div>
                    
                </div>
            ) : 
            (
                <h1>Data is yet to come</h1>
            )
        )
        
    
        
    }
}

const mapStateToProps = (state) => ({
    blogs: state.reducer.blogs,
    state: state
})

const mapDispatchToProps = (dispatch) => ({
    getBlogs: (payload) => dispatch(getBlogs(payload))
})

export default connect (mapStateToProps, mapDispatchToProps)(Home)

