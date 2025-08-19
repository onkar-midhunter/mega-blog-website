import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import service from "../appWrite/config";
import { Button, Container } from "../Component";
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
  

  // ✅ Use useMemo so it only recalculates when post or userData changes
  const isAuthor = useMemo(() => {
    if (!post || !userData) return false;
    return post.userId?.toString() === userData?.userData?.$id?.toString();
  }, [post, userData]);

  // useEffect(() => {
  //   if (slug) {
  //     service.getPost(slug).then((fetchedPost) => {
  //       if (fetchedPost) {
  //         setPost(fetchedPost);
  //       } else {
  //         navigate("/");
  //       }
  //       setLoading(false);
  //     });
  //   } else {
  //     navigate("/");
  //   }
  // }, [slug, navigate]);


useEffect(() => {
  const existingPost = postdata.find(p => p.$id === slug);
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
}, [slug,postdata, navigate]);


  const deletePost =  async () => {
  if (!post) return;

  // ✅ Send correct payload to redux
  dispatch(deletePostAction({ $id: post.$id }));

  // ✅ Delete from Appwrite
  const status = await service.deletePost(post.$id);  // no need for object here
  if (status) {
    await service.deleteFile(post.featuredImage);
    navigate("/");
  }
};

  if (loading) {
    return <div className="text-center py-10 text-xl font-semibold">Loading post...</div>;
  }

  if (!post) {
    return <div className="text-center py-10 text-red-500 text-xl font-semibold">Post not found</div>;
  }

  return (
    <div className="py-8">
      <Container>
        <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
          {console.log("isAuthor:", isAuthor)} {/* ✅ now logs correctly */}
          {post.featuredImage && (
            <img
              src={service.getFilePreview(post.featuredImage)}
              alt={post.title}
              className="rounded-xl"
            />
          )}
          {isAuthor && (
            <div className="absolute right-6 top-6">
              <Link to={`/edit-post/${post.$id}`}>
                <Button bgColor="bg-green-500" className="mr-3">
                  Edit
                </Button>
              </Link>
              <Button bgColor="bg-red-500" onClick={deletePost}>
                Delete
              </Button>
            </div>
          )}
        </div>

        <div className="w-full mb-6">
          <h1 className="text-2xl font-bold">{post.title}</h1>
        </div>

        <div className="browser-css">{parse(post.content)}</div>
      </Container>
    </div>
  );
}

export default Post;
