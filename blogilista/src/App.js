import React, { useEffect } from 'react'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import Users from './components/Users'
import ShowBlogs from './components/ShowBlogs'
import Blog from './components/Blog'
import {getBlogsAction} from './reducers/blogReducer'
import {userLoggedInAction, userLoggedOutAction} from './reducers/userReducer'
import {useSelector, useDispatch} from 'react-redux'
import {
  BrowserRouter as Router, Switch, Route, Link
} from 'react-router-dom'
import {Nav, Navbar} from 'react-bootstrap'

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

  const handleLogout = () => {
    window.localStorage.removeItem('userLogin')
    dispatch(userLoggedOutAction())
  }

  const padding = { padding: 5 }

  return (
    <div className='container'>
      <Router>
        <Navbar collapseOnSelect expand='lg' bg='dark' variant='dark'>
          <Navbar.Toggle aria-controls='responsive-navbar-nav'/>
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className='mr-auto'>
            <Nav.Link href='#' as='span'>
              <Link style={padding} to='/'>blogs</Link>
                </Nav.Link>          
                <Nav.Link href='#' as='span'>
                  <Link style={padding} to='/users'>users</Link>
                </Nav.Link>          
                <Nav.Link href='#' as='span'>
                  {user.loggedIn?<span>{user.loggedIn.name} is logged in <button onClick={handleLogout}>Logout</button></span>:<Link to='/login'>login</Link>}  
                </Nav.Link>
            </Nav>
          </Navbar.Collapse>      
        </Navbar>
        <Switch>
          <Route path="/blogs/:id">
            <Blog />
          </Route>
          <Route exact path='/'>
            <ShowBlogs></ShowBlogs>
          </Route>
          <Route path='/users'>
            <Users></Users>
          </Route>
          <Route path='/login'>
            <LoginForm></LoginForm>
          </Route>
        </Switch>
      </Router>
    </div>
  )
}

export default App