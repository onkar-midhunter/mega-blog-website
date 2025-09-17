import { useEffect, useState } from "react";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import authService from "./appWrite/auth";
import { login, logout } from "./store/authSlice";
import { Footer, Header, LoadingScreen } from "./Component";
import { Outlet } from "react-router-dom";
import service from "./appWrite/config";
import {
  fetchPostsFailure,
  fetchPostsStart,
  fetchPostsSuccess,
} from "./store/PostSlice";

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
        dispatch(fetchPostsStart());
        const allPost = await service.getPosts();
        if (allPost?.documents) {
          dispatch(fetchPostsSuccess(allPost.documents));
        } else {
          dispatch(fetchPostsFailure("No posts found"));
        }
      } catch (error) {
        dispatch(fetchPostsFailure(error.message || "Failed to fetch posts"));
      }
    };

    fetchPosts();
  }, [dispatch]);

 return isloading ? (
  <LoadingScreen />
) : (
  <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
    <Header />
    <main className="min-h-[calc(100vh-140px)]">
      <Outlet />
    </main>
    <Footer />
  </div>
);
}

export default App;