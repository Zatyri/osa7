import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
    switch(action.type){
        case 'INIT_BLOGS':
            return action.data
        case 'LIKE':            
            const index = state.findIndex(blog => blog.id === action.data)
            const updatedState = [...state]            
            updatedState[index].likes += 1         
            return updatedState
        case 'DELETE':
            const ind = state.findIndex(blog => blog.id === action.data)
            const newstate = [...state] 
            newstate.splice(ind,1)     
            return newstate
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

export default blogReducer