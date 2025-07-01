import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import FooterLocale from "../../Locale/Footer.json";

const Footer = () => {
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
    return keys.reduce((obj, k) => obj[k], FooterLocale[language]);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-3 pt-6">
        <div className="grid grid-cols-1 md:grid-cols-1 gap-5">
          
          <div className="mx-auto text-center text-white">
            <h3 className="text-xl font-bold"></h3>
            <ul className="space-y-0" style={{ display: 'flex', padding: 0, listStyle: 'none' }}>
              <li className="ml-5 mr-3  border-r border-gray-800 pr-3">
                <Link to="/" onClick={scrollToTop} className="hover:text-white transition-colors">
                  {t("footer.quickLinks.home")}
                </Link>
              </li>
              <li className="mr-3  border-r border-gray-800 pr-3">
                <Link to="/about" onClick={scrollToTop} className="hover:text-white transition-colors">
                  {t("footer.quickLinks.about")}
                </Link>
              </li>
              <li className="mr-3 border-r border-gray-800 pr-3">
                <Link to="/project" onClick={scrollToTop} className="hover:text-white transition-colors">
                  {t("footer.quickLinks.project")}
                </Link>
              </li>
              <li className="mr-3  border-r border-gray-800 pr-3">
                <Link to="/board" onClick={scrollToTop} className="hover:text-white transition-colors">
                  {t("footer.quickLinks.board")}
                </Link>
              </li>
              <li className="mr-3">
                <Link to="/contact" onClick={scrollToTop} className="hover:text-white transition-colors">
                  {t("footer.quickLinks.contact")}
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="mx-auto text-center pb-1">
            <h3 className="text-xl font-bold mb-3">{t("footer.contact.title")}</h3>
            <ul className="space-y-2 text-gray-400">
              <li className="text-xs" >{t("footer.contact.address")} | {t("footer.contact.BusinessNumber")}</li>
              <li className="text-xs" >{t("footer.contact.email")} | {t("footer.contact.phone")}</li>
            </ul>
          </div>

        </div>

        <div className="border-t border-gray-800 mt-1 pt-2 text-center text-gray-400">
          <p>{t("footer.copyright")}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;