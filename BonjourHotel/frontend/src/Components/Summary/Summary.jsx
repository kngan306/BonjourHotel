import React, { useState } from 'react';
import './Summary.css';
import imgfamilysuite from '../Assets/image-family-suite.png';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Summary = ({ formData, roomData }) => {
    const serviceFee = formData.serviceFee || 0;
    const roomPrice = roomData ? roomData.Gia : 0;
    const roomImage = roomData ? roomData.HinhAnh1 || imgfamilysuite : imgfamilysuite;
    const roomName = roomData ? roomData.TenPhong : 'Family Suite';

    const checkInDate = new Date(formData.checkInDate);
    const checkOutDate = new Date(formData.checkOutDate);
    const numNights = (checkOutDate - checkInDate) / (1000 * 60 * 60 * 24);
    const totalPrice = roomPrice * numNights + serviceFee;
    const navigate = useNavigate(); // Khởi tạo navigate

    const [errorMessage, setErrorMessage] = useState('');

    const handleBookingClick = async () => {
        if (!formData.name || !formData.phone || !formData.email || !formData.checkInDate || !formData.checkOutDate || !formData.termsAccepted) {
            setErrorMessage('Vui lòng điền đầy đủ thông tin và chấp nhận các chính sách và điều khoản.');
            return;
        }

        setErrorMessage('');
        
        try {
            // Lấy thông tin người dùng từ localStorage
            const userData = JSON.parse(localStorage.getItem('userData'));

            // Kiểm tra và cập nhật thông tin nếu khác
            if (userData) {
                const isInfoChanged = (
                    formData.name !== userData.TenKH ||
                    formData.phone !== userData.SDT ||
                    formData.email !== userData.Email
                );

                if (isInfoChanged) {
                    await axios.put(`http://localhost:5000/api/khachhang/${userData.MaKH}`, {
                        TenKH: formData.name,
                        SDT: formData.phone,
                        Email: formData.email,
                    });
                    // Cập nhật localStorage với thông tin mới
                    const updatedUserData = {
                        ...userData,
                        TenKH: formData.name,
                        SDT: formData.phone,
                        Email: formData.email,
                    };
                    localStorage.setItem('userData', JSON.stringify(updatedUserData));
                }
            }
            

            // Tạo đơn đặt phòng mới
            const bookingResponse = await axios.post('http://localhost:5000/api/booking', {
                MaKH: userData.MaKH,
                NgayDat: new Date().toISOString().slice(0, 10),
                NgayNhan: formData.checkInDate,
                NgayTraPhong: formData.checkOutDate,
                NgayTraPhongThucTe: null,
                TrangThai: 'Chờ xử lý',
                MaNV: null,
            });

            const bookingID = bookingResponse.data.bookingID;

            // Thêm chi tiết phòng vào BookingDetail
            await axios.post('http://localhost:5000/api/booking-detail', {
                Booking_ID: bookingID,
                MaPhong: roomData.MaPhong,
                Gia: roomPrice
            });

            // Cập nhật trạng thái phòng thành "Đang thuê"
            await axios.put('http://localhost:5000/api/phong/update-status', {
                MaPhong: roomData.MaPhong,
                TrangThai: 'Đã đặt'
            });

            // Thêm chi tiết dịch vụ vào ServiceDetail nếu có dịch vụ
            if (formData.serviceFee > 0 && formData.selectedServices) {
                const selectedServices = Object.entries(formData.selectedServices).filter(
                    ([, gia]) => gia > 0
                );

                for (const [serviceId, gia] of selectedServices) {
                    await axios.post('http://localhost:5000/api/service-detail', {
                        ID: bookingID,
                        MaPhong: roomData.MaPhong,
                        MaDV: serviceId,
                        Gia: gia,
                    });
                }
            }


            alert('Bạn đã đặt phòng thành công');
            navigate('/');
        } catch (error) {
            console.error("Lỗi khi thực hiện đặt phòng:", error); // In toàn bộ lỗi ra terminal
            if (error.response) {
                console.error("Chi tiết lỗi từ API:", error.response.data); // In chi tiết lỗi trả về từ API
            }
            setErrorMessage('Có lỗi xảy ra trong quá trình đặt phòng. Vui lòng thử lại sau.');
        }
    };

    return (
        <div className="summary-container">
            <div className="summary-header">
                <h2>Tổng hóa đơn</h2>
                <p>Giá tiền có thể thay đổi dựa trên thời gian mà bạn muốn thuê, nhu cầu mà bạn cần thiết</p>
            </div>

            <div className="room-booking-info">
                <img src={roomImage || imgfamilysuite} alt="" className="room-image" />
                <div className="room-details">
                    <h3>{roomName}</h3>
                    <div className="row">
                        <span>Giá phòng</span>
                        <span>{roomPrice.toLocaleString()}đ</span>
                    </div>
                </div>
            </div>

            <hr className="line1"></hr>
            <div className="billing-details">
                <div className="row">
                    <span>Số đêm ở</span>
                    <span>{numNights}</span>
                </div>
                <div className="row">
                    <span>Thành tiền</span>
                    <span>{(roomPrice * numNights).toLocaleString()}đ</span>
                </div>
                <div className="row">
                    <span>Phí dịch vụ</span>
                    <span>{serviceFee.toLocaleString()}đ</span>
                </div>
            </div>

            <div className="total-price row">
                <h3>Tổng phí thuê</h3>
                <p>{totalPrice.toLocaleString()}đ</p>
            </div>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <div className="booking-button-container1">
                <button className="btn-datngay" onClick={handleBookingClick}>Đặt ngay</button>
            </div>
        </div>
    );
};

export default Summary;
