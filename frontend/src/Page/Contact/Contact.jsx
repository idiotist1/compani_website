import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ContactLocale from "../../Locale/Contact.json";

const Contact = () => {
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
    return keys.reduce((obj, k) => obj[k], ContactLocale[language]);
  };

  const fadeInVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay: i * 0.2 },
    }),
  };

  return (
    <div className="bg-black">
      <motion.div
        className="min-h-screen  py-32"
        initial="hidden"
        animate="visible"
      >
        <motion.div
          className="container mx-auto px-4 max-w-6xl"
          variants={fadeInVariants}
          custom={0}
        >
          <motion.div
            className="text-left mb-16"
            variants={fadeInVariants}
            custom={1}
          >
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              {t("contact.title")}
            </h1>
          </motion.div>
          <motion.div
            className="grid lg:grid-cols-1 gap-12 items-start"
            variants={fadeInVariants}
            custom={2}
          >
            <motion.div
              className="bg-white rounded-2xl shadow-lg overflow-hidden"
              variants={fadeInVariants}
              custom={5}
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3162.279301018033!2d126.9754847612344!3d37.572040327749015!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357ca2eb421c44ad%3A0xe955a50c118085f8!2sGwanghwamun%20Square!5e0!3m2!1sen!2skr!4v1735115389923!5m2!1sen!2skr"
                width="100%"
                height="400"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-[400px] md:h-[600px] lg:h-[600px]"
              ></iframe>
            </motion.div>

            <motion.div
              className="space-y-8"
              variants={fadeInVariants}
              custom={4}
            >
              <div>
                <div className="space-y-1">
                  <p className="text-white text-2xl">
                    {t("contact.contact_info.address.info")}
                  </p>
                  <p className="text-gray-400 text-1xl">
                    {t("contact.contact_info.phone.info")}
                  </p>
                  <p className="text-gray-400 text-1xl">
                    {t("contact.contact_info.email.info")}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Contact;
