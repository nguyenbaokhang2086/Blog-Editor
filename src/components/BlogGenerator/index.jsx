import React, { useState } from "react";
import { Sparkles } from "lucide-react";
import { generateBlogContent } from "@/services/gemini.service";
import { saveBlogToHistory } from "@/lib/storage";

const BlogGenerator = ({ onContentGenerated }) => {
  const [topic, setTopic] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleGenerateContent = async () => {
    if (!topic.trim()) {
      setError("Vui lòng nhập chủ đề blog");
      return;
    }

    setError("");
    setSuccessMessage("");
    setIsLoading(true);

    try {
      const generatedContent = await generateBlogContent(topic);

      // Save to localStorage
      const savedBlog = saveBlogToHistory(topic, generatedContent);

      if (savedBlog) {
        setSuccessMessage("Blog đã được tạo và lưu thành công!");
        onContentGenerated(generatedContent, topic);

        // Clear success message after 3 seconds
        setTimeout(() => setSuccessMessage(""), 3000);
      } else {
        setError("Blog được tạo nhưng không thể lưu. Vui lòng thử lại.");
      }
    } catch (err) {
      setError("Có lỗi khi tạo nội dung. Vui lòng thử lại.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-950 px-6 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-12">
          Blog Editor
        </h1>

        {/* Main Card */}
        <div className="border border-slate-200 dark:border-slate-700 rounded-2xl p-8 bg-white dark:bg-slate-900">
          {/* Section Title */}
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8">
            Chủ đề Blog
          </h2>

          {/* Input Section */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <input
              type="text"
              value={topic}
              onChange={(e) => {
                setTopic(e.target.value);
                setError("");
              }}
              placeholder="Nhập chủ đề blog của bạn (ví dụ: Lợi ích của thiền định)"
              className="flex-1 px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-white"
              onKeyPress={(e) => e.key === "Enter" && handleGenerateContent()}
              disabled={isLoading}
            />
            <button
              onClick={handleGenerateContent}
              disabled={isLoading || !topic.trim()}
              className="px-6 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-lg font-semibold hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 whitespace-nowrap"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  Đang tạo...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  Tạo Nội Dung
                </>
              )}
            </button>
          </div>

          {/* Success Message */}
          {successMessage && (
            <div className="mb-4 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
              <p className="text-green-600 dark:text-green-400">{successMessage}</p>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <p className="text-red-600 dark:text-red-400">{error}</p>
            </div>
          )}

          {/* Helper Text */}
          <p className="text-slate-600 dark:text-slate-400">
            AI sẽ tạo ra nội dung blog dựa trên chủ đề bạn nhập
          </p>
        </div>
      </div>
    </div>
  );
};

export default BlogGenerator;
