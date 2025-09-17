import React, { useState, useEffect } from 'react'
import { Container, PostCard } from '../Component/index'
import {LoadingScreen} from '../Component/index';
import { useSelector } from 'react-redux'

function AllPosts() {
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
                    <div className="min-h-[50vh] flex flex-col items-center justify-center text-center">
                        <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-red-100 to-pink-100 rounded-full flex items-center justify-center">
                            <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-bold text-slate-800 mb-4">Something went wrong</h3>
                        <p className="text-red-500 text-lg mb-8">{error}</p>
                        <button 
                            onClick={() => window.location.reload()}
                            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium rounded-xl hover:from-blue-600 hover:to-purple-600 transform hover:scale-105 transition-all duration-200 shadow-lg"
                        >
                            Try Again
                        </button>
                    </div>
                </Container>
            </div>
        )
    }

    return (
        <div className='w-full py-12'>
            <Container>
                {/* Page Header */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
                        All Posts
                    </h1>
                    <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                        Explore our complete collection of articles and stories
                    </p>
                    <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto mt-6"></div>
                </div>

                {postData.length > 0 ? (
                    <>
                        {/* Posts Count */}
                        <div className="flex items-center justify-between mb-8">
                            <p className="text-slate-600">
                                Showing <span className="font-semibold text-blue-600">{postData.length}</span> posts
                            </p>
                        </div>

                        {/* Posts Grid */}
                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8'>
                            {postData.map((post) => (
                                <div key={post.$id}>
                                    <PostCard {...post} />
                                </div>
                            ))}
                        </div>
                    </>
                ) : (
                    <div className="min-h-[50vh] flex flex-col items-center justify-center text-center">
                        <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
                            <svg className="w-12 h-12 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                        </div>
                        <h3 className="text-3xl font-bold text-slate-800 mb-4">No Posts Found</h3>
                        <p className="text-slate-600 mb-8 max-w-md">
                            There are no posts available at the moment. Check back later or create the first post!
                        </p>
                    </div>
                )}
            </Container>
        </div>
    )
}

export default AllPosts