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

  const isAuthor = useMemo(() => {
    if (!post || !userData) return false;
    return post.userId?.toString() === userData?.userData?.$id?.toString();
  }, [post, userData]);

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
        <div className="w-full flex justify-center mb-6 relative border rounded-xl p-2 shadow-sm bg-white">
          {post.featuredImage && (
            <img
              src={service.getFilePreview(post.featuredImage)}
              alt={post.title}
              className="rounded-xl max-h-[300px] w-full object-cover object-center shadow-md"
            />
          )}
          {isAuthor && (
            <div className="absolute right-6 top-6 flex gap-2">
              <Link to={`/edit-post/${post.$id}`}>
                <Button bgColor="bg-green-500">Edit</Button>
              </Link>
              <Button bgColor="bg-red-500" onClick={deletePost}>
                Delete
              </Button>
            </div>
          )}
        </div>

        {/* Title + Published Date */}
        <div className="w-full mb-6 text-center">
          <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
          <p className="text-sm text-black">
            Published on{" "}
            {new Date(post.$createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>

        {/* Content */}
        <div className="prose prose-lg max-w-none">{parse(post.content)}</div>
      </Container>
    </div>
  );
}

export default Post;
