
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateBlogPost: React.FC = () => {
  const navigate = useNavigate();
  const [newPost, setNewPost] = useState({ title: "", content: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setNewPost({
      ...newPost,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetch("http://localhost:5000/posts", {
      method: "POST",
      body: JSON.stringify(newPost),
      headers: {
        "Content-Type": "application/json",
      },
    }).then(() => {
      navigate("/"); 
    });
  };

  return (
    <div className="form-container">
      <h1>Create New Blog Post</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={newPost.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Content</label>
          <textarea
            name="content"
            value={newPost.content}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="submit-btn">
          Create Post
        </button>
      </form>
    </div>
  );
};

export default CreateBlogPost;
