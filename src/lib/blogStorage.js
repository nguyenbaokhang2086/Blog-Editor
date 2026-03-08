export const saveBlogToLocalStorage = (topic, content) => {
  try {
    const blogs = getBlogsFromLocalStorage();
    const newBlog = {
      id: Date.now().toString(),
      topic,
      content,
      createdAt: new Date().toISOString(),
      wordCount: content.split(' ').length
    };

    blogs.unshift(newBlog); // Add to beginning of array
    localStorage.setItem('ai-blogs', JSON.stringify(blogs));
    return newBlog;
  } catch (error) {
    console.error('Error saving blog to localStorage:', error);
    return null;
  }
};

export const getBlogsFromLocalStorage = () => {
  try {
    const blogs = localStorage.getItem('ai-blogs');
    return blogs ? JSON.parse(blogs) : [];
  } catch (error) {
    console.error('Error getting blogs from localStorage:', error);
    return [];
  }
};

export const deleteBlogFromLocalStorage = (blogId) => {
  try {
    const blogs = getBlogsFromLocalStorage();
    const filteredBlogs = blogs.filter(blog => blog.id !== blogId);
    localStorage.setItem('ai-blogs', JSON.stringify(filteredBlogs));
    return true;
  } catch (error) {
    console.error('Error deleting blog from localStorage:', error);
    return false;
  }
};

export const getBlogById = (blogId) => {
  try {
    const blogs = getBlogsFromLocalStorage();
    return blogs.find(blog => blog.id === blogId) || null;
  } catch (error) {
    console.error('Error getting blog by ID:', error);
    return null;
  }
};