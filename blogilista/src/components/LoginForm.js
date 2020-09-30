import React , { useState } from 'react'
import { notificationAction, clearNotificationAction } from '../reducers/notificationReducer'
import blogService from '../services/blogs'
import loginService from '../services/login'
import {userLoggedInAction} from '../reducers/userReducer'
import {useHistory} from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'

import {useSelector,useDispatch} from 'react-redux'

const LoginForm = () => {
    const dispatch = useDispatch()
    const message = useSelector(state => state.notifications)

    const history = useHistory()

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
          history.push('/')

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
            <Form onSubmit={handleLogin}>
              <Form.Group>
              <Form.Label>username:</Form.Label>
                <Form.Control
                  id='username'
                  type="text"
                  name="username"
                  value={username} onChange={({ target }) => setUsername(target.value)}
                /> 
                <Form.Control
                  id='password'
                  type="text"
                  name="password"
                  value={password} onChange={({ target }) => setPassword(target.value)}
                /> 
                <Button variant='primary' id='login-button' type="submit">Login</Button>
              </Form.Group>
            </Form>
        </>
    )
}

export default LoginForm
