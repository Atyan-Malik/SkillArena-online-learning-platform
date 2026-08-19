import React, { useEffect, useState } from "react";
import "../styles/BlogDetail.css";
import {
  Calendar,
  User,
  ArrowLeft,
  Linkedin,
  Twitter,
  Facebook,
  Share2,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

const BlogDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogDetail = async () => {
      try {
        const res = await fetch(
          `http://localhost:15000/api/blogs/${slug}`
        );

        if (!res.ok) {
          throw new Error("Blog not found");
        }

        const data = await res.json();
        setBlog(data);
      } catch (error) {
        console.error("Failed to fetch blog detail", error);
        setBlog(null);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogDetail();
  }, [slug]);

  if (loading) {
    return (
      <section className="blog-detail-page">
        <div className="blog-detail-loading">
          Loading article...
        </div>
      </section>
    );
  }

  if (!blog) {
    return (
      <section className="blog-detail-page">
        <div className="blog-detail-not-found">
          <h2>Article not found</h2>

          <p>
            The article you're looking for may have been
            removed or doesn't exist.
          </p>

          <button onClick={() => navigate("/blogs")}>
            <ArrowLeft size={16} />
            Back to Blog
          </button>
        </div>
      </section>
    );
  }

  const paragraphs = blog.content
    ? blog.content.split("\n\n")
    : [];

  return (
    <section className="blog-detail-page">

      {/* Background */}

      <div className="detail-glow detail-glow-blue"></div>
      <div className="detail-glow detail-glow-purple"></div>


      <div className="blog-detail-container">

        {/* Back */}

        <button
          className="back-blog-btn"
          onClick={() => navigate("/blogs")}
        >
          <ArrowLeft size={16} />
          Back to Blog
        </button>


        {/* Article Header */}

        <header className="blog-detail-header">

          <span className="article-label">
            SKILLARENA ARTICLE
          </span>

          <h1>{blog.title}</h1>


          <div className="blog-detail-meta">

            <span>
              <User size={16} />
              {blog.author}
            </span>

            <span className="meta-divider">
              •
            </span>

            <span>
              <Calendar size={16} />

              {new Date(
                blog.publishedAt || blog.date
              ).toDateString()}
            </span>

          </div>

        </header>


        {/* Hero Image */}

        <div className="blog-detail-image">

          <img
            src={blog.thumbnail}
            alt={blog.title}
          />

          <div className="detail-image-overlay"></div>

        </div>


        {/* Article */}

        <article className="blog-detail-content">

          {paragraphs.map((paragraph, index) => (

            <p
              key={index}
              className={index === 0 ? "article-intro" : ""}
            >
              {paragraph}
            </p>

          ))}

        </article>


        {/* Tags */}

        <div className="blog-detail-tags">

          <span>#Programming</span>
          <span>#Learning</span>
          <span>#SkillArena</span>

        </div>


        {/* Share */}

        <div className="blog-detail-share">

          <div className="share-heading">

            <Share2 size={17} />

            <span>Share this article</span>

          </div>


          <div className="share-buttons">

            <button className="share-btn linkedin">
              <Linkedin size={16} />
              LinkedIn
            </button>

            <button className="share-btn twitter">
              <Twitter size={16} />
              Twitter
            </button>

            <button className="share-btn facebook">
              <Facebook size={16} />
              Facebook
            </button>

          </div>

        </div>


        {/* Bottom CTA */}

        <div className="article-bottom">

          <div>
            <span>KEEP LEARNING</span>

            <h3>
              Explore more insights from SkillArena.
            </h3>
          </div>

          <button
            onClick={() => navigate("/blogs")}
          >
            Explore Blog
            <ArrowLeft
              size={16}
              className="explore-arrow"
            />
          </button>

        </div>

      </div>

    </section>
  );
};

export default BlogDetail;