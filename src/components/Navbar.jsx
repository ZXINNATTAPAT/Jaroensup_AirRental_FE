import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

const translations = {
  th: {
    home: "หน้าแรก",
    aboutUs: "เกี่ยวกับเรา",
    products: "ผลิตภัณฑ์",
    services: "บริการ",
    distributionCenter: "ศูนย์จัดจำหน่าย",
    ourWorks: "ผลงานของเรา",
    newsArticles: "ข่าวสารบทความ",
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
    aboutUs: "About Us",
    products: "Products",
    services: "Services",
    distributionCenter: "Distribution Center",
    ourWorks: "Our Works",
    newsArticles: "News & Articles",
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
  const [image, setImage] = useState(null);
  const token = cookies.get("authToken");
  const navigate = useNavigate();
  const [role,setRole] = useState();
  const [language, setLanguage] = useState(
    localStorage.getItem("language") || "th"
  );
  const [activeDropdown, setActiveDropdown] = useState(null);

  useEffect(() => {
    const handleLanguageChange = () => {
      setLanguage(localStorage.getItem("language") || "th");
    };

    window.addEventListener("storage", handleLanguageChange);
    return () => {
      window.removeEventListener("storage", handleLanguageChange);
    };
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (activeDropdown && !event.target.closest('.relative')) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [activeDropdown]);

  useEffect(() => {
    if (token) {
      const decodedToken = jwtDecode(token);
      setRole(decodedToken.role)
      fetchUserByID(decodedToken.id);
    }
  }, [token]);

  const toggleNavbar = () => {
    setIsToggle(!isToggle);
    console.log(isToggle);
  };

  const handleDropdownToggle = (dropdownName) => {
    setActiveDropdown(activeDropdown === dropdownName ? null : dropdownName);
  };

  const handleDropdownClose = () => {
    setActiveDropdown(null);
  };

  // Dropdown content data
  const dropdownContent = {
    aboutUs: {
      th: [
        { name: "ประวัติบริษัท", link: "/about/history" },
        { name: "วิสัยทัศน์", link: "/about/vision" },
        { name: "ทีมงาน", link: "/about/team" },
        { name: "พันธกิจ", link: "/about/mission" }
      ],
      en: [
        { name: "Company History", link: "/about/history" },
        { name: "Vision", link: "/about/vision" },
        { name: "Our Team", link: "/about/team" },
        { name: "Mission", link: "/about/mission" }
      ]
    },
    products: {
      th: [
        { name: "แอร์ 5 ตัน", link: "/products/5ton" },
        { name: "แอร์ 10 ตัน", link: "/products/10ton" },
        { name: "แอร์ 20 ตัน", link: "/products/20ton" },
        { name: "อุปกรณ์เสริม", link: "/products/accessories" }
      ],
      en: [
        { name: "5 Ton AC", link: "/products/5ton" },
        { name: "10 Ton AC", link: "/products/10ton" },
        { name: "20 Ton AC", link: "/products/20ton" },
        { name: "Accessories", link: "/products/accessories" }
      ]
    },
    services: {
      th: [
        { name: "บริการเช่าแอร์", link: "/services/rental" },
        { name: "ติดตั้งและซ่อมบำรุง", link: "/services/installation" },
        { name: "บริการล้างแอร์", link: "/services/cleaning" },
        { name: "ให้คำปรึกษา", link: "/services/consultation" }
      ],
      en: [
        { name: "AC Rental Service", link: "/services/rental" },
        { name: "Installation & Maintenance", link: "/services/installation" },
        { name: "AC Cleaning Service", link: "/services/cleaning" },
        { name: "Consultation", link: "/services/consultation" }
      ]
    },
    distributionCenter: {
      th: [
        { name: "ศูนย์บริการกรุงเทพ", link: "/centers/bangkok" },
        { name: "ศูนย์บริการเชียงใหม่", link: "/centers/chiangmai" },
        { name: "ศูนย์บริการภูเก็ต", link: "/centers/phuket" },
        { name: "ศูนย์บริการอื่นๆ", link: "/centers/others" }
      ],
      en: [
        { name: "Bangkok Service Center", link: "/centers/bangkok" },
        { name: "Chiang Mai Service Center", link: "/centers/chiangmai" },
        { name: "Phuket Service Center", link: "/centers/phuket" },
        { name: "Other Centers", link: "/centers/others" }
      ]
    },
    ourWorks: {
      th: [
        { name: "งานแต่งงาน", link: "/works/weddings" },
        { name: "งานอีเวนต์", link: "/works/events" },
        { name: "งานบวช", link: "/works/ceremonies" },
        { name: "งานบริษัท", link: "/works/corporate" }
      ],
      en: [
        { name: "Weddings", link: "/works/weddings" },
        { name: "Events", link: "/works/events" },
        { name: "Ceremonies", link: "/works/ceremonies" },
        { name: "Corporate", link: "/works/corporate" }
      ]
    },
    newsArticles: {
      th: [
        { name: "ข่าวสาร", link: "/news" },
        { name: "บทความ", link: "/articles" },
        { name: "โปรโมชั่น", link: "/promotions" },
        { name: "คำแนะนำ", link: "/tips" }
      ],
      en: [
        { name: "News", link: "/news" },
        { name: "Articles", link: "/articles" },
        { name: "Promotions", link: "/promotions" },
        { name: "Tips", link: "/tips" }
      ]
    },
    contact: {
      th: [
        { name: "ติดต่อเรา", link: "/contact" },
        { name: "ขอใบเสนอราคา", link: "/quote" },
        { name: "แจ้งปัญหา", link: "/support" },
        { name: "ติดตามงาน", link: "/track" }
      ],
      en: [
        { name: "Contact Us", link: "/contact" },
        { name: "Get Quote", link: "/quote" },
        { name: "Report Issue", link: "/support" },
        { name: "Track Order", link: "/track" }
      ]
    }
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
              {/* <div className="flex items-center space-x-2">
                <span>📞</span>
                <a 
                  href="tel:0969584422" 
                  className="hover:text-blue-200 transition-colors duration-200 font-medium"
                >
                  096-958-4422 (คุณแม็กซ์)
                </a>
              </div> */}
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
              
              {/* About Us Dropdown */}
              <div className="relative group">
                <button 
                  onClick={() => handleDropdownToggle('aboutUs')}
                  className="text-black hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors duration-200 flex items-center"
                >
                  {translations[language].aboutUs}
                  <span className="ml-1 text-xs">+</span>
                </button>
                {activeDropdown === 'aboutUs' && (
                  <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                    {dropdownContent.aboutUs[language].map((item, index) => (
                      <Link
                        key={index}
                        to={item.link}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={handleDropdownClose}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Products Dropdown */}
              <div className="relative group">
                <button 
                  onClick={() => handleDropdownToggle('products')}
                  className="text-black hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors duration-200 flex items-center"
                >
                  {translations[language].products}
                  <span className="ml-1 text-xs">+</span>
                </button>
                {activeDropdown === 'products' && (
                  <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                    {dropdownContent.products[language].map((item, index) => (
                      <Link
                        key={index}
                        to={item.link}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={handleDropdownClose}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Services Dropdown */}
              <div className="relative group">
                <button 
                  onClick={() => handleDropdownToggle('services')}
                  className="text-black hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors duration-200 flex items-center"
                >
                  {translations[language].services}
                  <span className="ml-1 text-xs">+</span>
                </button>
                {activeDropdown === 'services' && (
                  <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                    {dropdownContent.services[language].map((item, index) => (
                      <Link
                        key={index}
                        to={item.link}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={handleDropdownClose}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Distribution Center Dropdown */}
              <div className="relative group">
                <button 
                  onClick={() => handleDropdownToggle('distributionCenter')}
                  className="text-black hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors duration-200 flex items-center"
                >
                  {translations[language].distributionCenter}
                  <span className="ml-1 text-xs">+</span>
                </button>
                {activeDropdown === 'distributionCenter' && (
                  <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                    {dropdownContent.distributionCenter[language].map((item, index) => (
                      <Link
                        key={index}
                        to={item.link}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={handleDropdownClose}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Our Works Dropdown */}
              <div className="relative group">
                <button 
                  onClick={() => handleDropdownToggle('ourWorks')}
                  className="text-black hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors duration-200 flex items-center"
                >
                  {translations[language].ourWorks}
                  <span className="ml-1 text-xs">+</span>
                </button>
                {activeDropdown === 'ourWorks' && (
                  <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                    {dropdownContent.ourWorks[language].map((item, index) => (
                      <Link
                        key={index}
                        to={item.link}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={handleDropdownClose}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* News & Articles Dropdown */}
              <div className="relative group">
                <button 
                  onClick={() => handleDropdownToggle('newsArticles')}
                  className="text-black hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors duration-200 flex items-center"
                >
                  {translations[language].newsArticles}
                  <span className="ml-1 text-xs">+</span>
                </button>
                {activeDropdown === 'newsArticles' && (
                  <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                    {dropdownContent.newsArticles[language].map((item, index) => (
                      <Link
                        key={index}
                        to={item.link}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={handleDropdownClose}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Contact Dropdown */}
              <div className="relative group">
                <button 
                  onClick={() => handleDropdownToggle('contact')}
                  className="text-black hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors duration-200 flex items-center"
                >
                  {translations[language].contact}
                  <span className="ml-1 text-xs">+</span>
                </button>
                {activeDropdown === 'contact' && (
                  <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                    {dropdownContent.contact[language].map((item, index) => (
                      <Link
                        key={index}
                        to={item.link}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={handleDropdownClose}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right side - Language toggle and User menu */}
          <div className="flex items-center space-x-4">
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
                onClick={handleDropdownClose}
              >
                {translations[language].home}
              </Link>
              
              {/* About Us Mobile Dropdown */}
              <div>
                <button 
                  onClick={() => handleDropdownToggle('aboutUs')}
                  className="text-black hover:text-blue-600 block px-3 py-2 text-base font-medium w-full text-left flex items-center justify-between"
                >
                  {translations[language].aboutUs}
                  <span className="text-xs">+</span>
                </button>
                {activeDropdown === 'aboutUs' && (
                  <div className="pl-4 space-y-1">
                    {dropdownContent.aboutUs[language].map((item, index) => (
                      <Link
                        key={index}
                        to={item.link}
                        className="text-gray-600 hover:text-blue-600 block px-3 py-2 text-sm"
                        onClick={handleDropdownClose}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Products Mobile Dropdown */}
              <div>
                <button 
                  onClick={() => handleDropdownToggle('products')}
                  className="text-black hover:text-blue-600 block px-3 py-2 text-base font-medium w-full text-left flex items-center justify-between"
                >
                  {translations[language].products}
                  <span className="text-xs">+</span>
                </button>
                {activeDropdown === 'products' && (
                  <div className="pl-4 space-y-1">
                    {dropdownContent.products[language].map((item, index) => (
                      <Link
                        key={index}
                        to={item.link}
                        className="text-gray-600 hover:text-blue-600 block px-3 py-2 text-sm"
                        onClick={handleDropdownClose}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Services Mobile Dropdown */}
              <div>
                <button 
                  onClick={() => handleDropdownToggle('services')}
                  className="text-black hover:text-blue-600 block px-3 py-2 text-base font-medium w-full text-left flex items-center justify-between"
                >
                  {translations[language].services}
                  <span className="text-xs">+</span>
                </button>
                {activeDropdown === 'services' && (
                  <div className="pl-4 space-y-1">
                    {dropdownContent.services[language].map((item, index) => (
                      <Link
                        key={index}
                        to={item.link}
                        className="text-gray-600 hover:text-blue-600 block px-3 py-2 text-sm"
                        onClick={handleDropdownClose}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Distribution Center Mobile Dropdown */}
              <div>
                <button 
                  onClick={() => handleDropdownToggle('distributionCenter')}
                  className="text-black hover:text-blue-600 block px-3 py-2 text-base font-medium w-full text-left flex items-center justify-between"
                >
                  {translations[language].distributionCenter}
                  <span className="text-xs">+</span>
                </button>
                {activeDropdown === 'distributionCenter' && (
                  <div className="pl-4 space-y-1">
                    {dropdownContent.distributionCenter[language].map((item, index) => (
                      <Link
                        key={index}
                        to={item.link}
                        className="text-gray-600 hover:text-blue-600 block px-3 py-2 text-sm"
                        onClick={handleDropdownClose}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Our Works Mobile Dropdown */}
              <div>
                <button 
                  onClick={() => handleDropdownToggle('ourWorks')}
                  className="text-black hover:text-blue-600 block px-3 py-2 text-base font-medium w-full text-left flex items-center justify-between"
                >
                  {translations[language].ourWorks}
                  <span className="text-xs">+</span>
                </button>
                {activeDropdown === 'ourWorks' && (
                  <div className="pl-4 space-y-1">
                    {dropdownContent.ourWorks[language].map((item, index) => (
                      <Link
                        key={index}
                        to={item.link}
                        className="text-gray-600 hover:text-blue-600 block px-3 py-2 text-sm"
                        onClick={handleDropdownClose}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* News & Articles Mobile Dropdown */}
              <div>
                <button 
                  onClick={() => handleDropdownToggle('newsArticles')}
                  className="text-black hover:text-blue-600 block px-3 py-2 text-base font-medium w-full text-left flex items-center justify-between"
                >
                  {translations[language].newsArticles}
                  <span className="text-xs">+</span>
                </button>
                {activeDropdown === 'newsArticles' && (
                  <div className="pl-4 space-y-1">
                    {dropdownContent.newsArticles[language].map((item, index) => (
                      <Link
                        key={index}
                        to={item.link}
                        className="text-gray-600 hover:text-blue-600 block px-3 py-2 text-sm"
                        onClick={handleDropdownClose}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Contact Mobile Dropdown */}
              <div>
                <button 
                  onClick={() => handleDropdownToggle('contact')}
                  className="text-black hover:text-blue-600 block px-3 py-2 text-base font-medium w-full text-left flex items-center justify-between"
                >
                  {translations[language].contact}
                  <span className="text-xs">+</span>
                </button>
                {activeDropdown === 'contact' && (
                  <div className="pl-4 space-y-1">
                    {dropdownContent.contact[language].map((item, index) => (
                      <Link
                        key={index}
                        to={item.link}
                        className="text-gray-600 hover:text-blue-600 block px-3 py-2 text-sm"
                        onClick={handleDropdownClose}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
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
