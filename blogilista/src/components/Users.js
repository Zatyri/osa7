import React, {useEffect, useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {getUsersAction} from '../reducers/userReducer'
import User from './User'
import { Table } from 'react-bootstrap'


const Users = () => {

    const linkStyle = {
        color: 'blue',
        cursor: 'pointer',
        textDecoration: 'underline'
    }

    

    const dispatch = useDispatch()
    const users = useSelector(state => state.user.users)    
    
    const [userId, setUserId] = useState(undefined)

    useEffect(()=> {
        dispatch(getUsersAction())
    },[dispatch])

    const handleClick = (id) => {        
        setUserId(id)
    }

    const allUsers = () => (
        <>
        <h2>Users</h2>
        <Table striped>
            <tbody>
                <tr>
                    <th>
                        User
                    </th>
                    <th>
                        Blogs created
                    </th>
                </tr>
                {users.map(user => <tr key={user.id}><td style={linkStyle} onClick={() => handleClick(user.id)} >{user.name}</td><td>{user.blogs.length}</td></tr>)
                }
            </tbody>
        </Table>
        </>
    )

    const specificUser = () => (
        <>
            <User id={userId}/>
            <button onClick={() => setUserId(undefined)}>back</button>
        </>
    )

    return (
        userId?specificUser():allUsers()
    )
}

export default Users
