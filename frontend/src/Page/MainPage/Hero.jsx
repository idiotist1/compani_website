import React, { useState, useEffect } from "react";
import HeroVideo from "../../assets/main_video.mp4";
import { motion } from "framer-motion";
import translations from "../../Locale/Hero.json";

const Hero = () => {
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

  const imageVariant = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8, delay: 0.7 },
    },
  };

  return (
    <div className="relative min-h-[110vh] from-gray-50 to-white pb-0 bg-black">
      <div >
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <motion.div
            className="flex-1 w-full max-w-2xl lg:max-w-none"
            initial="hidden"
            animate="visible"
            variants={imageVariant}
          >
            <div className="relative flex justify-center items-center">
              <video
                className="w-full"
                width="100%"
                height="100%"
                muted
                playsInline
                autoPlay
                loop
              >
                <source src={HeroVideo} type="video/mp4" />
              </video>
              <p className="absolute text-white text-2xl font-bold text-center">
                이곳에 텍스트가 중앙에 배치됩니다.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
