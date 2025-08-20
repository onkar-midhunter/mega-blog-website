import { useEffect, useState } from "react";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import authService from "./appWrite/auth";
import { login, logout } from "./store/authSlice";
import { Footer, Header, LoginPrompt } from "./Component";
import { Outlet } from "react-router-dom";
import service from "./appWrite/config";
import { fetchPostsFailure, fetchPostsStart, fetchPostsSuccess } from "./store/PostSlice";

function App() {
  const [isloading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("Checking current user...");

    authService
      .getCurrentUser()
      .then((userData) => {
        console.log("User data:", userData);
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .catch((err) => {
        console.error("Error in getCurrentUser:", err);
      })
      .finally(() => {
        console.log("Finished loading");
        setLoading(false);
      });
  }, []);
useEffect(() => {
  const fetchPosts = async () => {
    try {
      dispatch(fetchPostsStart()); // 🔹 start loading
      const allPost = await service.getPosts();
      if (allPost?.documents) {
        dispatch(fetchPostsSuccess(allPost.documents)); // 🔹 success
      } else {
        dispatch(fetchPostsFailure("No posts found"));
      }
    } catch (error) {
      dispatch(fetchPostsFailure(error.message || "Failed to fetch posts")); // 🔹 error
    }
  };

  fetchPosts();
}, [dispatch]);

  return !isloading ? (
    <div className="min-h-screen flex flex-wrap content-between bg-gray-400">
      <div className="w-full block">
        <Header />
        <main>
           <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : (
   <>
   <LoginPrompt/>
   </>
  );
}

export default App;
