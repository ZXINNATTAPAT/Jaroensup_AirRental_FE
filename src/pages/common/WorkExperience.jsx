import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Loading from "../../components/Loading";
import SEO from "../../components/SEO";

const translations = {
  th: {
    header: "ผลงานที่ผ่านมา",
    subText: "สำรวจโครงการและประสบการณ์สำคัญที่เรามีร่วมกับบริษัทต่าง ๆ",
    details: "ดูรายละเอียด",
    loading: "กำลังโหลดข้อมูล...",
    error: "เกิดข้อผิดพลาดในการโหลดข้อมูล",
    noData: "ยังไม่มีผลงาน",
    company: "บริษัท",
  },
  en: {
    header: "Our Work",
    subText: "Explore some of the significant projects we've had with various companies.",
    details: "View Details",
    loading: "Loading data...",
    error: "Failed to load data",
    noData: "No work experiences yet",
    company: "Company",
  },
};

const WorkExperience = () => {
  const navigate = useNavigate();
  const [language, setLanguage] = useState(localStorage.getItem("language") || "th");
  const [workExperiences, setWorkExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const apiUrl = import.meta.env.VITE_SERVER_URL;

  useEffect(() => {
    const fetchWorkExperiences = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${apiUrl}/work_exps`);
        setWorkExperiences(response.data);
        setLoading(false);
      } catch (err) {
        setError(translations[language].error);
        setLoading(false);
      }
    };
    fetchWorkExperiences();
  }, [apiUrl, language]);

  useEffect(() => {
    const handleLanguageChange = () => {
      setLanguage(localStorage.getItem("language") || "th");
    };
    window.addEventListener("storage", handleLanguageChange);
    return () => {
      window.removeEventListener("storage", handleLanguageChange);
    };
  }, []);

  if (loading) return <Loading />;
  if (error) return <div className="text-center mt-20 text-red-600 font-prompt">{error}</div>;

  // SEO structured data
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": language === "th" ? "ผลงานที่ผ่านมา" : "Our Work",
    "description": language === "th" 
      ? "สำรวจโครงการและประสบการณ์สำคัญที่เรามีร่วมกับบริษัทต่าง ๆ"
      : "Explore some of the significant projects we've had with various companies.",
    "url": typeof window !== "undefined" ? `${window.location.origin}/experience` : "https://jaroensupairrental.com/experience",
    "mainEntity": {
      "@type": "ItemList",
      "numberOfItems": workExperiences.length,
      "itemListElement": workExperiences.map((exp, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "CreativeWork",
          "name": exp.project_title,
          "description": exp.description || exp.project_title,
          "url": typeof window !== "undefined" ? `${window.location.origin}/experience/${exp.id}` : `https://jaroensupairrental.com/experience/${exp.id}`,
          "image": exp.images && exp.images.length > 0 ? exp.images[0] : undefined,
          "creator": {
            "@type": "Organization",
            "name": exp.company_name || "เจริญทรัพย์แอร์เช่า"
          }
        }
      }))
    }
  };

  return (
    <>
      <SEO
        title={language === "th" 
          ? "ผลงานที่ผ่านมา | เจริญทรัพย์แอร์เช่า" 
          : "Our Work | Jaroensup Air Rental"}
        description={language === "th"
          ? "สำรวจโครงการและประสบการณ์สำคัญที่เรามีร่วมกับบริษัทต่าง ๆ ดูผลงานการติดตั้งแอร์และบริการของเรา"
          : "Explore some of the significant projects we've had with various companies. View our air conditioning installation and service portfolio."}
        keywords={language === "th"
          ? "ผลงาน, โปรเจกต์, ติดตั้งแอร์, บริการแอร์, ผลงานที่ผ่านมา, โครงการแอร์, งานติดตั้ง"
          : "portfolio, projects, air conditioning installation, air service, work experience, air projects, installation work"}
        url={typeof window !== "undefined" ? `${window.location.origin}/experience` : "https://jaroensupairrental.com/experience"}
        structuredData={structuredData}
      />
      <Navbar />
      <div className="bg-gray-100 min-h-screen py-8 font-prompt">
        <div className="container mx-auto px-6">
          <header className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              {translations[language].header}
            </h1>
            <p className="text-lg text-gray-600">
              {translations[language].subText}
            </p>
          </header>

          {workExperiences.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-xl text-gray-500">{translations[language].noData}</p>
            </div>
          ) : (
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {workExperiences.map(({ id, images, company_name, project_title }) => {
                const imageUrl = images && Array.isArray(images) && images.length > 0 ? images[0] : "https://via.placeholder.com/300";
                return (
                  <div
                    key={id}
                    className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
                  >
                    <img
                      src={imageUrl}
                      alt={company_name || project_title || "Work Experience"}
                      className="w-full h-48 object-cover cursor-pointer hover:scale-105 transition-transform duration-300"
                      onClick={() => setSelectedImage(imageUrl)}
                    />
                    <div className="p-5">
                      {company_name && (
                        <p className="text-sm text-gray-500 mb-1">
                          {translations[language].company}: <span className="font-semibold text-gray-700">{company_name}</span>
                        </p>
                      )}
                      <h2 className="text-lg font-semibold mb-3 text-gray-800 line-clamp-2 min-h-[3rem]">
                        {project_title}
                      </h2>
                      <div className="flex justify-end">
                        <button
                          onClick={() => navigate(`/experience/${id}`)}
                          className="btn bg-blue hover:bg-blue-dark text-white px-6 py-2 rounded-lg transition-colors"
                        >
                          {translations[language].details}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </section>
          )}

          {selectedImage && (
            <div 
              className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4"
              onClick={() => setSelectedImage(null)}
            >
              <button
                className="absolute top-4 right-4 text-white text-4xl font-bold hover:text-gray-300 transition-colors z-10"
                onClick={() => setSelectedImage(null)}
                aria-label="Close"
              >
                &times;
              </button>
              <img
                src={selectedImage}
                alt="Selected"
                className="max-w-full max-h-[90vh] rounded-lg object-contain"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default WorkExperience;  