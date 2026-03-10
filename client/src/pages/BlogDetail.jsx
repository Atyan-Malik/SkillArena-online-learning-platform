import React, { useEffect, useState } from "react";
import "../styles/BlogDetail.css";
import { Calendar, User } from "lucide-react";
import { useParams } from "react-router-dom";

const BlogDetail = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogDetail = async () => {
      try {
        const res = await fetch(`http://localhost:15000/api/blogs/${slug}`);
        const data = await res.json();
        setBlog(data);
      } catch (error) {
        console.error("Failed to fetch blog detail", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogDetail();
  }, [slug]);

  if (loading) {
    return <p style={{ textAlign: "center" }}>Loading blog...</p>;
  }

  if (!blog) {
    return <p style={{ textAlign: "center" }}>Blog not found</p>;
  }

  return (
    <section className="sa-blog-detail">
      <div className="blog-detail-container">
       
        <div className="blog-detail-header">
          <h1>{blog.title}</h1>

          <div className="blog-detail-meta">
            <span>
              <User size={18} /> {blog.author}
            </span>
            <span>
              <Calendar size={18} />{" "}
              {new Date(blog.publishedAt).toDateString()}
            </span>
          </div>
        </div>

        {/* IMAGE */}
        <div className="blog-detail-image">
          <img src={blog.thumbnail} alt={blog.title} />
        </div>

        {/* CONTENT */}
        <div className="blog-detail-content">
          {blog.content
            .split("\n\n")
            .map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
        </div>

        <div className="blog-detail-tags">
          <span className="tag">#Programming</span>
          <span className="tag">#Learning</span>
          <span className="tag">#SkillArena</span>
        </div>

        <div className="blog-detail-share">
          <button className="share-btn">Share on LinkedIn</button>
          <button className="share-btn">Share on Twitter</button>
          <button className="share-btn">Share on Facebook</button>
        </div>
      </div>
    </section>
  );
};

export default BlogDetail;
