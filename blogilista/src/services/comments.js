import axios from 'axios'
const baseUrl = '/api/comments'

const comment = async (comment, blog)  => {
    const newComment = {
        comment: comment,
        blogId: blog.id
    }

    const request = await axios.post(baseUrl, newComment)
    return request.data
  }
  
  const getComment = async () => {
    const request = await axios.get(baseUrl)
    return request.data
  }

  export default {comment, getComment}