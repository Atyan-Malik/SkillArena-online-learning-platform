import React from "react";
import "../styles/Home.css";
import { useNavigate } from "react-router-dom";
import { Contact, GraduationCap, Laptop, Sparkles } from "lucide-react";
import HighlightFeature from "../pages/HighlightFeature.jsx"
import Categories from "../pages/Categories.jsx"
import Gallery from "../pages/Gallery.jsx"
import About from "../pages/About.jsx"
import Testimonials from "./Testimonials.jsx";
import InstructorShowcase from "./InstructorShowcase.jsx";
import CertificateAchievements from "./CertificateAchievements.jsx";
import Payment from "../pages/Payment.jsx";
import BlogPage from "./BlogPage.jsx";
import CTABanner from "./CTABanner.jsx";
import Collab from "./Collab.jsx";
import Allcourses from "../pages/instructor/AllCourses.jsx"
import FAQSection from "./FAQSection.jsx";

const Hero = () => {
  const navigate=useNavigate()

  const handleClick=()=>{
    navigate("/register")
  }
  const handleClick2=()=>{
    navigate("/allcourses")
  }
  return (
     <>
    <section className="sa-hero">
      <div className="hero-container">

        <div className="hero-left">
          <div className="highlight-bar"></div>

          <h1>
            Empower Your <span className="blue-text">Skills</span><br />
            Learn From <span className="red-text">Top Experts</span>
          </h1>

          <p className="hero-desc">
            Join thousands of learners upgrading their careers with world-class 
            courses, hands-on projects, and industry-recognized certificates.
          </p>

          <div className="hero-buttons">
            <button onClick={handleClick} className="btn-filled">Get Started</button>
            <button onClick={handleClick2} className="btn-two">Browse Courses</button>
          </div>

          <div className="hero-stats">
            <div className="stat-item"><GraduationCap size={36} color={"#d12525"}/> 15k+ Students</div>
            <div className="stat-item"><Laptop size={36} color={"#d12525"} /> 120+ Courses</div>
          </div>
        </div>

      
          <div className="blue-gradient"></div>
          <div className="red-gradient"></div>

      </div>
    </section>

    <HighlightFeature/>
    <Categories/> <br />
    <Allcourses/>
    <Gallery/>
    <FAQSection/>
    <About/>
    <Collab/>
    <Testimonials/>
    <InstructorShowcase/>
    <CertificateAchievements/>
    <Payment/>
    <BlogPage/>
    <CTABanner/>
   
   </>
  );
};

export default Hero;
