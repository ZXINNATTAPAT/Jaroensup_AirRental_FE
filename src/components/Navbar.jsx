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
    <nav>
      <div className="navbar bg-white text-black font-prompt ">
        <div className="navbar-start">
          <div className="dropdown">
            <div
              tabIndex="0"
              role="button"
              className="btn btn-ghost lg:hidden"
              onClick={toggleNavbar}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            {isToggle && (
              <ul
                tabIndex="0"
                className="menu menu-sm dropdown-content bg-white text-black rounded-box z-[1] mt-3 w-52 p-2 shadow"
              >
                <li>
                  <Link to="/">{translations[language].home}</Link>
                </li>
                {/*<li>
                  <Link to="/product">{translations[language].product}</Link>
                </li>*/}
                {/*<li>
                  <Link to="/services">{translations[language].services}</Link>
                </li>*/}
                <li>
                  <Link to="/experience">
                    {translations[language].experience}
                  </Link>
                </li>
                {/*<li>
                  <Link to="/register-tech">
                    {translations[language].registerTech}
                  </Link>
                </li>*/}
                <li>
                  <Link to="/contact">{translations[language].contact}</Link>
                </li>
                {/* <li>
                 <Link to="/augmented-reality">{translations[language].arFeature}</Link>
                </li> */}
              </ul>
            )}
          </div>
          <a className="btn btn-ghost text-xl">Jaroensup</a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link to="/">{translations[language].home}</Link>
            </li>
            {/*<li>
              <Link to="/product">{translations[language].product}</Link>
            </li>*/}
            {/*<li>
              <Link to="/services">{translations[language].services}</Link>
            </li>*/}
            <li>
              <Link to="/experience">{translations[language].experience}</Link>
            </li>
            {/*<li>
              <Link to="/register-tech">
                {translations[language].registerTech}
              </Link>
            </li>*/}
            <li>
              <Link to="/contact">{translations[language].contact}</Link>
            </li>
            {/* <li>
                  <Link to="/augmented-reality">{translations[language].arFeature}</Link>
                </li> */}
          </ul>
        </div>
        <div className="navbar-end ">
          {/*<Link  to="/checkout"><MdOutlineShoppingCart className="text-xl cursor-pointer"/></Link>*/}
          <button
            onClick={toggleLanguage}
            className="badge badge-outline cursor-pointer p-4 text-sm mx-2"
          >
            {language === "th" ? "🇹🇭 ไทย" : "🇬🇧 English"}
          </button>
          {/*<li className="list-none ">
            {!token && (
              <Link to="/login" className="text-sm md:text-base">
                {translations[language].login}
              </Link>
            )}
          </li>*/}
          {token && (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
                onClick={toggleNavbar}
              >
                <div className="w-10 rounded-full">
                  {image ? (
                    <img alt="User Avatar" src={`${image}`} />
                  ) : (
                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                      <span className="text-gray-500">no image</span>{" "}
                      {/* Fallback UI */}
                    </div>
                  )}
                </div>
              </div>
              {isToggle && (
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow bg-white text-black"
                >
                  <li>
                    <a className="justify-between" href="/profile-setting">
                      {translations[language].profile}
                      <span className="badge">New</span>
                    </a>
                  </li>
                  <li>
                    <a href="/history">{translations[language].history}</a>
                  </li>
                  <li>
                    <a href="/change-password">
                      {translations[language].changePassword}
                    </a>
                  </li>
                  {role !== 1 && (
                    <li>
                      <a href="/dashboard/home">
                        {translations[language].gotoDashboard}
                      </a>
                    </li>
                  )}

                  <li>
                    <a href="/settings">
                      {translations[language].notification}
                    </a>
                  </li>
                  <li>
                    <a onClick={handleLogout}>
                      {translations[language].logout}
                    </a>
                  </li>
                </ul>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
