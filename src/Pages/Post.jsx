import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import service from "../appWrite/config";
import { Button, Container, LoadingScreen } from "../Component";
import parse from "html-react-parser";
import { deletePost as deletePostAction } from "../store/PostSlice";
import { Calendar, User, Edit, Trash2, ArrowLeft, Clock, Eye } from "lucide-react";

function Post() {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const { slug } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.userData);
  const postdata = useSelector((state) => state.post?.postData || []);

  useEffect(() => {
    const existingPost = postdata.find((p) => p.$id === slug);
    if (existingPost) {
      setPost(existingPost);
      setLoading(false);
    } else {
      service.getPost(slug).then((fetchedpost) => {
        if (fetchedpost) {
          setPost(fetchedpost);
        } else {
          navigate("/");
        }
        setLoading(false);
      });
    }
  }, [slug, postdata, navigate]);

  const deletePost = async () => {
    if (!post) return;
    
    if (window.confirm('Are you sure you want to delete this post?')) {
      dispatch(deletePostAction({ $id: post.$id }));
      const status = await service.deletePost(post.$id);
      if (status) {
        await service.deleteFile(post.featuredImage);
        navigate("/");
      }
    }
  };

  const isAuthor = useMemo(() => {
    if (!post || !userData) return false;
    
    const actualUserData = userData?.userData || userData;
    const currentUserId = actualUserData?.$id?.toString();
    const postUserId = post.userId?.toString();
    
    return currentUserId === postUserId;
  }, [post, userData]);

  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <LoadingScreen />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center text-center">
        <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-red-100 to-pink-100 rounded-full flex items-center justify-center">
          <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-slate-800 mb-4">Post Not Found</h3>
        <p className="text-slate-600 mb-8">The post you're looking for doesn't exist.</p>
        <Link 
          to="/" 
          className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium rounded-xl hover:from-blue-600 hover:to-purple-600 transform hover:scale-105 transition-all duration-200 shadow-lg"
        >
          Go Home
        </Link>
      </div>
    );
  }

  return (
    <div className="py-8 bg-gradient-to-br from-slate-50 to-blue-50 min-h-screen">
      <Container>
        <div className="max-w-7xl mx-auto">
          {/* Navigation Bar */}
          <div className="flex items-center justify-between mb-8">
            <button 
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 px-4 py-2 text-slate-600 hover:text-blue-600 hover:bg-white/80 rounded-lg transition-all duration-200 backdrop-blur-sm"
            >
              <ArrowLeft className="w-5 h-5" />
              Back
            </button>

            {/* Author Actions */}
            {isAuthor && (
              <div className="flex gap-3">
                <Link to={`/edit-post/${post.$id}`}>
                  <button className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200">
                    <Edit className="w-4 h-4" />
                    Edit Post
                  </button>
                </Link>
                <button 
                  onClick={deletePost}
                  className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
              </div>
            )}
          </div>

          {/* Main Content */}
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            {/* Featured Image Section - Full Width */}
            {post.featuredImage && (
              <div className="relative">
                <div className="w-full max-h-[500px] overflow-hidden bg-slate-100">
                  <img
                    src={service.getFilePreview(post.featuredImage)}
                    alt={post.title}
                    className="w-full h-full object-contain bg-gradient-to-br from-slate-100 to-slate-200"
                    style={{
                      maxHeight: '500px',
                      objectFit: 'contain'
                    }}
                  />
                </div>
                
                {/* Gradient overlay for better text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
              </div>
            )}

            {/* Content Section */}
            <div className="p-8 lg:p-12">
              {/* Post Header */}
              <div className="max-w-4xl mx-auto">
                <div className="text-center mb-10">
                  <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6 leading-tight">
                    {post.title}
                  </h1>
                  
                  {/* Meta Information */}
                  <div className="flex flex-wrap items-center justify-center gap-8 text-slate-600 mb-8">
                    {post.authorName && (
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg">
                          <User className="w-6 h-6 text-white" />
                        </div>
                        <div className="text-left">
                          <p className="text-sm text-slate-500 font-medium">Written by</p>
                          <p className="text-lg font-semibold text-blue-600">{post.authorName}</p>
                        </div>
                      </div>
                    )}
                    
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center shadow-lg">
                        <Calendar className="w-6 h-6 text-white" />
                      </div>
                      <div className="text-left">
                        <p className="text-sm text-slate-500 font-medium">Published</p>
                        <p className="text-lg font-semibold text-slate-700">{new Date(post.$createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center shadow-lg">
                        <Clock className="w-6 h-6 text-white" />
                      </div>
                      <div className="text-left">
                        <p className="text-sm text-slate-500 font-medium">Read time</p>
                        <p className="text-lg font-semibold text-slate-700">5 min read</p>
                      </div>
                    </div>
                  </div>

                  {/* Separator */}
                  <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto mb-10"></div>
                </div>

                {/* Post Content */}
                <div className="prose prose-xl max-w-none prose-headings:text-slate-900 prose-headings:font-bold prose-p:text-slate-700 prose-p:leading-relaxed prose-p:text-lg prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline prose-strong:text-slate-900 prose-code:bg-slate-100 prose-code:text-slate-800 prose-code:px-3 prose-code:py-1 prose-code:rounded prose-code:text-sm prose-blockquote:border-l-blue-500 prose-blockquote:bg-blue-50 prose-blockquote:px-8 prose-blockquote:py-6 prose-blockquote:rounded-r-2xl prose-blockquote:not-italic prose-ul:text-slate-700 prose-ol:text-slate-700 prose-li:text-lg prose-li:leading-relaxed">
                  {parse(post.content)}
                </div>

                {/* Tags or Categories could go here */}
                <div className="mt-12 pt-8 border-t border-slate-200">
                  <div className="flex flex-wrap gap-2">
                    <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                      #{post.status}
                    </span>
                    <span className="px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                      #blog
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Footer */}
          <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-between items-center">
            <Link 
              to="/all-posts" 
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-slate-600 to-slate-700 text-white font-medium rounded-xl hover:from-slate-700 hover:to-slate-800 transform hover:scale-105 transition-all duration-200 shadow-lg"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to All Posts
            </Link>

            <Link 
              to="/" 
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium rounded-xl hover:from-blue-600 hover:to-purple-600 transform hover:scale-105 transition-all duration-200 shadow-lg"
            >
              <Eye className="w-5 h-5" />
              Explore More Posts
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Post;