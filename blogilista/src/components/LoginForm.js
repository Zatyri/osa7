import React , { useState } from 'react'
import { notificationAction, clearNotificationAction } from '../reducers/notificationReducer'
import blogService from '../services/blogs'
import loginService from '../services/login'
import {userLoggedInAction} from '../reducers/userReducer'

import {useSelector,useDispatch} from 'react-redux'

const LoginForm = () => {
    const dispatch = useDispatch()
    const message = useSelector(state => state.notifications)

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = async (event) => {
        event.preventDefault()

        try{
          const user = await loginService.login({ username, password })
          setUsername('')
          setPassword('')
          dispatch(userLoggedInAction(user))
          window.localStorage.setItem(
            'userLogin', JSON.stringify(user)
          )
          blogService.setToken(user.token)

        } catch (ex) {
          handleMessage('Wrong username or password')
        }
      }

      const handleMessage = (text) => { 
        dispatch(notificationAction(text))
        setTimeout(() => {
          dispatch(clearNotificationAction())
        }, 5000)
      }

    return (
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
}

export default LoginForm
