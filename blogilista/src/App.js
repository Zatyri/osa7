import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Createblog from './components/Createblog'
import Togglable from './components/Togglable'
import {notificationAction, clearNotificationAction} from './reducers/notificationReducer'
import {getBlogsAction} from './reducers/blogReducer'
import {useSelector, useDispatch} from 'react-redux'

const App = () => {
   const dispatch = useDispatch()
   const message = useSelector(state => state.notifications)
  const blogs = useSelector(state => state.blogs)
  
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)  
  const createBlogRef = useRef()

  useEffect(() => {

    dispatch(getBlogsAction())
  }, [dispatch])

  const handleLogin = async (event) => {
    event.preventDefault()
    try{
      const user = await loginService.login({ username, password })
      setUser(user)
      window.localStorage.setItem(
        'userLogin', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUsername('')
      setPassword('')
    } catch (ex) {
      handleMessage('Wrong username or password')
    }
  }

  useEffect(() => {
    const userLoggedIn = window.localStorage.getItem('userLogin')
    if(userLoggedIn){
      const user = JSON.parse(userLoggedIn)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogout = () => {
    window.localStorage.removeItem('userLogin')
    setUser('')
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

  const loginForm = () => (
    <>
      <p>{message}</p>
      <form onSubmit={handleLogin}>
        <div>
        Username:
          <input id='username' type="text" value={username} onChange={({ target }) => setUsername(target.value)}>
          </input>
        </div>
        <div>
        Password:
          <input id='password' type="text" value={password} onChange={({ target }) => setPassword(target.value)}>
          </input>
        </div>
        <button id='login-button' type="submit">Login</button>
      </form>
    </>
  )

  const showBlogs = () => (
    <div>
      <h2>blogs</h2>
      <p>{message}</p>
      <p>{user.name} is logged in <button onClick={handleLogout}>Logout</button></p>
      <Togglable buttonLabel="Show create blog form" ref={createBlogRef}>
        <Createblog handleMessage={handleMessage} updateBlogs={updateBlogs} hide={createBlogRef}/>
      </Togglable>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} message={handleMessage} update={updateBlogs}/>
      )}
    </div>
  )

  return (
    <div>

      {user?showBlogs():loginForm()}
    </div>
  )
}

export default App