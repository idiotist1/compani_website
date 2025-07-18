import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import ForumLocale from "../../Locale/Forum.json";

const Forum = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [language, setLanguage] = useState(localStorage.getItem('language') || 'ko');

  useEffect(() => {
    const handleLanguageChange = () => {
      setLanguage(localStorage.getItem('language') || 'ko');
    };

    window.addEventListener('languageChange', handleLanguageChange);
    return () => {
      window.removeEventListener('languageChange', handleLanguageChange);
    };
  }, []);

  const t = (key) => {
    const keys = key.split(".");
    return keys.reduce((obj, k) => obj[k], ForumLocale[language]);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/post");
        setPosts(response.data.slice(0, 5));
      } catch (error) {
        console.log(t("forum.errors.loadFailed"), error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 50,
        damping: 20,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.div
      className="bg-black"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="container mx-auto px-4 py-28 lg:py-32 max-w-6xl">
        <div className="text-center mb-6">
          <motion.h2
            className="text-4xl lg:text-5xl font-bold text-gray-900"
            variants={itemVariants}
          >
            {t("forum.title")}
          </motion.h2>
        </div>

        <motion.div className="flex justify-end mb-4" variants={itemVariants}>
          <Link
            to="/board"
            className="px-5 py-2 bg-white text-gray-900 rounded-lg hover:bg-gray-100 transition-colors duration-300 flex items-center gap-2 border border-gray-200"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            {t("forum.viewAll")}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </motion.div>

        <motion.div
          className="bg-white rounded-xl shadow-lg overflow-hidden"
          variants={containerVariants}
        >
          {loading ? (
            <motion.div
              className="p-6 text-center text-gray-500"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {t("forum.loading")}
            </motion.div>
          ) : posts.length === 0 ? (
            <motion.div
              className="p-6 text-center text-gray-500"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {t("forum.noRecentPosts")}
            </motion.div>
          ) : (
            posts.map((post, index) => (
              <motion.div
                key={post._id}
                className="border-b border-gray-100 last:border-b-0 hover:bg-blue-50 transition-colors duration-300"
                variants={itemVariants}
                custom={index}
              >
                <Link to={`/post/${post._id}`} className="block">
                  <div className="p-6 flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-2">
                        <span className="text-gray-500 text-sm">
                          {t("forum.postInfo.number")} {post.number}
                        </span>
                        <span className="text-gray-500 text-sm">
                          {t("forum.postInfo.views")}: {post.views}
                        </span>
                        {post.fileUrl.length > 0 && (
                          <span className="text-gray-500 text-sm">
                            {t("forum.postInfo.files")}: {post.fileUrl.length}
                          </span>
                        )}
                      </div>
                      <h3 className="text-xl font-semibold text-gray-800 hover:text-blue-600 transition-colors duration-300">
                        {post.title}
                      </h3>
                      <div className="mt-2 text-gray-500">{post.createdAt}</div>
                    </div>
                    <div className="ml-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-blue-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Forum;