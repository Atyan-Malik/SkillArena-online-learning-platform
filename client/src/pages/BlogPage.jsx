import React, { useEffect, useState } from "react";
import "../styles/BlogPage.css";
import { useNavigate } from "react-router-dom";
import { ArrowUpRight, CalendarDays, BookOpen } from "lucide-react";

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
    return (
      <section className="sa-blog">
        <div className="blog-loading">
          Loading articles...
        </div>
      </section>
    );
  }

  const featuredPost =
    blogs.find((post) => post.featured) || blogs[0];

  const regularPosts = blogs.filter(
    (post) => post._id !== featuredPost?._id
  );

  return (
    <section className="sa-blog">

      {/* Background */}

      <div className="blog-glow blog-glow-blue"></div>
      <div className="blog-glow blog-glow-purple"></div>


      <div className="blog-container">

        {/* Header */}

        <div className="blog-header">

          <span className="blog-eyebrow">
            <BookOpen size={13} />
            SKILLARENA INSIGHTS
          </span>

          <h2>
            Learn. Explore.{" "}
            <span>Grow.</span>
          </h2>

          <p>
            Practical insights, career advice, learning tips,
            and the latest ideas from the world of online education.
          </p>

        </div>


        {/* Featured Article */}

        {featuredPost && (
          <article
            className="blog-featured"
            style={{
              backgroundImage: `url(${featuredPost.thumbnail})`,
            }}
          >

            <div className="blog-featured-overlay"></div>

            <div className="blog-featured-content">

              <span className="featured-label">
                Featured Article
              </span>

              <div className="blog-meta">

                <span>
                  <CalendarDays size={13} />

                  {new Date(
                    featuredPost.date
                  ).toDateString()}
                </span>

                <span>•</span>

                <span>
                  {featuredPost.author}
                </span>

              </div>

              <h3>{featuredPost.title}</h3>

              <p>
                {featuredPost.excerpt}
              </p>

              <button
                className="featured-read-btn"
                onClick={() =>
                  navigate(`/blogs/${featuredPost.slug}`)
                }
              >
                Read Article
                <ArrowUpRight size={17} />
              </button>

            </div>

          </article>
        )}


        {/* Regular Articles */}

        <div className="blog-grid">

          {regularPosts.map((post) => (

            <article
              key={post._id}
              className="blog-card"
            >

              <div className="blog-card-image">

                <img
                  src={post.thumbnail}
                  alt={post.title}
                />

                <span className="blog-card-category">
                  Article
                </span>

              </div>


              <div className="blog-card-content">

                <div className="blog-card-meta">

                  <span>
                    <CalendarDays size={12} />

                    {new Date(
                      post.date
                    ).toDateString()}
                  </span>

                  <span>•</span>

                  <span>
                    {post.author}
                  </span>

                </div>


                <h3>{post.title}</h3>

                <p>
                  {post.excerpt}
                </p>


                <button
                  className="blog-read-btn"
                  onClick={() =>
                    navigate(`/blogs/${post.slug}`)
                  }
                >
                  Read More
                  <ArrowUpRight size={15} />
                </button>

              </div>

            </article>

          ))}

        </div>

      </div>
    </section>
  );
};

export default BlogPage;