import React, { useState } from 'react'
import QLDichVu from '../Components/QLDichVu/QLDichVu'
import ThemDichVu from '../Components/ThemDichVu/ThemDichVu'
import CapNhatDichVu from '../Components/CapNhatDichVu/CapNhatDichVu'

const ServiceManagement = () => {

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
      <QLDichVu openPopupCreate={openPopupCreate} openPopupUpdate={openPopupUpdate} />

      {isCreatePopupOpen && (
        <div className="overlay">
          <ThemDichVu closePopupCreate={closePopupCreate} />
        </div>
      )}

      {isUpdatePopupOpen && (
        <div className="overlay">
          <CapNhatDichVu closePopupUpdate={closePopupUpdate} />
        </div>
      )}
    </div>
  )
}

export default ServiceManagement
