import React, { useState } from 'react'
import QLKhachHang from '../Components/QLKhachHang/QLKhachHang'
import ThemKhachHang from '../Components/ThemKhachHang/ThemKhachHang'
import CapNhatKhachHang from '../Components/CapNhatKhachHang/CapNhatKhachHang'

const CustomerManagement = () => {

  const [isCreatePopupOpen, setIsCreatePopupOpen] = useState(false);
  const [isUpdatePopupOpen, setIsUpdatePopupOpen] = useState(false);

  const openPopupCreate = () => {
    setIsCreatePopupOpen(true);
    setIsUpdatePopupOpen(false);
  };

  const closePopupCreate = () => {
    setIsCreatePopupOpen(false);
  };

  const openPopupUpdate = () => {
    setIsUpdatePopupOpen(true);
    setIsCreatePopupOpen(false);
  };

  const closePopupUpdate = () => {
    setIsUpdatePopupOpen(false);
  };

  return (
      <div>
        <QLKhachHang openPopupCreate={openPopupCreate} openPopupUpdate={openPopupUpdate} />

        {isCreatePopupOpen && (
          <div className="overlay">
            <ThemKhachHang closePopupCreate={closePopupCreate} />
          </div>
        )}

        {isUpdatePopupOpen && (
          <div className="overlay">
            <CapNhatKhachHang closePopupUpdate={closePopupUpdate} />
          </div>
        )}
      </div>
  )
}

export default CustomerManagement
