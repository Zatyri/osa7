import React from 'react'
import {useSelector} from 'react-redux'
import {Table} from 'react-bootstrap'


const User = ({id}) => {    
    const users = useSelector(state => state.user.users)    
    const user = users.find(x => x.id === id)

    return (
        <>
           <h2>{user.name}</h2> 
           <h3>added blogs</h3>
           <Table striped>
               <tbody>
                    {user.blogs.map(blog => <tr key={blog.id}><td >{blog.title}</td></tr>)}
                </tbody>
           </Table>
        </>
    )
}

export default User
