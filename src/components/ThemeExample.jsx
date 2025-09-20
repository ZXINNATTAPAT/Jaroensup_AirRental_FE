import { useState } from 'react';

const ThemeExample = () => {
  const [activeTab, setActiveTab] = useState('buttons');

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="header-gradient text-white p-8 rounded-lg mb-8">
          <h1 className="text-4xl font-bold text-shadow mb-2">🎨 ธีมใหม่ - สีทอง น้ำเงิน ขาว</h1>
          <p className="text-xl opacity-90">ธีมหรูหราและเป็นมืออาชีพสำหรับเว็บไซต์ของคุณ</p>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex space-x-4 mb-6">
            {[
              { id: 'buttons', label: 'ปุ่ม' },
              { id: 'cards', label: 'การ์ด' },
              { id: 'forms', label: 'ฟอร์ม' },
              { id: 'badges', label: 'ป้าย' },
              { id: 'tables', label: 'ตาราง' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  activeTab === tab.id 
                    ? 'nav-link-active bg-blue-50' 
                    : 'nav-link'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Buttons Section */}
          {activeTab === 'buttons' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gradient-blue mb-4">ปุ่มต่างๆ</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <button className="btn-primary px-6 py-3 rounded-lg font-medium">
                  ปุ่มน้ำเงิน
                </button>
                <button className="btn-secondary px-6 py-3 rounded-lg font-medium">
                  ปุ่มทอง
                </button>
                <button className="btn-outline-primary px-6 py-3 rounded-lg font-medium">
                  ขอบน้ำเงิน
                </button>
                <button className="btn-outline-secondary px-6 py-3 rounded-lg font-medium">
                  ขอบทอง
                </button>
              </div>
              
              {/* ตัวอย่างการใช้สีโดยตรง */}
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-3">ตัวอย่างการใช้สีโดยตรง:</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-blue-500 text-white p-4 rounded-lg text-center">
                    <div className="text-sm">bg-blue-500</div>
                    <div className="text-xs opacity-75">#3b82f6</div>
                  </div>
                  <div className="bg-gold-500 text-white p-4 rounded-lg text-center">
                    <div className="text-sm">bg-gold-500</div>
                    <div className="text-xs opacity-75">#f59e0b</div>
                  </div>
                  <div className="bg-primary-blue-500 text-white p-4 rounded-lg text-center">
                    <div className="text-sm">bg-primary-blue-500</div>
                    <div className="text-xs opacity-75">#3b82f6</div>
                  </div>
                  <div className="bg-white border-2 border-gray-300 p-4 rounded-lg text-center">
                    <div className="text-sm text-gray-700">bg-white</div>
                    <div className="text-xs text-gray-500">#ffffff</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Cards Section */}
          {activeTab === 'cards' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gradient-gold mb-4">การ์ดต่างๆ</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="card-elegant p-6">
                  <h3 className="text-xl font-bold text-blue-600 mb-2">การ์ดธรรมดา</h3>
                  <p className="text-gray-600 mb-4">การ์ดที่มีสไตล์เรียบง่ายและสวยงาม</p>
                  <button className="btn-primary">ดูเพิ่มเติม</button>
                </div>
                <div className="card-gold-accent p-6">
                  <h3 className="text-xl font-bold text-gold-600 mb-2">การ์ดขอบทอง</h3>
                  <p className="text-gray-600 mb-4">การ์ดที่มีขอบสีทองเป็นจุดเด่น</p>
                  <button className="btn-secondary">ดูเพิ่มเติม</button>
                </div>
                <div className="card-blue-accent p-6">
                  <h3 className="text-xl font-bold text-blue-600 mb-2">การ์ดขอบน้ำเงิน</h3>
                  <p className="text-gray-600 mb-4">การ์ดที่มีขอบสีน้ำเงินเป็นจุดเด่น</p>
                  <button className="btn-primary">ดูเพิ่มเติม</button>
                </div>
              </div>
            </div>
          )}

          {/* Forms Section */}
          {activeTab === 'forms' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gradient-blue mb-4">ฟอร์มต่างๆ</h2>
              <div className="max-w-md">
                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      ชื่อ
                    </label>
                    <input 
                      type="text" 
                      className="input-elegant w-full px-3 py-2 border rounded-lg"
                      placeholder="กรอกชื่อของคุณ"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      อีเมล
                    </label>
                    <input 
                      type="email" 
                      className="input-elegant w-full px-3 py-2 border rounded-lg"
                      placeholder="กรอกอีเมลของคุณ"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      ข้อความ
                    </label>
                    <textarea 
                      className="input-elegant w-full px-3 py-2 border rounded-lg h-24"
                      placeholder="กรอกข้อความของคุณ"
                    ></textarea>
                  </div>
                  <div className="flex space-x-3">
                    <button type="submit" className="btn-primary px-6 py-2">
                      ส่งข้อมูล
                    </button>
                    <button type="button" className="btn-outline-secondary px-6 py-2">
                      ยกเลิก
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Badges Section */}
          {activeTab === 'badges' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gradient-gold mb-4">ป้ายต่างๆ</h2>
              <div className="flex flex-wrap gap-4">
                <span className="badge-gold px-3 py-1 rounded-full text-sm font-medium">
                  ป้ายทอง
                </span>
                <span className="badge-blue px-3 py-1 rounded-full text-sm font-medium">
                  ป้ายน้ำเงิน
                </span>
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                  สำเร็จ
                </span>
                <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
                  ผิดพลาด
                </span>
                <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
                  เตือน
                </span>
              </div>
            </div>
          )}

          {/* Tables Section */}
          {activeTab === 'tables' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gradient-blue mb-4">ตารางต่างๆ</h2>
              <div className="table-elegant">
                <table className="w-full">
                  <thead>
                    <tr>
                      <th className="px-4 py-3 text-left">ชื่อ</th>
                      <th className="px-4 py-3 text-left">ตำแหน่ง</th>
                      <th className="px-4 py-3 text-left">สถานะ</th>
                      <th className="px-4 py-3 text-left">การดำเนินการ</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="px-4 py-3">สมชาย ใจดี</td>
                      <td className="px-4 py-3">ผู้จัดการ</td>
                      <td className="px-4 py-3">
                        <span className="badge-gold">ใช้งาน</span>
                      </td>
                      <td className="px-4 py-3">
                        <button className="btn-outline-primary text-sm px-3 py-1">
                          แก้ไข
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3">สมหญิง รักงาน</td>
                      <td className="px-4 py-3">นักพัฒนา</td>
                      <td className="px-4 py-3">
                        <span className="badge-blue">รอการอนุมัติ</span>
                      </td>
                      <td className="px-4 py-3">
                        <button className="btn-outline-secondary text-sm px-3 py-1">
                          อนุมัติ
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="footer-gradient text-white p-8 rounded-lg">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-2">ธีมใหม่พร้อมใช้งานแล้ว!</h3>
            <p className="opacity-90 mb-4">
              ใช้สีทอง น้ำเงิน และขาวเพื่อสร้างเว็บไซต์ที่หรูหราและเป็นมืออาชีพ
            </p>
            <div className="flex justify-center space-x-4">
              <button className="bg-white text-blue-600 px-6 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors">
                เริ่มใช้งาน
              </button>
              <button className="border border-white text-white px-6 py-2 rounded-lg font-medium hover:bg-white hover:text-blue-600 transition-colors">
                ดูเอกสาร
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThemeExample;
