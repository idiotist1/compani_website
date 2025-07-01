import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Human1 from "../../assets/Human1.jpg";
import ProjectLocale from "../../Locale/Project.json";

const Project = () => {
  const [language, setLanguage] = useState(
    localStorage.getItem("language") || "ko"
  );

  useEffect(() => {
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
    return keys.reduce((obj, k) => obj[k], ProjectLocale[language]);
  };

  const fadeInVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay: i * 0.2 },
    }),
  };

  return (
    <div className="bg-black">
      <motion.div
        className="container max-w-7xl mx-auto px-4 py-32"
        initial="hidden"
        animate="visible"
      >
        <motion.div className="text-center mb-12" variants={fadeInVariants}>
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            {t("pageTitle")}
          </h1>
        </motion.div>

        <motion.div
          className="relative rounded-2xl overflow-hidden shadow-2xl mb-24"
          variants={fadeInVariants}
        >
          <div className="flex w-500 h-100 justify-start rounded-2xl n bg-white">
            <img src={Human1} className="ml-4 mt-4 mb-4 rounded-2xl w-80 h-80 object-fill" />
            <div className="flex flex-col justify-center items-start ml-7 mt-4 mb-4">
              <h1 className="text-3xl">개발중..</h1>
              <p className="text-2xl">개발중..</p>
            </div>
          </div>

          {/* <motion.div
          className="md:w-1/3"
          variants={fadeInVariants}
          custom={0.2}
        >
          <div className="rounded-xl overflow-hidden shadow-lg">
            <img src={Human1} className="w-full aspect-[3/4] object-cover" />
            <div className="p-4 bg-white">
              <h3 className="text-xl font-bold text-gray-800">{t("ceoSection.name")}</h3>
              <p className="text-indigo-600">{t("ceoSection.position")}</p>
            </div>
          </div>
        </motion.div> */}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Project;
