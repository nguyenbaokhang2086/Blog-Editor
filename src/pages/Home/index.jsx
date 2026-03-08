import React from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import BlogGenerator from "@/components/BlogGenerator";
import TopicPromptCard from "@/components/TopicPromptCard";
const Home = () => {
    return (
        <div>
            <Navbar />
            <HeroSection />
            <BlogGenerator />
            <TopicPromptCard />
        </div>
    );
}
export default Home;