import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import BackButton from "../../components/BackButton";
import axios from "axios";
import Loading from "../../components/Loading";
import SEO from "../../components/SEO";

const translations = {
  th: {
    notFound: "ไม่พบข้อมูลงาน",
    loading: "กำลังโหลดข้อมูล...",
    error: "เกิดข้อผิดพลาดในการโหลดข้อมูล",
    company: "บริษัท",
    project: "ชื่อโปรเจกต์",
    description: "รายละเอียด",
    images: "รูปภาพ",
    noImages: "ไม่มีรูปภาพ",
    back: "กลับ",
    clickToView: "คลิกเพื่อดูขนาดเต็ม",
  },
  en: {
    notFound: "Work experience not found",
    loading: "Loading data...",
    error: "Failed to load data",
    company: "Company",
    project: "Project Title",
    description: "Description",
    images: "Images",
    noImages: "No images available",
    back: "Back",
    clickToView: "Click to view full size",
  },
};

const WorkExperienceDetails = () => {
  const { expId } = useParams();
  const [experience, setExperience] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [fullScreenImage, setFullScreenImage] = useState(null);
  const [language, setLanguage] = useState(localStorage.getItem("language") || "th");
  const apiUrl = import.meta.env.VITE_SERVER_URL;

  useEffect(() => {
    const handleLanguageChange = () => {
      setLanguage(localStorage.getItem("language") || "th");
    };
    window.addEventListener("storage", handleLanguageChange);
    return () => {
      window.removeEventListener("storage", handleLanguageChange);
    };
  }, []);

  useEffect(() => {
    const fetchWorkExperience = async () => {
      if (!expId) return;
      
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get(`${apiUrl}/work_exps/${expId}`);
        setExperience(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching work experience:", err);
        setError(translations[language]?.error || "Failed to load data");
        setLoading(false);
        setExperience(null);
      }
    };
    
    if (apiUrl && expId) {
      fetchWorkExperience();
    }
  }, [expId, apiUrl, language]);

  if (loading) return <Loading />;
  if (error) return <div className="text-center mt-20 text-red-600 font-prompt">{error}</div>;
  if (!experience) {
    return (
      <div className="text-center mt-20 text-red-600 font-prompt">
        <h1 className="text-3xl font-bold">{translations[language].notFound}</h1>
      </div>
    );
  }

  const { images, company_name, project_title, description } = experience;
  const imageArray = images && Array.isArray(images) ? images : [];
  const firstImage = imageArray.length > 0 ? imageArray[0] : undefined;

  // SEO structured data
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "name": project_title,
    "description": description || project_title,
    "url": typeof window !== "undefined" ? `${window.location.origin}/experience/${expId}` : `https://jaroensupairrental.com/experience/${expId}`,
    "image": imageArray,
    "creator": {
      "@type": "Organization",
      "name": company_name || "เจริญทรัพย์แอร์เช่า",
      "url": "https://jaroensupairrental.com"
    },
    "publisher": {
      "@type": "Organization",
      "name": "เจริญทรัพย์แอร์เช่า",
      "url": "https://jaroensupairrental.com"
    }
  };

  const openFullScreen = (image) => {
    setFullScreenImage(image);
    setIsFullScreen(true);
  };

  const closeFullScreen = () => {
    setIsFullScreen(false);
    setFullScreenImage(null);
  };

  return (
    <>
      <SEO
        title={language === "th"
          ? `${project_title} | ผลงาน | เจริญทรัพย์แอร์เช่า`
          : `${project_title} | Portfolio | Jaroensup Air Rental`}
        description={language === "th"
          ? `${description || project_title} - ${company_name ? `บริษัท ${company_name}` : "ผลงานของเจริญทรัพย์แอร์เช่า"}`
          : `${description || project_title} - ${company_name ? `Company: ${company_name}` : "Jaroensup Air Rental Portfolio"}`}
        keywords={language === "th"
          ? `${project_title}, ${company_name}, ผลงาน, โปรเจกต์, ติดตั้งแอร์, บริการแอร์`
          : `${project_title}, ${company_name}, portfolio, project, air conditioning installation, air service`}
        image={firstImage}
        url={typeof window !== "undefined" ? `${window.location.origin}/experience/${expId}` : `https://jaroensupairrental.com/experience/${expId}`}
        structuredData={structuredData}
      />
      <Navbar />
      <div className="bg-gray-100 min-h-screen py-8 font-prompt">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="flex items-center justify-start mb-6">
            <BackButton />
          </div>
          
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            {/* Header Section */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6">
              <h1 className="text-3xl font-bold mb-2">{project_title || translations[language].project}</h1>
              {company_name && (
                <p className="text-lg opacity-90">
                  {translations[language].company}: {company_name}
                </p>
              )}
            </div>

            {/* Content Section */}
            <div className="p-6">
              {/* Description */}
              {description && (
                <div className="mb-8">
                  <h2 className="text-xl font-semibold text-gray-800 mb-3">
                    {translations[language].description}
                  </h2>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-gray-700 whitespace-pre-line leading-relaxed">
                      {description}
                    </p>
                  </div>
                </div>
              )}

              {/* Images Section */}
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  {translations[language].images}
                </h2>
                {imageArray.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {imageArray.map((image, index) => (
                      <div
                        key={index}
                        className="relative group overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
                      >
                        <img
                          src={image || "https://via.placeholder.com/300"}
                          alt={`${translations[language].images} ${index + 1} - ${project_title || company_name || "Work Experience"}`}
                          className="w-full h-64 object-cover cursor-pointer transform group-hover:scale-105 transition-transform duration-300"
                          onClick={() => openFullScreen(image)}
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity duration-300 flex items-center justify-center">
                          <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity text-sm font-semibold">
                            {translations[language].clickToView}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 bg-gray-50 rounded-lg">
                    <p className="text-gray-500 text-lg">{translations[language].noImages}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {isFullScreen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-95 flex justify-center items-center z-50 p-4"
          onClick={closeFullScreen}
        >
          <button
            className="absolute top-4 right-4 text-white text-4xl font-bold hover:text-gray-300 transition-colors z-10 bg-black bg-opacity-50 rounded-full w-12 h-12 flex items-center justify-center"
            onClick={closeFullScreen}
            aria-label="Close"
          >
            &times;
          </button>
          <img
            src={fullScreenImage}
            alt="Full Screen"
            className="max-w-full max-h-[90vh] object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
      <Footer />
    </>
  );
};

export default WorkExperienceDetails;