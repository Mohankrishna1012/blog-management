
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditBlogPost: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState<{ title: string; content: string }>({
    title: "",
    content: "",
  });

  // Fetch post data to edit
  useEffect(() => {
    if (id) {
      fetch(`http://localhost:5000/posts/${id}`)
        .then((res) => res.json())
        .then((data) => setPost(data));
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setPost({
      ...post,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (id) {
      fetch(`http://localhost:5000/posts/${id}`, {
        method: "PUT",
        body: JSON.stringify(post),
        headers: {
          "Content-Type": "application/json",
        },
      }).then(() => {
        navigate("/"); 
      });
    }
  };

  return (
    <div className="form-container">
      <h1>Edit Blog Post</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={post.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Content</label>
          <textarea
            name="content"
            value={post.content}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="submit-btn">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditBlogPost;
