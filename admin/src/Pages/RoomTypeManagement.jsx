import React, { useState } from 'react'
import QLLoaiPhong from '../Components/QLLoaiPhong/QLLoaiPhong'
import ThemLoaiPhong from '../Components/ThemLoaiPhong/ThemLoaiPhong';
import CapNhatLoaiPhong from '../Components/CapNhatLoaiPhong/CapNhatLoaiPhong'

const RoomTypeManagement = () => {

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
      <QLLoaiPhong openPopupCreate={openPopupCreate} openPopupUpdate={openPopupUpdate} />

      {isCreatePopupOpen && (
        <div className="overlay">
          <ThemLoaiPhong closePopupCreate={closePopupCreate} />
        </div>
      )}

      {isUpdatePopupOpen && (
        <div className="overlay">
          <CapNhatLoaiPhong closePopupUpdate={closePopupUpdate} />
        </div>
      )}
    </div>
  )
}

export default RoomTypeManagement
