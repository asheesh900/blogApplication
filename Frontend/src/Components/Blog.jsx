import React, { Component } from 'react'
import {connect} from 'react-redux'

class Blog extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             
        }
    }
    
    render() {
        console.log(this.props)
        return (
            <div>
                <h1>Thanks Rahul</h1>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    blogs: state.reducer.blogs,
    state: state
})

const mapDispatchToProps = (dispatch) => ({

})

export default connect(mapStateToProps, null)(Blog)

