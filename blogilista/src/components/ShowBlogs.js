import React, { useRef } from 'react'
import Createblog from './Createblog'
import Togglable from './Togglable'
import {notificationAction, clearNotificationAction} from '../reducers/notificationReducer'
import {getBlogsAction} from '../reducers/blogReducer'
import {useSelector, useDispatch} from 'react-redux'
import {
  BrowserRouter as Router, Link
} from 'react-router-dom'


const ShowBlogs = () => {
    const dispatch = useDispatch()
    const message = useSelector(state => state.notifications)
    const blogs = useSelector(state => state.blogs)
    const user = useSelector(state => state.user)  
  
    const createBlogRef = useRef()

    const blogStyle = {
      paddingTop: 10,
      paddingLeft: 2,
      border: 'solid',
      borderWidth: 1,
      marginBottom: 5
    }

      const updateBlogs = () => {
        dispatch(getBlogsAction())
      }

      const handleMessage = (text) => { 
        dispatch(notificationAction(text))
        setTimeout(() => {
          dispatch(clearNotificationAction())
        }, 5000)
      }

    return (
        <div>
            <h2>blogs</h2>
            <p>{message}</p>            
            {user.loggedIn?<Togglable buttonLabel="Show create blog form" ref={createBlogRef}>
            <Createblog handleMessage={handleMessage} updateBlogs={updateBlogs} hide={createBlogRef}/>
            </Togglable>:''}     
              {blogs.map(blog =>
               <Link to={`/blogs/${blog.id}`} key={blog.id}><div style={blogStyle}>{blog.title} by {blog.author}</div></Link>
              )}              
      </div>
    )
}

export default ShowBlogs
