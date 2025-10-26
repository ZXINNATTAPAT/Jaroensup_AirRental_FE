import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { MdOutlineShoppingCart } from "react-icons/md";

const translations = {
  th: {
    home: "หน้าหลัก",
    product: "สินค้า",
    services: "บริการของเรา",
    experience: "ผลงานของเรา",
    registerTech: "ร่วมงานกับเรา",
    contact: "ติดต่อเรา",
    arFeature: "AR Feature",
    profile: "โปรไฟล์",
    history: "ประวัติ",
    changePassword: "เปลี่ยนรหัสผ่าน",
    notification: "การแจ้งเตือน",
    logout: "ออกจากระบบ",
    login: "สมัครสมาชิก/เข้าสู่ระบบ",
    gotoDashboard : "ไปยังแดชบอร์ด"
  },
  en: {
    home: "Home",
    product: "Products",
    services: "Our Services",
    experience: "Our Work",
    registerTech: "Join Us",
    contact: "Contact",
    arFeature: "AR Feature",
    profile: "Profile",
    history: "History",
    changePassword: "Change Password",
    notification: "Notifications",
    logout: "Logout",
    login: "Sign Up / Login",
    gotoDashboard : "Go to dashboard"
  },
};

const Navbar = () => {
  const cookies = new Cookies();
  const [isToggle, setIsToggle] = useState(false);
  const [userId, setUserId] = useState();
  const [image, setImage] = useState(null);
  const token = cookies.get("authToken");
  const navigate = useNavigate();
  const [role,setRole] = useState();
  const [language, setLanguage] = useState(
    localStorage.getItem("language") || "th"
  );

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
    if (token) {
      const decodedToken = jwtDecode(token);
      setUserId(decodedToken.id);
      setRole(decodedToken.role)
      fetchUserByID(decodedToken.id);
    }
  }, [token]);

  const toggleNavbar = () => {
    setIsToggle(!isToggle);
    console.log(isToggle);
  };

  const handleLogout = () => {
    console.log("Logging out...");
    cookies.remove("authToken", { path: "/" });
    console.log("Token after remove:", cookies.get("authToken"));
    setIsToggle(false); // ✅ ปิด Dropdown Menu
    navigate("/login");
  };

  const fetchUserByID = async (userId) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/user/${userId}`
      );
      if (response.status === 200) {
        setImage(response.data.image_url);
      }
    } catch (err) {
      console.error("Error fetching user image:", err);
      setImage(null);
    }
  };
  const toggleLanguage = () => {
    const newLanguage = language === "th" ? "en" : "th";
    localStorage.setItem("language", newLanguage);
    setLanguage(newLanguage);
    window.dispatchEvent(new Event("storage")); // บอกทุกหน้าว่าภาษาเปลี่ยน
  };

  return (
    <>
      {/* Mini Navigation Bar */}
      <div className="bg-blue-900 text-white text-sm">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center py-2 space-y-1 md:space-y-0">
            {/* Company Info */}
            <div className="text-center md:text-left">
              <span className="font-semibold">เจริญทรัพย์แอร์เช่า</span>
              <span className="hidden md:inline mx-2">|</span>
              <span className="block md:inline"></span>

              <span className="">
                ที่อยู่: 448 ถ.นาคนิวาส แขวงลาดพร้าว เขตลาดพร้าว กรุงเทพฯ 10230
            </span>
            </div>
            
            {/* Contact Info */}
            <div className="flex flex-col md:flex-row items-center space-y-1 md:space-y-0 md:space-x-4">
              <div className="flex items-center space-x-2">
                <span>📞</span>
                <a 
                  href="tel:0869750664" 
                  className="hover:text-blue-200 transition-colors duration-200 font-medium"
                >
                  086-975-0664 (คุณหมวย)
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="bg-gray-100 border-b border-gray-200">
        {/* Top dotted line */}
        <div className="border-t-2 border-dotted border-gray-300"></div>
        
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <img 
                src="/images/logo-removebg-preview.png" 
                alt="Jaroensup Logo" 
                className="h-12 w-auto mr-3"
              />
              <span className="text-2xl font-bold italic">
                JAROENSUP
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <Link
                to="/"
                className="text-black hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors duration-200"
              >
                {translations[language].home}
              </Link>
              
              <Link
                to="/services"
                className="text-black hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors duration-200"
              >
                {translations[language].services}
              </Link>
              
              <Link
                to="/experience"
                className="text-black hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors duration-200"
              >
                {translations[language].experience}
              </Link>
              
              <Link
                to="/register-tech"
                className="text-black hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors duration-200"
              >
                {translations[language].registerTech}
              </Link>
              
              <Link
                to="/contact"
                className="text-black hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors duration-200"
              >
                {translations[language].contact}
              </Link>
            </div>
          </div>

          {/* Right side - Shopping Cart, Language toggle and User menu */}
          <div className="flex items-center space-x-4">
            {/* Shopping Cart */}
            <Link to="/checkout" className="text-gray-600 hover:text-blue-600 transition-colors duration-200">
              <MdOutlineShoppingCart className="text-xl" />
            </Link>
            
            <button
              onClick={toggleLanguage}
              className="text-sm px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 transition-colors duration-200"
            >
              {language === "th" ? "🇹🇭 ไทย" : "🇬🇧 English"}
            </button>
            
            {token && (
              <div className="relative">
                <button
                  onClick={toggleNavbar}
                  className="flex items-center space-x-2 text-sm"
                >
                  <div className="w-8 h-8 rounded-full overflow-hidden">
                    {image ? (
                      <img alt="User Avatar" src={`${image}`} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-500 text-xs">👤</span>
                      </div>
                    )}
                  </div>
                </button>
                
                {isToggle && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                    <a
                      href="/profile-setting"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center justify-between"
                    >
                      {translations[language].profile}
                      <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">New</span>
                    </a>
                    <a
                      href="/history"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      {translations[language].history}
                    </a>
                    <a
                      href="/change-password"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      {translations[language].changePassword}
                    </a>
                    {role !== 1 && (
                      <a
                        href="/dashboard/home"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        {translations[language].gotoDashboard}
                      </a>
                    )}
                    <a
                      href="/settings"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      {translations[language].notification}
                    </a>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      {translations[language].logout}
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleNavbar}
              className="text-gray-500 hover:text-gray-600 focus:outline-none focus:text-gray-600"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isToggle && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
              <Link
                to="/"
                className="text-black hover:text-blue-600 block px-3 py-2 text-base font-medium"
                onClick={() => setIsToggle(false)}
              >
                {translations[language].home}
              </Link>
              
              <Link
                to="/services"
                className="text-black hover:text-blue-600 block px-3 py-2 text-base font-medium"
                onClick={() => setIsToggle(false)}
              >
                {translations[language].services}
              </Link>
              
              <Link
                to="/experience"
                className="text-black hover:text-blue-600 block px-3 py-2 text-base font-medium"
                onClick={() => setIsToggle(false)}
              >
                {translations[language].experience}
              </Link>
              
              <Link
                to="/register-tech"
                className="text-black hover:text-blue-600 block px-3 py-2 text-base font-medium"
                onClick={() => setIsToggle(false)}
              >
                {translations[language].registerTech}
              </Link>
              
              <Link
                to="/contact"
                className="text-black hover:text-blue-600 block px-3 py-2 text-base font-medium"
                onClick={() => setIsToggle(false)}
              >
                {translations[language].contact}
              </Link>
            </div>
          </div>
        )}
      </div>
      
        {/* Bottom blue line */}
        <div className="h-0.5 bg-blue-600"></div>
      </nav>
    </>
  );
};

export default Navbar;