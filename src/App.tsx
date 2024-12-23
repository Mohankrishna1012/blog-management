import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import BlogList from "./components/BlogList";
import CreateBlogPost from "./components/CreateBlogPost";
import EditBlogPost from "./components/EditBlogPost";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BlogList />} />
        <Route path="/create" element={<CreateBlogPost />} />
        <Route path="/edit/:id" element={<EditBlogPost />} />
      </Routes>
    </Router>
  );
};

export default App;
