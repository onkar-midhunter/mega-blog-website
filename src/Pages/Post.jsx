import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import service from "../appWrite/config";
import { Button, Container, LoadingScreen } from "../Component";
import parse from "html-react-parser";
import { deletePost as deletePostAction } from "../store/PostSlice";

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
    dispatch(deletePostAction({ $id: post.$id }));
    const status = await service.deletePost(post.$id);
    if (status) {
      await service.deleteFile(post.featuredImage);
      navigate("/");
    }
  };

  // ✅ Fixed: Handle both userData structures
  const isAuthor = useMemo(() => {
    if (!post || !userData) return false;
    
    // Handle both possible userData structures
    const actualUserData = userData?.userData || userData;
    const currentUserId = actualUserData?.$id?.toString();
    const postUserId = post.userId?.toString();
    
    // Add debugging logs
    console.log("🔍 Author check:");
    console.log("userData structure:", userData);
    console.log("actualUserData:", actualUserData);
    console.log("currentUserId:", currentUserId);
    console.log("postUserId:", postUserId);
    console.log("isAuthor result:", currentUserId === postUserId);
    
    return currentUserId === postUserId;
  }, [post, userData]);

  if (loading) {
    return (
      <div className="text-center py-10 text-xl font-semibold">
        <LoadingScreen />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="text-center py-10 text-red-500 text-xl font-semibold">
        Post not found
      </div>
    );
  }

  return (
    <div className="py-8">
      <Container>
        <div className="flex flex-col lg:flex-row gap-8 min-h-[65vh]">
          {/* Left side - Content */}
          <div className="lg:w-1/2 flex flex-col">
            <div className="mb-6">
              <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
              <p className="text-sm text-black">
                Published on {new Date(post.$createdAt).toLocaleDateString()}
              </p>
            </div>
            <div className="prose prose-lg flex-1">{parse(post.content)}</div>
          </div>

          {/* Right side - Image */}
          <div className="lg:w-2/5 relative">
            {post.featuredImage && (
              <img
                src={service.getFilePreview(post.featuredImage)}
                alt={post.title}
                className="rounded-xl h-[65vh] w-full object-cover shadow-md"
              />
            )}
            {isAuthor && (
              <div className="absolute right-4 top-4 flex gap-2">
                <Link to={`/edit-post/${post.$id}`}>
                  <Button bgColor="bg-green-500">Edit</Button>
                </Link>
                <Button bgColor="bg-red-500" onClick={deletePost}>Delete</Button>
              </div>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Post;