import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BoardLocale from "../../Locale/Board.json";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

const Board = () => {
  const [posts, setPosts] = React.useState([]);
  const [pageSize, setPageSize] = React.useState(10);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [searchType, setSearchType] = React.useState("title");
  const [startDate, setStartDate] = React.useState("");
  const [endDate, setEndDate] = React.useState("");
  const [language, setLanguage] = React.useState(
    localStorage.getItem("language") || "ko"
  );

  const navigate = useNavigate();

  React.useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/post");
        setPosts(response.data);
      } catch (error) {
        console.error("게시글 가져오기 실패: ", error);
      }
    };

    fetchPosts();
  }, []);

  const fadeInVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay: i * 0.2 },
    }),
  };

  React.useEffect(() => {
    const handleLanguageChange = () => {
      setLanguage(localStorage.getItem("language") || "ko");
    };

    window.addEventListener("languageChange", handleLanguageChange);
    return () => {
      window.removeEventListener("languageChange", handleLanguageChange);
    };
  }, []);

  const t = (key) => {
    const keys = key.split(".");
    return keys.reduce((obj, k) => obj[k], BoardLocale[language]);
  };

  const filteredPosts = React.useMemo(() => {
    return posts.filter((post) => {
      const value = post[searchType]?.toLowerCase() || "";
      const matchesSearch = value.includes(searchTerm.toLowerCase());

      const postDate = new Date(post.createdAt).getTime();
      const start = startDate ? new Date(startDate).getTime() : null;
      const end = endDate ? new Date(endDate).getTime() : null;

      const matchesDate =
        (!start || postDate >= start) && (!end || postDate <= end);

      return matchesSearch && matchesDate;
    });
  }, [posts, searchTerm, searchType, startDate, endDate]);

  const totalPages =
    pageSize > 0 ? Math.ceil(filteredPosts.length / pageSize) : 1;

  const paginatedPosts = React.useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredPosts.slice(start, start + pageSize);
  }, [filteredPosts, currentPage, pageSize]);

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay: i * 0.2 },
    }),
  };

  const [checkboxes, setCheckboxes] = useState({
    option1: false,
    option2: false,
    option3: false,
    option4: false,
    option5: false,
  });

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setCheckboxes((prev) => ({ ...prev, [name]: checked }));
  };

  return (
    <div className="bg-black">
      <motion.div
        className="p-4 mx-auto max-w-7xl py-32"
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          className="text-4xl text-white font-bold mb-6 text-center"
          variants={fadeIn}
          custom={0}
        >
          {t("board.title")}
        </motion.h1>

        {/* 복지 */}
        <motion.div className="text-left mb-12 mt-20" variants={fadeInVariants}>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            {t("services.mainTitle")}
          </h1>
          <p className="text-xl text-gray-600">{t("services.subTitle")}</p>
        </motion.div>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16"
          variants={fadeInVariants}
          custom={1}
        >
          {t("services.list").map((service, index) => (
            <motion.div
              key={index}
              className="text-center bg-black p-8 rounded-lg shadow-lg hover:-translate-y-2 transition-transform duration-300"
              variants={fadeInVariants}
              custom={index + 2}
            >
              <div className="text-4xl mb-4">{service.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                {service.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
        <motion.div
          className="text-center"
          variants={fadeInVariants}
          custom={5}
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-8">
            {t("services.whyUs.title")}
          </h2>
          <div className="bg-black grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className=" p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {t("services.whyUs.reasons.0.title")}
              </h3>
              <p className="text-gray-600">
                {t("services.whyUs.reasons.0.description")}
              </p>
            </div>
            <div className="p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {t("services.whyUs.reasons.1.title")}
              </h3>
              <p className="text-gray-600">
                {t("services.whyUs.reasons.1.description")}
              </p>
            </div>
            <div className=" p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {t("services.whyUs.reasons.2.title")}
              </h3>
              <p className="text-gray-600">
                {t("services.whyUs.reasons.2.description")}
              </p>
            </div>
          </div>
        </motion.div>
        <motion.div className="mt-32 " variants={fadeInVariants} custom={6}>
          <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">
            {t("services.process.title")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {t("services.process.steps").map((item, index) => (
              <motion.div
                key={index}
                className="relative p-6 text-center  bg-gray-500 rounded-xl shadow-md"
                variants={fadeInVariants}
                custom={index + 7}
              >
                <div className="text-gray-700 text-5xl font-bold mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* 채용공고 */}

        <motion.h1
          className="text-4xl text-white font-bold mt-32 mb-6 text-left"
          variants={fadeIn}
          custom={0}
        >
          {paginatedPosts.length}개의 채용공고가 있습니다.
        </motion.h1>

        <motion.div
          className="mb-4 mt-10 flex flex-col md:flex-row justify-between items-center gap-4"
          variants={fadeIn}
          custom={1}
        >
          <div className="flex w-full md:w-auto gap-2">
            <select
              className="border rounded px-3 py-2 text-base"
              value={searchType}
              onChange={(e) => setSearchType(e.target.value)}
            >
              <option value="title">{t("board.search.title")}</option>
            </select>
            <div className="flex-1 md:w-80">
              <input
                type="text"
                placeholder={t("board.search.placeholder")}
                className="w-full border rounded px-3 py-2 text-base"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <label className="text-sm font-bold">
              {t("board.search.itemsPerPage")}
            </label>
            <select
              className="border rounded px-3 py-2"
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
                setCurrentPage(1);
              }}
            >
              {[10, 25, 50, 100].map((size) => (
                <option key={size} value={size}>{`${size}${t(
                  "board.search.itemsCount"
                )}`}</option>
              ))}
            </select>
          </div>
        </motion.div>

        <motion.div>
          <button class="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
            <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-black dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent text-white">
              2DArtist
            </span>
          </button>
          <button class="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800">
            <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-black dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent text-white">
              3DArtist
            </span>
          </button>
          <button class="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800">
            <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-black dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent text-white">
              Developer
            </span>
          </button>
          <button class="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800">
            <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-black dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent text-white">
              Designer
            </span>
          </button>
            
        </motion.div>

        <motion.div
          className="hidden md:flex overflow-x-auto mt-10"
          variants={fadeIn}
          custom={2}
        >
          <div className="flex w-1/5">
            <div className=" text-white p-6 rounded-lg">
              {/* 오른쪽 영역에 넣고 싶은 내용 */}
              <h2 className="text-3xl font-bold">
                {t("services.category.title")}
              </h2>
              <div className="mt-4">
                {t("services.category.options").map((item, index) => (
                  <div key={index}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          className="text-white"
                          sx={{
                            color: "white", // 기본 상태에서 체크되지 않은 아이콘 색상
                            "&.Mui-checked": {
                              color: "gray", // 체크된 상태에서 아이콘 색상
                            },
                          }}
                        />
                      }
                      label={
                        <span className="font-[NanumSquareNeoBold]">
                          {item.option}
                        </span>
                      } // label을 span으로 감싸서 Tailwind 클래스 적용
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex w-4/5">
            <table className="min-w-full rounded-lg ">
              <tbody className="divide-y divide-gray-800">
                {paginatedPosts.length === 0 ? (
                  <tr>
                    <td
                      colSpan="4"
                      className="px-4 py-8 text-center text-gray-500"
                    >
                      {t("board.noPosts")}
                    </td>
                  </tr>
                ) : (
                  paginatedPosts.map((post, index) => (
                    <tr
                      key={post._id}
                      onClick={() => navigate(`/post/${post._id}`)}
                      className="hover:bg-gray-600 cursor-pointer"
                      variants={fadeIn}
                      custom={3 + index}
                    >
                      <td className="text-2xl text-white font-bold px-6 py-8 whitespace-nowrap">
                        {post.title}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </motion.div>

        <motion.div
          className="md:hidden grid grid-cols-1 gap-4"
          variants={fadeIn}
          custom={3}
        >
          {paginatedPosts.length === 0 ? (
            <div className="col-span-full text-center text-gray-500">
              {t("board.noPosts")}
            </div>
          ) : (
            paginatedPosts.map((post, index) => (
              <motion.div
                key={post._id}
                onClick={() => navigate(`/post/${post._id}`)}
                className="border rounded-lg p-4 bg-white shadow-md hover:shadow-lg transition-shadow"
                variants={fadeIn}
                custom={4 + index}
              >
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-bold truncate">{post.title}</h3>
                  <span className="text-sm text-gray-500">
                    #{(currentPage - 1) * pageSize + index + 1}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-3 truncate">
                  작성일: {new Date(post.createdAt).toLocaleDateString()}
                </p>
                <p className="text-sm text-gray-600">조회수: {post.views}</p>
              </motion.div>
            ))
          )}
        </motion.div>

        <motion.div
          className="mt-4 flex justify-center space-x-2 text-lg font-bold"
          variants={fadeIn}
          custom={5}
        >
          <Button
            variant="contained"
            className="px-3 py-1 rounded border disabled:opacity-50"
            onClick={() => setCurrentPage((p) => p - 1)}
            disabled={currentPage === 1 || totalPages === 0}
          >
            {t("board.pagination.prev")}
          </Button>
          <span className="px-3 py-1 text-white">
            {totalPages > 0 ? `${currentPage} / ${totalPages}` : "0 / 0"}
          </span>
          <Button
            variant="contained"
            className="px-3 py-1 rounded border disabled:opacity-50"
            onClick={() => setCurrentPage((p) => p + 1)}
            disabled={currentPage >= totalPages || totalPages === 0}
          >
            {t("board.pagination.next")}
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Board;
