import React from 'react'
import { Container } from '../Component'
import PostForm from '../Component/Post-Form/PostForm' 

function AddPost() {
  return (
    <div className='py-8'>
        <Container>
            <PostForm />
        </Container>
    </div>
  )
}

export default AddPost