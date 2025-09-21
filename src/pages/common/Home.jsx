import { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Cookies from "universal-cookie";
// import ThemeExample from "../../components/ThemeExample";

const translations = {
  th: {
    heroTitle: "เจริญทรัพย์แอร์เช่า บริการให้เช่าเครื่องปรับอากาศขนาดใหญ่ พร้อมบริการติดตั้ง",
    heroSubtitle: "5 ตัน • 10 ตัน • 20 ตัน",
    heroDescription:
      "รองรับงานอีเวนต์ งานแต่ง งานบวช คอนเสิร์ต และกิจกรรมทุกขนาด ติดตั้งรวดเร็ว เย็นทั่วถึง พร้อมทีมงานดูแลครบวงจร",
    viewServices: "ดูบริการ",
    contactUs: "ติดต่อเรา",
    getQuote: "ขอใบเสนอราคา",
  },
  en: {
    heroTitle: "Large Air Conditioning Rental Service",
    heroSubtitle: "5 Ton • 10 Ton • 20 Ton",
    heroDescription:
      "Perfect for events, weddings, ceremonies, and concerts of all sizes. Fast setup, powerful cooling, and full on-site support.",
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

        <div className="relative isolate px-8 pt-8 lg:px-8">
          <div className="mx-auto max-w-7xl py-16 sm:py-24 lg:py-30">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              {/* Left Side - Text Content */}
              <div className="text-left space-y-6">
                <div className="bg-white/85 backdrop-blur-sm rounded-2xl p-6 shadow-2xl">
                  <h1 className="text-xl font-bold tracking-tight text-black sm:text-3xl lg:text-3xl">
                    {translations[language].heroTitle}
                  </h1>
                  <div className="mt-4 flex items-center space-x-2">
                    <div className="bg-yellow-500 rounded-full px-6 py-1.5 shadow-lg">
                      <span className="text-sm font-semibold text-white">
                        5 ตัน
                      </span>
                    </div>
                    <div className="bg-yellow-500 rounded-full px-6 py-1.5 shadow-lg">
                      <span className="text-sm font-semibold text-white">
                        10 ตัน
                      </span>
                    </div>
                    <div className="bg-yellow-500 rounded-full px-6 py-1.5 shadow-lg">
                      <span className="text-sm font-semibold text-white">
                        20 ตัน
                      </span>
                    </div>
                  </div>
                  <p className="mt-4 text-base leading-loose text-black">
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
        <div className="w-full bg-gradient-to-r from-blue-700 via-blue-800 to-blue-900 py-6">
  <div className="max-w-7xl mx-auto px-6 lg:px-8">
    {/* Tagline */}
    <div className="text-center mb-8">
      <div className="inline-block bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-2xl px-6 py-4 shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
        <h2 className="text-white text-xl sm:text-2xl md:text-3xl font-bold tracking-wide drop-shadow-lg">
          เจริญทรัพย์แอร์เช่า – เย็นทั่วถึง บริการครบจบในที่เดียว
        </h2>
      </div>

      <p className="mt-4 text-white text-sm sm:text-base md:text-lg font-medium leading-relaxed max-w-4xl mx-auto drop-shadow-sm">
        มุ่งมั่นด้านบริการเช่าเครื่องปรับอากาศขนาดใหญ่ ที่ให้ทั้งความเย็น ความสะดวก 
        และความประทับใจในทุกงานสำคัญของคุณ
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
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl leading-tight">
              เจริญทรัพย์แอร์เช่า – เย็นทั่วถึง บริการครบจบในที่เดียว
            </h2>
            <p className="mt-4 text-lg leading-loose text-gray-600">
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
                <p className="text-gray-600 text-center leading-loose">
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
            <div className="card-elegant overflow-hidden">
              {/* Card Header with Image */}
              <div className="relative h-48 bg-gradient-to-br from-blue-100 to-blue-200">
                <img 
                  src="/images/ChatGPT Image 21 ก.ย. 2568 15_21_56.png" 
                  alt="แอร์ 10 ตัน" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    ขนาดกลาง
                  </span>
                </div>
              </div>
              
              {/* Card Content */}
              <div className="p-8 lg:p-10">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    แอร์เช่า 10 ตัน
                  </h3>
                </div>
                <div className="space-y-4">
                <p className="text-gray-600 text-center leading-loose">
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
                <p className="text-gray-600 text-center leading-loose">
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
      <section className="bg-gradient-to-br from-gray-50 to-blue-50 py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-5xl text-center mb-20">
            <h2 className="text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl lg:text-7xl mb-8">
              ผลงานที่ผ่านมา
            </h2>
            <p className="text-2xl leading-loose text-gray-600 mb-4">
              ตัวอย่างงานติดตั้งแอร์เช่าในหลากหลายโอกาส ที่ลูกค้าไว้วางใจเรา
            </p>
            <p className="text-xl text-gray-500">
              ภาพถ่ายจากงานจริงที่เราได้ให้บริการลูกค้า
            </p>
          </div>

          {/* Improved Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Portfolio Item 1 - Featured Large */}
            <div className="group relative overflow-hidden rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-500 lg:col-span-2 lg:row-span-2">
              <img
                src="/src/assets/images/IMG_0848.jpg"
                alt="งานแต่งงาน - แอร์ 10 ตัน"
                className="w-full h-80 lg:h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent">
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 transform translate-y-0 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">งานแต่งงานหรูหรา</h3>
                    <p className="text-lg text-gray-600 mb-3">แอร์ 10 ตัน - โรงแรม ABC</p>
                    <div className="flex items-center space-x-4">
                      <span className="bg-yellow-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                        10 ตัน
                      </span>
                      <span className="text-sm text-gray-500">200 คน</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Portfolio Item 2 */}
            <div className="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500">
              <img
                src="/src/assets/images/IMG_0849.jpg"
                alt="งานอีเวนต์ - แอร์ 20 ตัน"
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-lg font-bold text-white mb-1">งานอีเวนต์</h3>
                  <p className="text-sm text-gray-200">แอร์ 20 ตัน - ศูนย์ประชุม</p>
                </div>
              </div>
            </div>

            {/* Portfolio Item 3 */}
            <div className="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500">
              <img
                src="/src/assets/images/IMG_0850.jpg"
                alt="งานบวช - แอร์ 5 ตัน"
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-lg font-bold text-white mb-1">งานบวช</h3>
                  <p className="text-sm text-gray-200">แอร์ 5 ตัน - วัด ABC</p>
                </div>
              </div>
            </div>

            {/* Portfolio Item 4 */}
            <div className="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500">
              <img
                src="/src/assets/images/IMG_0853.jpg"
                alt="งานสัมมนา - แอร์ 15 ตัน"
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-lg font-bold text-white mb-1">งานสัมมนา</h3>
                  <p className="text-sm text-gray-200">แอร์ 15 ตัน - บริษัท XYZ</p>
                </div>
              </div>
            </div>

            {/* Portfolio Item 5 */}
            <div className="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500">
              <img
                src="/src/assets/images/IMG_0889.png"
                alt="งานแสดงสินค้า - แอร์ 20 ตัน"
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-lg font-bold text-white mb-1">งานแสดงสินค้า</h3>
                  <p className="text-sm text-gray-200">แอร์ 20 ตัน - ศูนย์แสดงสินค้า</p>
                </div>
              </div>
            </div>

            {/* Portfolio Item 6 */}
            <div className="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500">
              <img
                src="/src/assets/images/IMG_0890.png"
                alt="งานเลี้ยงสังสรรค์ - แอร์ 10 ตัน"
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-lg font-bold text-white mb-1">งานเลี้ยงสังสรรค์</h3>
                  <p className="text-sm text-gray-200">แอร์ 10 ตัน - โรงแรม DEF</p>
                </div>
              </div>
            </div>

            {/* Portfolio Item 7 - Wedding Event */}
            <div className="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500">
              <img
                src="/images/work2.jpg"
                alt="งานแต่งงาน"
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-lg font-bold text-white mb-1">งานแต่งงานหรูหรา</h3>
                  <p className="text-sm text-gray-200">แอร์ 10 ตัน - โรงแรม ABC</p>
                </div>
              </div>
            </div>

            {/* Portfolio Item 8 - Corporate Event */}
            <div className="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500">
              <img
                src="/images/work1.jpg"
                alt="งานอีเวนต์"
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-lg font-bold text-white mb-1">งานสัมมนาบริษัท</h3>
                  <p className="text-sm text-gray-200">แอร์ 20 ตัน - ศูนย์ประชุม</p>
                </div>
              </div>
            </div>

            {/* Portfolio Item 9 - Office Space */}
            <div className="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500">
              <img
                src="/images/work3.jpg"
                alt="ออฟฟิศ"
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-lg font-bold text-white mb-1">ออฟฟิศชั่วคราว</h3>
                  <p className="text-sm text-gray-200">แอร์ 5 ตัน - สตาร์ทอัพ ABC</p>
                </div>
              </div>
            </div>

            {/* Portfolio Item 10 - Religious Ceremony */}
            <div className="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500">
              <img
                src="/images/work1.jpg"
                alt="งานบวช"
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-lg font-bold text-white mb-1">งานบวชใหญ่</h3>
                  <p className="text-sm text-gray-200">แอร์ 15 ตัน - วัด ABC</p>
                </div>
              </div>
            </div>
          </div>

          {/* View More Button */}
          <div className="text-center mt-16">
            <button className="bg-gradient-to-r from-blue-600 to-blue-800 text-white px-12 py-4 text-xl font-bold rounded-2xl shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300">
              ดูผลงานทั้งหมด
            </button>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white sm:text-5xl lg:text-6xl mb-6">
              ทำไมต้องเลือกเรา
            </h2>
            <p className="text-xl text-blue-100 leading-loose">
              จุดเด่นของ เจริญทรัพย์แอร์เช่า
            </p>
          </div>

          {/* Large Banner Style Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Point 1 - Professional Team */}
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center">
                  <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1H5C3.89 1 3 1.89 3 3V21C3 22.11 3.89 23 5 23H19C20.11 23 21 22.11 21 21V9M19 9H14V4H19V9Z"/>
                  </svg>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                ทีมงานมืออาชีพ
              </h3>
              <p className="text-lg text-blue-100 leading-loose">
                ประสบการณ์กว่า 20 ปี
              </p>
            </div>

            {/* Point 2 - Fast Installation */}
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center">
                  <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M13,9H11V7H13M13,17H11V11H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z"/>
                  </svg>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                ติดตั้งรวดเร็ว
              </h3>
              <p className="text-lg text-blue-100 leading-loose">
                2-4 ชั่วโมงเสร็จ
              </p>
            </div>

            {/* Point 3 - Quality Equipment */}
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center">
                  <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4M12,6A6,6 0 0,1 18,12A6,6 0 0,1 12,18A6,6 0 0,1 6,12A6,6 0 0,1 12,6M12,8A4,4 0 0,0 8,12A4,4 0 0,0 12,16A4,4 0 0,0 16,12A4,4 0 0,0 12,8Z"/>
                  </svg>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                เครื่องคุณภาพดี
              </h3>
              <p className="text-lg text-blue-100 leading-loose">
                เย็นจริง ประหยัดไฟ
              </p>
            </div>

            {/* Point 4 - Fair Pricing */}
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center">
                  <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M7,15H9C9,16.08 10.37,17 12,17C13.63,17 15,16.08 15,15C15,13.9 13.96,13 12,13H11V11H12C14.76,11 17,13.24 17,16C17,18.76 14.76,21 12,21C9.24,21 7,18.76 7,16H5C5,19.87 8.13,23 12,23C15.87,23 19,19.87 19,16C19,12.13 15.87,9 12,9H11V7H12C14.21,7 16,8.79 16,11H18C18,7.69 15.31,5 12,5C8.69,5 6,7.69 6,11C6,14.31 8.69,17 12,17C13.38,17 14.63,16.56 15.54,15.77C14.56,16.5 13.35,17 12,17C10.65,17 9.44,16.5 8.46,15.77C9.37,16.56 10.62,17 12,17Z"/>
                  </svg>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                ราคายุติธรรม
              </h3>
              <p className="text-lg text-blue-100 leading-loose">
                บริการหลังการขาย
              </p>
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
            <p className="mt-4 text-lg leading-loose text-gray-600">
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
                    <p className="text-gray-600 leading-loose">
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
                    <p className="text-gray-600 mb-3 leading-loose">
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
                    <p className="text-gray-600 mb-3 leading-loose">
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
                <p className="text-gray-600 mb-4 leading-loose">
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
                © 2025 เจริญทรัพย์แอร์เช่า | บริการให้เช่าแอร์ 5 ตัน 10 ตัน 20 ตัน | โทร 086-975-0664
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
