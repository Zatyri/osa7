import React, {useState} from 'react'
import { useDispatch} from 'react-redux'
import {commentAction} from '../reducers/blogReducer'
import {Table} from 'react-bootstrap'

const Comments = ({blog}) => {
    const dispatch = useDispatch()
    
    const [comment, setComment] = useState('')
  
    const handleSubmit = async (event) => {
        event.preventDefault()
        dispatch(commentAction(comment, blog))
        setComment('')
    }

    return (
        <>
        <h3>comments</h3>
            <form onSubmit={handleSubmit}>
                <input id='comment' type='text' name='comment' value={comment} onChange={({ target }) => setComment(target.value)}></input>
                <button>Send comment</button>
            </form>
            <Table striped>
                <tbody>
                    {blog.comments.map(comment => <tr key={comment.id}><td>{comment.comment}</td></tr> )}
                </tbody>
            </Table>
        </>
    )
}

export default Comments
