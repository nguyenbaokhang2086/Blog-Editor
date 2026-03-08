import React from "react";
import { useNavigate } from "react-router-dom";
import { Sparkles, PenTool, Download } from "lucide-react";

const HeroSection = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Sparkles,
      title: "AI-Powered",
      description:
        "Generate blog outlines and content suggestions using advanced AI",
    },
    {
      icon: PenTool,
      title: "Rich Editor",
      description:
        "Full-featured text editor with formatting tools and live preview",
    },
    {
      icon: Download,
      title: "Export Ready",
      description: "Export your finished articles in multiple formats",
    },
  ];

  return (
    <div className="min-h-screen bg-linear-to-b from-white to-slate-50 dark:from-slate-950 dark:to-slate-900">
      {/* Hero Content */}
      <div className="max-w-6xl mx-auto px-6 pt-20 pb-16">
        {/* Title and Subtitle */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-slate-900 dark:text-white mb-6">
            AI Blog Generator
          </h1>
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed">
            Transform your ideas into compelling blog posts with AI assistance.
            <br />
            Generate outlines, write content, and export beautiful articles.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div
                key={index}
                className="p-6 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:shadow-lg dark:hover:shadow-xl transition-shadow"
              >
                {/* <div className="mb-4">
                  <IconComponent className="w-8 h-8 text-slate-900 dark:text-white" />
                </div> */}
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* CTA Button */}
        <div className="flex justify-center">
          <button
            onClick={() => navigate("/editor")}
            className="px-8 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-lg font-semibold hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors shadow-lg"
          >
            Start Writing
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
