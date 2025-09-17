import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Container, LoadingScreen, LoginPrompt, PostCard } from "../Component/index";
import service from "../appWrite/config";

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const userData = useSelector((state) => state.auth.userData);

  useEffect(() => {
    service.getPosts().then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="w-full py-8 mt-4 text-center">
        <Container>
          <LoadingScreen/>
        </Container>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="min-h-[calc(100vh-140px)] flex items-center justify-center">
        <Container>
          <LoginPrompt />
        </Container>
      </div>
    );
  }

  return (
    <div className="py-12">
      <Container>
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
            Welcome to MegaBlog
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Discover amazing stories, insights, and creative content from our community of writers.
          </p>
        </div>

        {/* Posts Grid */}
        {posts.length > 0 ? (
          <>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-slate-800">Latest Posts</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {posts.map((post) => (
                <div key={post.$id}>
                  <PostCard {...post} />
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-20">
            <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
              <svg className="w-12 h-12 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-slate-800 mb-4">No Posts Yet</h3>
            <p className="text-slate-600 mb-8">Be the first to share your story with the community!</p>
            <button className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium rounded-xl hover:from-blue-600 hover:to-purple-600 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl">
              Create Your First Post
            </button>
          </div>
        )}
      </Container>
    </div>
  );
}

export default Home;