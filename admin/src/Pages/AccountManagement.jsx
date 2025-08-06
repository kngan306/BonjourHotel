import React, { useState } from 'react'
import QLTaiKhoan from '../Components/QLTaiKhoan/QLTaiKhoan'
import ThemTaiKhoan from '../Components/ThemTaiKhoan/ThemTaiKhoan'
import CapNhatTaiKhoan from '../Components/CapNhatTaiKhoan/CapNhatTaiKhoan'

const AccountManagement = () => {

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
      <QLTaiKhoan openPopupCreate={openPopupCreate} openPopupUpdate={openPopupUpdate} />

      {isCreatePopupOpen && (
        <div className="overlay">
          <ThemTaiKhoan closePopupCreate={closePopupCreate} />
        </div>
      )}

      {isUpdatePopupOpen && (
        <div className="overlay">
          <CapNhatTaiKhoan closePopupUpdate={closePopupUpdate} />
        </div>
      )}
    </div>
  )
}

export default AccountManagement
