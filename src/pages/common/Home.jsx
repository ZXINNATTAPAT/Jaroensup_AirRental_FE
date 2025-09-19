import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Cookies from "universal-cookie";
import { jwtDecode } from "jwt-decode";

const translations = {
  th: {
    revolutionize: "ปฏิวัติ",
    acRental: "การเช่าแอร์",
    withUs: "กับพวกเรา",
    enhanceEfficiency:
      "เพิ่มประสิทธิภาพการทำงานของคุณด้วย ระบบเช่าแอร์ที่ตอบโจทย์ ความต้องการของคุณ",
    tryNow: "ลองเลย →",
  },
  en: {
    revolutionize: "Revolutionize",
    acRental: "Air Conditioning Rental",
    withUs: "with Us",
    enhanceEfficiency:
      "Enhance your efficiency with an air rental system tailored to your needs.",
    tryNow: "Try Now →",
  },
};

const Home = () => {
  const [language, setLanguage] = useState(localStorage.getItem("language") || "th");
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
      <div className="relative overflow-hidden">
        <div className="relative isolate overflow-hidden bg-gray-900 font-prompt">
          <div className="mt-[-50px] flex h-screen items-center justify-center">
            <div className="max-w-full flex-shrink-0 px-4 text-center lg:mx-0 lg:max-w-3xl lg:pt-8">
              <h1 className="mt-10 text-5xl font-bold tracking-tight text-white sm:text-6xl">
                {translations[language].revolutionize}{" "}
                <span className="text-sky-500">
                  {translations[language].acRental}
                </span>{" "}
                {translations[language].withUs}
              </h1>
              <p className="mt-6 text-lg leading-8 text-white">
                {translations[language].enhanceEfficiency}
              </p>
              {!token && (
                <div className="mt-5 flex items-center justify-center gap-x-6">
                  <a
                    href="/register"
                    className="rounded-md bg-sky-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-sky-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400"
                    rel="noreferrer"
                  >
                    {translations[language].tryNow}
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <section className="bg-gray-100 py-16 px-6 lg:px-20">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          บริการของเรา
        </h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition">
            <h3 className="text-xl font-semibold text-sky-600 mb-3">
              ให้เช่าแอร์รายวัน / รายเดือน
            </h3>
            <p className="text-gray-700">
              เหมาะสำหรับงานอีเวนต์ งานแต่งงาน หรืองานจัดเลี้ยงต่าง ๆ
              พร้อมทีมงานติดตั้งครบวงจร
            </p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition">
            <h3 className="text-xl font-semibold text-sky-600 mb-3">
              ติดตั้งและซ่อมบำรุง
            </h3>
            <p className="text-gray-700">
              ทีมช่างมืออาชีพให้บริการติดตั้งและซ่อมบำรุงแอร์ทุกรุ่น ทุกยี่ห้อ
            </p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition">
            <h3 className="text-xl font-semibold text-sky-600 mb-3">
              บริการล้างแอร์
            </h3>
            <p className="text-gray-700">
              ทำความสะอาดเครื่องปรับอากาศ ลดการสะสมของฝุ่นและยืดอายุการใช้งาน
            </p>
          </div>
        </div>
      </section>
      {/* Services Section */}
<section className="bg-white py-20 font-prompt">
  <div className="mx-auto max-w-7xl px-6 lg:px-8">
    <div className="mx-auto max-w-2xl text-center">
      <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
        บริการของเรา
      </h2>
      <p className="mt-4 text-lg leading-8 text-gray-600">
        เรามีบริการเช่าแอร์ครบวงจร พร้อมทีมงานมืออาชีพ ดูแลตั้งแต่ต้นจนจบ
      </p>
    </div>

    {/* Service Cards */}
    <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {/* Service 1 */}
      <div className="rounded-2xl bg-gray-50 p-8 shadow-sm hover:shadow-md transition">
        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-sky-100 text-sky-600 mb-6 text-2xl">
          ❄️
        </div>
        <h3 className="text-xl font-semibold text-gray-900">เช่าแอร์รายวัน</h3>
        <p className="mt-3 text-gray-600">
          เหมาะสำหรับงานอีเวนท์ งานแต่ง งานบวช หรืองานชั่วคราวทุกประเภท
        </p>
      </div>

      {/* Service 2 */}
      <div className="rounded-2xl bg-gray-50 p-8 shadow-sm hover:shadow-md transition">
        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-sky-100 text-sky-600 mb-6 text-2xl">
          🏢
        </div>
        <h3 className="text-xl font-semibold text-gray-900">เช่าแอร์สำนักงาน</h3>
        <p className="mt-3 text-gray-600">
          แอร์เคลื่อนที่คุณภาพสูง ใช้งานสะดวก เหมาะกับออฟฟิศ และสถานที่ทำงาน
        </p>
      </div>

      {/* Service 3 */}
      <div className="rounded-2xl bg-gray-50 p-8 shadow-sm hover:shadow-md transition">
        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-sky-100 text-sky-600 mb-6 text-2xl">
          👨‍🔧
        </div>
        <h3 className="text-xl font-semibold text-gray-900">บริการติดตั้ง & ดูแล</h3>
        <p className="mt-3 text-gray-600">
          ทีมงานมืออาชีพติดตั้งรวดเร็ว ปลอดภัย พร้อมบริการดูแลหลังการใช้งาน
        </p>
      </div>
    </div>
  </div>
</section>
{/* Why Choose Us Section */}
<section className="bg-gray-50 py-20 font-prompt">
  <div className="mx-auto max-w-7xl px-6 lg:px-8">
    <div className="mx-auto max-w-2xl text-center">
      <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
        ทำไมต้องเลือกเรา
      </h2>
      <p className="mt-4 text-lg leading-8 text-gray-600">
        เรามุ่งมั่นให้บริการที่ดีที่สุด เพื่อให้ลูกค้ามั่นใจในคุณภาพและความคุ้มค่า
      </p>
    </div>

    {/* Highlights */}
    <div className="mt-16 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
      {/* Point 1 */}
      <div className="flex flex-col items-center text-center">
        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-sky-100 text-sky-600 text-2xl mb-4">
          💰
        </div>
        <h3 className="text-lg font-semibold text-gray-900">ราคาคุ้มค่า</h3>
        <p className="mt-2 text-gray-600">ราคาโปร่งใส ไม่มีบวกเพิ่มแอบแฝง</p>
      </div>

      {/* Point 2 */}
      <div className="flex flex-col items-center text-center">
        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-sky-100 text-sky-600 text-2xl mb-4">
          👨‍🔧
        </div>
        <h3 className="text-lg font-semibold text-gray-900">ทีมงานมืออาชีพ</h3>
        <p className="mt-2 text-gray-600">มีประสบการณ์ติดตั้งและดูแลแอร์เช่ากว่า 10 ปี</p>
      </div>

      {/* Point 3 */}
      <div className="flex flex-col items-center text-center">
        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-sky-100 text-sky-600 text-2xl mb-4">
          ⚡
        </div>
        <h3 className="text-lg font-semibold text-gray-900">บริการรวดเร็ว</h3>
        <p className="mt-2 text-gray-600">พร้อมให้บริการทันที ติดตั้งเสร็จไว ไม่เสียเวลา</p>
      </div>

      {/* Point 4 */}
      <div className="flex flex-col items-center text-center">
        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-sky-100 text-sky-600 text-2xl mb-4">
          ❄️
        </div>
        <h3 className="text-lg font-semibold text-gray-900">แอร์คุณภาพสูง</h3>
        <p className="mt-2 text-gray-600">แอร์สะอาด แรงเต็ม BTU เย็นทันใจ</p>
      </div>
    </div>
  </div>
</section>
<section className="bg-white py-20 font-prompt">
  <div className="mx-auto max-w-7xl px-6 lg:px-8">
    <div className="mx-auto max-w-2xl text-center">
      <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
        ผลงานที่ผ่านมา
      </h2>
      <p className="mt-4 text-lg leading-8 text-gray-600">
        ตัวอย่างงานติดตั้งแอร์เช่าในหลากหลายโอกาส ที่ลูกค้าไว้วางใจเรา
      </p>
    </div>

    {/* Gallery Grid */}
    <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <div className="relative group overflow-hidden rounded-2xl shadow-lg">
        <img src="/images/work1.jpg" alt="งานอีเวนต์" className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110" />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
          <p className="text-white text-lg font-semibold">งานอีเวนต์</p>
        </div>
      </div>

      <div className="relative group overflow-hidden rounded-2xl shadow-lg">
        <img src="/images/work2.jpg" alt="งานแต่ง" className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110" />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
          <p className="text-white text-lg font-semibold">งานแต่งงาน</p>
        </div>
      </div>

      <div className="relative group overflow-hidden rounded-2xl shadow-lg">
        <img src="/images/work3.jpg" alt="ออฟฟิศ" className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110" />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
          <p className="text-white text-lg font-semibold">ออฟฟิศ</p>
        </div>
      </div>
    </div>
  </div>
</section>
{/* Contact Section */}
<div className="bg-gray-50 py-16 sm:py-24 font-prompt">
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

    <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-2">
      {/* Phone numbers */}
      <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-200">
        <h3 className="text-xl font-semibold text-gray-900">เบอร์โทร</h3>
        <p className="mt-3 text-gray-700">
          📞 086-975-0664 (คุณหมวย) <br />
          📞 096-958-4422 (คุณแม็กซ์)
        </p>
      </div>

      {/* Address */}
      <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-200">
        <h3 className="text-xl font-semibold text-gray-900">ที่อยู่บริษัท</h3>
        <p className="mt-3 text-gray-700">
          448 ถ.นาคนิวาส แขวงลาดพร้าว <br />
          เขตลาดพร้าว กรุงเทพฯ 10230
        </p>
      </div>

      {/* Line Official */}
      <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-200 flex flex-col items-center">
        <h3 className="text-xl font-semibold text-gray-900">Line Official</h3>
        <p className="mt-3 text-gray-700">สแกน QR Code เพื่อแชทกับเรา</p>
        <img
          src="/line-qr.png" // 
          alt="Line QR Code"
          className="mt-4 w-40 h-40 rounded-lg shadow"
        />
      </div>

      {/* Facebook */}
      <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-200 flex flex-col items-center">
        <h3 className="text-xl font-semibold text-gray-900">Facebook Page</h3>
        <p className="mt-3 text-gray-700 text-center">
          ติดตามเราเพื่อรับข้อมูลข่าวสารและโปรโมชั่น
        </p>
        <a
          href="https://www.facebook.com/profile.php?id=61579877480646"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-block rounded-md bg-blue-600 px-5 py-2 text-white font-medium shadow hover:bg-blue-500"
        >
          ไปที่ Facebook
        </a>
      </div>
    </div>

    {/* Call button */}
    <div className="mt-10 flex justify-center">
      <a
        href="tel:0869750664"
        className="rounded-md bg-sky-500 px-6 py-3 text-lg font-semibold text-white shadow-sm hover:bg-sky-400"
      >
        📞 โทรเลย
      </a>
    </div>
  </div>
</div>



      <Footer />
    </>
  );
}

export default Home;
