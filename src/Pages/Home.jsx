import React, { useEffect, useState } from "react";

import { Container, LoginPrompt, PostCard } from "../Component/index";
import service from "../appWrite/config";

function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    service.getPosts().then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
    });
  }, []);
  console.log(posts);
  if (posts.length === 0) {
    return (
      <div className="w-full py-8 mt-4 text-center">
        <Container>
          <LoginPrompt/>
        </Container>
      </div>
    );
  }
  return (
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
  );
}

export default Home;
