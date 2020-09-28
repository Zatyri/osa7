import React, { useRef } from 'react'
import Blog from './Blog'
import Createblog from './Createblog'
import Togglable from './Togglable'
import Users from './Users'
import {notificationAction, clearNotificationAction} from '../reducers/notificationReducer'
import {getBlogsAction} from '../reducers/blogReducer'
import {userLoggedOutAction} from '../reducers/userReducer'
import {useSelector, useDispatch} from 'react-redux'


const ShowBlogs = () => {
    const dispatch = useDispatch()
    const message = useSelector(state => state.notifications)
    const blogs = useSelector(state => state.blogs)
    const user = useSelector(state => state.user)  
  
    const createBlogRef = useRef()

    const handleLogout = () => {
        window.localStorage.removeItem('userLogin')
        dispatch(userLoggedOutAction())
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
            <p>{user.loggedIn.name} is logged in <button onClick={handleLogout}>Logout</button></p>
            <Togglable buttonLabel="Show create blog form" ref={createBlogRef}>
            <Createblog handleMessage={handleMessage} updateBlogs={updateBlogs} hide={createBlogRef}/>
            </Togglable>
            {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} message={handleMessage}/>
            )}
            <Users/>
      </div>
    )
}

export default ShowBlogs
