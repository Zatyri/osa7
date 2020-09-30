import React from 'react'
import {useSelector} from 'react-redux'


const User = ({id}) => {    
    const users = useSelector(state => state.user.users)    
    const user = users.find(x => x.id === id)

    return (
        <>
           <h2>{user.name}</h2> 
           <h3>added blogs</h3>
           <ul>
            {user.blogs.map(blog => <li key={blog.id}>{blog.title}</li>)}
           </ul>
        </>
    )
}

export default User
