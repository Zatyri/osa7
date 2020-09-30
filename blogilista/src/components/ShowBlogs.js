import React, { useRef } from 'react'
import Createblog from './Createblog'
import Togglable from './Togglable'
import {notificationAction, clearNotificationAction} from '../reducers/notificationReducer'
import {getBlogsAction} from '../reducers/blogReducer'
import {useSelector, useDispatch} from 'react-redux'
import {Link} from 'react-router-dom'
import { Table } from 'react-bootstrap'


const ShowBlogs = () => {
    const dispatch = useDispatch()
    const message = useSelector(state => state.notifications)
    const blogs = useSelector(state => state.blogs)
    const user = useSelector(state => state.user)  
  
    const createBlogRef = useRef()

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
            <Table striped>
              <tbody>
                {blogs.map(blog =>
                <tr key={blog.id}>
                  <td>
                    <Link to={`/blogs/${blog.id}`}>
                      <div>{blog.title}</div>
                    </Link>
                  </td>
                  <td>
                    {blog.author}
                  </td>
                </tr>
                )}   
              </tbody>
            </Table>             
      </div>
    )
}

export default ShowBlogs
