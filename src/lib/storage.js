const STORAGE_KEY = "blog_history";

export const saveBlogToHistory = (topic, content) => {
  try {
    const history = getBlogHistory();

    const newBlog = {
      id: Date.now(),
      topic,
      content,
      createdAt: new Date().toISOString(),
    };

    history.unshift(newBlog);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
    return newBlog;
  } catch (error) {
    console.error("Error saving blog to history:", error);
    throw error;
  }
};

export const getBlogHistory = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Error getting blog history:", error);
    return [];
  }
};

export const deleteBlogFromHistory = (id) => {
  try {
    const history = getBlogHistory();
    const filtered = history.filter((blog) => blog.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    return filtered;
  } catch (error) {
    console.error("Error deleting blog from history:", error);
    throw error;
  }
};

export const clearBlogHistory = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error("Error clearing blog history:", error);
    throw error;
  }
};
