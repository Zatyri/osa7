import React from 'react'
import {deleteBlogAction, likeAction} from '../reducers/blogReducer'
import { useDispatch} from 'react-redux'
import {
  BrowserRouter as Router, Link, useParams
} from 'react-router-dom'


const Blog = ({ blogs, message }) => {

  const dispatch = useDispatch()

  const id = useParams().id

  const blog = blogs.find(x => x.id === id)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleAddLike = () => { 
    dispatch(likeAction(blog))
  }

  const handleDelete = () => {
    dispatch(deleteBlogAction(blog))
    message(`Blog ${blog.title} was deleted`)
  }

  return (    
    <div style={blogStyle} className='blogs'>
      <h2>{blog.title}</h2>
      <p>Link: {blog.url}</p>
      <p className='like'>{blog.likes} <button className='like-button'onClick={handleAddLike}>like</button></p>
      <p>added by {blog.user.name}</p>
      <button className='delete-button' onClick={handleDelete}>delete</button>
      <div><Link to='/'>Back to blogs</Link></div>
    </div>
    
  )
}

export default Blog
