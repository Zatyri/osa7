import React, { useState } from 'react'
import {deleteBlogAction, likeAction} from '../reducers/blogReducer'
import { useDispatch} from 'react-redux'


const Blog = ({ blog, message }) => {

  const dispatch = useDispatch()

  const [visible, setVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleClick = () => {
    visible?setVisible(false):setVisible(true)
  }

  const handleAddLike = () => { 
    dispatch(likeAction(blog))
  }

  const handleDelete = () => {
    dispatch(deleteBlogAction(blog))
    message(`Blog ${blog.title} was deleted`)
  }

  const showAll = () => (
    <>
      <p>{blog.url}</p>
      <p className='like'>{blog.likes} <button className='like-button'onClick={handleAddLike}>like</button></p>
      <p>{blog.user.name}</p>
      <button className='delete-button' onClick={handleDelete}>delete</button>
    </>
  )

  return (
    <div style={blogStyle} className='blogs'>
      {blog.title} {blog.author} <button className='showButton' onClick={handleClick}>{visible?'hide':'show'}</button>
      {visible?showAll():''}
    </div>
  )
}

export default Blog
