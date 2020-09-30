import React, {useState} from 'react'
import blogService from '../services/blogs'
import { useDispatch, useSelector} from 'react-redux'
import {commentAction} from '../reducers/blogReducer'

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
            <ul>
                {blog.comments.map(comment => <li key={comment.id}>{comment.comment}</li>)
                }
            </ul>
      
            
        </>
    )
}

export default Comments
