import React, { Component } from 'react'
import {Link} from 'react-router-dom'

export default class Card extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             
        }
    }

    // readBlog = () => {
    //     this.props.history.push("/blog")
    // }
    
    render() {
        return (
                <div className="col-lg-6 col-sm-12 d-flex my-2">
                    <div className="card text-white bg-dark mb-3 m-auto" style = {{height: "300px", width: "350px"}}>
                        <div className="card-header">Blog</div>
                        <div className="card-body">
                            <h5 className="card-title">{this.props.blog.title}</h5>
                            <p className="card-text">{this.props.blog.content} </p>
                            <p className="card-text">{this.props.blog.created_at} </p>
                            <p className="card-text">{this.props.blog.updated_at} </p>
                            <Link to = {`/${this.props.blog.id}`}><button>{this.props.btn}</button> </Link>
                        </div>
                    </div>
                </div>

        )
    }
}
