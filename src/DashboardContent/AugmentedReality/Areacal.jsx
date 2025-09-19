import React, { useState } from "react";
import { useEffect } from "react";
import "./Areacal.css";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useRef } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import { jwtDecode } from "jwt-decode";
const Areacal = () => {
  const [width, setWidth] = useState(0);
  const [length, setLength] = useState(0);
  const [roomType, setRoomType] = useState(1);
  const [airInventory, setAirInventory] = useState({
    air5ton: 0,
    air10ton: 0,
    air20ton: 0,
  });
  const [btuResult, setBtuResult] = useState("");
  const [acCountResult, setAcCountResult] = useState("");
  const [acUsageResult, setAcUsageResult] = useState("");
  const [acSelections, setAcSelections] = useState([]);
  const [hasQuickPlacedAC, setHasQuickPlacedAC] = useState(false);
  const [isEraserMode, setIsEraserMode] = useState(false);
  const [assignments, setAssignments] = useState([]); // รายการ Assignment
  const [selectedAssignment, setSelectedAssignment] = useState(null); // Assignment ที่เลือก
  const [locationName, setLocationName] = useState("");
  const [AirConditionerNeeded, setAirConditionerNeeded] = useState(0);
  const [acPlacements, setAcPlacements] = useState([]);
  const [isReadyToDrag, setIsReadyToDrag] = useState(false);
  const [roomTypes, setRoomTypes] = useState([]);
  const [areaCalList, setAreaCalList] = useState([]);
  const [selectedAreaCal, setSelectedAreaCal] = useState(null);
  const [currentLanguage, setCurrentLanguage] = useState(
    localStorage.getItem("language") || "en"
  );
  const [scale, setScale] = useState(1); // ค่าเริ่มต้นของการซูม
  const containerRef = useRef(null);
  const cookies = new Cookies();
  const token = cookies.get("authToken");
  const decodedToken = jwtDecode(token);
  const user_id = decodedToken.id;
  const [isMobile, setIsMobile] = useState(false);
  const translations = {
    en: {
      title: "Area Calculations",
      arFeature: "Use AR Feature",
      selectPlace: "Select Place and Load Saved Data",
      fetchACData: "Fetch Existing AC Data",
      viewAreaList: "View All Area List",
      air5ton: "5 Ton AC Available:",
      air10ton: "10 Ton AC Available:",
      air20ton: "20 Ton AC Available:",
      width: "Width (m):",
      length: "Length (m):",
      roomType: "Room Type:",
      selectACType: "Select AC Type:",
      addAC: "Add AC",
      clearGrid: "Clear Grid",
      quickPlaceAC: "Quickly Place AC",
      save: "Save new area",
      ACDataLabel: "Existing AC Data",
      eraser: "Eraser",
      drag: "Open Drag function",
      largeRoomWarning: "The room is too large!",
      roomSizeWarning:
        "Please specify a room size smaller than 10000 square meters.",
      successMessage: "Success!",
      acInventorySuccess: "AC inventory loaded successfully.",
      acInventoryError: "Unable to load AC inventory.",
      selectAssignmentTitle:
        "Please select the assignment you want to save data for.",
      locationPlaceholder: "Enter location name",
      saveButtonText: "Save",
      errorMessage: "Error!",
      acUsageMessage: "AC usage message",
      btuRequiredMessage: "Required BTU:",
      acCountMessage: "Total BTU from AC:",
      btuDifferenceMessage: "BTU is enough now",
      applyButtonMessage: "Apply",
      saveRepeat: "Save exist area",
    },
    th: {
      title: "การคำนวณพื้นที่",
      arFeature: "ใช้ฟีเจอร์ AR",
      selectPlace: "เลือกสถานที่และโหลดข้อมูลที่บันทึกไว้",
      fetchACData: "ดึงข้อมูลจำนวนแอร์ที่มีอยู่",
      viewAreaList: "ดูรายการพื้นที่ทั้งหมด",
      air5ton: "แอร์ 5 ตันมีอยู่:",
      air10ton: "แอร์ 10 ตันมีอยู่:",
      air20ton: "แอร์ 20 ตันมีอยู่:",
      width: "ความกว้าง (ม.):",
      length: "ความยาว (ม.):",
      roomType: "ประเภทห้อง:",
      selectACType: "เลือกชนิดแอร์:",
      addAC: "เพิ่มแอร์",
      clearGrid: "ล้างกริด",
      quickPlaceAC: "วางแอร์อย่างรวดเร็ว",
      save: "สร้างพื้นที่ใหม่",
      ACDataLabel: "จำนวนแอร์ที่มีอยู่",
      eraser: "ยางลบ",
      drag: "เปิดใช้งานการคลิกค้าง",
      largeRoomWarning: "ขนาดห้องใหญ่เกินไป!",
      roomSizeWarning: "กรุณากำหนดขนาดห้องที่เล็กลง (ไม่เกิน 10000 ตารางเมตร)",
      successMessage: "สำเร็จ!",
      acInventorySuccess: "โหลดข้อมูลแอร์สำเร็จ",
      acInventoryError: "ไม่สามารถโหลดข้อมูลแอร์ได้",
      selectAssignmentTitle: "กรุณาเลือกการนัดหมายที่ต้องการบันทึกข้อมูล",
      locationPlaceholder: "ใส่ชื่อสถานที่",
      saveButtonText: "บันทึก",
      errorMessage: "ข้อผิดพลาด!",
      acUsageMessage: "ข้อความการใช้งานแอร์",
      btuRequiredMessage: "BTU ที่ต้องการ:",
      acCountMessage: "BTU รวมจากแอร์:",
      btuDifferenceMessage: "BTU เพียงพอแล้ว",
      applyButtonMessage: "ต้องการใช้ค่านี้",
      saveRepeat: "บันทึกจากพื้นที่เดิม",
    },
  };
  const [selectedBox, setSelectedBox] = useState(null); // เปลี่ยนจาก originalBox เป็น selectedBox
  const navigate = useNavigate();
  const [airCount, setAirCount] = useState(1);
  let acCount = 1; // ตัวแปรที่เก็บจำนวนแอร์ที่เพิ่มเข้ามาแล้ว
  const [isDragging, setIsDragging] = useState(false);
  const [isDraggingMode, setIsDraggingMode] = useState(false);
  let isDraggingV1 = false;
  let isDraggingModeV1 = false;
  let originalBoxV1 = null;
  let assignmentId = null;

  useEffect(() => {
    const fetchAreaCalData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/area_cals`
        );
        setAreaCalList(response.data); // สมมติ API ส่งข้อมูลเป็น array
      } catch (error) {
        console.error("Error fetching area calculation data:", error);
        Swal.fire("Error", "Failed to fetch area calculation data", "error");
      }
    };

    fetchAreaCalData();
  }, []);

  useEffect(() => {
    const checkMobile = () => {
      // ตรวจสอบเฉพาะ Mobile จริงๆ ไม่รวม iPad
      const isMobileDevice =
        /Mobi|Android|iPhone/i.test(navigator.userAgent) &&
        !/iPad/i.test(navigator.userAgent);
      setIsMobile(isMobileDevice);
    };

    // เรียกครั้งแรกเมื่อโหลด
    checkMobile();

    // อัปเดตเมื่อหน้าจอเปลี่ยนขนาด (ยังคงไว้เพื่อความสมบูรณ์ แต่ไม่ใช้ innerWidth)
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const toolboxItems = document.querySelectorAll(".toolbox .box");
    const grid = document.getElementById("grid");

    // เพิ่ม event listener สำหรับเลือกกล่องใน toolbox
    toolboxItems.forEach((item) => {
      item.removeEventListener("click", selectBox); // ลบก่อนเพื่อป้องกันซ้ำ
      if (isDraggingMode) {
        item.addEventListener("click", selectBox);
      }
    });

    // เพิ่ม event listener สำหรับการลากใน grid
    if (isDraggingMode && selectedBox) {
      grid.removeEventListener("mousedown", startDragCopy);
      grid.removeEventListener("mousemove", dragCopy);
      grid.removeEventListener("mouseup", stopDragCopy);
      grid.addEventListener("mousedown", startDragCopy);
      grid.addEventListener("mousemove", dragCopy);
      grid.addEventListener("mouseup", stopDragCopy);
    }

    return () => {
      toolboxItems.forEach((item) => {
        item.removeEventListener("click", selectBox);
      });
      grid.removeEventListener("mousedown", startDragCopy);
      grid.removeEventListener("mousemove", dragCopy);
      grid.removeEventListener("mouseup", stopDragCopy);
    };
  }, [isDraggingMode, selectedBox, isDragging]);

  useEffect(() => {
    const storedLanguage = localStorage.getItem("language") || "en";
    setCurrentLanguage(storedLanguage);
  }, [localStorage.getItem("language")]);

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        // Fetch assignments
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/appointments`
        );

        // Remove duplicates based on task_id
        const uniqueAssignments = response.data.reduce((acc, current) => {
          const existing = acc.find((item) => item.task_id === current.task_id);
          if (!existing) {
            acc.push(current);
          }
          return acc;
        }, []);

        // Filter out assignments that are already in area_cal
        const usedAssignmentIds = areaCalList.map((area) => area.assignment_id);
        const filteredAssignments = uniqueAssignments.filter(
          (assignment) => !usedAssignmentIds.includes(assignment.assignment_id)
        );

        console.log("Filtered Assignments (Second Hook):", filteredAssignments);
        setAssignments(filteredAssignments);
      } catch (error) {
        console.error("Error fetching assignments:", error);
      }
    };

    fetchAssignments();
  }, [areaCalList]); // Depend on areaCalList

  useEffect(() => {
    // 📌 ดึงข้อมูลประเภทห้องจาก API
    const fetchRoomTypes = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/area-types`
        );

        // ✅ อัปเดต state ให้มี btu_required ด้วย
        setRoomTypes(
          response.data.map((room) => ({
            id: room.id,
            name: room.room_name,
            btuRequired: room.btu_required,
          }))
        );
      } catch (error) {
        console.error("Error fetching room types:", error);
      }
    };

    fetchRoomTypes();
  }, []);

  useEffect(() => {
    const toolboxItems = document.querySelectorAll(".toolbox .box"); // ดึง box ทั้งหมดใน toolbox

    toolboxItems.forEach((item) => {
      item.addEventListener("mousedown", () => {
        if (item.classList.contains("selected")) {
          // ถ้า box นี้ถูกเลือกอยู่แล้ว ให้ลบคลาส 'selected'
          item.classList.remove("selected");
          console.log(`ยกเลิกการเลือก ${item.textContent} ใน toolbox`);
        } else {
          // ลบคลาส 'selected' จากทุก box ก่อน
          toolboxItems.forEach((box) => box.classList.remove("selected"));

          // เพิ่มคลาส 'selected' ให้กับ box ที่ถูกกด
          item.classList.add("selected");
          console.log(`เลือก ${item.textContent} ใน toolbox`);
        }
      });
    });
  });

  useEffect(() => {
    // Monitor input changes for air-input class
    document.querySelectorAll(".air-input").forEach((input) => {
      input.addEventListener("input", (event) => {
        const id = event.target.id;
        const value = parseInt(event.target.value, 10) || 0;
        console.log(`${id} updated to: ${value}`);
      });
    });
    // Drag-and-drop event listeners
    const acBox = document.getElementById("acBox");
    const obsBox = document.getElementById("obsBox");
    const obs2Box = document.getElementById("obs2Box");
    const onetonBox = document.getElementById("onetonBox");
    const fivetonBox = document.getElementById("fivetonBox");
    const tentonBox = document.getElementById("tentonBox");
    const twentytonBox = document.getElementById("twentytonBox");

    const setupDragEvent = (box, boxId) => {
      if (box) {
        box.addEventListener("dragstart", (e) => {
          e.dataTransfer.setData("boxId", boxId);
        });
      }
    };

    setupDragEvent(acBox, "newBox");
    setupDragEvent(obsBox, "newObstacle");
    setupDragEvent(obs2Box, "newObstacle2");
    setupDragEvent(onetonBox, "newOnetonBox");
    setupDragEvent(fivetonBox, "newFivetonBox");
    setupDragEvent(tentonBox, "newTentonBox");
    setupDragEvent(twentytonBox, "newTwentytonBox");
    // Cleanup event listeners on component unmount
    return () => {
      document.querySelectorAll(".air-input").forEach((input) => {
        input.removeEventListener("input", () => {});
      });

      const removeDragEvent = (box) => {
        if (box) {
          box.removeEventListener("dragstart", () => {});
        }
      };

      removeDragEvent(acBox);
      removeDragEvent(obsBox);
      removeDragEvent(obs2Box);
      removeDragEvent(onetonBox);
      removeDragEvent(fivetonBox);
      removeDragEvent(tentonBox);
      removeDragEvent(twentytonBox);
    };
  }, []);

  useEffect(() => {
    if (width > 0 && length > 0) {
      if (width * length > 10000) {
        Swal.fire({
          title: "ขนาดห้องใหญ่เกินไป!",
          text: "กรุณากำหนดขนาดห้องที่เล็กลง (ไม่เกิน 10000 ตารางเมตร)",
          icon: "warning",
          confirmButtonText: "ตกลง",
        });
        return; // ⛔ หยุดทำงาน ไม่สร้าง Grid
      }

      createGrid(); // ✅ สร้าง Grid ถ้าขนาดไม่เกิน 1000
    }
  }, [width, length]); // ✅ เรียกเมื่อ width หรือ length เปลี่ยน

  useEffect(() => {
    calculateBTUWithMinAC();
  }, [width, length, roomType, airInventory]);

  const handleRoomTypeChange = (e) => {
    const selectedRoomId = e.target.value;
    setRoomType(selectedRoomId);

    // ✅ ค้นหาค่าจาก roomTypes
    const selectedRoom = roomTypes.find(
      (room) => room.id === parseInt(selectedRoomId, 10)
    );
    if (selectedRoom) {
      setBtuResult(selectedRoom.btuRequired);
    }
  };

  const handleZoom = (e) => {
    e.preventDefault(); // ป้องกันการเลื่อนเพจ
    let newScale = scale + e.deltaY * -0.001; // ควบคุมระดับการซูม
    newScale = Math.min(Math.max(newScale, 0.5), 3); // จำกัดการซูมระหว่าง 0.5x ถึง 3x
    setScale(newScale);
  };

  const fetchACInventory = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/products/ac-count`
      );
      const { air_5_ton, air_10_ton, air_20_ton } = response.data;

      setAirInventory({
        air5ton: air_5_ton || 0,
        air10ton: air_10_ton || 0,
        air20ton: air_20_ton || 0,
      });

      Swal.fire(
        translations[currentLanguage].successMessage,
        translations[currentLanguage].acInventorySuccess,
        "success"
      );
    } catch (error) {
      console.error("Error fetching AC inventory:", error);
      Swal.fire(
        translations[currentLanguage].errorMessage,
        translations[currentLanguage].acInventoryError,
        "error"
      );
    }
  };

  const handleSelectAssignment = async () => {
    const { value: formValues } = await Swal.fire({
      title: translations[currentLanguage].selectAssignmentTitle,
      html:
        assignments.length > 0
          ? `
          <select id="assignment-select" class="input-air">
            ${assignments
              .map(
                (assignment) => `
                  <option value="${assignment.assignment_id}">
                    ${assignment.assignment_id} - ${assignment.description}
                  </option>`
              )
              .join("")}
          </select>
          <br/>
        `
          : "<p style='color: red;'>❌ ไม่มีข้อมูลการมอบหมาย</p>",
      input: "text",
      inputPlaceholder: "ใส่ชื่อสถานที่ (Location Name)",
      showCancelButton: true,
      confirmButtonText: "ตกลง",
      preConfirm: () => {
        const locationName = Swal.getInput().value.trim();

        if (!locationName) {
          Swal.showValidationMessage("กรุณากรอกชื่อสถานที่!");
          return false;
        }

        if (assignments.length === 0) {
          return { locationName };
        }

        const selectedId = document.getElementById("assignment-select").value;
        const selected = assignments.find(
          (a) => a.assignment_id.toString() === selectedId
        );

        return { ...selected, locationName };
      },
    });

    if (formValues) {
      setSelectedAssignment(formValues.assignment_id);
      setLocationName(formValues.locationName);
      // ส่งค่าไปบันทึก โดยใช้ค่า assignment_id ที่ถูกต้อง
      handleSaveData(formValues.assignment_id, formValues.locationName);
    }
  };

  const handleSaveData = async (id, location) => {
    if (!id) {
      Swal.fire(
        translation[currentLanguage].errorMessage,
        "กรุณาเลือก Assignment ก่อนบันทึกข้อมูล",
        "error"
      );

      return;
    }

    // Get AC usage values
    const acUsage = updateACUsageInGrid();
    const data = {
      assignment_id: id,
      location_name: location,
      width: parseFloat(width),
      height: parseFloat(length),
      air_conditioners_needed: parseInt(AirConditionerNeeded) || 0,
      room_type_id: roomType,
      air_5ton_used: acUsage.air_5ton_used,
      air_10ton_used: acUsage.air_10ton_used,
      air_20ton_used: acUsage.air_20ton_used,
      grid_pattern: acPlacements, // ส่งข้อมูลตำแหน่ง AC
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/area_cal`,
        data
      );
      await axios.post(`${import.meta.env.VITE_SERVER_URL}/adminLog`, {
        admin_id: user_id, // กำหนด admin_id ของผู้ดูแลระบบ
        action: `เพิ่มพื้นที่ใหม่โดยคำนวณพื้นที่(ชื่อสถานที่): ${data.location_name}`, // บันทึกชื่อสินค้า
      });
      Swal.fire(
        translations[currentLanguage].successMessage,
        "บันทึกข้อมูลเรียบร้อย",
        "success"
      );
    } catch (error) {
      console.error("Error saving data:", error);
      Swal.fire(
        translations[currentLanguage].errorMessage,
        "ไม่สามารถบันทึกข้อมูลได้",
        "error"
      );
    }
  };

  const handleDraggingMode = (event) => {
    const checked = event.target.checked;
    setIsDraggingMode(checked);
    if (checked) {
      enableDragCopyMode();
      console.log("เปิดโหมดลากค้างและคัดลอก");
    } else {
      disableDragCopyMode();
      console.log("ปิดโหมดลากค้างและคัดลอก");
    }
  };

  function handleEraserButton() {
    setIsEraserMode(!isEraserMode);
    if (!isEraserMode) {
      eraserButton.classList.add("active");
      document.body.style.cursor = "crosshair"; // เปลี่ยน cursor เป็นรูปยางลบ
      console.log("เปิดโหมดยางลบ");
    } else {
      eraserButton.classList.remove("active");
      document.body.style.cursor = "default"; // เปลี่ยน cursor กลับเป็นปกติ
      console.log("ปิดโหมดยางลบ");
    }
  }

  function handleEraserGrid() {
    if (isEraserMode) {
      const targetBox = event.target.closest(".box");

      if (targetBox) {
        const parentCell = targetBox.parentElement;
        // console.log(parentCell)
        // ลบ boxElement
        targetBox.remove();

        console.log("ลบ box:", targetBox.id);

        // เรียกใช้ฟังก์ชันลบ cooling effect
        removeCoolingEffect(targetBox);

        // อัปเดตจำนวนแอร์ในกริด
        calculateBTU();

        // ล็อกการลบสำเร็จ
        console.log(`ลบ ${targetBox.id} ออกจาก cell:`, parentCell);
      }
    }
  }

  function calculateBTUWithMinAC() {
    const width = parseInt(document.getElementById("width").value, 10);
    const length = parseInt(document.getElementById("length").value, 10);
    const selectedRoom = roomTypes.find(
      (room) => room.id === parseInt(roomType, 10)
    );
    const btuRequiredPerSqM = selectedRoom ? selectedRoom.btuRequired : 750; // ใช้ค่า default ถ้าไม่พบ
    if (!width || !length) {
      document.getElementById("btu-result").textContent =
        "กรุณากรอกข้อมูลให้ครบถ้วน";
      return;
    }
    setWidth(width);
    setLength(length);
    const roomArea = width * length;
    const requiredBTU = roomArea * btuRequiredPerSqM;
    const airOptions = [
      {
        size: 240000,
        count: parseInt(document.getElementById("air-20ton").value, 10) || 0,
      },
      {
        size: 120000,
        count: parseInt(document.getElementById("air-10ton").value, 10) || 0,
      },
      {
        size: 60000,
        count: parseInt(document.getElementById("air-5ton").value, 10) || 0,
      },
    ];
    airOptions.sort((a, b) => b.size - a.size);
    let remainingBTU = requiredBTU;
    let result = [];
    let totalBTU = 0;
    for (let option of airOptions) {
      if (remainingBTU <= 0) break;
      const useCount = Math.min(
        option.count,
        Math.ceil(remainingBTU / option.size)
      );
      if (useCount > 0) {
        result.push({ size: option.size, count: useCount });
        remainingBTU -= useCount * option.size;
        totalBTU += useCount * option.size;
      }
    }
    const btuDifferenceMessage =
      remainingBTU > 0 ? `ยังขาด BTU อีก: ${remainingBTU}` : `BTU เพียงพอแล้ว`;
    document.getElementById("btu-result").textContent =
      `BTU ที่ต้องการ: ${requiredBTU}`;
    document.getElementById("ac-count-result").textContent =
      `BTU รวมจากแอร์: ${totalBTU}, ${btuDifferenceMessage}`;
    const usageResult = document.getElementById("ac-usage-result");
    usageResult.innerHTML = "";
    result.forEach(({ size, count }) => {
      const sizeInTons = size / 12000;
      usageResult.innerHTML += `<div>แอร์ขนาด ${sizeInTons} ตัน: ${count} ตัว</div>`;
    });
    addApplyButton(result);
  }

  function addApplyButton(result) {
    // ตรวจสอบว่าปุ่มมีอยู่แล้วหรือยัง
    if (document.getElementById("applyButton")) return;

    const buttonContainer = document.createElement("div");
    const applyButton = document.createElement("button");
    applyButton.id = "applyButton";
    if (currentLanguage === "en") {
      applyButton.textContent = "Use this values";
    } else {
      applyButton.textContent = "ต้องการใช้ค่านี้";
    }
    applyButton.classList.add("b-air");
    applyButton.addEventListener("click", () => applyResultToDropdown(result));

    buttonContainer.appendChild(applyButton);
    document.getElementById("ac-usage-result").appendChild(buttonContainer);
  }

  function applyResultToDropdown(result) {
    const acContainer = document.getElementById("ac-container");
    acContainer.innerHTML = ""; // ล้างค่าเดิมในฟอร์ม

    result.forEach(({ size, count }) => {
      // สร้าง dropdown และ input
      const acDiv = document.createElement("div");
      acDiv.classList.add("ac-selection");

      const acSelect = document.createElement("select");
      acSelect.classList.add("ac-type");
      acSelect.classList.add("select-air");

      acSelect.innerHTML = `
          <option value="60000">5 ตัน (60,000 BTU)</option>
          <option value="120000">10 ตัน (120,000 BTU)</option>
          <option value="240000">20 ตัน (240,000 BTU)</option>
      `;
      acSelect.value = size; // ตั้งค่า BTU ที่เลือก

      const quantityInput = document.createElement("input");
      quantityInput.type = "number";
      quantityInput.classList.add("input-air");
      quantityInput.classList.add("ac-quantity");
      quantityInput.min = 1;
      quantityInput.value = count; // ตั้งค่าจำนวนแอร์ที่ต้องใช้

      acDiv.appendChild(acSelect);
      acDiv.appendChild(quantityInput);
      acContainer.appendChild(acDiv);
    });
  }

  // เปิดโหมดลากค้าง
  const enableDragCopyMode = () => {
    setIsDraggingMode(true);
    console.log("✅ Drag copy mode enabled!");
  };

  // ปิดโหมดลากค้าง
  const disableDragCopyMode = () => {
    setIsDraggingMode(false);
    console.log("⛔ Drag copy mode disabled!");
  };

  const selectBox = (event) => {
    if (!isDraggingMode) return; // ต้องอยู่ในโหมดลากค้างถึงเลือกได้
    const target = event.target;
    if (!target.classList.contains("box")) return;

    setSelectedBox(target);
    console.log("Selected box:", target);
  };
  // เริ่มลากค้าง
  const startDragCopy = (event) => {
    if (!isDraggingMode || !selectedBox) return; // ต้องเลือกกล่องก่อน
    event.preventDefault();
    setIsDragging(true);
    console.log("Start dragging with selected box:", selectedBox);
  };

  // หยุดลาก
  const stopDragCopy = () => {
    setIsDragging(false);
  };

  // คัดลอกกล่องเมื่อลาก
  const dragCopy = (event) => {
    if (!isDragging || !selectedBox || !isDraggingMode) return;

    const cell = event.target;
    if (!cell.classList.contains("cell")) return;
    if (cell.querySelector(".box")) return;

    const newBox = createBoxCopy(selectedBox);
    adjustBoxSize(newBox, cell);

    const index = parseInt(cell.getAttribute("data-index"), 10);
    const row = parseInt(cell.getAttribute("data-row"), 10);
    const col = parseInt(cell.getAttribute("data-col"), 10);

    newBox.setAttribute("data-tooltip", `Row: ${row}, Col: ${col}`);

    cell.appendChild(newBox);

    const boxType = newBox.classList.contains("oneton")
      ? "oneton"
      : newBox.classList.contains("fiveton")
        ? "fiveton"
        : newBox.classList.contains("tenton")
          ? "tenton"
          : newBox.classList.contains("twentyton")
            ? "twentyton"
            : newBox.classList.contains("obstacle2")
              ? "obstacle2"
              : newBox.classList.contains("obstacle")
                ? "obstacle"
                : "ac";

    console.log("AC Type:", boxType);

    const rotation = parseInt(newBox.getAttribute("data-rotation"), 10) || 0;

    setAcPlacements((prev) => {
      const updatedPlacements = [
        ...prev,
        {
          id: newBox.id,
          index,
          row,
          col,
          type: boxType,
          rotation,
        },
      ];
      console.log("Updated AC Placements inside setState:", updatedPlacements);
      return updatedPlacements;
    });

    if (
      newBox.classList.contains("ac") ||
      newBox.classList.contains("oneton") ||
      newBox.classList.contains("fiveton") ||
      newBox.classList.contains("tenton") ||
      newBox.classList.contains("twentyton")
    ) {
      spreadCoolingEffect(cell, newBox);
    }
  };

  // สร้างสำเนาของกล่อง
  const createBoxCopy = (originalBox) => {
    const newBox = originalBox.cloneNode(true);
    newBox.id = `box-${Date.now()}`;
    addFunctionalityToBox(newBox);
    console.log("สร้าง box ใหม่:", newBox);
    return newBox;
  };

  // เพิ่มฟังก์ชันการทำงานให้กล่อง
  const addFunctionalityToBox = (box) => {
    box.setAttribute("draggable", "true");
    box.addEventListener("dragstart", (event) => {
      event.dataTransfer.setData("boxId", box.id);
    });
  };

  const handleAddAC = () => {
    if (airCount >= 4) {
      Swal.fire({
        title: "จำกัดการเพิ่มแอร์",
        text: "คุณสามารถเพิ่มแอร์ได้สูงสุด 4 ชนิด",
        icon: "warning",
        confirmButtonText: "ตกลง",
      });
      return;
    }
    setAirCount((prevCount) => prevCount + 1); // ใช้ prevCount เพื่อเพิ่มทีละ 1
    console.log(airCount);
    // สร้าง div ใหม่สำหรับแอร์
    const acDiv = document.createElement("div");
    acDiv.classList.add("ac-selection");

    // สร้าง dropdown สำหรับเลือกประเภทแอร์
    const acSelect = document.createElement("select");
    acSelect.classList.add("ac-type");
    acSelect.classList.add("select-air");

    acSelect.innerHTML = `
      <option value="60000">5 ตัน (60,000 BTU)</option>
      <option value="120000">10 ตัน (120,000 BTU)</option>
      <option value="240000">20 ตัน (240,000 BTU)</option>
  `;

    // สร้าง input สำหรับจำนวนแอร์
    const quantityDiv = document.createElement("div");
    quantityDiv.classList.add("quantity-container");
    const quantityInput = document.createElement("input");
    quantityInput.type = "number";
    quantityInput.classList.add("ac-quantity");
    quantityInput.classList.add("input-air");

    quantityInput.min = 1;
    quantityInput.value = 1;
    quantityInput.placeholder = "จำนวน";

    quantityDiv.appendChild(quantityInput);

    // สร้างปุ่มลบ
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "ลบ";
    deleteButton.classList.add("delete-ac");

    // เพิ่ม event listener ให้ปุ่มลบลบ div ที่สร้างขึ้น
    deleteButton.addEventListener("click", function () {
      acDiv.remove();
      acCount--; // ลดจำนวนแอร์ที่เพิ่มไป
      setAirConditionerNeeded(acCount);
      calculateBTU(); // อัปเดต BTU หลังลบแอร์
    });

    // เพิ่มทุกส่วนเข้าไปใน div
    acDiv.appendChild(acSelect);
    acDiv.appendChild(quantityDiv);
    acDiv.appendChild(deleteButton);

    // เพิ่ม div นี้ไปยัง #ac-container
    document.getElementById("ac-container").appendChild(acDiv);

    acCount++; // เพิ่มจำนวนแอร์ที่เพิ่มไป
    setAirConditionerNeeded(acCount);
    calculateBTU(); // คำนวณ BTU ใหม่ทุกครั้งที่เพิ่มแอร์
  };

  const handleAirInventoryChange = (e, key) => {
    const value = parseInt(e.target.value, 10) || 0;
    setAirInventory({
      ...airInventory,
      [key]: value,
    });
  };

  function calculateBTU() {
    if (!width || !length) {
      document.getElementById("btu-result").textContent =
        "กรุณากรอกข้อมูลให้ครบถ้วน";
      return;
    }
    const selectedRoom = roomTypes.find(
      (room) => room.id === parseInt(roomType, 10)
    );
    const btuRequiredPerSqM = selectedRoom ? selectedRoom.btuRequired : 750; // ใช้ค่า default ถ้าไม่พบ

    // คำนวณพื้นที่และ BTU ที่ต้องการ
    const roomArea = width * length;
    const requiredBTU = roomArea * btuRequiredPerSqM;

    // ดึงค่าจากกล่องจำนวนแอร์ที่มีอยู่
    const air5tonCount =
      parseInt(document.getElementById("air-5ton").value, 10) || 0;
    const air10tonCount =
      parseInt(document.getElementById("air-10ton").value, 10) || 0;
    const air20tonCount =
      parseInt(document.getElementById("air-20ton").value, 10) || 0;

    // คำนวณ BTU รวมจากจำนวนแอร์ที่มีอยู่
    const totalACBTU =
      air5tonCount * 60000 + air10tonCount * 120000 + air20tonCount * 240000;

    // คำนวณผลต่าง BTU
    const btuDifference = requiredBTU - totalACBTU;
    const btuDifferenceMessage =
      btuDifference > 0
        ? `ยังขาด BTU อีก: ${btuDifference}`
        : `BTU เพียงพอแล้ว`;

    // แสดงผลลัพธ์
    document.getElementById("btu-result").textContent =
      `BTU ที่ต้องการ: ${requiredBTU}`;
    setBtuResult(requiredBTU);
    document.getElementById("ac-count-result").textContent =
      `BTU รวมจากแอร์: ${totalACBTU}, ${btuDifferenceMessage}`;
  }

  const createGrid = async () => {
    if (isNaN(width) || isNaN(length) || width < 1 || length < 1) {
      Swal.fire({
        title: "จำกัดความกว้างความยาว",
        text: "กรุณากรอกความกว้างและความยาวเป็นตัวเลขที่ถูกต้อง",
        icon: "warning",
        confirmButtonText: "ตกลง",
      });
      return;
    }
    const grid = document.getElementById("grid");
    grid.innerHTML = "";
    let cellSize = 40;
    if (width > 30 || length > 30) {
      cellSize = 20;
    }
    grid.style.gridTemplateColumns = `repeat(${width}, ${cellSize}px)`;
    grid.style.gridTemplateRows = `repeat(${length}, ${cellSize}px)`;
    for (let i = 0; i < width * length; i++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");

      const row = Math.floor(i / width);
      const col = i % width;
      cell.setAttribute("data-index", i);
      cell.setAttribute("data-row", row);
      cell.setAttribute("data-col", col);
      cell.style.width = `${cellSize}px`;
      cell.style.height = `${cellSize}px`;
      cell.addEventListener("dragover", (e) => e.preventDefault());
      cell.addEventListener("drop", handleDrop);
      grid.appendChild(cell);
    }
    await new Promise((resolve) => setTimeout(resolve, 50));
    setHasQuickPlacedAC(false); // รีเซ็ตสถานะเมื่อสร้าง Grid ใหม่
    calculateBTUWithMinAC();
  };

  const clearGrid = async () => {
    if (isNaN(width) || isNaN(length) || width < 1 || length < 1) {
      Swal.fire({
        title: "จำกัดความกว้างความยาว",
        text: "กรุณากรอกความกว้างและความยาวเป็นตัวเลขที่ถูกต้อง",
        icon: "warning",
        confirmButtonText: "ตกลง",
      });
      return;
    }
    const grid = document.getElementById("grid");
    grid.innerHTML = "";
    let cellSize = 40;
    if (width > 30 || length > 30) {
      cellSize = 20;
    }
    grid.style.gridTemplateColumns = `repeat(${width}, ${cellSize}px)`;
    grid.style.gridTemplateRows = `repeat(${length}, ${cellSize}px)`;
    for (let i = 0; i < width * length; i++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");

      const row = Math.floor(i / width);
      const col = i % width;
      cell.setAttribute("data-index", i);
      cell.setAttribute("data-row", row);
      cell.setAttribute("data-col", col);
      cell.style.width = `${cellSize}px`;
      cell.style.height = `${cellSize}px`;
      cell.addEventListener("dragover", (e) => e.preventDefault());
      cell.addEventListener("drop", handleDrop);
      grid.appendChild(cell);
    }
    setAcPlacements([]);
    setHasQuickPlacedAC(false); // รีเซ็ตสถานะเมื่อสร้าง Grid ใหม่
    calculateBTUWithMinAC();
  };

  function handleDrop(e) {
    e.preventDefault();
    const boxId = e.dataTransfer.getData("boxId");
    let boxElement;
    const cell = e.target;
    const index = parseInt(cell.getAttribute("data-index"), 10);
    const row = parseInt(cell.getAttribute("data-row"), 10);
    const col = parseInt(cell.getAttribute("data-col"), 10);
    if (!cell.classList.contains("cell")) {
      Swal.fire({
        title: "ตำแหน่งไม่ถูกต้อง",
        text: "โปรดวางไอเท็มลงในเซลล์ของ Grid เท่านั้น",
        icon: "warning",
        confirmButtonText: "ตกลง",
      });
      return;
    }
    if (cell.querySelector(".box")) {
      Swal.fire({
        title: "ตำแหน่งไม่ถูกต้อง",
        text: "เซลล์นี้มีไอเท็มอยู่แล้ว กรุณาเลือกเซลล์อื่น",
        icon: "warning",
        confirmButtonText: "ตกลง",
      });
      return;
    }
    let boxType = null;
    let isExistingBox = false;
    if (document.getElementById(boxId)) {
      isExistingBox = true;
      boxElement = document.getElementById(boxId);
      boxType = getACTypeFromClass(boxElement);
      removeCoolingEffect(boxElement);
    } else {
      boxElement = document.createElement("div");
      const typeMap = {
        newBox: "ac",
        newObstacle: "obstacle",
        newObstacle2: "obstacle2",
        newOnetonBox: "oneton",
        newFivetonBox: "fiveton",
        newTentonBox: "tenton",
        newTwentytonBox: "twentyton",
      };
      boxType = typeMap[boxId] || "ac";
      if (boxType === "ac") {
        return;
      }
      boxElement.className = `box ${boxType}`;
      boxElement.textContent = getACLabel(boxType);
      boxElement.setAttribute("data-rotation", "0");
    }

    if (boxType !== "obstacle" && boxType !== "obstacle2") {
      const arrowDiv = document.createElement("div");
      if (width && length < 30) {
        arrowDiv.className = "direction-arrow";
      } else {
        arrowDiv.className = "direction-arrow2";
      }
      arrowDiv.textContent = getDirectionArrow(0); // เริ่มต้นที่ 0°
      boxElement.appendChild(arrowDiv);
    }

    const newId = `box-${Date.now()}`;
    boxElement.id = newId;
    boxElement.setAttribute("draggable", "true");
    boxElement.setAttribute("data-tooltip", `Row: ${row}, Col: ${col} (m)`);
    setAcPlacements((prev) => {
      const filteredPlacements = prev.filter((ac) => ac.id !== boxId);
      const existingAC = prev.find((ac) => ac.id === boxId);
      const rotationValue = existingAC ? existingAC.rotation : 0;
      return [
        ...filteredPlacements,
        {
          id: newId,
          index,
          row,
          col,
          type: boxType,
          rotation: rotationValue,
        },
      ];
    });
    adjustBoxSize(boxElement, cell);
    cell.appendChild(boxElement);
    spreadCoolingEffect(cell, boxElement);
    if (boxType !== "obstacle" && boxType !== "obstacle2" && !isExistingBox) {
      boxElement.addEventListener("click", () => rotateAC(boxElement));
    }
    boxElement.addEventListener("dragstart", (event) => {
      event.dataTransfer.setData("boxId", newId);
    });
    console.log(acPlacements);
    updateACUsageInGrid(); // ✅ อัปเดตการใช้แอร์
  }

  // ✅ ฟังก์ชันดึง `type` จาก class
  function getACTypeFromClass(boxElement) {
    if (boxElement.classList.contains("oneton")) return "oneton";
    if (boxElement.classList.contains("fiveton")) return "fiveton";
    if (boxElement.classList.contains("tenton")) return "tenton";
    if (boxElement.classList.contains("twentyton")) return "twentyton";
    if (boxElement.classList.contains("obstacle2")) return "obstacle2";
    if (boxElement.classList.contains("obstacle")) return "obstacle";
    return "ac"; // Default
  }

  // ✅ ฟังก์ชันคืนค่า Label สำหรับแอร์
  function getACLabel(type) {
    const labels = {
      ac: "AC",
      oneton: "1Ton",
      fiveton: "5Ton",
      tenton: "10Ton",
      twentyton: "20Ton",
      obstacle: "OBS",
      obstacle2: "OBS2",
    };
    return labels[type] || "AC";
  }

  function updateRemoveButtonPosition(boxElement) {
    const removeBtn = boxElement.querySelector(".remove-btn");
    if (removeBtn) {
      removeBtn.style.position = "absolute";
      removeBtn.style.top = "0";
      removeBtn.style.left = "0";
    }
  }

  function removeAC(boxElement) {
    const parentCell = boxElement.parentElement;

    if (parentCell) {
      parentCell.removeChild(boxElement);
    }
    removeCoolingEffect(boxElement);
    setAcPlacements((prevPlacements) =>
      prevPlacements.filter((ac) => ac.id !== boxElement.id)
    );

    console.log(`ลบ AC ID: ${boxElement.id} ออกจาก Grid และ State`);
  }

  function createDeleteButton(boxElement) {
    const deleteButton = document.createElement("delete");
    // deleteButton.textContent = "ลบ";
    // deleteButton.className = "delete-button";
    // deleteButton.style.position = "absolute";
    // deleteButton.style.top = "2px";
    // deleteButton.style.right = "2px";

    // deleteButton.addEventListener("click", () => {
    //   const parentCell = boxElement.parentElement;
    //   if (boxElement.classList.contains("ac")){
    //     removeCoolingEffect(parentCell); // ลบความเย็น
    //   }
    //   if (boxElement.classList.contains("obstacle2")) {
    //     removeObstacle(parentCell, boxElement); // Remove obs2 effect
    //   }
    //   boxElement.remove();
    // });

    return deleteButton;
  }

  function adjustBoxSize(boxElement, cell) {
    const cellSize = cell.getBoundingClientRect();
    boxElement.style.width = `${cellSize.width}px`;
    boxElement.style.height = `${cellSize.height}px`;
    boxElement.style.margin = "0";
    boxElement.style.position = "relative";
  }

  function removeObstacle(cell, boxElement) {
    if (boxElement.classList.contains("obstacle2")) {
      cell.classList.remove("obstacle2");
    }
  }

  function adjustDeleteButtonSize(deleteButton, boxElement) {
    deleteButton.style.width = "16px";
    deleteButton.style.height = "16px";
    deleteButton.style.lineHeight = "14px";
  }

  function spreadCoolingEffect(cell, boxElement) {
    const gridCells = document.querySelectorAll(".cell");
    const gridWidth = parseInt(document.getElementById("width").value, 10);
    const gridHeight = parseInt(document.getElementById("length").value, 10);
    let coolingRange, rowOff;

    if (!boxElement.hasAttribute("data-rotation")) {
      boxElement.setAttribute("data-rotation", "0");
    }
    const rotation = parseInt(boxElement.getAttribute("data-rotation"), 10);

    // กำหนดขนาดพื้นที่ทำความเย็น
    if (boxElement.classList.contains("oneton")) {
      coolingRange = 5;
      rowOff = -2;
    } else if (boxElement.classList.contains("fiveton")) {
      coolingRange = 9;
      rowOff = -4;
    } else if (boxElement.classList.contains("tenton")) {
      coolingRange = 13;
      rowOff = -6;
    } else if (boxElement.classList.contains("twentyton")) {
      coolingRange = 19;
      rowOff = -9;
    }

    const cellIndex = Array.from(gridCells).indexOf(cell);
    const startingRow = Math.floor(cellIndex / gridWidth);
    const startingCol = cellIndex % gridWidth;
    const coolingCells = [];

    // ฟังก์ชันตรวจสอบสิ่งกีดขวาง
    const hasObstacle = (row, col) => {
      if (row < 0 || row >= gridHeight || col < 0 || col >= gridWidth)
        return true;
      const index = row * gridWidth + col;
      return gridCells[index].querySelector(".obstacle2");
    };

    // ตรวจสอบทุกเซลล์ในพื้นที่ทำความเย็น
    for (
      let rowOffset = rowOff;
      rowOffset < coolingRange + rowOff;
      rowOffset++
    ) {
      for (let colOffset = 0; colOffset < coolingRange; colOffset++) {
        let targetRow, targetCol;

        // คำนวณตำแหน่งตามการหมุน
        switch (rotation) {
          case 0:
            targetRow = startingRow + rowOffset;
            targetCol = startingCol + colOffset;
            break;
          case 90:
            targetRow = startingRow + colOffset;
            targetCol = startingCol - rowOffset;
            break;
          case 180:
            targetRow = startingRow - rowOffset;
            targetCol = startingCol - colOffset;
            break;
          case 270:
            targetRow = startingRow - colOffset;
            targetCol = startingCol + rowOffset;
            break;
        }

        if (
          targetRow >= 0 &&
          targetRow < gridHeight &&
          targetCol >= 0 &&
          targetCol < gridWidth
        ) {
          const targetIndex = targetRow * gridWidth + targetCol;
          const targetCell = gridCells[targetIndex];

          let pathClear = true;

          if (rotation === 0 || rotation === 180) {
            // ตรวจสอบแนวตั้งก่อน
            const rowStep = targetRow > startingRow ? 1 : -1;
            for (let r = startingRow; r !== targetRow; r += rowStep) {
              if (hasObstacle(r, startingCol)) {
                pathClear = false;
                break;
              }
            }
            // ตรวจสอบแนวนอน
            const colStep = targetCol > startingCol ? 1 : -1;
            for (
              let c = startingCol;
              c !== targetCol && pathClear;
              c += colStep
            ) {
              if (hasObstacle(targetRow, c)) {
                pathClear = false;
                break;
              }
            }
          } else {
            // ตรวจสอบแนวนอนก่อน
            const colStep = targetCol > startingCol ? 1 : -1;
            for (let c = startingCol; c !== targetCol; c += colStep) {
              if (hasObstacle(startingRow, c)) {
                pathClear = false;
                break;
              }
            }
            // ตรวจสอบแนวตั้ง
            const rowStep = targetRow > startingRow ? 1 : -1;
            for (
              let r = startingRow;
              r !== targetRow && pathClear;
              r += rowStep
            ) {
              if (hasObstacle(r, targetCol)) {
                pathClear = false;
                break;
              }
            }
          }

          // เพิ่มเซลล์ถ้าเส้นทางปลอดภัยและไม่มีสิ่งกีดขวางในเซลล์นั้น
          if (pathClear && !hasObstacle(targetRow, targetCol)) {
            coolingCells.push(targetCell);
          }
        }
      }
    }

    // นำความเย็นไปใช้กับเซลล์ที่ผ่านการตรวจสอบ
    coolingCells.forEach((targetCell) => {
      if (!targetCell.coolingSources) targetCell.coolingSources = new Set();
      targetCell.coolingSources.add(boxElement.id);
      targetCell.classList.add("cooling-effect");
    });
  }

  // ฟังก์ชันลบ cooling effect
  async function removeCoolingEffect(boxElement) {
    const gridCells = document.querySelectorAll(".cell");
    gridCells.forEach((cell) => {
      if (cell.coolingSources) {
        cell.coolingSources.delete(boxElement.id);
        if (cell.coolingSources.size === 0) {
          cell.classList.remove("cooling-effect");
        }
      }
    });
    await updateACUsageInGrid(); // เรียกใช้เมื่อมีการลบแอร์
  }

  function createACBox(acType) {
    const acBox = document.createElement("div");
    acBox.className = `box ${getACClassName(acType)}`;
    acBox.textContent = `${getACLabel(acType)}`;
    acBox.setAttribute("data-rotation", "0");
    acBox.setAttribute("data-index", "0");
    acBox.setAttribute("data-row", "0");
    acBox.setAttribute("data-col", "0");
    acBox.setAttribute("draggable", "true");
    acBox.id = `ac-${Date.now()}`;
    acBox.addEventListener("dragstart", (e) => {
      e.dataTransfer.setData("boxId", acBox.id);
      removeCoolingEffect(acBox);
    });
    document.querySelectorAll(".cell").forEach((cell) => {
      cell.addEventListener("dragover", (e) => {
        e.preventDefault();
      });
      cell.addEventListener("drop", (e) => {
        e.preventDefault();
        const boxId = e.dataTransfer.getData("boxId");
        const draggedBox = document.getElementById(boxId);
        const targetCell = e.target;
        console.log("Box ID:", boxId);
        console.log("Dragged Box:", draggedBox);
        console.log("Target Cell:", targetCell);
        if (targetCell.classList.contains("cell")) {
          console.log(targetCell.classList.contains("cell"));
          targetCell.appendChild(draggedBox);
          spreadCoolingEffect(
            targetCell,
            draggedBox,
            uncoveredCells,
            gridWidth
          );
        }
      });
    });

    acBox.addEventListener("dragend", () => {
      const parentCell = acBox.parentElement;
      if (parentCell.classList.contains("cell")) {
        spreadCoolingEffect(parentCell, acBox, uncoveredCells, gridWidth); // กระจายผลความเย็นใหม่เมื่อวาง
      }
    });
    acBox.addEventListener("click", () => rotateAC(acBox));
    const deleteButton = createDeleteButton(acBox);
    acBox.appendChild(deleteButton);
    return acBox;
  }

  const updateACUsageInGrid = () => {
    const gridCells = document.querySelectorAll(".cell");
    let acUsage = {
      air_5ton_used: 0,
      air_10ton_used: 0,
      air_20ton_used: 0,
    };

    gridCells.forEach((cell) => {
      const acBox = cell.querySelector(".box");
      if (acBox) {
        if (acBox.classList.contains("fiveton")) {
          acUsage.air_5ton_used += 1;
        } else if (acBox.classList.contains("tenton")) {
          acUsage.air_10ton_used += 1;
        } else if (acBox.classList.contains("twentyton")) {
          acUsage.air_20ton_used += 1;
        }
      }
    });

    // Update state with AC usage
    setAirConditionerNeeded(
      acUsage.air_5ton_used + acUsage.air_10ton_used + acUsage.air_20ton_used
    );

    // Update AC usage results in the UI
    const usageResult = document.getElementById("ac-usage-result");
    usageResult.innerHTML = `
      <div>แอร์ขนาด 5 ตัน: ${acUsage.air_5ton_used} ตัว</div>
      <div>แอร์ขนาด 10 ตัน: ${acUsage.air_10ton_used} ตัว</div>
      <div>แอร์ขนาด 20 ตัน: ${acUsage.air_20ton_used} ตัว</div>
    `;

    // Store AC usage separately for saving
    return acUsage;
  };

  function handleQuickPlaceAc() {
    if (hasQuickPlacedAC) {
      Swal.fire({
        title: "จำกัดการวางแอร์",
        text: "คุณได้วางแอร์อย่างรวดเร็วไปแล้ว กรุณาสร้าง Grid ใหม่ก่อน",
        icon: "warning",
        confirmButtonText: "ตกลง",
      });
      return;
    }

    const gridCells = document.querySelectorAll(".cell");
    const gridWidth = parseInt(document.getElementById("width").value, 10);
    const gridHeight = parseInt(document.getElementById("length").value, 10);

    if (isNaN(gridWidth) || isNaN(gridHeight)) {
      Swal.fire({
        title: "จำกัดขนาดห้อง",
        text: "กรุณากรอกขนาดห้องให้ครบถ้วน",
        icon: "warning",
        confirmButtonText: "ตกลง",
      });
      return;
    }

    const acSelections = document.querySelectorAll(".ac-selection");
    const uncoveredCells = new Map();
    let newPlacements = []; // Array to store AC placement data

    gridCells.forEach((cell, index) => {
      uncoveredCells.set(index, cell);
      cell.setAttribute("data-index", index);
    });

    for (const selection of acSelections) {
      const acType = selection.querySelector(".ac-type").value;
      const acQuantity = parseInt(
        selection.querySelector(".ac-quantity").value,
        10
      );

      if (!acQuantity || acQuantity < 1) continue;

      for (let i = 0; i < acQuantity; i++) {
        const bestCellData = placeACInOptimalPosition(
          uncoveredCells,
          gridWidth,
          gridHeight,
          acType
        );

        if (bestCellData) {
          newPlacements.push(bestCellData);
        } else {
          // If fallback happens, stop the entire placement process
          const fallbackUsed = placeACInFallbackPosition(
            uncoveredCells,
            acType
          );
          if (fallbackUsed) {
            console.log("Stopping placement due to fallback");
            break; // Stop further placement
          }
        }
      }
    }

    // ✅ Update state with the correct AC placement data
    setAcPlacements((prev) => [...prev, ...newPlacements]);
    console.log("Updated AC Placements in Quick Place:", newPlacements);

    Swal.fire({
      title: "เสร็จสิ้น",
      text: "การวางแอร์อย่างรวดเร็วเสร็จสิ้น",
      icon: "success",
      confirmButtonText: "ตกลง",
    });

    setHasQuickPlacedAC(true); // Set state indicating quick place is done
    updateACUsageInGrid(); // Update AC usage count
  }

  function rotateAC(boxElement) {
    if (!boxElement.hasAttribute("data-rotation")) {
      boxElement.setAttribute("data-rotation", "0");
    }

    const currentRotation = parseInt(
      boxElement.getAttribute("data-rotation"),
      10
    );
    const newRotation = (currentRotation + 90) % 360;
    boxElement.setAttribute("data-rotation", newRotation);
    boxElement.style.transform = `rotate(${newRotation}deg)`;

    const parentCell = boxElement.parentElement;
    removeCoolingEffect(boxElement);
    spreadCoolingEffect(parentCell, boxElement);
    updateRemoveButtonPosition(boxElement);

    // อัปเดต state
    setAcPlacements((prev) =>
      prev.map((ac) =>
        ac.id === boxElement.id ? { ...ac, rotation: newRotation } : ac
      )
    );

    const directionArrow = getDirectionArrow(newRotation);
    boxElement.setAttribute("data-direction", directionArrow); // หรือจะเอาไปแสดงที่ innerText ก็ได้
    console.log(
      `หมุน ${boxElement.id} ไปที่ ${newRotation}° (${directionArrow})`
    );
  }

  function getDirectionArrow(degree) {
    switch (degree) {
      case 0:
        return "→"; // ขวา
      case 90:
        return "↓"; // ล่าง
      case 180:
        return "←"; // ซ้าย
      case 270:
        return "↑"; // บน
      default:
        return "?";
    }
  }

  const selectAssignmentAndLoadGrid = async () => {
    try {
      // ✅ 1. ดึงรายการ Assignment จาก API
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/area_cals`
      );
      const assignments = response.data;

      if (!assignments || assignments.length === 0) {
        Swal.fire("ไม่พบข้อมูล!", "ไม่มีการนัดหมายที่บันทึกไว้", "info");
        return;
      }

      // ✅ 2. สร้าง Dropdown ให้ผู้ใช้เลือก Assignment
      const { value: selectedId } = await Swal.fire({
        title: "เลือกสถานที่และโหลดข้อมูลที่บันทึกไว้",
        input: "select",
        inputOptions: Object.fromEntries(
          assignments.map((a) => [
            a.calculation_id,
            `ID: ${a.calculation_id} - ${
              a.location_name || "ไม่ระบุชื่อสถานที่"
            }`,
          ])
        ),
        inputPlaceholder: "เลือกสถานที่...",
        showCancelButton: true,
        confirmButtonText: "ตกลง",
        cancelButtonText: "ยกเลิก",
        inputValidator: (value) => {
          if (!value) return "กรุณาเลือกสถานที่!";
        },
      });

      if (!selectedId) return; // ถ้าผู้ใช้กดยกเลิก ไม่ต้องทำอะไรต่อ

      // ✅ 3. โหลดข้อมูล Grid ตาม Assignment ที่เลือก
      await loadGridPattern(selectedId);
    } catch (error) {
      console.error("Error fetching assignments:", error);
      Swal.fire("ข้อผิดพลาด!", "ไม่สามารถโหลดรายการสถานที่ได้", "error");
    }
  };

  const loadGridPattern = async (assignmentId) => {
    try {
      // ✅ 1. ดึงข้อมูลจาก API
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/area_cal/${assignmentId}`
      );

      let { width, height, grid_pattern } = response.data[0];

      console.log("Raw gridPattern:", grid_pattern);

      // ✅ 2. ตรวจสอบและแปลงเป็น Array (จาก JSON String)
      if (typeof grid_pattern === "string") {
        grid_pattern = JSON.parse(grid_pattern);
      }

      console.log("Parsed gridPattern:", grid_pattern);

      if (!Array.isArray(grid_pattern) || grid_pattern.length === 0) {
        Swal.fire("ไม่พบข้อมูล!", "ไม่มีการบันทึกแอร์ในกริดนี้", "info");
        return;
      }

      // ✅ 3. ตั้งค่าความกว้างและความยาวของ Grid อัตโนมัติ
      document.getElementById("width").value = width;
      document.getElementById("length").value = height;
      setWidth(width);
      setLength(height);

      // ✅ 4. สร้าง Grid ใหม่ และ `await` ให้ Grid สร้างเสร็จก่อน
      await createGrid();

      // ✅ 5. รอให้ DOM อัปเดต (ให้ Grid Cells ถูกต้องก่อน)
      await new Promise((resolve) => setTimeout(resolve, 50));

      // ✅ 6. ค้นหาเซลล์ใน Grid ใหม่
      const gridCells = document.querySelectorAll(".cell");
      const gridWidth = parseInt(width, 10);

      let newPlacements = []; // เก็บข้อมูล acPlacements ใหม่

      // ✅ 7. วนลูปวางแอร์ใน Grid
      grid_pattern.forEach((acData) => {
        const { id, row, col, type, rotation } = acData;
        const cellIndex = row * gridWidth + col;
        const targetCell = gridCells[cellIndex];

        if (!targetCell) return;

        // ✅ 8. สร้างแอร์ใหม่
        const boxElement = document.createElement("div");
        boxElement.className = `box ${getACClassName(type)}`;
        boxElement.textContent = getACLabel(type);
        boxElement.setAttribute("data-rotation", rotation);
        boxElement.setAttribute("draggable", "true");
        boxElement.id = id;

        // ✅ 9. ปรับขนาดให้ตรงกับเซลล์
        adjustBoxSize(boxElement, targetCell);
        boxElement.style.transform = `rotate(${rotation}deg)`;
        boxElement.setAttribute("data-tooltip", `Row: ${row}, Col: ${col}`);

        // ✅ 10. เพิ่ม Event ให้แอร์
        boxElement.addEventListener("click", () => rotateAC(boxElement));
        boxElement.addEventListener("dragstart", (e) => {
          e.dataTransfer.setData("boxId", boxElement.id);
        });

        if (type !== "obstacle" && type !== "obstacle2") {
          const arrowDiv = document.createElement("div");
          if (width && length < 30) {
            arrowDiv.className = "direction-arrow";
          } else {
            arrowDiv.className = "direction-arrow2";
          }
          arrowDiv.textContent = getDirectionArrow(rotation);
          arrowDiv.style.transform = `rotate(${-rotation}deg)`; // ✅ ให้หมุนตาม rotation
          boxElement.appendChild(arrowDiv);
        }
        // ✅ 11. เพิ่มปุ่มลบ
        const deleteButton = createDeleteButton(boxElement);
        adjustDeleteButtonSize(deleteButton, boxElement);
        boxElement.appendChild(deleteButton);

        // ✅ 12. ใส่แอร์ลงใน Grid
        targetCell.appendChild(boxElement);

        // ✅ 13. แพร่ผลความเย็น
        spreadCoolingEffect(targetCell, boxElement);

        // ✅ 14. เพิ่มข้อมูลลงใน newPlacements
        newPlacements.push({
          id,
          row,
          col,
          type,
          rotation,
        });
      });

      // ✅ 15. อัปเดต acPlacements
      setAcPlacements(newPlacements);

      Swal.fire("โหลดสำเร็จ!", "โหลดการวางแอร์เรียบร้อย", "success");
    } catch (error) {
      console.error("Error loading grid pattern:", error);
      Swal.fire("ข้อผิดพลาด!", "โหลดข้อมูลล้มเหลว", "error");
    }
  };

  function placeACInOptimalPosition(
    uncoveredCells,
    gridWidth,
    gridHeight,
    acType
  ) {
    if (uncoveredCells.size === 0) return null;
    const bestCell = findBestCellForAC(
      uncoveredCells,
      gridWidth,
      gridHeight,
      acType
    );
    if (!bestCell) return null;
    const acBox = createACBox(acType);
    adjustBoxSize(acBox, bestCell);
    adjustRotationForRoomEdge(acBox, bestCell, gridWidth, gridHeight);
    const newRotation = parseInt(acBox.getAttribute("data-rotation"), 10) || 0;
    acBox.style.transform = `rotate(${newRotation}deg)`;

    if (acType !== "obstacle" && acType !== "obstacle2") {
      const arrowDiv = document.createElement("div");
      if (width && length < 30) {
        arrowDiv.className = "direction-arrow";
      } else {
        arrowDiv.className = "direction-arrow2";
      }
      arrowDiv.textContent = getDirectionArrow(newRotation);
      arrowDiv.style.transform = `rotate(${-newRotation}deg)`;
      acBox.appendChild(arrowDiv);
    }

    const row = parseInt(bestCell.getAttribute("data-row"), 10);
    const col = parseInt(bestCell.getAttribute("data-col"), 10);
    acBox.setAttribute("data-tooltip", `Row: ${row}, Col: ${col} (m)`);
    bestCell.appendChild(acBox);
    spreadCoolingEffect(bestCell, acBox, uncoveredCells, gridWidth);
    uncoveredCells.delete(parseInt(bestCell.getAttribute("data-index")));
    console.log("AC Placed:", {
      id: acBox.id,
      index: parseInt(bestCell.getAttribute("data-index"), 10),
      row: row,
      col: col,
      type: acType,
      rotation: newRotation,
    });
    return {
      id: acBox.id,
      index: parseInt(bestCell.getAttribute("data-index"), 10),
      row: row,
      col: col,
      type: acType,
      rotation: newRotation,
    };
  }

  function placeACInFallbackPosition(uncoveredCells, acType) {
    if (uncoveredCells.size === 0) return false;
    console.log("fallback");
    const fallbackCellIndex = Array.from(uncoveredCells.keys())[0];
    const fallbackCell = uncoveredCells.get(fallbackCellIndex);
    uncoveredCells.delete(fallbackCellIndex);
    return true;
  }

  function findBestCellForAC(uncoveredCells, gridWidth, gridHeight, acType) {
    let bestCell = null;
    let bestScore = -Infinity;
    const spacing = getACSpacing(acType);
    for (const [index, cell] of uncoveredCells.entries()) {
      const row = Math.floor(index / gridWidth);
      const col = index % gridWidth;
      const isCorner =
        (row === 0 || row === gridHeight - 1) &&
        (col === 0 || col === gridWidth - 1);
      const score = isCorner
        ? 200
        : calculateCellScore(row, col, gridWidth, gridHeight);
      if (
        isCellValidForPlacement(
          row,
          col,
          gridWidth,
          gridHeight,
          spacing,
          uncoveredCells
        )
      ) {
        if (score > bestScore) {
          bestScore = score;
          bestCell = cell;
        }
      }
    }
    return bestCell;
  }

  function isCellValidForPlacement(
    row,
    col,
    gridWidth,
    gridHeight,
    spacing,
    uncoveredCells
  ) {
    for (
      let r = Math.max(0, row - spacing);
      r <= Math.min(gridHeight - 1, row + spacing);
      r++
    ) {
      for (
        let c = Math.max(0, col - spacing);
        c <= Math.min(gridWidth - 1, col + spacing);
        c++
      ) {
        const index = r * gridWidth + c;
        if (!uncoveredCells.has(index)) return false;
      }
    }
    return true;
  }

  function calculateCellScore(row, col, gridWidth, gridHeight) {
    let score = 0;
    if (
      row === 0 ||
      row === gridHeight - 1 ||
      col === 0 ||
      col === gridWidth - 1
    ) {
      score += 50;
    }
    return score;
  }

  // ฟังก์ชันปรับการหมุนของแอร์เมื่อวางชิดขอบห้อง
  function adjustRotationForRoomEdge(acBox, cell, gridWidth, gridHeight) {
    const cellIndex = parseInt(cell.getAttribute("data-index"), 10);
    const row = Math.floor(cellIndex / gridWidth);
    const col = cellIndex % gridWidth;
    console.log("roomEdge");

    if (row === 0) {
      acBox.setAttribute("data-rotation", "90"); // หันไปทางขวา
    } else if (row === gridHeight - 1) {
      acBox.setAttribute("data-rotation", "270"); // หันไปทางซ้าย
    } else if (col === 0) {
      acBox.setAttribute("data-rotation", "0"); // หันขึ้นบน
    } else if (col === gridWidth - 1) {
      acBox.setAttribute("data-rotation", "180"); // หันลงล่าง
    }
  }

  function getACLabelFromClassName(className) {
    switch (className) {
      case "oneton":
        return "1 ตัน";
      case "fiveton":
        return "5 ตัน";
      case "tenton":
        return "10 ตัน";
      case "twentyton":
        return "20 ตัน";
      default:
        return "ไม่ระบุ";
    }
  }

  const AC_TYPE_MAP = {
    12000: { className: "oneton", label: "1Ton" },
    60000: { className: "fiveton", label: "5Ton" },
    120000: { className: "tenton", label: "10Ton" },
    240000: { className: "twentyton", label: "20Ton" },
    ac: { className: "ac", label: "AC" },
    newBox: { className: "ac", label: "AC" },
    obstacle: { className: "obstacle", label: "OBS" },
    newObstacle: { className: "obstacle", label: "OBS" },
    obstacle2: { className: "obstacle2", label: "OBS2" },
    newObstacle2: { className: "obstacle2", label: "OBS2" },
    oneton: { className: "oneton", label: "1Ton" },
    newOnetonBox: { className: "oneton", label: "1Ton" },
    fiveton: { className: "fiveton", label: "5Ton" },
    newFivetonBox: { className: "fiveton", label: "5Ton" },
    tenton: { className: "tenton", label: "10Ton" },
    newTentonBox: { className: "tenton", label: "10Ton" },
    twentyton: { className: "twentyton", label: "20Ton" },
    newTwentytonBox: { className: "twentyton", label: "20Ton" },
  };

  /**
   * ฟังก์ชันคืนค่า className ของแอร์
   */
  function getACClassName(type) {
    return AC_TYPE_MAP[type]?.className || "ac";
  }

  /**
   * ฟังก์ชันคืนค่า label ของแอร์
   */
  function getACLabel(type) {
    return AC_TYPE_MAP[type]?.label || "AC";
  }

  // ฟังก์ชันคำนวณระยะห่างของแอร์
  function getACSpacing(acType) {
    switch (acType) {
      case "12000":
        return 4; // ระยะห่าง 4 ช่องสำหรับ 1 ตัน
      case "60000":
        return 8; // ระยะห่าง 8 ช่องสำหรับ 5 ตัน
      case "120000":
        return 12; // ระยะห่าง 12 ช่องสำหรับ 10 ตัน
      case "240000":
        return 18; // ระยะห่าง 18 ช่องสำหรับ 20 ตัน
      default:
        return 4;
    }
  }

  const handleSelectAssignmentGrid = async () => {
    const { value: selectedId } = await Swal.fire({
      title: "เลือกการนัดหมายที่ต้องการ",
      input: "select",
      inputOptions: assignments.reduce((acc, assignment) => {
        acc[assignment.assignment_id] =
          `${assignment.assignment_id} - ${assignment.description}`;
        return acc;
      }, {}),
      inputPlaceholder: "เลือก Assignment",
      showCancelButton: true,
      confirmButtonText: "ตกลง",
    });

    if (selectedId) {
      setSelectedAssignment(selectedId);
      setAssignmentId(selectedId);
      Swal.fire("สำเร็จ!", `เลือก Assignment ID: ${selectedId}`, "success");
    }
  };

  const handleSelectAreaCal = async () => {
    const { value: formValues } = await Swal.fire({
      title: "เลือกข้อมูลคำนวณพื้นที่",
      html:
        areaCalList.length > 0
          ? `
        <select id="area-cal-select" class="input-air">
          ${areaCalList
            .map(
              (area, index) => `
                <option value="${area.calculation_id}">
                  ${index + 1} - ${area.location_name} (${area.width}x${
                    area.height
                  })
                </option>`
            )
            .join("")}
        </select>
        <br/>
      `
          : "<p style='color: red;'>❌ ไม่มีข้อมูลให้เลือก</p>",
      input: "text",
      inputPlaceholder: "ใส่ชื่อสถานที่ใหม่",
      showCancelButton: true,
      confirmButtonText: "ตกลง",
      preConfirm: () => {
        const newLocationName = Swal.getInput().value.trim();
        if (!newLocationName) {
          Swal.showValidationMessage("กรุณากรอกชื่อสถานที่ใหม่!");
          return false;
        }

        if (areaCalList.length === 0) {
          return { newLocationName };
        }

        const selectedId = document.getElementById("area-cal-select").value;
        const selected = areaCalList.find(
          (a) => a.calculation_id.toString() === selectedId
        );

        return { ...selected, newLocationName };
      },
    });

    if (formValues) {
      setSelectedAreaCal(formValues);
      setLocationName(formValues.newLocationName);
      handleSaveRepeat(formValues);
    }
  };

  const handleSaveRepeat = async (data) => {
    console.log(acPlacements);

    const acUsage = updateACUsageInGrid();
    const newData = {
      calculation_id: data.calculation_id,
      assignment_id: data.assignment_id,
      width: parseFloat(width),
      height: parseFloat(length),
      air_conditioners_needed: parseInt(AirConditionerNeeded) || 0,
      room_type_id: roomType,
      air_5ton_used: acUsage.air_5ton_used,
      air_10ton_used: acUsage.air_10ton_used,
      air_20ton_used: acUsage.air_20ton_used,
      grid_pattern: acPlacements, // ส่งข้อมูลตำแหน่ง AC
    };
    try {
      await axios.put(
        `${import.meta.env.VITE_SERVER_URL}/v2/area_cal/${data.calculation_id}`,
        {
          ...newData,
          location_name: data.newLocationName, // ใช้ชื่อใหม่
        }
      );
      await axios.post(`${import.meta.env.VITE_SERVER_URL}/adminLog`, {
        admin_id: user_id, // กำหนด admin_id ของผู้ดูแลระบบ
        action: `แก้ไขพื้นที่เดิม(หมายเลข): ${newData.calculation_id}`, // บันทึกชื่อสินค้า
      });
      Swal.fire("Success", "บันทึกข้อมูลซ้ำเรียบร้อย!", "success");
    } catch (error) {
      console.error("Error updating area calculation:", error);
      Swal.fire("Error", "ไม่สามารถบันทึกข้อมูลได้", "error");
    }
  };

  const handleNavigateToAR = () => {
    navigate("/augmented-reality");
  };

  function handleDraggingModeV1(event) {
    if (event.target.checked) {
      isDraggingModeV1 = true;
      enableDragCopyModeV1();
      console.log("เปิดโหมดลากค้างและคัดลอก");
    } else {
      isDraggingModeV1 = false;
      disableDragCopyModeV1();
      console.log("ปิดโหมดลากค้างและคัดลอก");
    }
  }

  function enableDragCopyModeV1() {
    if (!isDraggingModeV1) return; // ⛔ หยุดทำงานถ้ายังไม่ได้เปิดโหมดลากค้าง

    const toolboxItems = document.querySelectorAll(".toolbox .box");
    if (toolboxItems.length === 0) return; // ⛔ ป้องกัน error ถ้าไม่มี box ใน toolbox

    toolboxItems.forEach((item) => {
      item.addEventListener("mousedown", startDragCopyV1);
    });

    console.log("✅ Drag copy mode enabled!");
  }

  function disableDragCopyModeV1() {
    const toolboxItems = document.querySelectorAll(".toolbox .box");
    if (toolboxItems.length === 0) return; // ⛔ ป้องกัน error ถ้าไม่มี box ใน toolbox

    toolboxItems.forEach((item) => {
      item.removeEventListener("mousedown", startDragCopyV1);
    });

    console.log("⛔ Drag copy mode disabled!");
  }

  function startDragCopyV1(event) {
    event.preventDefault(); // ป้องกัน Default behavior
    originalBoxV1 = event.target; // เก็บกล่องต้นฉบับที่ถูกลากค้าง
    if (!originalBoxV1.classList.contains("box")) return;

    isDraggingV1 = true; // เริ่มสถานะลากค้าง

    // ตรวจจับการลากเมาส์ผ่าน grid
    const grid = document.getElementById("grid");
    grid.addEventListener("mousemove", dragCopyV1); // คัดลอกเมื่อเมาส์ลากผ่าน
    grid.addEventListener("mouseup", stopDragCopyV1); // หยุดเมื่อปล่อยเมาส์
  }
  // ฟังก์ชันคัดลอก box element
  function dragCopyV1(event) {
    if (!isDraggingV1 || !originalBoxV1 || !isDraggingModeV1) return;

    const cell = event.target;
    if (!cell.classList.contains("cell")) return;
    if (cell.querySelector(".box")) return;

    // ✅ Copy the original box
    const newBox = createBoxCopyV1(originalBoxV1);
    console.log("สร้าง box ใหม่:", newBox);

    // ✅ Adjust size and place in the grid
    adjustBoxSize(newBox, cell);

    // ✅ Extract position details
    const index = parseInt(cell.getAttribute("data-index"), 10);
    const row = parseInt(cell.getAttribute("data-row"), 10);
    const col = parseInt(cell.getAttribute("data-col"), 10);

    // ✅ เพิ่ม data-tooltip เพื่อแสดง row และ col เมื่อ hover
    newBox.setAttribute("data-tooltip", `Row: ${row}, Col: ${col}`);

    cell.appendChild(newBox);
    console.log("เพิ่ม box ลงใน cell:", cell);

    // ✅ Determine AC type
    const boxType = newBox.classList.contains("oneton")
      ? "oneton"
      : newBox.classList.contains("fiveton")
        ? "fiveton"
        : newBox.classList.contains("tenton")
          ? "tenton"
          : newBox.classList.contains("twentyton")
            ? "twentyton"
            : newBox.classList.contains("obstacle2")
              ? "obstacle2"
              : newBox.classList.contains("obstacle")
                ? "obstacle"
                : "ac";

    console.log("AC Type:", boxType);

    // ✅ Get rotation (default to 0)
    const rotation = parseInt(newBox.getAttribute("data-rotation"), 10) || 0;

    // ✅ Update state with new AC placement
    setAcPlacements((prev) => {
      const updatedPlacements = [
        ...prev,
        {
          id: newBox.id,
          index,
          row,
          col,
          type: boxType,
          rotation,
        },
      ];
      console.log("Updated AC Placements inside setState:", updatedPlacements);
      return updatedPlacements;
    });

    // ✅ Spread cooling effect if applicable
    if (
      newBox.classList.contains("ac") ||
      newBox.classList.contains("oneton") ||
      newBox.classList.contains("fiveton") ||
      newBox.classList.contains("tenton") ||
      newBox.classList.contains("twentyton")
    ) {
      spreadCoolingEffect(cell, newBox);
    }
  }
  // ฟังก์ชันหยุดลากค้าง
  function stopDragCopyV1() {
    if (!isDraggingV1) return;

    isDraggingV1 = false; // ยกเลิกสถานะลากค้าง
    originalBoxV1 = null; // รีเซ็ตกล่องต้นฉบับ

    const grid = document.getElementById("grid");
    grid.removeEventListener("mousemove", dragCopy); // ยกเลิก Event Listener
    grid.removeEventListener("mouseup", stopDragCopy); // ยกเลิก Event Listener
  }

  function addFunctionalityToBoxV1(boxElement) {
    // ✅ Check if it's NOT an obstacle before adding click event
    if (
      !boxElement.classList.contains("obstacle") &&
      !boxElement.classList.contains("obstacle2")
    ) {
      boxElement.addEventListener("click", () => {
        console.log("กำลังหมุน:", boxElement.id);
        rotateAC(boxElement); // ✅ Call rotate function only if it's not an obstacle
      });
    } else {
      // ✅ Ensure obstacles have rotation set to 0
      boxElement.setAttribute("data-rotation", "0");
      boxElement.style.transform = "rotate(0deg)";
    }

    // ✅ Drag-and-drop functionality (applies to all box types)
    boxElement.addEventListener("dragstart", (e) => {
      e.dataTransfer.setData("boxId", boxElement.id);
    });

    // ✅ Add delete button (applies to all box types)
    const deleteButton = createDeleteButton(boxElement);
    boxElement.appendChild(deleteButton);

    console.log("เพิ่มฟังก์ชันให้ box:", boxElement.id);
  }
  // ฟังก์ชันสร้างสำเนาของกล่อง
  function createBoxCopyV1(originalBoxV1) {
    const newBox = originalBoxV1.cloneNode(true); // คัดลอกกล่องพร้อมเนื้อหา
    newBox.id = `box-${Date.now()}`; // กำหนด ID ใหม่

    console.log("สร้าง box ใหม่:", newBox);

    // เพิ่มฟังก์ชันการทำงานเดิมทั้งหมด
    addFunctionalityToBoxV1(newBox);

    return newBox;
  }

  return (
    <>
      <div className="container mx-auto p-8"></div>
      <div className="mx-5 my-5 font-prompt">
        <div className="flex flex-wrap items-center mb-4 justify-between">
          <h2 className="text-2xl font-bold mb-4">
            {translations[currentLanguage].title}
          </h2>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={handleNavigateToAR}
              className="btn btn-primary text-white  w-full md:w-auto"
            >
              {translations[currentLanguage].arFeature}
            </button>
            <button
              onClick={selectAssignmentAndLoadGrid}
              className="btn bg-error text-white hover:bg-error w-full md:w-auto"
            >
              {translations[currentLanguage].selectPlace}
            </button>
            <button
              className="btn btn-success text-white  w-full md:w-auto"
              onClick={fetchACInventory}
            >
              {translations[currentLanguage].fetchACData}
            </button>
            <Link to="/dashboard/area-cal/content" className="w-full md:w-auto">
              <button className="btn bg-blue text-white hover:bg-blue w-full md:w-auto">
                {translations[currentLanguage].viewAreaList}
              </button>
            </Link>
          </div>
        </div>
        <div
          id="air-container"
          className="p-6 bg-base-100 shadow-md rounded-lg w-full  mx-auto"
        >
          <h3 className="text-xl font-bold mb-4 text-center ">
            {translations[currentLanguage].acData}
          </h3>
          <div className="air-row mb-4">
            <label
              htmlFor="air-5ton"
              className="block text-md font-medium mb-2"
            >
              {translations[currentLanguage].air5ton}
            </label>
            <input
              type="number"
              id="air-5ton"
              className="input input-bordered w-full"
              value={airInventory.air5ton}
              min="0"
              onChange={(e) => handleAirInventoryChange(e, "air5ton")}
            />
          </div>
          <div className="air-row mb-4">
            <label
              htmlFor="air-10ton"
              className="block text-md font-medium mb-2"
            >
              {translations[currentLanguage].air10ton}{" "}
            </label>
            <input
              type="number"
              id="air-10ton"
              className="input input-bordered w-full"
              value={airInventory.air10ton}
              min="0"
              onChange={(e) => handleAirInventoryChange(e, "air10ton")}
            />
          </div>
          <div className="air-row mb-4">
            <label
              htmlFor="air-20ton"
              className="block text-md font-medium mb-2"
            >
              {translations[currentLanguage].air20ton}{" "}
            </label>
            <input
              type="number"
              id="air-20ton"
              className="input input-bordered w-full"
              value={airInventory.air20ton}
              min="0"
              onChange={(e) => handleAirInventoryChange(e, "air20ton")}
            />
          </div>
        </div>

        <label htmlFor="width">{translations[currentLanguage].width}</label>
        <input
          type="number"
          id="width"
          min="1"
          placeholder="Enter width"
          value={width}
          className="input-air"
          onChange={(e) => setWidth(e.target.value)}
        />

        <label htmlFor="length">{translations[currentLanguage].length}</label>
        <input
          type="number"
          id="length"
          min="1"
          placeholder="Enter length"
          value={length}
          className="input-air"
          onChange={(e) => setLength(e.target.value)}
        />

        <label htmlFor="room-type">
          {translations[currentLanguage].roomType}
        </label>
        <select
          id="room-type"
          value={roomType}
          onChange={handleRoomTypeChange}
          className="select-air"
        >
          {roomTypes.length > 0 ? (
            roomTypes.map((room) => (
              <option key={room.id} value={room.id}>
                {room.id}. {room.name} (Factor: {room.btuRequired})
              </option>
            ))
          ) : (
            <option>กำลังโหลด...</option>
          )}
        </select>

        <br />
        <br />

        <div id="ac-container">
          <label htmlFor="room-type">
            {translations[currentLanguage].selectACType}
          </label>
          <div className="ac-selection">
            <select className="ac-type select-air">
              {/* <option value="12000">1 ตัน (12,000 BTU)</option> */}
              <option value="60000">5 ตัน (60,000 BTU)</option>
              <option value="120000">10 ตัน (120,000 BTU)</option>
              <option value="240000">20 ตัน (240,000 BTU)</option>
            </select>
            <div className="quantity-container">
              <input
                type="number"
                className="ac-quantity input-air"
                min="1"
                placeholder="จำนวน"
              />
            </div>
            <button id="add-ac" onClick={handleAddAC} className="b-air">
              {translations[currentLanguage].addAC}
            </button>
          </div>
        </div>
        <br />
        {/* <button id="calculateACCount" onClick={calculateBTUWithMinAC}>
          คำนวณจำนวนแอร์ที่ต้องใช้
        </button> */}
        <br />
        <button id="createGrid" className="my-2 mr-2 b-air" onClick={clearGrid}>
          {translations[currentLanguage].clearGrid}
        </button>
        <button
          id="quickPlaceAC"
          onClick={handleQuickPlaceAc}
          className="b-air"
        >
          {translations[currentLanguage].quickPlaceAC}
        </button>

        <br />

        <div id="btu-result">{btuResult}</div>
        <div id="ac-count-result">{acCountResult}</div>
        <div id="ac-usage-result">{acUsageResult}</div>
        <div
          id="grid"
          className="x"
          onClick={handleEraserGrid}
          style={{ transform: `scale(${scale})` }}
          ref={containerRef}
        ></div>
        <div className="toolbox">
          {/* <div id="acBox" className="box ac" draggable="true">
            AC
          </div> */}
          <div className="grid grid-cols-2 gap-2 md:flex">
            <div id="obsBox" className="box obstacle" draggable="true">
              OBS
            </div>
            <div id="obs2Box" className="box obstacle2" draggable="true">
              OBS2
            </div>
            {/* <div id="onetonBox" className="box oneton" draggable="true">
            1 Ton
          </div> */}
            <div id="fivetonBox" className="box fiveton" draggable="true">
              5 Ton
            </div>
            <div id="tentonBox" className="box tenton" draggable="true">
              10 Ton
            </div>
            <div id="twentytonBox" className="box twentyton" draggable="true">
              20 Ton
            </div>
          </div>

          <div>
            {isMobile ? (
              <div className="drag-mode-container">
                <input
                  type="checkbox"
                  id="dragModeToggleMobile"
                  onChange={handleDraggingModeV1}
                  className="input-air"
                />
                <label htmlFor="dragModeToggleMobile">
                  {translations[currentLanguage].drag}
                </label>
              </div>
            ) : (
              <div className="drag-mode-container">
                <input
                  type="checkbox"
                  id="dragModeToggleDesktop"
                  onChange={handleDraggingMode}
                  className="input-air"
                />
                <label htmlFor="dragModeToggleDesktop">
                  {translations[currentLanguage].drag}
                </label>
              </div>
            )}
          </div>
          <div
            className="eraser-button"
            id="eraserButton"
            onClick={handleEraserButton}
          >
            {translations[currentLanguage].eraser}
          </div>
        </div>
        <div className="flex justify-end gap-5">
          <button
            onClick={handleSelectAreaCal}
            className="btn btn-success text-white"
          >
            {translations[currentLanguage].saveRepeat}
          </button>
          <button
            onClick={handleSelectAssignment}
            className="btn btn-primary  text-white"
          >
            {translations[currentLanguage].save}
          </button>
        </div>
      </div>
    </>
  );
};

export default Areacal;
