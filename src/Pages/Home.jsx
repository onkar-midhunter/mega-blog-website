import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { Container, LoadingScreen, LoginPrompt, PostCard } from "../Component/index";
import service from "../appWrite/config";

function Home() {
  const [posts, setPosts] = useState([]);
  const userData = useSelector((state) => state.auth.userData);

  useEffect(() => {
    service.getPosts().then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
    });
  }, []);

  // Show login prompt if no posts
  if (posts.length === 0) {
    return (
      <div className="w-full py-8 mt-4 text-center">
        <Container>
         <LoadingScreen/>
        </Container>
      </div>
    );
  }

  // Show posts if user is logged in, else show login prompt
  return userData ? (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap">
          {posts.map((post) => (
            <div key={post.$id} className="p-2 w-1/4">
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  ) : (
    <Container>
      <LoginPrompt />
    </Container>
  );
}

export default Home;
