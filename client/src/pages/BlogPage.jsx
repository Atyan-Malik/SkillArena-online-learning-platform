import React, { useEffect, useState } from "react";
import "../styles/BlogPage.css";
import { useNavigate } from "react-router-dom";

const BlogPage = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch("http://localhost:15000/api/blogs");
        const data = await res.json();
        setBlogs(data);
      } catch (error) {
        console.error("Failed to fetch blogs", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) {
    return <p style={{ textAlign: "center" }}>Loading blogs...</p>;
  }

  return (
    <section className="sa-blog">
      <div className="blog-container">
        <div className="blog-header">
          <h2>
            Our <span className="blue-text">Blog</span>
          </h2>
          <p>Latest news, tips, and updates from the world of online learning.</p>
        </div>

        <div className="blog-grid">
          {blogs.map((post) => (
            <div
              key={post._id}
              className={`blog-card ${post.featured ? "featured" : ""}`}
              style={{ backgroundImage: `url(${post.thumbnail})` }}
            >
              <div className="blog-overlay">
                <p className="blog-date">
                  {new Date(post.date).toDateString()} • {post.author}
                </p>
                <h3>{post.title}</h3>
                <p className="blog-excerpt">{post.excerpt}</p>

                <button
                  className="read-btn"
                  onClick={() => navigate(`/blogs/${post.slug}`)}
                >
                  Read More
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogPage;
