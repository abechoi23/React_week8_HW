import { useState, useEffect, useContext } from "react";
import Post from "../components/Post";
import { Link } from "react-router-dom";
import { DataContext } from "../contexts/DataProvider";


export default function Inventory() {
  const { posts } = useContext(DataContext);
  

  return (
    <div>
      <h1>Inventory</h1>
      {posts.map((post) => (
        <div key={post.id}>
          <h2>{post.name}</h2>
          <p>Year: {post.year}</p>
          <p>Price: ${post.sellingPrice}</p>
          <Link to={`/post/${post.id}`}>Read More</Link>
        </div>
      ))}
    </div>
  );
}
