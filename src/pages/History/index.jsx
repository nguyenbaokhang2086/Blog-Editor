import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { Eye, Trash2, Copy, Download } from "lucide-react";
import { getBlogHistory, deleteBlogFromHistory } from "@/lib/storage";
import { toKebabCase } from "@/lib/utils";
import ReactMarkdown from "react-markdown";

const History = () => {
  const [blogs, setBlogs] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [copySuccess, setCopySuccess] = useState(false);

  useEffect(() => {
    const history = getBlogHistory();
    setBlogs(history);
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa blog này?")) {
      deleteBlogFromHistory(id);
      const updatedBlogs = blogs.filter((blog) => blog.id !== id);
      setBlogs(updatedBlogs);
      if (selectedBlog?.id === id) {
        setSelectedBlog(null);
      }
    }
  };

  const handleCopy = (content) => {
    navigator.clipboard.writeText(content);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  const handleDownload = (content, topic) => {
    const element = document.createElement("a");
    const file = new Blob([content], { type: "text/plain;charset=utf-8;" });
    element.href = URL.createObjectURL(file);
    element.download = `${toKebabCase(topic)}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getPreview = (content, length = 150) => {
    return content.length > length
      ? content.substring(0, length) + "..."
      : content;
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      <Navbar />

      {selectedBlog ? (
        // Detail View
        <div className="max-w-6xl mx-auto px-6 py-8">
          <button
            onClick={() => setSelectedBlog(null)}
            className="mb-6 px-4 py-2 text-slate-900 dark:text-white hover:text-slate-600 dark:hover:text-slate-300 flex items-center gap-2"
          >
            ← Quay lại
          </button>

          <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 border border-slate-200 dark:border-slate-700">
            <div className="flex items-start justify-between mb-6 pb-6 border-b border-slate-200 dark:border-slate-700">
              <div>
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                  {selectedBlog.topic}
                </h1>
                <p className="text-slate-500 dark:text-slate-400">
                  {formatDate(selectedBlog.createdAt)}
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => handleCopy(selectedBlog.content)}
                  className="flex items-center gap-2 px-4 py-2 border border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                  title="Sao chép nội dung"
                >
                  <Copy className="w-5 h-5" />
                  {copySuccess && (
                    <span className="text-xs text-green-600">✓</span>
                  )}
                </button>

                <button
                  onClick={() =>
                    handleDownload(selectedBlog.content, selectedBlog.topic)
                  }
                  className="flex items-center gap-2 px-4 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-lg hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors font-medium"
                  title="Tải xuống nội dung"
                >
                  <Download className="w-5 h-5" />
                  Tải xuống
                </button>

                <button
                  onClick={() => handleDelete(selectedBlog.id)}
                  className="flex items-center gap-2 px-4 py-2 bg-red-600 dark:bg-red-600 text-white rounded-lg hover:bg-red-700 dark:hover:bg-red-700 transition-colors font-medium"
                  title="Xóa blog"
                >
                  <Trash2 className="w-5 h-5" />
                  Xóa
                </button>
              </div>
            </div>

            <div className="prose dark:prose-invert max-w-none">
              <ReactMarkdown>{selectedBlog.content}</ReactMarkdown>
            </div>
          </div>
        </div>
      ) : (
        // List View
        <div className="max-w-6xl mx-auto px-6 py-16">
          {/* Page Title */}
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-16">
            Hi, here is your history
          </h1>

          {/* Blogs Grid or Empty State */}
          {blogs.length === 0 ? (
            <div className="flex flex-col items-center justify-center min-h-96 py-16">
              {/* Lottie Animation */}
              <div className="mb-8 w-64 h-64">
                <DotLottieReact
                  src="https://lottie.host/fa545f0e-89e2-4c9f-b3c6-e76a5d86bb7f/ipx21OCwHG.lottie"
                  loop
                  autoplay
                />
              </div>

              {/* Message */}
              <p className="text-xl text-slate-500 dark:text-slate-400">
                No history found
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {blogs.map((blog) => (
                <div
                  key={blog.id}
                  className="border border-slate-200 dark:border-slate-700 rounded-2xl p-6 bg-white dark:bg-slate-900 hover:shadow-lg dark:hover:shadow-slate-900/50 transition-shadow"
                >
                  <div className="mb-4">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                      {blog.topic}
                    </h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
                      {formatDate(blog.createdAt)}
                    </p>
                    <p className="text-slate-600 dark:text-slate-300 line-clamp-3">
                      {getPreview(blog.content)}
                    </p>
                  </div>

                  <div className="flex gap-3 pt-4 border-t border-slate-200 dark:border-slate-700">
                    <button
                      onClick={() => setSelectedBlog(blog)}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-lg hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors font-medium"
                      title="Xem chi tiết"
                    >
                      <Eye className="w-5 h-5" />
                      Xem
                    </button>

                    <button
                      onClick={() => handleDelete(blog.id)}
                      className="flex items-center justify-center px-4 py-2 bg-red-600 dark:bg-red-600 text-white rounded-lg hover:bg-red-700 dark:hover:bg-red-700 transition-colors"
                      title="Xóa blog"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default History;
