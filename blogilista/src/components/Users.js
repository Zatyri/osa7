import React, {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {getUsersAction} from '../reducers/userReducer'


const Users = () => {
    const dispatch = useDispatch()
    const users = useSelector(state => state.user.users)    
    
    useEffect(()=> {
        dispatch(getUsersAction())
    },[])

    return (
        <>
        <h2>Users</h2>
        <table>
            <tbody>
                <tr>
                    <th>
                        User
                    </th>
                    <th>
                        Blogs created
                    </th>
                </tr>
                {users.map(user => <tr key={user.id}><td>{user.name}</td><td>{user.blogs.length}</td></tr>)
                }
            </tbody>
        </table>
            
        </>
    )
}

export default Users
