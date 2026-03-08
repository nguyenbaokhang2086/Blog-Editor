import React, { useState, useEffect } from "react";
import { Copy, Download, Save } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { saveBlogToHistory } from "@/lib/storage";

const TopicPromptCard = ({ generatedContent, blogTopic = "" }) => {
  const [content, setContent] = useState(generatedContent || "");
  const [copySuccess, setCopySuccess] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  // Update content when generatedContent prop changes
  useEffect(() => {
    if (generatedContent) {
      setContent(generatedContent);
    }
  }, [generatedContent]);

  const handleCopy = () => {
    if (!content) return;

    navigator.clipboard.writeText(content);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  const handleDownload = () => {
    if (!content) {
      alert("Chưa có nội dung để tải xuống");
      return;
    }

    const element = document.createElement("a");
    const file = new Blob([content], { type: "text/plain;charset=utf-8;" });
    element.href = URL.createObjectURL(file);
    element.download = "blog-content.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);

    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 2000);
  };

  const handleSaveToHistory = async () => {
    if (!content) {
      alert("Chưa có nội dung để lưu");
      return;
    }

    setIsSaving(true);
    try {
      saveBlogToHistory(blogTopic || "Không có chủ đề", content);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2000);
    } catch (error) {
      alert("Lỗi khi lưu blog vào history");
      console.error(error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 pb-12">
      <div className="border border-slate-200 dark:border-slate-700 rounded-2xl p-8 bg-white dark:bg-slate-900">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 pb-6 border-b border-slate-200 dark:border-slate-700">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Xem trước & Xuất
          </h2>

          {saveSuccess && (
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm text-green-600 dark:text-green-400 font-medium">
                ✓ Đã lưu vào History
              </span>
            </div>
          )}

          <div className="flex gap-3">
            <button
              onClick={handleCopy}
              disabled={!content}
              className="flex items-center gap-2 px-4 py-2 border border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              title="Sao chép nội dung"
            >
              <Copy className="w-5 h-5" />
              <span className="text-sm font-medium">Sao chép</span>
              {copySuccess && <span className="text-xs text-green-600">✓</span>}
            </button>

            <button
              onClick={handleSaveToHistory}
              disabled={!content || isSaving}
              className="flex items-center gap-2 px-4 py-2 border border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              title="Lưu lại vào history"
            >
              <Save className="w-5 h-5" />
              <span className="text-sm font-medium">Lưu lại</span>
              {saveSuccess && <span className="text-xs text-green-600">✓</span>}
            </button>

            <button
              onClick={handleDownload}
              disabled={!content}
              className="flex items-center gap-2 px-4 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-lg hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
              title="Tải xuống nội dung"
            >
              <Download className="w-5 h-5" />
              <span className="text-sm">Tải xuống</span>
              {downloadSuccess && (
                <span className="text-xs text-green-600">✓</span>
              )}
            </button>
          </div>
        </div>

        {/* Content Preview */}
        <div className="min-h-64 rounded-lg bg-slate-50 dark:bg-slate-800 p-6 border border-slate-200 dark:border-slate-700 max-h-96 overflow-y-auto">
          {content ? (
            <div className="text-slate-900 dark:text-white whitespace-pre-wrap break-words prose dark:prose-invert max-w-none">
              <ReactMarkdown>{content}</ReactMarkdown>
            </div>
          ) : (
            <div className="flex items-center justify-center h-64">
              <p className="text-slate-400 dark:text-slate-500 text-center text-lg">
                Chưa có nội dung để hiển thị.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopicPromptCard;
