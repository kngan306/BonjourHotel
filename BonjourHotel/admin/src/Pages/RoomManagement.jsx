import React, { useState } from 'react'
import QLPhong from '../Components/QLPhong/QLPhong'
import ThemPhong from '../Components/ThemPhong/ThemPhong'
import CapNhatPhong from '../Components/CapNhatPhong/CapNhatPhong';

const RoomManagement = () => {

  const [isCreatePopupOpen, setIsCreatePopupOpen] = useState(false);
  const [isUpdatePopupOpen, setIsUpdatePopupOpen] = useState(false);

  const openPopupCreate = () => {
    setIsCreatePopupOpen(true);
    setIsUpdatePopupOpen(false); // Đảm bảo chỉ mở popup tạo phòng
  };

  const closePopupCreate = () => {
    setIsCreatePopupOpen(false);
  };

  const openPopupUpdate = () => {
    setIsUpdatePopupOpen(true);
    setIsCreatePopupOpen(false); // Đảm bảo chỉ mở popup cập nhật phòng
  };

  const closePopupUpdate = () => {
    setIsUpdatePopupOpen(false);
  };

  return (
    <div>
      {/* Truyền các hàm mở popup cho QLPhong */}
      <QLPhong openPopupCreate={openPopupCreate} openPopupUpdate={openPopupUpdate} />

      {/* Hiển thị popup tạo phòng nếu isCreatePopupOpen là true */}
      {isCreatePopupOpen && (
        <div className="overlay">
          <ThemPhong closePopupCreate={closePopupCreate} />
        </div>
      )}

      {/* Hiển thị popup cập nhật phòng nếu isUpdatePopupOpen là true */}
      {isUpdatePopupOpen && (
        <div className="overlay">
          <CapNhatPhong closePopupUpdate={closePopupUpdate} />
        </div>
      )}
    </div>
  );
}

export default RoomManagement
