import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Paper,
  Typography,
  Divider,
  Box,
  Chip,
  Skeleton,
  IconButton,
  Snackbar,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ShareIcon from "@mui/icons-material/Share";
import Button from "@mui/material/Button";
import ContactLocale from "../../Locale/SinglePost.json";

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  marginTop: theme.spacing(3),
  marginBottom: theme.spacing(3),
}));

const PostHeader = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  marginBottom: theme.spacing(2),
  gap: theme.spacing(2),
}));

const SinglePost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openSnackbar, setOpenSnackbar] = useState(false);

    const fadeInVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay: i * 0.2 },
    }),
  };

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const postResponse = await axios.get(
          `http://localhost:3000/api/post/${id}`
        );
        setPost(postResponse.data);
      } catch (error) {
        console.error("게시글 로딩 실패:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

    const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/contact",
        formData
      );

      if (response.status === 201) {
        alert(t("contact.alerts.success"));
        setFormData({
          name: "",
          email: "",
          phone: "",
          message: "",
          status: "in progress",
        });
      }
    } catch (error) {
      console.log("Error: ", error);
      alert(t("contact.alerts.error"));
    }
  };

  useEffect(() => {
    const handleLanguageChange = () => {
      setLanguage(localStorage.getItem("language") || "ko");
    };

    window.addEventListener("languageChange", handleLanguageChange);
    return () => {
      window.removeEventListener("languageChange", handleLanguageChange);
    };
  }, []);

  const handleFileDownload = (fileUrl) => {
    window.open(fileUrl, "_blank");
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const [language, setLanguage] = useState(
    localStorage.getItem("language") || "ko"
  );

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setOpenSnackbar(true);
  };

  const t = (key) => {
    const keys = key.split(".");
    return keys.reduce((obj, k) => obj[k], ContactLocale[language]);
  };
    const [formData, setFormData] = useState({
      name: "",
      email: "",
      phone: "",
      message: "",
      status: "in progress",
    });

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 14 }}>
        <StyledPaper elevation={2}>
          <Skeleton variant="text" height={60} />
          <Skeleton variant="text" width="60%" />
          <Divider sx={{ my: 3 }} />
          <Skeleton variant="rectangular" height={200} />
        </StyledPaper>
      </Container>
    );
  }

  return (
    <div className="bg-black">
      <Container maxWidth="lg" sx={{ py: 14 }}>
        <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
          <IconButton onClick={() => navigate(-1)} aria-label="뒤로가기">
            <ArrowBackIcon sx={{ color: "white" }} />
          </IconButton>
          <IconButton onClick={handleShare} aria-label="공유하기">
            <ShareIcon sx={{ color: "white" }} />
          </IconButton>
        </Box>

        <StyledPaper elevation={2}>
          <PostHeader>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="h4" component="h1" gutterBottom>
                {post.title}
              </Typography>
            </Box>
          </PostHeader>

          <Divider sx={{ my: 3 }} />

          <Box sx={{ my: 4 }}>
            <div
              dangerouslySetInnerHTML={{ __html: post.renderedContent }}
              style={{ lineHeight: 1.8, fontSize: "1.2rem" }}
            />
          </Box>

          {post.fileUrl && post.fileUrl.length > 0 && (
            <Box sx={{ mt: 4, p: 2, bgcolor: "grey.50", borderRadius: 1 }}>
              <Typography variant="subtitle2" gutterBottom>
                첨부파일
              </Typography>
              <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                {post.fileUrl.map((file, index) => (
                  <Chip
                    key={index}
                    label={file.split("/").pop()}
                    variant="outlined"
                    clickable
                    onClick={() => handleFileDownload(file)}
                    icon={<FileDownloadIcon />}
                    sx={{
                      "&:hover": { bgcolor: "grey.200" },
                      "& .MuiChip-icon": { fontSize: 20 },
                    }}
                  />
                ))}
              </Box>
            </Box>
          )}

          <div
            className="bg-white rounded-2xl shadow-xl p-8"
            variants={fadeInVariants}
            custom={3}
          >
            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    {t("contact.form.name")}
                  </label>
                  <input
                    type="text"
                    name="name"
                    className="w-full p-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors duration-300"
                    placeholder={t("contact.form.placeholders.name")}
                    required
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    {t("contact.form.email")}
                  </label>
                  <input
                    type="email"
                    name="email"
                    className="w-full p-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors duration-300"
                    placeholder={t("contact.form.placeholders.email")}
                    required
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    {t("contact.form.phone")}
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    className="w-full p-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors duration-300"
                    placeholder={t("contact.form.placeholders.phone")}
                    required
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    {t("contact.form.message")}
                  </label>
                  <textarea
                    name="message"
                    className="w-full p-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors duration-300 h-40"
                    placeholder={t("contact.form.placeholders.message")}
                    required
                    value={formData.message}
                    onChange={handleChange}
                  />
                </div>
                <button className="w-full bg-blue-600 text-white py-4 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-300">
                  {t("contact.form.submit")}
                </button>
              </div>
            </form>
          </div>

          <Box className="mt-4 flex justify-center space-x-2 text-lg font-bold">
            <Button variant="contained">지원하기</Button>
          </Box>
        </StyledPaper>

        <Snackbar
          open={openSnackbar}
          autoHideDuration={2000}
          onClose={() => setOpenSnackbar(false)}
          message="URL이 클립보드에 복사되었습니다"
        />
      </Container>
    </div>
  );
};

export default SinglePost;
