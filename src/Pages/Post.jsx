import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import service from "../appWrite/config";
import { Button, Container, LoadingScreen } from "../Component";
import parse from "html-react-parser";
import { deletePost as deletePostAction } from "../store/PostSlice";
import { Calendar, User, Edit, Trash2, ArrowLeft } from "lucide-react";

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
        <div className="max-w-6xl mx-auto">
          {/* Back Button */}
          <div className="mb-6">
            <button 
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 px-4 py-2 text-slate-600 hover:text-blue-600 hover:bg-white rounded-lg transition-all duration-200"
            >
              <ArrowLeft className="w-5 h-5" />
              Back
            </button>
          </div>

          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            <div className="flex flex-col lg:flex-row">
              {/* Left side - Image */}
              <div className="lg:w-2/5 relative">
                {post.featuredImage && (
                  <div className="h-80 lg:h-full relative">
                    <img
                      src={service.getFilePreview(post.featuredImage)}
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                  </div>
                )}
                
                {/* Author Actions - Overlay on image */}
                {isAuthor && (
                  <div className="absolute top-4 right-4 flex gap-3">
                    <Link to={`/edit-post/${post.$id}`}>
                      <button className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200">
                        <Edit className="w-4 h-4" />
                        Edit
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

              {/* Right side - Content */}
              <div className="lg:w-3/5 p-8 lg:p-12">
                {/* Post Header */}
                <div className="mb-8">
                  <h1 className="text-3xl lg:text-4xl font-bold text-slate-800 mb-6 leading-tight">
                    {post.title}
                  </h1>
                  
                  {/* Meta Info */}
                  <div className="flex flex-wrap items-center gap-6 text-slate-600">
                    {post.authorName && (
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                          <User className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="text-sm text-slate-500">Written by</p>
                          <p className="font-semibold text-blue-600">{post.authorName}</p>
                        </div>
                      </div>
                    )}
                    
                    <div className="flex items-center gap-2">
                      <Calendar className="w-5 h-5" />
                      <div>
                        <p className="text-sm text-slate-500">Published</p>
                        <p className="font-medium">{new Date(post.$createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Post Content */}
                <div className="prose prose-lg max-w-none prose-headings:text-slate-800 prose-p:text-slate-700 prose-p:leading-relaxed prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline prose-strong:text-slate-800 prose-code:bg-slate-100 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-blockquote:border-l-blue-500 prose-blockquote:bg-blue-50 prose-blockquote:px-6 prose-blockquote:py-4 prose-blockquote:rounded-r-lg">
                  {parse(post.content)}
                </div>
              </div>
            </div>
          </div>

          {/* Back to Posts */}
          <div className="mt-12 text-center">
            <Link 
              to="/all-posts" 
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-slate-600 to-slate-700 text-white font-medium rounded-xl hover:from-slate-700 hover:to-slate-800 transform hover:scale-105 transition-all duration-200 shadow-lg"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to All Posts
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Post;