import { useState, useEffect } from "react";
import Post from "../components/Post";

export default function Inventory() {
  const [posts, setPost] = useState([]);
  console.log(posts);
  useEffect(() => {
    async function getPost() {
      const response = await fetch(
        "https://my-json-server.typicode.com/Llang8/cars-api/cars"
      );
      const data = await response.json();
      setPost(data);
    }
    getPost();
  }, []);

  return (
    <div>
      <h1>Inventory</h1>
      {posts.map((post) => (
        <Post post={post} key={post.id} />
      ))}
    </div>
  );
}
