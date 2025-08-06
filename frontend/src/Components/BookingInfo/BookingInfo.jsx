import React from 'react'
import './BookingInfo.css'

const BookingInfo = ({ formData, setFormData }) => {
  const today = new Date().toISOString().split("T")[0]; // Today's date in YYYY-MM-DD format

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Only update date fields if they meet the constraints
    if (name === "checkInDate" && value >= today) {
      setFormData({ ...formData, [name]: value });
    } else if (
      name === "checkOutDate" &&
      value > formData.checkInDate &&
      value >= today
    ) {
      setFormData({ ...formData, [name]: value });
    }
  };

  return (
    <div className="booking-info">
      <h2>Thông tin thuê phòng</h2>
      <div className="step-subtext-container">
        <p className="subtext">Điền ngày nhận và trả phòng</p>
        {/* <span className="step">Bước 2/4</span> */}
      </div>
      <div className="form-group3-container">
        <div className="form-group3">
          <label>Ngày nhận phòng</label>
          <input
            type="date"
            name="checkInDate"
            value={formData.checkInDate}
            onChange={handleChange}
            min={today} // Restrict check-in date to today or later
            className="input-field"
            placeholder='Lựa chọn thời gian'
          />
        </div>
        <div className="form-group3">
          <label>Ngày trả phòng</label>
          <input
            type="date"
            name="checkOutDate"
            value={formData.checkOutDate}
            onChange={handleChange}
            min={formData.checkInDate || today} // Restrict to at least one day after check-in
            className="input-field"
            placeholder="Lựa chọn thời gian"
          />
        </div>
      </div>
    </div>
  );
};

export default BookingInfo
