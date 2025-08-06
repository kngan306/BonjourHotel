import React, { useState } from 'react'
import QLDonDatPhong from '../Components/QLDonDatPhong/QLDonDatPhong'
import ThemDDP from '../Components/ThemDDP/ThemDDP'
import CapNhatDDP from '../Components/CapNhatDDP/CapNhatDDP';

const BookingManagement = () => {

  const [isCreatePopupOpen, setIsCreatePopupOpen] = useState(false);
  const [isUpdatePopupOpen, setIsUpdatePopupOpen] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState(null); // Quản lý bookingId
  const [refreshFlag, setRefreshFlag] = useState(false); // Dùng để làm cờ cập nhật

  const openPopupCreate = () => {
    setIsCreatePopupOpen(true);
    setIsUpdatePopupOpen(false);
  };

  const closePopupCreate = () => {
    setIsCreatePopupOpen(false);
  };

  const openPopupUpdate = (id) => {
    setSelectedBookingId(id); // Lưu bookingId khi mở popup cập nhật
    setIsUpdatePopupOpen(true);
    setIsCreatePopupOpen(false);
  };

  const closePopupUpdate = () => {
    setIsUpdatePopupOpen(false);
    setSelectedBookingId(null); // Xóa bookingId khi đóng popup
  };

  // Hàm để kích hoạt cập nhật dữ liệu
  const refreshBookings = () => {
    setRefreshFlag(prev => !prev); // Đổi trạng thái cờ để trigger useEffect
  };

  return (
    <div>
      <QLDonDatPhong openPopupCreate={openPopupCreate} openPopupUpdate={openPopupUpdate} 
      refreshFlag={refreshFlag} // Truyền cờ xuống QLDonDatPhong
      />

      {isCreatePopupOpen && (
        <div className="overlay">
          <ThemDDP closePopupCreate={closePopupCreate} />
        </div>
      )}

      {isUpdatePopupOpen && (
        <div className="overlay">
          <CapNhatDDP bookingId={selectedBookingId} closePopupUpdate={closePopupUpdate} 
          refreshBookings={refreshBookings} // Truyền hàm callback xuống CapNhatDDP
          />
        </div>
      )}
    </div>
  )
}

export default BookingManagement
