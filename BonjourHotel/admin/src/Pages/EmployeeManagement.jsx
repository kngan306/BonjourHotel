import React, { useState } from 'react'
import QLNhanVien from '../Components/QLNhanVien/QLNhanVien'
import ThemNhanVien from '../Components/ThemNhanVien/ThemNhanVien';
import CapNhatNhanVien from '../Components/CapNhatNhanVien/CapNhatNhanVien'

const EmployeeManagement = () => {

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
      <QLNhanVien openPopupCreate={openPopupCreate} openPopupUpdate={openPopupUpdate} />

      {isCreatePopupOpen && (
        <div className="overlay">
          <ThemNhanVien closePopupCreate={closePopupCreate} />
        </div>
      )}

      {isUpdatePopupOpen && (
        <div className="overlay">
          <CapNhatNhanVien closePopupUpdate={closePopupUpdate} />
        </div>
      )}
    </div>
  )
}

export default EmployeeManagement
