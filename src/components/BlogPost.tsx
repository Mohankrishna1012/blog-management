import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

type Post = {
  id: number;
  title: string;
  content: string;
};

const BlogPost: React.FC = () => {
  const { id } = useParams();
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:5000/posts/${id}`)
        .then((res) => res.json())
        .then((data) => setPost(data));
    }
  }, [id]);

  const handleDelete = () => {
    if (id) {
      fetch(`http://localhost:5000/posts/${id}`, {
        method: "DELETE",
      }).then(() => {
        // Redirect to blog list after deletion
        window.location.href = "/";
      });
    }
  };

  if (!post) return <div>Loading...</div>;

  return (
    <div className="post-container">
      <h1>{post.title}</h1>
      <p>{post.content}</p>

      <div className="button-group">
        <Link to={`/edit/${post.id}`} className="submit-btn">
          Edit Post
        </Link>
        
        <button onClick={handleDelete} className="submit-btn">
          Delete Post
        </button>
      </div>
    </div>
  );
};

export default BlogPost;
