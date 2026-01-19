import { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import AirConditioner3D from "../../components/AirConditioner3D";
import SEO from "../../components/SEO";
// import ThemeExample from "../../components/ThemeExample";

const translations = {
  th: {
    heroTitle: "บริการให้เช่าแอร์ขนาดใหญ่ ขนาด 5 ตัน 10 ตัน 20 ตัน",
    heroSubtitle: "บริการครบวงจร พร้อมทีมงานมืออาชีพ ประสบการณ์กว่า 20 ปี",
    heroDescription:
      "รองรับงานอีเวนต์ งานแต่ง งานบวช คอนเสิร์ต โรงงาน และกิจกรรมทุกขนาด ติดตั้งรวดเร็ว เย็นทั่วถึง พร้อมทีมงานดูแลครบวงจร",
    viewServices: "ดูบริการ",
    contactUs: "ติดต่อเรา",
    getQuote: "ขอใบเสนอราคา",
    productTypes: "แอร์ 5 ตัน • แอร์ 10 ตัน • แอร์ 20 ตัน",
    aboutUs: "เกี่ยวกับเรา",
    services: "บริการของเรา",
    whyChooseUs: "ทำไมต้องเลือกเรา",
    portfolio: "ผลงานที่ผ่านมา",
    contact: "ติดต่อเรา",
  },
  en: {
    heroTitle: "Large Air Conditioner Rental Service 5 Ton 10 Ton 20 Ton",
    heroSubtitle:
      "Complete service with professional team, over 20 years experience",
    heroDescription:
      "Perfect for events, weddings, ceremonies, concerts, factories and activities of all sizes. Fast setup, powerful cooling, and full on-site support.",
    viewServices: "View Services",
    contactUs: "Contact Us",
    getQuote: "Get Quote",
    productTypes: "5 Ton AC • 10 Ton AC • 20 Ton AC",
    aboutUs: "About Us",
    services: "Our Services",
    whyChooseUs: "Why Choose Us",
    portfolio: "Portfolio",
    contact: "Contact",
  },
};

const Home = () => {
  const [language, setLanguage] = useState(
    localStorage.getItem("language") || "th"
  );
  //const cookies = new Cookies();
  //const token = cookies.get("authToken");

  useEffect(() => {
    const handleLanguageChange = () => {
      setLanguage(localStorage.getItem("language") || "th");
    };

    // ✅ ฟังค์ชั่นนี้จะทำงานเมื่อ localStorage เปลี่ยน
    window.addEventListener("storage", handleLanguageChange);

    return () => {
      window.removeEventListener("storage", handleLanguageChange);
    };
  }, []);

  // SEO structured data
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Air Conditioner Rental",
    "name": language === "th" 
      ? "บริการให้เช่าแอร์ขนาดใหญ่ ขนาด 5 ตัน 10 ตัน 20 ตัน"
      : "Large Air Conditioner Rental Service 5 Ton 10 Ton 20 Ton",
    "description": language === "th"
      ? "บริการครบวงจร พร้อมทีมงานมืออาชีพ ประสบการณ์กว่า 20 ปี รองรับงานอีเวนต์ งานแต่ง งานบวช คอนเสิร์ต โรงงาน และกิจกรรมทุกขนาด"
      : "Complete service with professional team, over 20 years experience. Perfect for events, weddings, ceremonies, concerts, factories and activities of all sizes.",
    "provider": {
      "@type": "Organization",
      "name": "เจริญทรัพย์แอร์เช่า",
      "alternateName": "Jaroensup Air Rental",
      "url": "https://jaroensupairrental.com",
      "telephone": "086-975-0664",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "กรุงเทพฯ",
        "addressCountry": "TH"
      }
    },
    "areaServed": {
      "@type": "Country",
      "name": "Thailand"
    },
    "offers": {
      "@type": "Offer",
      "itemOffered": {
        "@type": "Service",
        "name": language === "th" ? "เช่าแอร์ 5 ตัน 10 ตัน 20 ตัน" : "5 Ton 10 Ton 20 Ton AC Rental"
      }
    }
  };

  return (
    <>
      <SEO
        title={language === "th"
          ? "เช่าแอร์ | บริการให้เช่าแอร์และพัดลมไอน้ำทั่วประเทศ | เจริญทรัพย์แอร์เช่า"
          : "Air Conditioner Rental | AC & Water Fan Rental Service Thailand | Jaroensup Air Rental"}
        description={language === "th"
          ? "บริการให้เช่าแอร์และพัดลมไอน้ำ พร้อมติดตั้งทั่วประเทศ ราคาประหยัด เหมาะสำหรับงานอีเวนต์ งานแต่ง งานโรงงาน โทร 086-975-0664"
          : "Air conditioner and water fan rental service with installation throughout Thailand. Affordable prices perfect for events, weddings, factories. Call 086-975-0664"}
        keywords={language === "th"
          ? "เช่าแอร์, ให้เช่าพัดลมไอน้ำ, air conditioner rental service Thailand, เช่าแอร์กรุงเทพ, เช่าแอร์เชียงใหม่, เช่าแอร์ภูเก็ต, พัดลมไอน้ำเช่า, แอร์เคลื่อนที่เช่า, แอร์ตู้เช่า, งานแต่งงาน, งานอีเวนต์, โรงงานอุตสาหกรรม"
          : "air conditioner rental, water fan rental, AC rental Thailand, Bangkok AC rental, Chiang Mai AC rental, Phuket AC rental, portable AC rental, cabinet AC rental, wedding event, factory industrial"}
        url={typeof window !== "undefined" ? window.location.origin : "https://jaroensupairrental.com"}
        structuredData={structuredData}
      />
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-yellow-50">
        {/* Wave Background */}
        <div className="absolute inset-0 overflow-hidden">
          <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 1200 800" preserveAspectRatio="none">
            <defs>
              <linearGradient id="waveGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.1"/>
                <stop offset="50%" stopColor="#F59E0B" stopOpacity="0.05"/>
                <stop offset="100%" stopColor="#10B981" stopOpacity="0.1"/>
              </linearGradient>
              <linearGradient id="waveGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.08"/>
                <stop offset="50%" stopColor="#3B82F6" stopOpacity="0.05"/>
                <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.08"/>
              </linearGradient>
            </defs>
            <path d="M0,200 Q300,100 600,200 T1200,200 L1200,800 L0,800 Z" fill="url(#waveGradient1)" opacity="0.6"/>
            <path d="M0,400 Q400,300 800,400 T1200,400 L1200,800 L0,800 Z" fill="url(#waveGradient2)" opacity="0.4"/>
            <path d="M0,600 Q200,500 400,600 T800,600 Q1000,700 1200,600 L1200,800 L0,800 Z" fill="url(#waveGradient1)" opacity="0.3"/>
          </svg>
        </div>

        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-20 h-20 bg-blue-400/20 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute top-40 right-20 w-32 h-32 bg-yellow-400/20 rounded-full blur-xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-40 left-1/4 w-24 h-24 bg-green-400/20 rounded-full blur-xl animate-pulse delay-2000"></div>
          <div className="absolute top-60 left-1/3 w-16 h-16 bg-purple-400/20 rounded-full blur-xl animate-pulse delay-500"></div>
        </div>

        {/* Yellow highlight lines */}
        <div className="absolute top-20 left-0 w-full h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent opacity-60"></div>
        <div className="absolute top-40 right-0 w-1/2 h-1 bg-gradient-to-l from-transparent via-yellow-400 to-transparent opacity-40"></div>

        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-60"
          style={{
            backgroundImage: "url(/src/assets/images/IMG_0848.jpg)",
            height: "100vh",
          }}
        ></div>

        <div className="relative isolate px-8 pt-8 lg:px-8">
          <div className="mx-auto max-w-7xl py-16 sm:py-24 lg:py-30">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Side - Text Content */}
              <div className="text-left space-y-8">
                <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-lg">
                  <h1 className="text-3xl font-kanit font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl leading-tight">
                    {translations[language].heroTitle}
                  </h1>
                  <p className="mt-6 text-lg font-inter leading-relaxed text-gray-700">
                    {translations[language].heroSubtitle}
                  </p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <div className="bg-yellow-500 rounded-full px-4 py-2 shadow-lg">
                      <span className="text-sm font-kanit font-semibold text-gray-900">
                        แอร์ 5 ตัน
                      </span>
                    </div>
                    <div className="bg-yellow-500 rounded-full px-4 py-2 shadow-lg">
                      <span className="text-sm font-kanit font-semibold text-gray-900">
                        แอร์ 10 ตัน
                      </span>
                    </div>
                    <div className="bg-yellow-500 rounded-full px-4 py-2 shadow-lg">
                      <span className="text-sm font-kanit font-semibold text-gray-900">
                        แอร์ 20 ตัน
                      </span>
                    </div>
                  </div>
                  <p className="mt-6 text-base leading-loose text-gray-600">
                    {translations[language].heroDescription}
                  </p>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="group relative px-8 py-4 bg-blue-500 text-white font-kanit font-semibold text-lg rounded-xl shadow-lg hover:bg-blue-600 transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300">
                    <span className="relative z-10">
                      {translations[language].viewServices}
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </button>

                  <button className="group relative px-8 py-4 bg-yellow-500 text-gray-900 font-kanit font-semibold text-lg rounded-xl shadow-lg hover:bg-yellow-400 transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-yellow-300">
                    <span className="relative z-10">
                      {translations[language].contactUs}
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-yellow-400 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </button>
                </div>

                {/* Trust indicators */}
                <div className="flex flex-wrap gap-6 pt-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-gray-600 font-inter">
                      ประสบการณ์กว่า 20 ปี
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-gray-600 font-inter">
                      ทีมงานมืออาชีพ
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-gray-600 font-inter">
                      บริการครบวงจร
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Side - 3D Model */}
              <div className="flex justify-center lg:justify-end">
                <div className="group relative overflow-hidden rounded-3xl shadow-2xl bg-white/10 backdrop-blur-sm p-2 w-full max-w-2xl">
                  <div className="w-full h-96 lg:h-[500px] rounded-2xl overflow-hidden">
                    <AirConditioner3D
                      modelPath="/models/20ton_AC_CC.gltf"
                      size={2.0}
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent rounded-2xl pointer-events-none"></div>

                  {/* Floating Info Cards */}
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-xl p-3 shadow-lg">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-sm font-kanit font-semibold text-gray-900">
                        พร้อมใช้งาน
                      </span>
                    </div>
                  </div>

                  <div className="absolute top-4 right-4 bg-yellow-500/90 backdrop-blur-sm rounded-xl p-3 shadow-lg">
                    <span className="text-sm font-kanit font-bold text-gray-900">
                      20 ตัน
                    </span>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                    <h4 className="font-kanit font-bold text-gray-900 mb-1">
                      แอร์ตู้ขนาดใหญ่
                    </h4>
                    <p className="text-xs text-gray-600 font-inter">
                      เย็นแรง พื้นที่กว้าง ใช้ไฟ 3 เฟส
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-yellow-400/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl"></div>
        </div>
      </section>

      {/* Contact Banner Section */}
      <section className="py-8 bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
            <div className="flex flex-col lg:flex-row items-center justify-between space-y-4 lg:space-y-0">
              {/* Left Section - Contact Info */}
              <div className="text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start space-x-3 mb-3">
                  <img
                    src="/public/images/logo.png"
                    alt="Jaroensup Air Rental Logo"
                    className="w-12 h-12 rounded-lg shadow-lg"
                  />
                  <h3 className="text-xl font-kanit font-bold text-white">
                    📞 ติดต่อด่วน! สอบถามราคาได้เลย
                  </h3>
                </div>
                <p className="text-blue-100 font-inter">
                  พร้อมให้บริการทุกวัน 08:00 - 20:00 น.
                </p>
              </div>

              {/* Middle Section - Phone Numbers */}
              <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6">
                <div className="text-center">
                  <p className="text-sm text-blue-100 font-inter mb-1">
                    คุณหมวย
                  </p>
                  <a
                    href="tel:0869750664"
                    className="text-2xl font-kanit font-bold text-white hover:text-yellow-300 transition-colors duration-200"
                  >
                    086-975-0664
                  </a>
                </div>
                <div className="hidden sm:block w-px h-8 bg-white/30"></div>
                <div className="text-center">
                  <p className="text-sm text-blue-100 font-inter mb-1">
                    คุณแม็กซ์
                  </p>
                  <a
                    href="tel:0969584422"
                    className="text-2xl font-kanit font-bold text-white hover:text-yellow-300 transition-colors duration-200"
                  >
                    096-958-4422
                  </a>
                </div>
              </div>

              {/* Right Section - Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="tel:0869750664"
                  className="px-6 py-3 bg-yellow-500 text-gray-900 font-kanit font-semibold rounded-xl shadow-lg hover:bg-yellow-400 transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-yellow-300 text-center"
                >
                  📞 โทรเลย
                </a>
                <div className="flex items-center space-x-3">
                  <img
                    src="/line-qr.png"
                    alt="Line QR Code"
                    className="w-12 h-12 rounded-lg shadow"
                  />
                  <div className="text-white">
                    <p className="text-sm font-kanit font-semibold">Line</p>
                    <p className="text-xs text-blue-100 font-inter">
                      @jaroensupair
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-white relative overflow-hidden">
        {/* Wave Background */}
        <div className="absolute inset-0 overflow-hidden">
          <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 1200 800" preserveAspectRatio="none">
            <defs>
              <linearGradient id="serviceWave1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#EFF6FF" stopOpacity="0.8"/>
                <stop offset="50%" stopColor="#FEF3C7" stopOpacity="0.6"/>
                <stop offset="100%" stopColor="#ECFDF5" stopOpacity="0.8"/>
              </linearGradient>
            </defs>
            <path d="M0,100 Q300,50 600,100 T1200,100 L1200,800 L0,800 Z" fill="url(#serviceWave1)" opacity="0.3"/>
            <path d="M0,300 Q400,250 800,300 T1200,300 L1200,800 L0,800 Z" fill="url(#serviceWave1)" opacity="0.2"/>
          </svg>
        </div>

        {/* Floating Service Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-32 left-16 w-12 h-12 bg-blue-500/10 rounded-full blur-lg animate-bounce"></div>
          <div className="absolute top-64 right-24 w-16 h-16 bg-yellow-500/10 rounded-full blur-lg animate-bounce delay-1000"></div>
          <div className="absolute bottom-32 left-1/3 w-14 h-14 bg-green-500/10 rounded-full blur-lg animate-bounce delay-2000"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-kanit font-bold text-gray-900 mb-4">
              บริการของเรา
            </h2>
            <p className="text-lg text-gray-600 font-inter max-w-3xl mx-auto leading-relaxed">
              บริการเช่าแอร์ขนาดใหญ่ครบวงจร
              พร้อมทีมงานมืออาชีพดูแลตั้งแต่ต้นจนจบ
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-yellow-500 mx-auto mt-6 rounded-full"></div>
          </div>

          {/* Services Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Service 1 - แอร์ 5 ตัน */}
            <div className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden border border-gray-100">
              {/* Hover border effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl p-0.5">
                <div className="w-full h-full bg-white rounded-2xl"></div>
              </div>

              <div className="relative z-10 p-6">
                {/* Service Image */}
                <div className="relative mb-6 overflow-hidden rounded-xl">
                  <img
                    src="/images/work1.jpg"
                    alt="แอร์ 5 ตัน"
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  {/* Size Badge */}
                  <div className="absolute top-4 right-4 bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-kanit font-semibold shadow-lg">
                    5 ตัน
                  </div>
                </div>

                {/* Service Info */}
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-kanit font-bold text-gray-900 mb-1">
                      แอร์เช่า 5 ตัน
                    </h3>
                    <p className="text-sm text-gray-500 font-inter">Compact Size</p>
                  </div>

                  <p className="text-gray-600 font-inter leading-relaxed">
                    แอร์ขนาดกะทัดรัด เหมาะสำหรับงานขนาดเล็กถึงกลาง เช่น งานแต่ง
                    งานเลี้ยงสังสรรค์ ห้องประชุม และกิจกรรมภายในอาคาร
                  </p>

                  {/* Features */}
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-sm text-gray-600 font-inter">
                        เคลื่อนย้ายง่าย ติดตั้งรวดเร็ว
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-sm text-gray-600 font-inter">
                        ใช้ไฟ 3 เฟสหรือไฟฟ้าโรงงานได้
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-sm text-gray-600 font-inter">
                        ทีมงานดูแลตั้งแต่ติดตั้งจนถึงเก็บงาน
                      </span>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="pt-4 border-t border-gray-100">
                    <p className="text-lg font-kanit font-semibold text-blue-600 mb-4">
                      เริ่มต้น 1,500 บาท/วัน
                    </p>

                    {/* CTA Button */}
                    <button className="w-full group/btn relative px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-kanit font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300">
                      <span className="relative z-10">สอบถามราคา</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-blue-800 rounded-xl opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                    </button>
                  </div>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
              <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-blue-500 rounded-full opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
            </div>

            {/* Service 2 - แอร์ 10 ตัน */}
            <div className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden border border-gray-100">
              {/* Hover border effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl p-0.5">
                <div className="w-full h-full bg-white rounded-2xl"></div>
              </div>

              <div className="relative z-10 p-6">
                {/* Service Image */}
                <div className="relative mb-6 overflow-hidden rounded-xl">
                  <img
                    src="/images/work2.jpg"
                    alt="แอร์ 10 ตัน"
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  {/* Size Badge */}
                  <div className="absolute top-4 right-4 bg-yellow-500 text-gray-900 px-3 py-1 rounded-full text-sm font-kanit font-semibold shadow-lg">
                    10 ตัน
                  </div>
                </div>

                {/* Service Info */}
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-kanit font-bold text-gray-900 mb-1">
                      แอร์เช่า 10 ตัน
                    </h3>
                    <p className="text-sm text-gray-500 font-inter">Medium Size</p>
                  </div>

                  <p className="text-gray-600 font-inter leading-relaxed">
                    เหมาะสำหรับงานขนาดกลางถึงใหญ่ เช่น งานอีเวนต์ในหอประชุม
                    โรงแรม โรงยิม หรือกิจกรรมที่ต้องการความเย็นสม่ำเสมอ
                  </p>

                  {/* Features */}
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                      <span className="text-sm text-gray-600 font-inter">
                        ทำความเย็นได้รวดเร็ว
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                      <span className="text-sm text-gray-600 font-inter">
                        กระจายลมได้ทั่วถึง
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                      <span className="text-sm text-gray-600 font-inter">
                        ใช้ไฟ 3 เฟส ทีมงานช่วยดูแลหน้างานครบวงจร
                      </span>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="pt-4 border-t border-gray-100">
                    <p className="text-lg font-kanit font-semibold text-blue-600 mb-4">
                      เริ่มต้น 2,500 บาท/วัน
                    </p>

                    {/* CTA Button */}
                    <button className="w-full group/btn relative px-6 py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 text-gray-900 font-kanit font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-yellow-300">
                      <span className="relative z-10">สอบถามราคา</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-yellow-600 to-yellow-700 rounded-xl opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                    </button>
                  </div>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
              <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-blue-500 rounded-full opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
            </div>

            {/* Service 3 - แอร์ 20 ตัน */}
            <div className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden border border-gray-100">
              {/* Hover border effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl p-0.5">
                <div className="w-full h-full bg-white rounded-2xl"></div>
              </div>

              <div className="relative z-10 p-6">
                {/* Service Image */}
                <div className="relative mb-6 overflow-hidden rounded-xl">
                  <img
                    src="/images/work3.jpg"
                    alt="แอร์ 20 ตัน"
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  {/* Size Badge */}
                  <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-kanit font-semibold shadow-lg">
                    20 ตัน
                  </div>
                </div>

                {/* Service Info */}
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-kanit font-bold text-gray-900 mb-1">
                      แอร์เช่า 20 ตัน
                    </h3>
                    <p className="text-sm text-gray-500 font-inter">Large Size</p>
                  </div>

                  <p className="text-gray-600 font-inter leading-relaxed">
                    แอร์ขนาดใหญ่สำหรับงานที่ต้องการความเย็นแรงและครอบคลุมพื้นที่กว้าง
                    เช่น งานแสดงสินค้า คอนเสิร์ต โรงงาน หรือคลังสินค้า
                  </p>

                  {/* Features */}
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm text-gray-600 font-inter">
                        มีประสิทธิภาพสูง ให้ความเย็นแรง
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm text-gray-600 font-inter">
                        รองรับจำนวนคนมาก
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm text-gray-600 font-inter">
                        ใช้ไฟ 3 เฟสขนาดใหญ่ พร้อมบริการติดตั้ง รื้อถอน
                        และดูแลหน้างาน
                      </span>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="pt-4 border-t border-gray-100">
                    <p className="text-lg font-kanit font-semibold text-blue-600 mb-4">
                      เริ่มต้น 4,000 บาท/วัน
                    </p>

                    {/* CTA Button */}
                    <button className="w-full group/btn relative px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white font-kanit font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-green-300">
                      <span className="relative z-10">สอบถามราคา</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-green-700 to-green-800 rounded-xl opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                    </button>
                  </div>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
              <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-blue-500 rounded-full opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
            </div>
          </div>

          {/* Additional Services */}
          <div className="mt-16">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-kanit font-bold text-gray-900 mb-4">
                บริการเสริมครบวงจร
              </h3>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-yellow-500 mx-auto rounded-full"></div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
              {/* Card ซ้าย - ทีมงานติดตั้งและรื้อถอน */}
              <div className="group relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden border border-gray-100">
                {/* Hover border effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl p-0.5">
                  <div className="w-full h-full bg-white rounded-2xl"></div>
                </div>

                <div className="relative z-10 p-8">
                  {/* Icon Section */}
                  <div className="flex items-center justify-center mb-6">
                    <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <span className="text-white text-3xl">🔧</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="text-center">
                    <h4 className="text-xl font-kanit font-bold text-gray-900 mb-3">
                      ทีมงานติดตั้งและรื้อถอน
                    </h4>
                    <p className="text-gray-600 font-inter leading-relaxed mb-6">
                      ทีมงานมืออาชีพที่มีประสบการณ์สูง พร้อมให้บริการติดตั้งและรื้อถอนแอร์อย่างปลอดภัยและรวดเร็ว
                    </p>


                   
                  </div>
                </div>

                {/* Decorative elements */}
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-400 rounded-full opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
                <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-blue-500 rounded-full opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
              </div>

              {/* Card ขวา - ดูแลหน้างานตลอดการใช้งาน */}
              <div className="group relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden border border-gray-100">
                {/* Hover border effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-yellow-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl p-0.5">
                  <div className="w-full h-full bg-white rounded-2xl"></div>
                </div>

                <div className="relative z-10 p-8">
                  {/* Icon Section */}
                  <div className="flex items-center justify-center mb-6">
                    <div className="w-20 h-20 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <span className="text-gray-900 text-3xl">👥</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="text-center">
                    <h4 className="text-xl font-kanit font-bold text-gray-900 mb-3">
                      ดูแลหน้างานตลอดการใช้งาน
                    </h4>
                    <p className="text-gray-600 font-inter leading-relaxed mb-6">
                      บริการดูแลหน้างานครบวงจร ตลอดระยะเวลาการใช้งาน พร้อมทีมงานคอยดูแลและแก้ไขปัญหา
                    </p>
                  </div>
                </div>

                {/* Decorative elements */}
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
                <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-yellow-500 rounded-full opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-8 bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
            <div className="flex flex-col lg:flex-row items-center justify-between space-y-4 lg:space-y-0">
              {/* Left Section - Contact Info */}
              <div className="text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start space-x-3 mb-3">
                  <img
                    src="/public/images/logo.png"
                    alt="Jaroensup Air Rental Logo"
                    className="w-12 h-12 rounded-lg shadow-lg"
                  />
                  <h3 className="text-xl font-kanit font-bold text-white">
                    📞 ติดต่อด่วน! สอบถามราคาได้เลย
                  </h3>
                </div>
                <p className="text-blue-100 font-inter">
                  พร้อมให้บริการทุกวัน 08:00 - 20:00 น.
                </p>
              </div>

              {/* Middle Section - Phone Numbers */}
              <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6">
                <div className="text-center">
                  <p className="text-sm text-blue-100 font-inter mb-1">
                    คุณหมวย
                  </p>
                  <a
                    href="tel:0869750664"
                    className="text-2xl font-kanit font-bold text-white hover:text-yellow-300 transition-colors duration-200"
                  >
                    086-975-0664
                  </a>
                </div>
                <div className="hidden sm:block w-px h-8 bg-white/30"></div>
                <div className="text-center">
                  <p className="text-sm text-blue-100 font-inter mb-1">
                    คุณแม็กซ์
                  </p>
                  <a
                    href="tel:0969584422"
                    className="text-2xl font-kanit font-bold text-white hover:text-yellow-300 transition-colors duration-200"
                  >
                    096-958-4422
                  </a>
                </div>
              </div>

              {/* Right Section - Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="tel:0869750664"
                  className="px-6 py-3 bg-yellow-500 text-gray-900 font-kanit font-semibold rounded-xl shadow-lg hover:bg-yellow-400 transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-yellow-300 text-center"
                >
                  📞 โทรเลย
                </a>
                <div className="flex items-center space-x-3">
                  <img
                    src="/line-qr.png"
                    alt="Line QR Code"
                    className="w-12 h-12 rounded-lg shadow"
                  />
                  <div className="text-white">
                    <p className="text-sm font-kanit font-semibold">Line</p>
                    <p className="text-xs text-blue-100 font-inter">
                      @jaroensupair
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Gallery Section */}
      <section className="py-20 bg-white relative overflow-hidden">
        {/* Wave Background */}
        <div className="absolute inset-0 overflow-hidden">
          <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 1200 800" preserveAspectRatio="none">
            <defs>
              <linearGradient id="portfolioWave1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#F0F9FF" stopOpacity="0.6"/>
                <stop offset="50%" stopColor="#FFFBEB" stopOpacity="0.4"/>
                <stop offset="100%" stopColor="#F0FDF4" stopOpacity="0.6"/>
              </linearGradient>
            </defs>
            <path d="M0,150 Q200,100 400,150 T800,150 Q1000,200 1200,150 L1200,800 L0,800 Z" fill="url(#portfolioWave1)" opacity="0.4"/>
            <path d="M0,400 Q300,350 600,400 T1200,400 L1200,800 L0,800 Z" fill="url(#portfolioWave1)" opacity="0.3"/>
          </svg>
        </div>

        {/* Floating Portfolio Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-16 w-20 h-20 bg-blue-400/15 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute top-80 left-20 w-24 h-24 bg-yellow-400/15 rounded-full blur-xl animate-pulse delay-1500"></div>
          <div className="absolute bottom-20 right-1/4 w-18 h-18 bg-green-400/15 rounded-full blur-xl animate-pulse delay-3000"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-kanit font-bold text-gray-900 mb-6">
              ผลงานที่ผ่านมา
            </h2>
            <p className="text-lg text-gray-600 font-inter max-w-3xl mx-auto leading-relaxed mb-4">
              ตัวอย่างงานติดตั้งแอร์เช่าในหลากหลายโอกาส ที่ลูกค้าไว้วางใจเรา
            </p>
            <p className="text-base text-gray-500 font-inter">
              ภาพถ่ายจากงานจริงที่เราได้ให้บริการลูกค้า
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-yellow-500 mx-auto mt-6 rounded-full"></div>
          </div>

          {/* Portfolio Masonry Layout */}
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {/* Portfolio Item 1 - Featured Large */}
            <div className="group relative overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-700 transform hover:-translate-y-2 break-inside-avoid mb-6">
              <div className="relative">
                <img
                  src="/src/assets/images/IMG_0848.jpg"
                  alt="งานแต่งงาน - แอร์ 10 ตัน"
                  className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                
                {/* Floating Badge */}
                <div className="absolute top-6 right-6 bg-gradient-to-r from-yellow-500 to-yellow-600 text-gray-900 px-4 py-2 rounded-full text-sm font-kanit font-bold shadow-lg">
                  ⭐ Featured
                </div>
              </div>
              
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-3 shadow-md">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <span className="text-xs text-gray-500 font-inter uppercase tracking-wide">งานแต่งงาน</span>
                  </div>
                  <h3 className="text-lg font-kanit font-bold text-gray-900 mb-1">
                    งานแต่งงานหรูหรา
                  </h3>
                  <p className="text-xs text-gray-600 font-inter mb-3 leading-relaxed">
                    แอร์ 10 ตัน - โรงแรม ABC กรุงเทพฯ
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="bg-yellow-500 text-gray-900 px-2 py-1 rounded-full text-xs font-kanit font-semibold">
                        10 ตัน
                      </span>
                      <span className="text-xs text-gray-500 font-inter">
                        👥 200 คน
                      </span>
                    </div>
                    <button className="text-blue-600 hover:text-blue-800 text-xs font-kanit font-semibold transition-colors">
                      ดูรายละเอียด →
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Portfolio Item 2 - Medium */}
            <div className="group relative overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-700 transform hover:-translate-y-2 break-inside-avoid mb-6">
              <div className="relative">
                <img
                  src="/src/assets/images/IMG_0849.jpg"
                  alt="งานอีเวนต์ - แอร์ 20 ตัน"
                  className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                
                {/* Floating Badge */}
                <div className="absolute top-6 right-6 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-full text-sm font-kanit font-bold shadow-lg">
                  🎪 อีเวนต์
                </div>
              </div>
              
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="bg-white/95 backdrop-blur-md rounded-2xl p-5 shadow-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-xs text-gray-500 font-inter uppercase tracking-wide">งานอีเวนต์</span>
                  </div>
                  <h3 className="text-base font-kanit font-bold text-gray-900 mb-1">
                    งานอีเวนต์ใหญ่
                  </h3>
                  <p className="text-xs text-gray-600 font-inter mb-3 leading-relaxed">
                    แอร์ 20 ตัน - ศูนย์ประชุม กรุงเทพฯ
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-kanit font-semibold">
                        20 ตัน
                      </span>
                      <span className="text-xs text-gray-500 font-inter">
                        👥 500 คน
                      </span>
                    </div>
                    <button className="text-blue-600 hover:text-blue-800 text-xs font-kanit font-semibold transition-colors">
                      ดูรายละเอียด →
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Portfolio Item 3 - Small */}
            <div className="group relative overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-700 transform hover:-translate-y-2 break-inside-avoid mb-6">
              <div className="relative">
                <img
                  src="/src/assets/images/IMG_0850.jpg"
                  alt="งานบวช - แอร์ 5 ตัน"
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                
                {/* Floating Badge */}
                <div className="absolute top-6 right-6 bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-full text-sm font-kanit font-bold shadow-lg">
                  🏛️ งานบวช
                </div>
              </div>
              
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="bg-white/95 backdrop-blur-md rounded-2xl p-5 shadow-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-xs text-gray-500 font-inter uppercase tracking-wide">งานบวช</span>
                  </div>
                  <h3 className="text-base font-kanit font-bold text-gray-900 mb-1">
                    งานบวชใหญ่
                  </h3>
                  <p className="text-xs text-gray-600 font-inter mb-3 leading-relaxed">
                    แอร์ 5 ตัน - วัด ABC เชียงใหม่
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-kanit font-semibold">
                        5 ตัน
                      </span>
                      <span className="text-xs text-gray-500 font-inter">
                        👥 100 คน
                      </span>
                    </div>
                    <button className="text-blue-600 hover:text-blue-800 text-xs font-kanit font-semibold transition-colors">
                      ดูรายละเอียด →
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Portfolio Item 4 - Medium */}
            <div className="group relative overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-700 transform hover:-translate-y-2 break-inside-avoid mb-6">
              <div className="relative">
                <img
                  src="/src/assets/images/IMG_0853.jpg"
                  alt="งานสัมมนา - แอร์ 15 ตัน"
                  className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                
                {/* Floating Badge */}
                <div className="absolute top-6 right-6 bg-gradient-to-r from-purple-500 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-kanit font-bold shadow-lg">
                  🏢 สัมมนา
                </div>
              </div>
              
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="bg-white/95 backdrop-blur-md rounded-2xl p-5 shadow-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span className="text-xs text-gray-500 font-inter uppercase tracking-wide">งานสัมมนา</span>
                  </div>
                  <h3 className="text-base font-kanit font-bold text-gray-900 mb-1">
                    งานสัมมนาบริษัท
                  </h3>
                  <p className="text-xs text-gray-600 font-inter mb-3 leading-relaxed">
                    แอร์ 15 ตัน - บริษัท XYZ กรุงเทพฯ
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="bg-purple-500 text-white px-2 py-1 rounded-full text-xs font-kanit font-semibold">
                        15 ตัน
                      </span>
                      <span className="text-xs text-gray-500 font-inter">
                        👥 300 คน
                      </span>
                    </div>
                    <button className="text-blue-600 hover:text-blue-800 text-xs font-kanit font-semibold transition-colors">
                      ดูรายละเอียด →
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Portfolio Item 5 - Large */}
            <div className="group relative overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-700 transform hover:-translate-y-2 break-inside-avoid mb-6">
              <div className="relative">
                <img
                  src="/src/assets/images/IMG_0889.png"
                  alt="งานแสดงสินค้า - แอร์ 20 ตัน"
                  className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                
                {/* Floating Badge */}
                <div className="absolute top-6 right-6 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white px-4 py-2 rounded-full text-sm font-kanit font-bold shadow-lg">
                  🎪 แสดงสินค้า
                </div>
              </div>
              
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-md">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                    <span className="text-xs text-gray-500 font-inter uppercase tracking-wide">งานแสดงสินค้า</span>
                  </div>
                  <h3 className="text-base font-kanit font-bold text-gray-900 mb-1">
                    งานแสดงสินค้า
                  </h3>
                  <p className="text-xs text-gray-600 font-inter mb-3 leading-relaxed">
                    แอร์ 20 ตัน - ศูนย์แสดงสินค้า กรุงเทพฯ
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="bg-indigo-500 text-white px-2 py-1 rounded-full text-xs font-kanit font-semibold">
                        20 ตัน
                      </span>
                      <span className="text-xs text-gray-500 font-inter">
                        👥 800 คน
                      </span>
                    </div>
                    <button className="text-blue-600 hover:text-blue-800 text-xs font-kanit font-semibold transition-colors">
                      ดูรายละเอียด →
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Portfolio Item 6 - Small */}
            <div className="group relative overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-700 transform hover:-translate-y-2 break-inside-avoid mb-6">
              <div className="relative">
                <img
                  src="/src/assets/images/IMG_0890.png"
                  alt="งานเลี้ยงสังสรรค์ - แอร์ 10 ตัน"
                  className="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                
                {/* Floating Badge */}
                <div className="absolute top-6 right-6 bg-gradient-to-r from-pink-500 to-pink-600 text-white px-4 py-2 rounded-full text-sm font-kanit font-bold shadow-lg">
                  🎉 ปาร์ตี้
                </div>
              </div>
              
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="bg-white/95 backdrop-blur-md rounded-2xl p-5 shadow-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                    <span className="text-xs text-gray-500 font-inter uppercase tracking-wide">งานเลี้ยง</span>
                  </div>
                  <h3 className="text-base font-kanit font-bold text-gray-900 mb-1">
                    งานเลี้ยงสังสรรค์
                  </h3>
                  <p className="text-xs text-gray-600 font-inter mb-3 leading-relaxed">
                    แอร์ 10 ตัน - โรงแรม DEF ภูเก็ต
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="bg-pink-500 text-white px-2 py-1 rounded-full text-xs font-kanit font-semibold">
                        10 ตัน
                      </span>
                      <span className="text-xs text-gray-500 font-inter">
                        👥 150 คน
                      </span>
                    </div>
                    <button className="text-blue-600 hover:text-blue-800 text-xs font-kanit font-semibold transition-colors">
                      ดูรายละเอียด →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* View More Button */}
          <div className="text-center mt-16">
            <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-kanit font-semibold text-lg rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300">
              ดูผลงานทั้งหมด
            </button>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800 relative overflow-hidden">
        {/* Wave Background */}
        <div className="absolute inset-0 overflow-hidden">
          <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 1200 800" preserveAspectRatio="none">
            <defs>
              <linearGradient id="whyChooseWave1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.1"/>
                <stop offset="50%" stopColor="#FEF3C7" stopOpacity="0.08"/>
                <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.1"/>
              </linearGradient>
            </defs>
            <path d="M0,200 Q300,150 600,200 T1200,200 L1200,800 L0,800 Z" fill="url(#whyChooseWave1)" opacity="0.3"/>
            <path d="M0,500 Q400,450 800,500 T1200,500 L1200,800 L0,800 Z" fill="url(#whyChooseWave1)" opacity="0.2"/>
            <path d="M0,700 Q200,650 400,700 T800,700 Q1000,750 1200,700 L1200,800 L0,800 Z" fill="url(#whyChooseWave1)" opacity="0.15"/>
          </svg>
        </div>

        {/* Floating Why Choose Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-32 left-12 w-16 h-16 bg-white/10 rounded-full blur-lg animate-pulse"></div>
          <div className="absolute top-64 right-16 w-20 h-20 bg-yellow-400/20 rounded-full blur-lg animate-pulse delay-1000"></div>
          <div className="absolute bottom-32 left-1/4 w-14 h-14 bg-white/10 rounded-full blur-lg animate-pulse delay-2000"></div>
          <div className="absolute top-96 right-1/3 w-12 h-12 bg-yellow-400/15 rounded-full blur-lg animate-pulse delay-500"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-kanit font-bold text-white mb-6">
              ทำไมต้องเลือกเรา
            </h2>
            <p className="text-xl text-blue-100 font-inter leading-relaxed max-w-3xl mx-auto">
              จุดเด่นที่ทำให้เราเป็นตัวเลือกอันดับ 1
              สำหรับการเช่าแอร์และพัดลมไอน้ำ
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-yellow-500 mx-auto mt-6 rounded-full"></div>
          </div>

          {/* Features Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature 1 - อุปกรณ์คุณภาพ */}
            <div className="group text-center">
              <div className="relative mb-6">
                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <span className="text-3xl">📦</span>
                </div>

                {/* Hover glow effect */}
                <div className="absolute inset-0 w-20 h-20 bg-white/30 rounded-full mx-auto opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300"></div>
              </div>

              <h3 className="text-xl font-kanit font-bold text-white mb-3 group-hover:text-yellow-300 transition-colors duration-300">
                อุปกรณ์คุณภาพ
              </h3>
              <p className="text-blue-100 font-inter leading-relaxed">
                เครื่องมือและอุปกรณ์คุณภาพสูง ผ่านการตรวจสอบมาตรฐาน
              </p>
            </div>

            {/* Feature 2 - ทีมช่างชำนาญ */}
            <div className="group text-center">
              <div className="relative mb-6">
                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <span className="text-3xl">👷</span>
                </div>

                {/* Hover glow effect */}
                <div className="absolute inset-0 w-20 h-20 bg-white/30 rounded-full mx-auto opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300"></div>
              </div>

              <h3 className="text-xl font-kanit font-bold text-white mb-3 group-hover:text-yellow-300 transition-colors duration-300">
                ทีมช่างชำนาญ
              </h3>
              <p className="text-blue-100 font-inter leading-relaxed">
                ช่างเทคนิคมืออาชีพที่มีประสบการณ์และความเชี่ยวชาญสูง
              </p>
            </div>

            {/* Feature 3 - บริการรวดเร็ว */}
            <div className="group text-center">
              <div className="relative mb-6">
                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <span className="text-3xl">🚚</span>
                </div>

                {/* Hover glow effect */}
                <div className="absolute inset-0 w-20 h-20 bg-white/30 rounded-full mx-auto opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300"></div>
              </div>

              <h3 className="text-xl font-kanit font-bold text-white mb-3 group-hover:text-yellow-300 transition-colors duration-300">
                บริการรวดเร็ว
              </h3>
              <p className="text-blue-100 font-inter leading-relaxed">
                ติดตั้งและบริการรวดเร็วทันใจ ไม่ให้รอนาน
              </p>
            </div>

            {/* Feature 4 - Support ตลอด 24 ชม. */}
            <div className="group text-center">
              <div className="relative mb-6">
                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <span className="text-3xl">💬</span>
                </div>

                {/* Hover glow effect */}
                <div className="absolute inset-0 w-20 h-20 bg-white/30 rounded-full mx-auto opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300"></div>
              </div>

              <h3 className="text-xl font-kanit font-bold text-white mb-3 group-hover:text-yellow-300 transition-colors duration-300">
                Support ตลอด 24 ชม.
              </h3>
              <p className="text-blue-100 font-inter leading-relaxed">
                บริการสนับสนุนและแก้ไขปัญหาตลอด 24 ชั่วโมง
              </p>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="text-center mt-16">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 max-w-4xl mx-auto">
              <h3 className="text-2xl font-kanit font-bold text-white mb-4">
                พร้อมให้บริการแล้ววันนี้
              </h3>
              <p className="text-blue-100 font-inter mb-6 leading-relaxed">
                ติดต่อเราเพื่อขอคำปรึกษาและใบเสนอราคาฟรี ไม่มีค่าใช้จ่ายใดๆ
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="px-8 py-4 bg-yellow-500 text-gray-900 font-kanit font-semibold text-lg rounded-xl shadow-lg hover:bg-yellow-400 transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-yellow-300">
                  ขอใบเสนอราคา
                </button>
                <button className="px-8 py-4 bg-white/20 text-white font-kanit font-semibold text-lg rounded-xl shadow-lg hover:bg-white/30 transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-white/30">
                  ติดต่อสอบถาม
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white relative overflow-hidden">
        {/* Wave Background */}
        <div className="absolute inset-0 overflow-hidden">
          <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 1200 800" preserveAspectRatio="none">
            <defs>
              <linearGradient id="contactWave1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#EFF6FF" stopOpacity="0.5"/>
                <stop offset="50%" stopColor="#FEF3C7" stopOpacity="0.3"/>
                <stop offset="100%" stopColor="#ECFDF5" stopOpacity="0.5"/>
              </linearGradient>
            </defs>
            <path d="M0,100 Q200,50 400,100 T800,100 Q1000,150 1200,100 L1200,800 L0,800 Z" fill="url(#contactWave1)" opacity="0.4"/>
            <path d="M0,300 Q300,250 600,300 T1200,300 L1200,800 L0,800 Z" fill="url(#contactWave1)" opacity="0.3"/>
            <path d="M0,600 Q400,550 800,600 T1200,600 L1200,800 L0,800 Z" fill="url(#contactWave1)" opacity="0.2"/>
          </svg>
        </div>

        {/* Floating Contact Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-24 left-20 w-18 h-18 bg-blue-500/10 rounded-full blur-lg animate-bounce"></div>
          <div className="absolute top-72 right-20 w-22 h-22 bg-yellow-500/10 rounded-full blur-lg animate-bounce delay-1000"></div>
          <div className="absolute bottom-24 left-1/3 w-16 h-16 bg-green-500/10 rounded-full blur-lg animate-bounce delay-2000"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-kanit font-bold text-gray-900 mb-4">
              ติดต่อเรา
            </h2>
            <p className="text-lg text-gray-600 font-inter max-w-2xl mx-auto leading-relaxed">
              สนใจเช่าแอร์หรือสอบถามข้อมูลเพิ่มเติม
              ติดต่อเราได้ตามช่องทางด้านล่าง
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-yellow-500 mx-auto mt-6 rounded-full"></div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left Column - Contact Form & Info */}
            <div className="space-y-8">
              {/* Contact Form */}
              <div className="bg-gradient-to-br from-blue-50 to-yellow-50 rounded-2xl p-8 shadow-lg">
                <h3 className="text-2xl font-kanit font-bold text-gray-900 mb-6">
                  ขอใบเสนอราคา
                </h3>
                <p className="text-gray-600 font-inter mb-6 leading-relaxed">
                  ส่งข้อมูลความต้องการของคุณ เราจะติดต่อกลับภายใน 24 ชั่วโมง
                </p>

                <form className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="ชื่อ-นามสกุล"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 font-inter"
                    />
                    <input
                      type="tel"
                      placeholder="เบอร์โทรศัพท์"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 font-inter"
                    />
                  </div>

                  <select className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 font-inter">
                    <option>เลือกขนาดแอร์</option>
                    <option>พัดลมไอน้ำ</option>
                    <option>แอร์เคลื่อนที่</option>
                    <option>แอร์ตู้</option>
                    <option>อื่นๆ</option>
                  </select>

                  <textarea
                    placeholder="รายละเอียดงาน (สถานที่ วันที่ จำนวนคน)"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 font-inter h-24 resize-none"
                  ></textarea>

                  <button className="w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-kanit font-semibold text-lg rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300">
                    ส่งคำขอ
                  </button>
                </form>
              </div>

              {/* Contact Info Cards */}
              <div className="grid sm:grid-cols-2 gap-6">
                {/* Phone */}
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-2xl">📞</span>
                    </div>
                    <div>
                      <h4 className="font-kanit font-bold text-gray-900">
                        โทรศัพท์
                      </h4>
                      <p className="text-sm text-gray-500 font-inter">Phone</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-gray-700 font-inter">
                      086-975-0664 (คุณหมวย)
                    </p>
                    <p className="text-gray-700 font-inter">
                      096-958-4422 (คุณแม็กซ์)
                    </p>
                  </div>
                  <a
                    href="tel:0869750664"
                    className="inline-block mt-4 px-4 py-2 bg-blue-500 text-white font-kanit font-semibold rounded-lg hover:bg-blue-600 transition-colors duration-200"
                  >
                    โทรเลย
                  </a>
                </div>

                {/* Line */}
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-2xl">💬</span>
                    </div>
                    <div>
                      <h4 className="font-kanit font-bold text-gray-900">
                        Line Official
                      </h4>
                      <p className="text-sm text-gray-500 font-inter">
                        Chat Support
                      </p>
                    </div>
                  </div>
                  <div className="text-center">
                    <img
                      src="/line-qr.png"
                      alt="Line QR Code"
                      className="w-20 h-20 mx-auto rounded-lg shadow mb-3"
                    />
                    <p className="text-sm text-gray-600 font-inter">
                      สแกน QR Code
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Map & Additional Info */}
            <div className="space-y-8">
              {/* Google Map */}
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
                <div className="p-6 border-b border-gray-100">
                  <h3 className="text-xl font-kanit font-bold text-gray-900 mb-2">
                    ที่อยู่บริษัท
                  </h3>
                  <p className="text-gray-600 font-inter">
                    448 ถ.นาคนิวาส แขวงลาดพร้าว เขตลาดพร้าว กรุงเทพฯ 10230
                  </p>
                </div>

                {/* Map Embed */}
                <div className="h-80 bg-gray-100 flex items-center justify-center">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3875.123456789!2d100.5018!3d13.7563!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTPCsDQ1JzIyLjciTiAxMDAKwzMwJzA2LjUiRQ!5e0!3m2!1sth!2sth!4v1234567890123!5m2!1sth!2sth"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="rounded-b-2xl"
                  ></iframe>
                </div>
              </div>

              {/* Business Hours & Additional Info */}
              <div className="bg-gradient-to-br from-yellow-50 to-blue-50 rounded-2xl p-8 shadow-lg">
                <h3 className="text-xl font-kanit font-bold text-gray-900 mb-6">
                  ข้อมูลเพิ่มเติม
                </h3>

                <div className="space-y-6">
                  {/* Business Hours */}
                  <div>
                    <h4 className="font-kanit font-semibold text-gray-900 mb-3 flex items-center">
                      <span className="text-2xl mr-3">🕒</span>
                      เวลาทำการ
                    </h4>
                    <div className="space-y-2">
                      <p className="text-gray-700 font-inter">
                        จันทร์ - อาทิตย์: 08:00 - 20:00 น.
                      </p>
                      <p className="text-gray-700 font-inter">
                        บริการฉุกเฉิน: ตลอด 24 ชั่วโมง
                      </p>
                    </div>
                  </div>

                  {/* Service Areas */}
                  <div>
                    <h4 className="font-kanit font-semibold text-gray-900 mb-3 flex items-center">
                      <span className="text-2xl mr-3">🌍</span>
                      พื้นที่ให้บริการ
                    </h4>
                    <p className="text-gray-700 font-inter">
                      ทุกจังหวัดในประเทศไทย พร้อมทีมงานประจำในพื้นที่หลัก
                    </p>
                  </div>

                  {/* Facebook */}
                  <div>
                    <h4 className="font-kanit font-semibold text-gray-900 mb-3 flex items-center">
                      <span className="text-2xl mr-3">📘</span>
                      Facebook
                    </h4>
                    <p className="text-gray-700 font-inter mb-3">
                      ติดตามเราเพื่อรับข้อมูลข่าวสารและโปรโมชั่น
                    </p>
                    <a
                      href="https://www.facebook.com/profile.php?id=61579877480646"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block px-4 py-2 bg-blue-500 text-white font-kanit font-semibold rounded-lg hover:bg-blue-600 transition-colors duration-200"
                    >
                      ไปที่ Facebook
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-gray-900 text-white">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
            {/* Company Info */}
            <div className="lg:col-span-2">
              <h3 className="text-xl font-bold text-yellow-400 mb-4">
                บริษัท จาเรนซัพ แอร์เรนทอล
              </h3>
              <p className="text-gray-300 mb-4 leading-loose">
                ผู้ให้บริการเช่าแอร์ขนาดใหญ่ 5-20 ตัน สำหรับงานอีเวนต์
                งานแต่งงาน และงานใหญ่ทุกประเภท พร้อมทีมงานมืออาชีพ
              </p>
              <div className="space-y-2 text-sm text-gray-300">
                <p>📍 448 ถ.นาคนิวาส แขวงลาดพร้าว เขตลาดพร้าว กรุงเทพฯ 10230</p>
                <p>📞 086-975-0664 (คุณหมวย) | 096-958-4422 (คุณแม็กซ์)</p>
                <p>💬 Line Official: สแกน QR Code ด้านบน</p>
              </div>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-lg font-semibold text-yellow-400 mb-4">
                บริการของเรา
              </h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>เช่าแอร์ 5 ตัน</li>
                <li>เช่าแอร์ 10 ตัน</li>
                <li>เช่าแอร์ 20 ตัน</li>
                <li>ติดตั้งและซ่อมบำรุง</li>
                <li>บริการล้างแอร์</li>
                <li>ให้คำปรึกษา</li>
              </ul>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold text-yellow-400 mb-4">
                ลิงก์ด่วน
              </h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>
                  <a
                    href="#services"
                    className="hover:text-yellow-400 transition-colors"
                  >
                    บริการของเรา
                  </a>
                </li>
                <li>
                  <a
                    href="#contact"
                    className="hover:text-yellow-400 transition-colors"
                  >
                    ติดต่อเรา
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.facebook.com/profile.php?id=61579877480646"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-yellow-400 transition-colors"
                  >
                    Facebook
                  </a>
                </li>
                <li>
                  <a
                    href="tel:0869750664"
                    className="hover:text-yellow-400 transition-colors"
                  >
                    โทรเลย
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-8 pt-8 border-t border-gray-700">
            <div className="flex flex-col sm:flex-row justify-between items-center">
              <p className="text-sm text-gray-400">
                © 2025 เจริญทรัพย์แอร์เช่า | บริการให้เช่าแอร์ 5 ตัน 10 ตัน 20
                ตัน | โทร 086-975-0664
              </p>
              <p className="text-sm text-gray-400 mt-2 sm:mt-0">
                เปิดให้บริการทุกวัน 08:00 - 20:00 น.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Home;
