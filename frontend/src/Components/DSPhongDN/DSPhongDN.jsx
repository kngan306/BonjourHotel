import React, { useEffect, useState } from 'react';
import './DSPhongDN.css'
import imgheadercndn from '../Assets/image-header-chinhanhdn.png'
import icondoubleright from '../Assets/icon-doubleright.png'
import iconmorethan from '../Assets/icon-morethan.png'
import iconbed2 from '../Assets/icon-bed2.png'
import iconbathroom2 from '../Assets/icon-bathroom2.png'
import imagephong1 from '../Assets/image-phong1.png'
import { Link } from 'react-router-dom'
import axios from 'axios'; // Thêm axios để gọi API

const DSPhongDN = () => {
    const scrollToTop = () => {
        window.scrollTo(0, 0); // Cuộn lên đầu trang
    };

    const [rooms, setRooms] = useState([]);
    const [roomTypes, setRoomTypes] = useState([]);
    const [selectedRoomType, setSelectedRoomType] = useState('');
    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/phong-danang'); // Gọi API
                console.log('Dữ liệu nhận được từ API:', response.data); // Kiểm tra dữ liệu
                setRooms(response.data); // Lưu dữ liệu vào state
            } catch (error) {
                console.error('Lỗi khi lấy dữ liệu:', error); // Xử lý lỗi
            }
        };
        const fetchRoomTypes = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/loai-phong');
                console.log('Dữ liệu loại phòng:', response.data);
                setRoomTypes(response.data);
            } catch (error) {
                console.error('Lỗi khi lấy loại phòng:', error);
            }
        };

        fetchRooms();
        fetchRoomTypes();
    }, []);

    const handleRoomTypeChange = (e) => {
        setSelectedRoomType(e.target.value);
    };

    return (
        <div className='ds-phong-danang'>
            <div className="header-img-dn">
                <img src={imgheadercndn} alt="" />
            </div>
            <div className="container-dsphong-danang">
                <div className="breadcrumb">
                    <img src={icondoubleright} alt="" />
                    <h3>BONJOUR DaNang Hotel</h3>
                    <div className="room-filter">
                        <select value={selectedRoomType} onChange={handleRoomTypeChange}>
                            <option value="">Tất cả</option>
                            {roomTypes.map((type) => (
                                <option key={type.MaLP} value={type.MaLP}>{type.TenLP}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="room-grid-wrapper">
                    <div className="room-grid">
                        {rooms.length > 0 ? (
                            rooms
                                .filter(room => selectedRoomType ? room.MaLP === selectedRoomType : true) // Lọc theo loại phòng
                                .map((room) => (
                                    <div className="room-card" key={room.MaPhong}>
                                        <Link to={`/chi-tiet-phong/${room.MaPhong}`} onClick={scrollToTop}>
                                            <img src={room.HinhAnh1 || imagephong1} alt="" />
                                        </Link>
                                        <div className="room-info">
                                            <h3>{room.TenPhong}</h3>
                                            <div className="details">
                                                <span>
                                                    <img src={iconbed2} alt="" />
                                                    <p>{room.SLGiuong} Giường</p>
                                                </span>
                                                <span>
                                                    <img src={iconbathroom2} alt="" />
                                                    <p>{room.SLPhongTam} Phòng tắm</p>
                                                </span>
                                            </div>
                                            {(room.TrangThai === 'Đang thuê' || room.TrangThai === 'Đã đặt') && (
                                                <div className="sold-out">HẾT PHÒNG</div>
                                            )}
                                        </div>
                                    </div>
                                ))
                        ) : (
                            <p>Không có dữ liệu phòng nào.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DSPhongDN
