import React from 'react'
import './PersonalInfo.css'

const PersonalInfo = ({ formData, setFormData }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="personal-info">
      <h2>Thông tin cá nhân</h2>
      <div className="step-subtext-container">
        <p className="subtext">Điền đầy đủ và chính xác</p>
        {/* <span className="step">Bước 1/4</span> */}
      </div>
      <div className="form-row">
        <div className="form-group4">
          <label>Họ tên</label>
          <input 
            type="text" 
            name="name" 
            placeholder="Nhập họ tên" 
            value={formData.name} 
            onChange={handleChange} 
            className="input-field"
          />
        </div>
        <div className="form-group4">
          <label>Số điện thoại</label>
          <input 
            type="text" 
            name="phone" 
            placeholder="Nhập số điện thoại" 
            value={formData.phone} 
            onChange={handleChange} 
            className="input-field"
          />
        </div>
      </div>
      <div className="form-group4">
        <label>Email</label>
        <input 
          type="email" 
          name="email" 
          placeholder="Nhập địa chỉ email" 
          value={formData.email} 
          onChange={handleChange} 
          className="input-field"
        />
      </div>
    </div>
  );
};

export default PersonalInfo
