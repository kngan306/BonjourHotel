import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import '../Components/ThongTinDatPhong/ThongTinDatPhong.css'
import icondoubleright from '../Components/Assets/icon-doubleright.png'
import PersonalInfo from '../Components/PersonalInfo/PersonalInfo';
import BookingInfo from '../Components/BookingInfo/BookingInfo';
import ServiceInfo from '../Components/ServiceInfo/ServiceInfo';
import Confirmation from '../Components/Confirmation/Confirmation';
import Summary from '../Components/Summary/Summary';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ThongTinDatPhong = () => {
    const { id } = useParams();  // Lấy roomId từ URL
    const [roomData, setRoomData] = useState(null);
    

    const scrollToTop = () => {
        window.scrollTo(0, 0); // Cuộn lên đầu trang
    };

    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        checkInDate: '',
        checkOutDate: '',
        // spa: false,
        // airportPickup: false,
        // laundry: false,
        // twentyFourService: false,
        selectedServices: {}, // Khởi tạo selectedServices là một đối tượng trống
        termsAccepted: false,
    });

    useEffect(() => {
        const fetchRoomData = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/phong/${id}`);
                setRoomData(response.data);  // Lưu dữ liệu phòng vào state
            } catch (error) {
                console.error("Lỗi khi lấy thông tin phòng:", error);
            }
        };
        fetchRoomData();
    }, [id]);

    useEffect(() => {
        // Lấy thông tin khách hàng từ localStorage
        const userData = JSON.parse(localStorage.getItem('userData'));
        if (userData) {
            setFormData({
                ...formData,
                name: userData.TenKH || '',
                phone: userData.SDT || '',
                email: userData.Email || ''
            });
        }
    }, []);
    

    return (
        <div className='thongtin-datphong'>
            <div className="breadcrumb">
                <img src={icondoubleright} alt="" />
                <Link to="/danh-sach-phong-da-nang" onClick={scrollToTop} className="link">
                    <h3>BONJOUR DaNang Hotel</h3>
                </Link>
                <img src={icondoubleright} alt="" />

                {roomData && (
                    <Link to={`/chi-tiet-phong/${id}`} onClick={scrollToTop} className="link">
                        <h3>{roomData.TenPhong}</h3>
                    </Link>
                )}
                <img src={icondoubleright} alt="" />
                <h3>Thông tin đặt phòng</h3>
            </div>
            <div className="booking-page">
                {/* Cột bên trái: Thông tin cá nhân và thông tin đặt phòng */}
                <div className="left-column">
                    <PersonalInfo formData={formData} setFormData={setFormData} />
                    <BookingInfo formData={formData} setFormData={setFormData} />
                    <ServiceInfo formData={formData} setFormData={setFormData} />
                    <Confirmation formData={formData} setFormData={setFormData} />
                </div>

                {/* Cột bên phải: Tóm tắt và hóa đơn */}
                <div className="right-column">
                    <Summary formData={formData} roomData={roomData} /> {/* Truyền roomData */}
                </div>
            </div>
        </div>
    )
}

export default ThongTinDatPhong
