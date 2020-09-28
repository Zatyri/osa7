import React, { useEffect } from 'react'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import {getBlogsAction} from './reducers/blogReducer'
import {userLoggedInAction} from './reducers/userReducer'
import {useSelector, useDispatch} from 'react-redux'
import ShowBlogs from './components/ShowBlogs'

const App = () => {
  const dispatch = useDispatch()

  const user = useSelector(state => state.user)

  useEffect(() => {
    dispatch(getBlogsAction())
  }, [dispatch])

  useEffect(() => {
    const userLoggedIn = window.localStorage.getItem('userLogin')
    if(userLoggedIn){
      const user = JSON.parse(userLoggedIn)
      dispatch(userLoggedInAction(user))
      blogService.setToken(user.token)
    }
  }, [dispatch])

  const loginForm = () => (<LoginForm />)

  const showBlogs = () => (<ShowBlogs />)

  return (
    <div>

      {user?showBlogs():loginForm()}
    </div>
  )
}

export default App