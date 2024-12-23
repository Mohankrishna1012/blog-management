import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

type Post = {
  id: number;
  title: string;
  content: string;
};

const BlogList: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  // Fetch posts on page load
  useEffect(() => {
    fetch("http://localhost:5000/posts")
      .then((res) => res.json())
      .then((data) => setPosts(data));
  }, []);

  // Handle delete post
  const handleDelete = (id: number) => {
    fetch(`http://localhost:5000/posts/${id}`, {
      method: "DELETE",
    }).then(() => {
      // Remove deleted post from the state
      setPosts(posts.filter((post) => post.id !== id));
    });
  };

  return (
    <div className="container">
      <h1>Blog List</h1>
      <Link to="/create" className="submit-btn">
        Create New Post
      </Link>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <h2>{post.title}</h2>
            <Link to={`/edit/${post.id}`} className="submit-btn">
              Edit Post
            </Link>
            <span>   </span>
            <button
              onClick={() => handleDelete(post.id)}
              className="submit-btn delete-btn"
            >
              Delete Post
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BlogList;
