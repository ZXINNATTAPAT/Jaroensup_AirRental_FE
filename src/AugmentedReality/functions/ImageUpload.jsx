import React, { useState, useEffect } from "react";
import axios from "axios";

const ImageUpload = () => {
  const [areaCalculations, setAreaCalculations] = useState([]);
  const [selectedAreaId, setSelectedAreaId] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [uploading, setUploading] = useState(false);
  useEffect(() => {
    const fetchAreaCalculations = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/area_cals`);
        setAreaCalculations(response.data);
      } catch (error) {
        console.error("Error fetching area calculations:", error);
      }
    };

    fetchAreaCalculations();
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };
  const handleUpload = async () => {
    if (!selectedAreaId) {
      alert("กรุณาเลือกพื้นที่ก่อน!");
      return;
    }
    if (!selectedImage) {
      alert("กรุณาเลือกภาพก่อน!");
      return;
    }
    setUploading(true);
    const formData = new FormData();
    formData.append("image", selectedImage);
    formData.append("area_calculation_id", selectedAreaId);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/area_images`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      alert("อัปโหลดสำเร็จ! ภาพถูกอัปโหลดเรียบร้อย");
      console.log("Uploaded Image:", response.data);
      setSelectedImage(null);
      setPreviewUrl(null);
      setSelectedAreaId("");
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("เกิดข้อผิดพลาด! ไม่สามารถอัปโหลดรูปได้");
    } finally {
      setUploading(false);
    }
  };
  return (
    <div className="p-4 bg-white shadow-md rounded-md font-prompt">
      <h2 className="text-lg font-bold mb-3">อัปโหลดรูปภาพพื้นที่</h2>

      {/* 📌 Dropdown เลือกพื้นที่ */}
      <label className="block text-sm font-medium mb-1">เลือกพื้นที่:</label>
      <select
        className="select select-bordered w-full mb-3"
        value={selectedAreaId}
        onChange={(e) => setSelectedAreaId(e.target.value)}
      >
        <option value="">-- เลือกพื้นที่ --</option>
        {areaCalculations.map((area) => (
          <option key={area.calculation_id} value={area.calculation_id}>
            {area.calculation_id}. {area.location_name}
          </option>
        ))}
      </select>

      {/* 📌 เลือกไฟล์ */}
      <input type="file" accept="image/*" onChange={handleFileChange} className="mb-3" />

      {/* 📌 แสดงรูปตัวอย่างก่อนอัปโหลด */}
      {previewUrl && (
        <div className="mb-3">
          <img src={previewUrl} alt="Preview" className="w-full h-auto rounded-md shadow-md" />
        </div>
      )}

      {/* 📌 ปุ่มอัปโหลด */}
      <button
        onClick={handleUpload}
        className="btn bg-blue text-white hover:bg-blue"
        disabled={uploading}
      >
        {uploading ? "กำลังอัปโหลด..." : "อัปโหลดรูป"}
      </button>
    </div>
  );
};

export default ImageUpload;
