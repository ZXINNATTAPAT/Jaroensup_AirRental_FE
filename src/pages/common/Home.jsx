import { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Cookies from "universal-cookie";
// import ThemeExample from "../../components/ThemeExample";

const translations = {
  th: {
    heroTitle: "บริการให้เช่าเครื่องปรับอากาศขนาดใหญ่ พร้อมบริการติดตั้ง",
    heroSubtitle: "5 ตัน • 10 ตัน • 20 ตัน",
    heroDescription:
      "สำหรับงานอีเวนต์ งานแต่งงาน งานบวช และงานขนาดใหญ่ทุกประเภท พร้อมบริการติดตั้งโดยทีมงานมืออาชีพ",
    viewServices: "ดูบริการ",
    contactUs: "ติดต่อเรา",
    getQuote: "ขอใบเสนอราคา",
  },
  en: {
    heroTitle: "Large Air Conditioning Rental Service",
    heroSubtitle: "5 Ton • 10 Ton • 20 Ton",
    heroDescription:
      "For events, weddings, ceremonies, and all types of large-scale projects with professional installation team",
    viewServices: "View Services",
    contactUs: "Contact Us",
    getQuote: "Get Quote",
  },
};

const Home = () => {
  const [language, setLanguage] = useState(
    localStorage.getItem("language") || "th"
  );
  const cookies = new Cookies();
  const token = cookies.get("authToken");

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

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden ">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url(/src/assets/images/IMG_0848.jpg)",
            opacity: 0.95,
            height: "45vh",
          }}
        ></div>

        <div className="relative isolate px-6 pt-8 lg:px-8">
          <div className="mx-auto max-w-7xl py-16 sm:py-24 lg:py-30">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              {/* Left Side - Text Content */}
              <div className="text-left space-y-6">
                <div className="bg-white/85 backdrop-blur-sm rounded-2xl p-6 shadow-2xl">
                  <h1 className="text-xl font-bold tracking-tight text-black sm:text-3xl lg:text-3xl">
                    {translations[language].heroTitle}
                  </h1>
                  <div className="mt-4 flex items-center space-x-2">
                    <div className="bg-yellow-500 rounded-full px-3 py-1.5 shadow-lg">
                      <span className="text-sm font-semibold text-white">
                        5 ตัน
                      </span>
                    </div>
                    <div className="bg-yellow-500 rounded-full px-3 py-1.5 shadow-lg">
                      <span className="text-sm font-semibold text-white">
                        10 ตัน
                      </span>
                    </div>
                    <div className="bg-yellow-500 rounded-full px-3 py-1.5 shadow-lg">
                      <span className="text-sm font-semibold text-white">
                        20 ตัน
                      </span>
                    </div>
                  </div>
                  <p className="mt-4 text-base leading-7 text-black">
                    {translations[language].heroDescription}
                  </p>
                </div>

                {/* Contact Banner */}
                <div className="bg-gradient-to-r from-blue-100 via-blue-50 to-blue-200 rounded-2xl p-6 shadow-lg">
                  <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
                    {/* Left Section - Contact & Call-to-Action */}
                    <div className="text-center md:text-left">
                      <p className="text-lg font-semibold">
                        <span className="text-black">เช่า-ซื้อสินค้า</span>
                        <span className="bg-red-600 text-white px-3 py-1 rounded-lg ml-2">
                          สอบถามข้อมูลเพิ่มเติม
                        </span>
                      </p>
                      <div className="flex items-center justify-center md:justify-start space-x-4 mt-3">
                        <a
                          href="tel:0869750664"
                          className="bg-yellow-500 hover:bg-yellow-600 text-black px-6 py-3 rounded-lg font-semibold flex items-center space-x-2 transition-colors duration-200"
                        >
                          <span>📞</span>
                          <span>คลิกโทร</span>
                        </a>
                        <div className="text-2xl font-bold text-black">
                          086-975-0664
                        </div>
                      </div>
                    </div>

                    {/* Middle Section - QR Code */}
                    <div className="bg-blue-800 rounded-lg p-4 flex items-center space-x-4">
                      <img
                        src="/line-qr.png"
                        alt="Line QR Code"
                        className="w-16 h-16 rounded"
                      />
                      <div className="text-white">
                        <div className="text-xl font-bold">SCAN ME!</div>
                        <div className="text-sm">@jaroensupair</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side - Image Card */}
              <div className="flex justify-center lg:justify-end">
                <div className="group relative overflow-hidden rounded-2xl shadow-2xl bg-white/10 backdrop-blur-sm p-2 w-full max-w-2xl">
                  <img
                    src="/src/assets/images/IMG_0853.jpg"
                    alt="งานสัมมนา - แอร์ 15 ตัน"
                    className="w-full h-auto object-cover rounded-xl group-hover:scale-105 transition-transform duration-300"
                    style={{ height: '400px', }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>


        {/* Keyword Banner */}
        <div className="w-full bg-gradient-to-r from-blue-600 to-blue-800 py-6">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            {/* Tagline */}
            <div className="text-center mb-6">
              <p className="text-white text-lg md:text-xl font-medium leading-relaxed">
                มุ่งมั่นด้านบริการเช่าเครื่องปรับอากาศขนาดใหญ่
                ที่ให้ทั้งความเย็น ความสะดวก และความประทับใจในทุกงานสำคัญของคุณ
              </p>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gold-400/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl"></div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              เจริญทรัพย์แอร์เช่า – เย็นทั่วถึง บริการครบจบในที่เดียว
            </h2>
            <p className="mt-4 text-lg leading-8 text-gray-600">
              บริการเช่าแอร์ขนาดใหญ่ครบวงจร พร้อมทีมงานมืออาชีพ
              ดูแลตั้งแต่ต้นจนจบ
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* Service 1 - 5 Ton AC Rental */}
            <div className="card-elegant p-8 lg:p-10">
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-blue-100 text-blue-600 text-3xl mb-4">
                  ❄️
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  แอร์เช่า 5 ตัน
                </h3>
                <div className="inline-block bg-yellow-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                  ขนาดกะทัดรัด
                </div>
              </div>
              <div className="space-y-4">
                <p className="text-gray-600 text-center">
                  เหมาะสำหรับงานขนาดเล็กถึงกลาง เช่น งานแต่ง งานเลี้ยงสังสรรค์
                  ห้องประชุม และกิจกรรมภายในอาคาร
                </p>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span className="text-sm text-gray-600">
                      เคลื่อนย้ายง่าย ติดตั้งรวดเร็ว
                    </span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span className="text-sm text-gray-600">
                      ใช้ไฟ 3 เฟสหรือไฟฟ้าโรงงานได้
                    </span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span className="text-sm text-gray-600">
                      ทีมงานดูแลตั้งแต่ติดตั้งจนถึงเก็บงาน
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Service 2 - 10 Ton AC Rental */}
            <div className="card-elegant p-8 lg:p-10">
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gold-100 text-gold-600 text-3xl mb-4">
                  ❄️
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  แอร์เช่า 10 ตัน
                </h3>
                <div className="inline-block bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                  ขนาดกลาง
                </div>
              </div>
              <div className="space-y-4">
                <p className="text-gray-600 text-center">
                  เหมาะสำหรับงานขนาดกลางถึงใหญ่ เช่น งานอีเวนต์ในหอประชุม โรงแรม
                  โรงยิม หรือกิจกรรมที่ต้องการความเย็นสม่ำเสมอ
                </p>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <span className="w-2 h-2 bg-gold-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span className="text-sm text-gray-600">
                      ทำความเย็นได้รวดเร็ว กระจายลมได้ทั่วถึง
                    </span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="w-2 h-2 bg-gold-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span className="text-sm text-gray-600">ใช้ไฟ 3 เฟส</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="w-2 h-2 bg-gold-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span className="text-sm text-gray-600">
                      ทีมงานช่วยดูแลหน้างานครบวงจร
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Service 3 - 20 Ton AC Rental */}
            <div className="card-elegant p-8 lg:p-10">
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-blue-100 text-blue-600 text-3xl mb-4">
                  ❄️
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  แอร์เช่า 20 ตัน
                </h3>
                <div className="inline-block bg-red-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                  ขนาดใหญ่
                </div>
              </div>
              <div className="space-y-4">
                <p className="text-gray-600 text-center">
                  แอร์ขนาดใหญ่สำหรับงานที่ต้องการความเย็นแรงและครอบคลุมพื้นที่กว้าง
                  เช่น งานแสดงสินค้า คอนเสิร์ต โรงงาน หรือคลังสินค้า
                </p>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span className="text-sm text-gray-600">
                      มีประสิทธิภาพสูง ให้ความเย็นแรง
                    </span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span className="text-sm text-gray-600">
                      รองรับจำนวนคนมาก ใช้ไฟ 3 เฟสขนาดใหญ่
                    </span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span className="text-sm text-gray-600">
                      พร้อมบริการติดตั้ง รื้อถอน และดูแลหน้างาน
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Services */}
          <div className="mt-16 bg-gradient-to-r from-blue-50 to-yellow-50 rounded-2xl p-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                บริการเสริมครบวงจร
              </h3>
              <p className="text-gray-600">ทุกขนาดแอร์มีบริการเสริมครบ</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 text-xl">👷</span>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">
                    ทีมงานติดตั้งและรื้อถอน
                  </h4>
                  <p className="text-sm text-gray-600">
                    ช่างมืออาชีพดูแลการติดตั้งและรื้อถอนอย่างปลอดภัย
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                    <span className="text-yellow-600 text-xl">🛠️</span>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">
                    ดูแลหน้างานตลอดการใช้งาน
                  </h4>
                  <p className="text-sm text-gray-600">
                    ทีมงานคอยดูแลและแก้ไขปัญหาตลอดระยะเวลาการใช้งาน
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Gallery Section */}
      <section className="bg-gray-50 py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              ผลงานที่ผ่านมา
            </h2>
            <p className="mt-4 text-lg leading-8 text-gray-600">
              ภาพถ่ายจากงานจริงที่เราได้ให้บริการลูกค้า
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Portfolio Item 1 */}
            <div className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
              <img
                src="/src/assets/images/IMG_0848.jpg"
                alt="งานแต่งงาน - แอร์ 10 ตัน"
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-end">
                <div className="p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-lg font-semibold">งานแต่งงาน</h3>
                  <p className="text-sm">แอร์ 10 ตัน - โรงแรม ABC</p>
                </div>
              </div>
            </div>

            {/* Portfolio Item 2 */}
            <div className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
              <img
                src="/src/assets/images/IMG_0849.jpg"
                alt="งานอีเวนต์ - แอร์ 20 ตัน"
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-end">
                <div className="p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-lg font-semibold">งานอีเวนต์</h3>
                  <p className="text-sm">แอร์ 20 ตัน - ศูนย์ประชุม</p>
                </div>
              </div>
            </div>

            {/* Portfolio Item 3 */}
            <div className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
              <img
                src="/src/assets/images/IMG_0850.jpg"
                alt="งานบวช - แอร์ 5 ตัน"
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-end">
                <div className="p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-lg font-semibold">งานบวช</h3>
                  <p className="text-sm">แอร์ 5 ตัน - วัด ABC</p>
                </div>
              </div>
            </div>

            {/* Portfolio Item 4 */}
            <div className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
              <img
                src="/src/assets/images/IMG_0853.jpg"
                alt="งานสัมมนา - แอร์ 15 ตัน"
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-end">
                <div className="p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-lg font-semibold">งานสัมมนา</h3>
                  <p className="text-sm">แอร์ 15 ตัน - บริษัท XYZ</p>
                </div>
              </div>
            </div>

            {/* Portfolio Item 5 */}
            <div className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
              <img
                src="/src/assets/images/IMG_0889.png"
                alt="งานแสดงสินค้า - แอร์ 20 ตัน"
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-end">
                <div className="p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-lg font-semibold">งานแสดงสินค้า</h3>
                  <p className="text-sm">แอร์ 20 ตัน - ศูนย์แสดงสินค้า</p>
                </div>
              </div>
            </div>

            {/* Portfolio Item 6 */}
            <div className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
              <img
                src="/src/assets/images/IMG_0890.png"
                alt="งานเลี้ยงสังสรรค์ - แอร์ 10 ตัน"
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-end">
                <div className="p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-lg font-semibold">งานเลี้ยงสังสรรค์</h3>
                  <p className="text-sm">แอร์ 10 ตัน - โรงแรม DEF</p>
                </div>
              </div>
            </div>
          </div>

          {/* View More Button */}
          <div className="text-center mt-12">
            <button className="btn-primary px-8 py-3 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
              ดูผลงานทั้งหมด
            </button>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="bg-gray-50 py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              ทำไมต้องเลือกเรา
            </h2>
            <p className="mt-4 text-lg leading-8 text-gray-600">
              เรามุ่งมั่นให้บริการที่ดีที่สุด
              เพื่อให้ลูกค้ามั่นใจในคุณภาพและความคุ้มค่า
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-2">
            {/* Point 1 - Professional Team */}
            <div className="card-elegant p-8">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-blue-600 text-2xl">
                    👨‍🔧
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    ทีมงานมืออาชีพ
                  </h3>
                  <p className="text-gray-600">
                    ช่างเทคนิคที่มีประสบการณ์ติดตั้งและดูแลแอร์เช่ากว่า 10 ปี
                    ผ่านการอบรมและรับรองมาตรฐานสากล
                  </p>
                </div>
              </div>
            </div>

            {/* Point 2 - Quality Equipment */}
            <div className="card-elegant p-8">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gold-100 text-gold-600 text-2xl">
                    ❄️
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    อุปกรณ์คุณภาพสูง
                  </h3>
                  <p className="text-gray-600">
                    แอร์ใหม่ทุกเครื่อง จากยี่ห้อชั้นนำ ผ่านการตรวจสอบคุณภาพ
                    และบำรุงรักษาอย่างสม่ำเสมอ
                  </p>
                </div>
              </div>
            </div>

            {/* Point 3 - Fast Service */}
            <div className="card-elegant p-8">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-blue-600 text-2xl">
                    ⚡
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    บริการรวดเร็ว
                  </h3>
                  <p className="text-gray-600">
                    พร้อมให้บริการทันที ติดตั้งเสร็จภายใน 2-4 ชั่วโมง
                    ไม่เสียเวลาและไม่กระทบตารางงาน
                  </p>
                </div>
              </div>
            </div>

            {/* Point 4 - Transparent Pricing */}
            <div className="card-elegant p-8">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gold-100 text-gold-600 text-2xl">
                    💰
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    ราคาโปร่งใส
                  </h3>
                  <p className="text-gray-600">
                    ราคาคุ้มค่า ไม่มีค่าใช้จ่ายแอบแฝง รับประกันราคา
                    และให้คำปรึกษาเลือกขนาดที่เหมาะสม
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Portfolio Section */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              ผลงานที่ผ่านมา
            </h2>
            <p className="mt-4 text-lg leading-8 text-gray-600">
              ตัวอย่างงานติดตั้งแอร์เช่าในหลากหลายโอกาส ที่ลูกค้าไว้วางใจเรา
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-2">
            {/* Project 1 - Wedding Event */}
            <div className="card-elegant overflow-hidden">
              <div className="relative">
                <img
                  src="/images/work2.jpg"
                  alt="งานแต่งงาน"
                  className="w-full h-64 object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className="badge-gold">งานแต่งงาน</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  งานแต่งงานหรูหรา
                </h3>
                <p className="text-gray-600 mb-4">
                  ติดตั้งแอร์ 10 ตัน สำหรับงานแต่งงาน 200 คน ในโรงแรม 5 ดาว
                  ใช้เวลา 3 ชั่วโมง ทำงานเสร็จทันเวลา
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">
                    ลูกค้า: โรงแรม ABC
                  </span>
                  <span className="text-sm font-semibold text-blue-600">
                    10 ตัน
                  </span>
                </div>
              </div>
            </div>

            {/* Project 2 - Corporate Event */}
            <div className="card-elegant overflow-hidden">
              <div className="relative">
                <img
                  src="/images/work1.jpg"
                  alt="งานอีเวนต์"
                  className="w-full h-64 object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className="badge-blue">งานอีเวนต์</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  งานสัมมนาบริษัท
                </h3>
                <p className="text-gray-600 mb-4">
                  ติดตั้งแอร์ 20 ตัน สำหรับงานสัมมนา 500 คน ในศูนย์ประชุม ทำงาน
                  2 วันติดต่อกัน
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">
                    ลูกค้า: บริษัท XYZ
                  </span>
                  <span className="text-sm font-semibold text-gold-600">
                    20 ตัน
                  </span>
                </div>
              </div>
            </div>

            {/* Project 3 - Office Space */}
            <div className="card-elegant overflow-hidden">
              <div className="relative">
                <img
                  src="/images/work3.jpg"
                  alt="ออฟฟิศ"
                  className="w-full h-64 object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className="badge-gold">ออฟฟิศ</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  ออฟฟิศชั่วคราว
                </h3>
                <p className="text-gray-600 mb-4">
                  ติดตั้งแอร์ 5 ตัน สำหรับออฟฟิศชั่วคราว 50 คน ระยะเวลา 3 เดือน
                  พร้อมบำรุงรักษา
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">
                    ลูกค้า: สตาร์ทอัพ ABC
                  </span>
                  <span className="text-sm font-semibold text-blue-600">
                    5 ตัน
                  </span>
                </div>
              </div>
            </div>

            {/* Project 4 - Religious Ceremony */}
            <div className="card-elegant overflow-hidden">
              <div className="relative">
                <img
                  src="/images/work1.jpg"
                  alt="งานบวช"
                  className="w-full h-64 object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className="badge-blue">งานบวช</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  งานบวชใหญ่
                </h3>
                <p className="text-gray-600 mb-4">
                  ติดตั้งแอร์ 15 ตัน สำหรับงานบวช 300 คน ในวัด
                  ทำงานกลางคืนเพื่อไม่รบกวนกิจวัตรของวัด
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">ลูกค้า: วัด ABC</span>
                  <span className="text-sm font-semibold text-gold-600">
                    15 ตัน
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-16 bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-8 text-white">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
              <div className="text-center">
                <div className="text-3xl font-bold text-gold-400">500+</div>
                <div className="text-lg">โครงการที่เสร็จสิ้น</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gold-400">98%</div>
                <div className="text-lg">ความพึงพอใจลูกค้า</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gold-400">10+</div>
                <div className="text-lg">ปีประสบการณ์</div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Contact Section */}
      <section id="contact" className="bg-gray-50 py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              ติดต่อเรา
            </h2>
            <p className="mt-4 text-lg leading-8 text-gray-600">
              สนใจเช่าแอร์หรือสอบถามข้อมูลเพิ่มเติม
              ติดต่อเราได้ตามช่องทางด้านล่าง
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-2">
            {/* Contact Info */}
            <div className="space-y-8">
              {/* Phone */}
              <div className="card-elegant p-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 text-blue-600">
                      📞
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      เบอร์โทรศัพท์
                    </h3>
                    <div className="space-y-1">
                      <p className="text-gray-600">086-975-0664 (คุณหมวย)</p>
                      <p className="text-gray-600">096-958-4422 (คุณแม็กซ์)</p>
                    </div>
                    <a
                      href="tel:0869750664"
                      className="inline-block mt-3 btn-primary text-sm px-4 py-2"
                    >
                      โทรเลย
                    </a>
                  </div>
                </div>
              </div>

              {/* Address */}
              <div className="card-elegant p-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gold-100 text-gold-600">
                      📍
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      ที่อยู่บริษัท
                    </h3>
                    <p className="text-gray-600">
                      448 ถ.นาคนิวาส แขวงลาดพร้าว
                      <br />
                      เขตลาดพร้าว กรุงเทพฯ 10230
                    </p>
                  </div>
                </div>
              </div>

              {/* Line Official */}
              <div className="card-elegant p-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-green-100 text-green-600">
                      💬
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Line Official
                    </h3>
                    <p className="text-gray-600 mb-3">
                      สแกน QR Code เพื่อแชทกับเรา
                    </p>
                    <img
                      src="/line-qr.png"
                      alt="Line QR Code"
                      className="w-24 h-24 rounded-lg shadow"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media & Quick Contact */}
            <div className="space-y-8">
              {/* Facebook */}
              <div className="card-elegant p-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 text-blue-600">
                      📘
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Facebook Page
                    </h3>
                    <p className="text-gray-600 mb-3">
                      ติดตามเราเพื่อรับข้อมูลข่าวสารและโปรโมชั่น
                    </p>
                    <a
                      href="https://www.facebook.com/profile.php?id=61579877480646"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary text-sm px-4 py-2"
                    >
                      ไปที่ Facebook
                    </a>
                  </div>
                </div>
              </div>

              {/* Quick Quote */}
              <div className="card-elegant p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  ขอใบเสนอราคา
                </h3>
                <p className="text-gray-600 mb-4">
                  ส่งข้อมูลความต้องการของคุณ เราจะติดต่อกลับภายใน 24 ชั่วโมง
                </p>
                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="ชื่อ-นามสกุล"
                    className="input-elegant w-full"
                  />
                  <input
                    type="tel"
                    placeholder="เบอร์โทรศัพท์"
                    className="input-elegant w-full"
                  />
                  <select className="input-elegant w-full">
                    <option>เลือกขนาดแอร์</option>
                    <option>5 ตัน</option>
                    <option>10 ตัน</option>
                    <option>20 ตัน</option>
                    <option>อื่นๆ</option>
                  </select>
                  <textarea
                    placeholder="รายละเอียดงาน"
                    className="input-elegant w-full h-24"
                  ></textarea>
                  <button className="btn-secondary w-full">ส่งคำขอ</button>
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
              <h3 className="text-xl font-bold text-gold-400 mb-4">
                บริษัท จาเรนซัพ แอร์เรนทอล
              </h3>
              <p className="text-gray-300 mb-4">
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
              <h4 className="text-lg font-semibold text-gold-400 mb-4">
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
              <h4 className="text-lg font-semibold text-gold-400 mb-4">
                ลิงก์ด่วน
              </h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>
                  <a
                    href="#services"
                    className="hover:text-gold-400 transition-colors"
                  >
                    บริการของเรา
                  </a>
                </li>
                <li>
                  <a
                    href="#contact"
                    className="hover:text-gold-400 transition-colors"
                  >
                    ติดต่อเรา
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.facebook.com/profile.php?id=61579877480646"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-gold-400 transition-colors"
                  >
                    Facebook
                  </a>
                </li>
                <li>
                  <a
                    href="tel:0869750664"
                    className="hover:text-gold-400 transition-colors"
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
                © 2024 บริษัท จาเรนซัพ แอร์เรนทอล จำกัด. สงวนลิขสิทธิ์ทุกประการ
              </p>
              <p className="text-sm text-gray-400 mt-2 sm:mt-0">
                เปิดให้บริการทุกวัน 08:00 - 20:00 น.
              </p>
            </div>
          </div>
        </div>
      </footer>

      <Footer />
    </>
  );
};

export default Home;
