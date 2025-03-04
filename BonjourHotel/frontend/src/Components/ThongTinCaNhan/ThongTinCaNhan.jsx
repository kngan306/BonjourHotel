import React, { useState, useEffect } from 'react';
import './ThongTinCaNhan.css';
import avatar from '../Assets/avt-customer.jpg';
import { FaSignOutAlt } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ThongTinCaNhan = () => {

    const [adminInfo, setAdminInfo] = useState({
        name: '',
        phone: '',
        email: '',
        gender: '',
        dob: ''
    });

    const navigate = useNavigate(); // Khởi tạo useNavigate

    // Lấy thông tin khách hàng từ server
    useEffect(() => {
        const fetchUserData = async () => {
            const userData = JSON.parse(localStorage.getItem('userData'));

            if (userData && userData.MaKH) {
                try {
                    const response = await axios.get(`http://localhost:5000/api/khachhang/${userData.MaKH}`);
                    const data = response.data;

                    // Cập nhật state với dữ liệu từ server
                    setAdminInfo({
                        name: data.TenKH || '',
                        phone: data.SDT || '',
                        email: data.Email || '',
                        gender: data.GioiTinh || '',
                        dob: data.NgaySinh ? data.NgaySinh.slice(0, 10) : ''
                    });
                } catch (error) {
                    console.error("Lỗi khi tải thông tin khách hàng:", error);
                }
            }
        };

        fetchUserData();
    }, []);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setAdminInfo({ ...adminInfo, [name]: value });
    };

    const handleSave = async () => {
        // Cập nhật thông tin khách hàng trên server
        try {
            const userData = JSON.parse(localStorage.getItem('userData'));

            await axios.put(`http://localhost:5000/api/khachhang/update-detail/${userData.MaKH}`, {
                TenKH: adminInfo.name,
                SDT: adminInfo.phone,
                Email: adminInfo.email,
                GioiTinh: adminInfo.gender,
                NgaySinh: adminInfo.dob
            });

            // Cập nhật lại localStorage
            localStorage.setItem('userData', JSON.stringify({
                ...userData,
                TenKH: adminInfo.name,
                SDT: adminInfo.phone,
                Email: adminInfo.email,
                GioiTinh: adminInfo.gender,
                NgaySinh: adminInfo.dob
            }));

            alert('Lưu thông tin thành công!');
        } catch (error) {
            console.error("Lỗi khi lưu thông tin khách hàng:", error);
            alert('Có lỗi xảy ra khi lưu thông tin');
        }
    };

    const handleLogout = () => {
        if (window.confirm('Bạn có muốn đăng xuất không?')) {
            localStorage.setItem('loggedIn', 'false');
            localStorage.removeItem('userData');
            navigate('/login'); // Chuyển hướng về trang đăng nhập
        }
    };

    return (
        <div className='thongtin-canhan'>
            <div className="admin-info-container">
                <h1>THÔNG TIN CÁ NHÂN</h1>
                <div className="container-content">
                    <div className="left-section-ttcn">
                        <div className="admin-avatar">
                            <img src={avatar} alt="Admin" className="admin-logo" />
                        </div>
                        <button onClick={handleLogout} className="logout-link">
                            <FaSignOutAlt className="logout-icon" />Đăng xuất
                        </button>
                    </div>
                    <div className="right-section-ttcn">
                        <div className="admin-form">
                            <div className="form-group-ttcn">
                                <label>Tên khách hàng:</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={adminInfo.name}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group-ttcn">
                                <label>Số điện thoại:</label>
                                <input
                                    type="text"
                                    name="phone"
                                    value={adminInfo.phone}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group-ttcn">
                                <label>Email:</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={adminInfo.email}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group-ttcn">
                                <label>Giới tính:</label>
                                {/* <input
                                    type="text"
                                    name="gender"
                                    value={adminInfo.gender}
                                    onChange={handleChange}
                                /> */}
                                <select
                                    name="gender"
                                    value={adminInfo.gender}
                                    onChange={handleChange}
                                >
                                    <option value="Nam">Nam</option>
                                    <option value="Nữ">Nữ</option>
                                </select>
                            </div>
                            <div className="form-group-ttcn">
                                <label>Ngày sinh:</label>
                                <input
                                    type="date"
                                    name="dob"
                                    value={adminInfo.dob}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="button-group-ttcn">
                                <button onClick={handleSave} className="save-button-ttcn">Lưu</button>
                                <button onClick={() => navigate(-1)} className="back-button-ttcn">Quay lại</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ThongTinCaNhan
