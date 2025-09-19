import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Loading from "../../components/Loading";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import BackButtonEdit from "../../components/BackButtonEdit";

// 🔥 แปลภาษา
const translations = {
  th: {
    taskDetails: "รายละเอียดงาน",
    taskId: "หมายเลขงาน",
    description: "รายละเอียด",
    status: "สถานะงาน",
    startDate: "วันเริ่ม",
    endDate: "วันเสร็จสิ้น",
    location: "ตำแหน่งที่ตั้ง",
    quantityUsed: "จำนวนแอร์ที่ใช้",
    orderedBy: "ชื่อผู้สั่งงาน",
    noTask: "ไม่พบรายการงาน",
    type_name: "ประเภทงาน",
    images: "รูปภาพ",
    phone: "เบอร์ติดต่อ",
    price: "ราคารวม",
    organization_name: "ชื่อองค์กร",
    technicians: "ช่างที่รับผิดชอบ", 
    techId: "รหัสช่าง", 
    techName: "ชื่อช่าง", 
  },
  en: {
    taskDetails: "Task Details",
    taskId: "Task ID",
    description: "Description",
    status: "Task Status",
    startDate: "Start Date",
    endDate: "End Date",
    location: "Location",
    quantityUsed: "Air Conditioners Used",
    orderedBy: "Ordered By",
    noTask: "No task found.",
    type_name: "Task Type",
    images: "Images",
    phone: "Phone",
    price: "Price",
    organization_name: "Organization Name",
    technicians: "Technicians", 
    techId: "Technician ID", 
    techName: "Technician Name", 
  },
};

