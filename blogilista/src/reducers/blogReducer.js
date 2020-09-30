import blogService from '../services/blogs'
import commentService from '../services/comments'



const blogReducer = (state = [], action) => {
    let index
    let updatedState
    switch(action.type){
        case 'INIT_BLOGS':
            return action.data
        case 'LIKE':            
            index = state.findIndex(blog => blog.id === action.data)
            updatedState = [...state]            
            updatedState[index].likes += 1         
            return updatedState
        case 'DELETE':
            index = state.findIndex(blog => blog.id === action.data)
            updatedState = [...state] 
            updatedState.splice(index,1)     
            return updatedState
        case 'COMMENT':
            index = state.findIndex(blog => blog.id === action.data.blog.id)
            updatedState = [...state]
            updatedState[index].comments.push(action.data.newComment)
            return updatedState
        default:
            return state
    }
}

export const getBlogsAction = () => {
    return async dispatch => {
        const blogs = await blogService.getAll()
        dispatch({
            type: 'INIT_BLOGS',
            data: blogs
        })
    }
}

export const likeAction = (blog) => {    
    const newBlog = { ...blog }
    newBlog.likes += 1
    newBlog.user = blog.user.id   
    return async dispatch => {
        await blogService.put(newBlog)
        dispatch({           
            type: 'LIKE',
            data: blog.id
        })
    }
}

export const deleteBlogAction = (content) => {   
    return async dispatch => {
        await blogService.delBlog(content)
        dispatch({
            type: 'DELETE',
            data: content.id
        })
    }
}

export const commentAction = (comment, blog) => {
    console.log(comment);
    console.log(blog.id);
    
    
    return async dispatch => {
        const newComment = await commentService.comment(comment, blog)
        dispatch({
            type: 'COMMENT',
            data: {newComment, blog}
        })
    }
}

export default blogReducer