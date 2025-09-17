import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import service from '../appWrite/config'
import PostForm from '../Component/Post-Form/PostForm'
import { LoadingScreen } from '../Component'

function EditPost() {
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const { slug } = useParams()
  const navigate = useNavigate()
  
  useEffect(() => {
    if (slug) {
      service.getPost(slug).then((post) => {
        if (post) {
          setPost(post)
        } else {
          navigate("/")
        }
        setLoading(false)
      })
    } else {
      navigate("/")
    }
  }, [slug, navigate])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingScreen />
      </div>
    )
  }

  return post ? <PostForm post={post} /> : null
}

export default EditPost