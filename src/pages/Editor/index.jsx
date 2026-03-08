import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import BlogGenerator from "@/components/BlogGenerator";
import TopicPromptCard from "@/components/TopicPromptCard";
import { getBlogHistory } from "@/lib/storage";

const Editor = () => {
  const [generatedContent, setGeneratedContent] = useState("");
  const [blogTopic, setBlogTopic] = useState("");
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const blogId = searchParams.get('blog');
    if (blogId) {
      // Load existing blog
      const blogs = getBlogHistory();
      const blog = blogs.find(b => b.id.toString() === blogId);
      if (blog) {
        setGeneratedContent(blog.content);
        setBlogTopic(blog.topic);
      }
    }
  }, [searchParams]);

  const handleContentGenerated = (content, topic) => {
    setGeneratedContent(content);
    setBlogTopic(topic);
    // Scroll to preview section
    setTimeout(() => {
      document
        .querySelector(".preview-section")
        ?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <div>
      <Navbar />
      <BlogGenerator onContentGenerated={handleContentGenerated} />
      <div className="preview-section">
        <TopicPromptCard
          generatedContent={generatedContent}
          blogTopic={blogTopic}
        />
      </div>
    </div>
  );
};

export default Editor;