const TaskDetails = () => {
  const { taskId } = useParams();
  const [task, setTask] = useState(null);
  const [images, setImages] = useState([]); // To store images
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null); // To store the selected image for popup
  const apiUrl = import.meta.env.VITE_SERVER_URL;

  const [language, setLanguage] = useState(
    localStorage.getItem("language") || "th"
  );
  const MySwal = withReactContent(Swal);

  const showImagePopup = (imageUrl) => {
    MySwal.fire({
      imageUrl: imageUrl,
      imageAlt: "Task Image",
      showCloseButton: true,
      showConfirmButton: false,
      customClass: {
        popup: "rounded-lg shadow-lg",
      },
    });
  };

  useEffect(() => {
    const handleStorageChange = () => {
      setLanguage(localStorage.getItem("language") || "th");
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  // Fetch task details and images
  useEffect(() => {
    fetchTaskDetails();
    fetchTaskImages();
  }, [taskId]);

  // Fetch task details including rentals
  const fetchTaskDetails = async () => {
    try {
      // Fetch task details
      const response = await axios.get(`${apiUrl}/task/${taskId}`);
      let taskData = response.data;

      // Fetch rentals data
      const rentalResponse = await axios.get(`${apiUrl}/rentals`);
      const rentalData = rentalResponse.data.rentalData;

      if (Array.isArray(rentalData)) {
        // รวม rentals เข้าไปใน taskData โดย task_id ต้องตรงกัน
        taskData = {
          ...taskData,
          rentalDetails: rentalData.filter(
            (rental) => rental.task_id === taskData.task_id
          ),
        };
      } else {
        console.error("Rental data is not in expected format:", rentalData);
      }

      // Set updated task data
      setTask(taskData);
      console.log(taskData);
    } catch (error) {
      console.error("Error fetching task details:", error);
      setError("Failed to load task details.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch task images
  const fetchTaskImages = async () => {
    try {
      const response = await axios.get(`${apiUrl}/task_images/${taskId}`);
      setImages(response.data);
    } catch (error) {
      console.error("Error fetching task images:", error);
      setError("Failed to load task images.");
    }
  };

  // Close the modal
  const closeModal = () => {
    setSelectedImage(null);
  };

  if (loading) return <Loading />;
  if (error) return <p>{error}</p>;
  if (!task) return <p>{translations[language].noTask}</p>;

  return (
    <>
      <Navbar />
      <div className="container mx-2 my-10 font-prompt md:mx-auto">
        <div className="p-8 rounded-lg shadow-lg w-full mx-auto font-prompt h-full">
          <div className="flex justify-between">
            <div className="flex w-full my-2">
              <BackButtonEdit />
              <h1 className="text-2xl font-semibold mx-2">
                {translations[language].taskDetails}: {task.title}
              </h1>
            </div>
            <Link to={`/task/edit-img/${taskId}`}>
              <button className="btn bg-blue hover:bg-blue text-white">
                แก้ไขรูปภาพ
              </button>
            </Link>
          </div>
          <div className="mb-4">
            {task.task_id && (
              <p>
                <strong>{translations[language].taskId}:</strong> {task.task_id}
              </p>
            )}
            {task.organization_name && (
              <p>
                <strong>{translations[language].organization_name}:</strong>{" "}
                {task.organization_name}
              </p>
            )}
            {task.user_id && (
              <p>
                <strong>{translations[language].orderedBy}:</strong>{" "}
                {task.user_firstname} {task.user_lastname}  

              </p>
            )}
            {task.phone && (
              <p>
                <strong>{translations[language].phone}:</strong> {task.phone}
              </p>
            )}
            {task.description && (
              <p>
                <strong>{translations[language].description}:</strong>{" "}
                {task.description}
              </p>
            )}
            {task.type_name && (
              <p>
                <strong>{translations[language].type_name}:</strong>{" "}
                {task.type_name}
              </p>
            )}
            {task.status_id && (
            <p>
              <strong>{translations[language].status}:</strong>{" "}
              <span
                className={`px-2 py-1 rounded ${
                  task.status_name === "pending"
                    ? "bg-yellow-100 text-yellow-800"
                    : task.status_name === "active"
                      ? "bg-red-100 text-red-800"
                      : task.status_name === "approve"
                        ? "bg-green-100 text-green-800"
                        : task.status_name === "hiring"
                          ? "bg-gray-100 text-gray-800"
                          : "bg-gray-200 text-gray-600"
                }`}
              >
                {task.status_name}
              </span>
            </p>
          )}
            {task.appointment_date && (
              <p>
                <strong>{translations[language].startDate}:</strong>{" "}
                {new Date(task.appointment_date).toLocaleString()}
              </p>
            )}
            {task.rental_end_date && (
              <p>
                <strong>{translations[language].endDate}:</strong>{" "}
                {new Date(task.rental_end_date).toLocaleDateString()}
              </p>
            )}
            {task.address && (
              <p>
                <strong>{translations[language].location}:</strong>{" "}
                {task.address}
              </p>
            )}
            {task.total !== 0 && task.total !== null && (
              <p>
                <strong>{translations[language].price}:</strong> {task.total}
              </p>
            )}
          </div>

          {task.technicians && task.technicians.length > 0 && (
          <div className="mt-8">
            <h3 className="text-lg mb-4 font-semibold">{translations[language].technicians}</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg mb-4">
                <thead>
                  <tr className="bg-gray-200 text-gray-700 uppercase text-sm leading-normal">
                    <th className="py-3 px-6 text-left">{translations[language].techId}</th>
                    <th className="py-3 px-6 text-left">{translations[language].techName}</th>
                  </tr>
                </thead>
                <tbody>
                  {task.technicians.map((technician, index) => (
                    <tr
                      key={index}
                      className="border-b border-gray-200 hover:bg-gray-100"
                    >
                      <td className="py-3 px-6 text-center">{technician.tech_id}</td>
                      <td className="py-3 px-6">
                        {technician.firstname} {technician.lastname}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        
          {/* Rental Details Table */}
          {task.rentalDetails && task.rentalDetails.length > 1 && (
            <div className="mt-8">
              <h3 className="text-lg mb-4 font-semibold">รายละเอียดการเช่า</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg mb-4">
                  <thead>
                    <tr className="bg-gray-200 text-gray-700 uppercase text-sm leading-normal">
                      <th className="py-3 px-6 text-left">รหัสสินค้า</th>
                      <th className="py-3 px-6 text-left">ชื่ออุปกรณ์</th>
                      <th className="py-3 px-6 text-left">จำนวน</th>              
                    </tr>
                  </thead>
                  <tbody>
                    {task.rentalDetails.map((rental, index) => {
                      // ตรวจสอบเงื่อนไข: ถ้า product_name เป็น "Unknown Product" และ total_quantity_used เป็น 0 หรือ 1 ให้ข้ามการแสดงผล
                      if (
                        rental.product_name === "Unknown Product" &&
                        (rental.total_quantity_used === 0 ||
                          rental.total_quantity_used === 1)
                      ) {
                        return null; // ไม่แสดงแถวนี้
                      }

                      return (
                        <tr
                          key={index}
                          className="border-b border-gray-200 hover:bg-gray-100"
                        >
                          <td className="py-3 px-6 text-center">
                            {rental.product_id}
                          </td>
                          <td className="py-3 px-6">
                            {rental.product_name || "-"}
                          </td>
                          <td className="py-3 px-6">
                            {rental.total_quantity_used}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {task.latitude && task.longitude && (
            <MapContainer
              center={[task.latitude, task.longitude]}
              zoom={13}
              style={{ height: "400px", width: "100%" }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <Marker position={[task.latitude, task.longitude]}>
                <Popup>{task.description}</Popup>
              </Marker>
            </MapContainer>
          )}

          {images.length > 0 && (
            <div className="mt-8">
              <h3 className="text-lg mb-6 font-semibold">
                {translations[language].images}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {images.map((image) => (
                  <div
                    key={image.image_id}
                    className="relative group overflow-hidden rounded-lg shadow-xl cursor-pointer"
                    onClick={() => showImagePopup(image.image_url)}
                  >
                    <img
                      src={image.image_url}
                      alt={`task image ${image.image_id}`}
                      className="w-full h-64 object-cover transform transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 flex justify-center items-center">
                      <span className="text-white text-xl font-semibold">
                        {translations[language].images}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default TaskDetails;