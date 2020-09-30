import React, { useState } from 'react'
import blogService from '../services/blogs'
import { Form } from 'react-bootstrap'

const Createblog = ({ handleMessage, updateBlogs, hide }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleCreateBlog = async (event) => {
    event.preventDefault()

    try{      
      
      const request = await blogService.post({ title, author, url })      
      setTitle('')
      setAuthor('')
      setUrl('')
      updateBlogs()
      handleMessage(`A blog "${request.title}" by ${request.author} was created`)
      hide.current.toggleVisibility()
    } catch(ex) {
      console.log(ex.message)
      handleMessage('Error posting blog')
    }
  }

  return (

    <div>
      <h2>Create new</h2>
      <Form onSubmit={handleCreateBlog}>
        <Form.Group>
          <Form.Label>Title:</Form.Label>
          <Form.Control id="title" type="text" name="title" value={title} onChange={({ target }) => setTitle(target.value)}/>
          <Form.Label>Author:</Form.Label>
          <Form.Control id='author' type="text" name="author" value={author} onChange={({ target }) => setAuthor(target.value)}/>
          <Form.Label>URL:</Form.Label>
          <Form.Control id='url' type="text" name="url" value={url} onChange={({ target }) => setUrl(target.value)}/>
        
        <button id='submit-Blog-button' type="submit">Create</button>
        </Form.Group>
      </Form>
    </div>

  )
}

export default Createblog
