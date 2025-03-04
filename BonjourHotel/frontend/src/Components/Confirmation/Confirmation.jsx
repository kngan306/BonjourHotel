import React from 'react'
import './Confirmation.css'
import { Link } from 'react-router-dom';

const Confirmation = ({ formData, setFormData }) => {
    const handleChange = (e) => {
        const { checked } = e.target;
        setFormData({ ...formData, termsAccepted: checked });
    };

    return (
        <div className="confirmation">
            <h2>Xác nhận</h2>
            <div className="step-subtext-container">
                <p className="subtext">Sẵn sàng đặt phòng ngay lập tức, mời bạn!</p>
                {/* <span className="step">Bước 4/4</span> */}
            </div>
            <div className="checkbox-container2">
                <div className="form-group2">
                    <input
                        type="checkbox"
                        name="termsAccepted"
                        checked={formData.termsAccepted}
                        onChange={handleChange}
                        id="termsAccepted"
                    />
                    <label htmlFor="termsAccepted">Tôi đồng ý với các điều khoản và chính sách của khách sạn</label>

                </div>

            </div>
            {/* <div className="booking-button-container">
                <Link to="/danh-sach-phong-da-nang">
                    <button className="booking-button">Tiếp tục đặt phòng</button>
                </Link>
            </div> */}
        </div>

    );
};

export default Confirmation
