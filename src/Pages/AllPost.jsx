import React, { useState, useEffect } from 'react'
import { Container, PostCard } from '../Component/index'
import {LoadingScreen} from '../Component/index';
import { useSelector } from 'react-redux'

function AllPosts() {
    // const [posts, setPosts] = useState([])
    // const [loading, setLoading] = useState(true)
    // const [error, setError] = useState(null)
    
    // useEffect(() => {
    //     let isMounted = true
        
    //     const fetchPosts = async () => {
    //         try {
    //             const postsData = await service.getPosts([])
    //             if (isMounted && postsData) {
    //                 setPosts(postsData.documents)
    //             }
    //         } catch (err) {
    //             if (isMounted) {
    //                 setError("Failed to load posts")
    //                 console.error("Error fetching posts:", err)
    //             }
    //         } finally {
    //             if (isMounted) setLoading(false)
    //         }
    //     }
        
    //     fetchPosts()
        
    //     // Cleanup function
    //     return () => {
    //         isMounted = false
    //     }
    // }, []) // Empty dependency array = runs only once on mount


    const { postData, loading, error } = useSelector((state) => state.post);

    if (loading) {
        return (
            <div className='w-full py-8'>
                <Container>
                    <LoadingScreen/>
                </Container>
            </div>
        )
    }

    if (error) {
        return (
            <div className='w-full py-8'>
                <Container>
                    <div className="text-center py-10 text-red-500 text-xl font-semibold">
                        {error}
                    </div>
                </Container>
            </div>
        )
    }

    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {postData.length > 0 ? (
                        postData.map((post) => (
                            <div key={post.$id} className='p-2 w-full md:w-1/2 lg:w-1/3 xl:w-1/4'>
                                <PostCard {...post} />
                            </div>
                        ))
                    ) : (
                        <div className="w-full text-center py-10">
                            <p className="text-gray-500 text-lg">No posts found</p>
                        </div>
                    )}
                </div>
            </Container>
        </div>
    )
}

export default AllPosts