import React, { Component } from 'react'
import {getCategories, createCategoryAction} from '../Redux/Categories/Action'
import {connect} from 'react-redux'
import {createBlogAction} from '../Redux/BlogCreation/Action'


class CreateBlog extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             categoryId: "",
             title: "",
             content: "",
             category: ""
        }
    }

    handleChange = (e) => {
        this.setState ({
            [e.target.name]: e.target.value
        })
    }

    createBlog = (e) => {
        e.preventDefault()
        const blogInfo = {
            category_id: this.state.categoryId,
            blog_title: this.state.title,
            blog_content: this.state.content
        }
        const createBlogUrl = `http://127.0.0.1:5000/blog/create`
        const token = this.props.ifToken

        this.props.createBlogAction(blogInfo, createBlogUrl, token)
    }

    createCategory = async(e) => {
        e.preventDefault()
        const categoryInfo = {
            category: this.state.category
        }
        const categoryUrl = `http://127.0.0.1:5000/category/create`
        
        await this.props.createCategoryAction(categoryInfo, categoryUrl)

        const getCategoryUrl = `http://127.0.0.1:5000/category/create`
        this.props.getCategories(getCategoryUrl)
    }

    componentDidMount() {
        const getCategoryUrl = `http://127.0.0.1:5000/category/create`
        this.props.getCategories(getCategoryUrl)
    }

    
    render() {
        console.log(this.props.ifToken)
        let options = []
        if (this.props.categoryList.categories) {
            for(let i = 0; i < this.props.categoryList.categories.length; i++) {
                options.push (
                    <option value = {this.props.categoryList.categories[i].id}>
                        {this.props.categoryList.categories[i].category}
                    </option>
                )
            }
        }
        // console.log(options)
        return (
            <div>
                <h1 className="text-center m-4">Create your blog</h1>
                <div className="container">
                    <form>
                    <div className="form-group">
                        <label htmlFor="exampleFormControlSelect1">Category</label>
                        <select name = "categoryId" onChange = {(e) => this.handleChange(e)}  className="form-control" id="exampleFormControlSelect1">
                        <option>choose...</option>
                        {options}
                        </select>
                    <div className="form-group">
                        <label htmlFor="exampleFormControlInput1">Category</label>
                        <input name = "category" onChange = {(e) => this.handleChange(e)} type="text" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com"/>
                    </div>
                    <button onClick = {this.createCategory} type="button" className="btn btn-primary btn-lg btn-block">Create Category</button>
                    <div className="form-group">
                        <label htmlFor="exampleFormControlInput1">Blog Title</label>
                        <input name = "title" onChange = {(e) => this.handleChange(e)} type="text" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com"/>
                    </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleFormControlTextarea1">Content</label>
                        <textarea name = "content" onChange = {(e) => this.handleChange(e)} className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                    </div>
                    <button onClick = {this.createBlog} type="button" className="btn btn-primary btn-lg btn-block">Create Blog</button>
                    </form>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    categoryList: state.categoryReducer.categoryList,
    ifToken: state.reducer.ifToken,
    state: state
})

const mapDispatchToProps = (dispatch) => ({
    getCategories: (payloadUrl) => dispatch(getCategories(payloadUrl)),
    
    createBlogAction: (payloadBlogInfo, payloadUrl, token) =>
     dispatch(createBlogAction(payloadBlogInfo, payloadUrl, token)),

    createCategoryAction: (payloadCategoryInfo, payloadUrl) =>
     dispatch(createCategoryAction(payloadCategoryInfo, payloadUrl))

})

export default connect(mapStateToProps, mapDispatchToProps) (CreateBlog)
