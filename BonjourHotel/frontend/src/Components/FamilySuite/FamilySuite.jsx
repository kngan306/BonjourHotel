import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom'
import './FamilySuite.css'
import imgheadercndn from '../Assets/image-header-chinhanhdn.png'
import imgfamilysuite from '../Assets/image-family-suite.png'
import imgfamilysuite2 from '../Assets/image-family-suite2.png'
import imgfamilysuite3 from '../Assets/image-family-suite3.png'
import icondoubleright from '../Assets/icon-doubleright.png'
import iconroomsize from '../Assets/icon-roomsize.png'
import iconview from '../Assets/icon-view.png'
import iconbed from '../Assets/icon-bed.png'
import iconpeople from '../Assets/icon-people.png'
import iconbathroom from '../Assets/icon-bathroom.png'
import iconprevious from '../Assets/icon-previous.png'
import iconnext from '../Assets/icon-next.png'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SamplePrevArrow = (props) => {
    const { className, onClick } = props;
    return (
        <div
            className={`${className} custom-arrow`}
            onClick={onClick}
        >
            <img src={iconprevious} alt="Previous" /> {/* Use your left arrow icon here */}
        </div>
    );
};

const SampleNextArrow = (props) => {
    const { className, onClick } = props;
    return (
        <div
            className={`${className} custom-arrow`}
            onClick={onClick}
        >
            <img src={iconnext} alt="Next" /> {/* Use your right arrow icon here */}
        </div>
    );
};

const FamilySuite = () => {
    const { id } = useParams(); // Lấy ID từ URL
    const [roomDetails, setRoomDetails] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRoomDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/phong/${id}`);
                setRoomDetails(response.data);
            } catch (error) {
                console.error('Lỗi khi lấy dữ liệu phòng:', error);
            }
        };

        fetchRoomDetails();
    }, [id]);

    if (!roomDetails) {
        return <p>Đang tải dữ liệu...</p>; // Hiển thị trong khi đang tải dữ liệu
    }

    const scrollToTop = () => {
        window.scrollTo(0, 0); // Cuộn lên đầu trang
    };

    // const images = [imgfamilysuite, imgfamilysuite2, imgfamilysuite3]; //thay hình BE
    // Check if each image exists in roomDetails and use fallback images if missing
    const images = [
        roomDetails.HinhAnh1 || imgfamilysuite,
        roomDetails.HinhAnh2 || imgfamilysuite2,
        roomDetails.HinhAnh3 || imgfamilysuite3
    ];
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: true,
        prevArrow: <SamplePrevArrow />,
        nextArrow: <SampleNextArrow />,
    };

    const handleBooking = () => {
        const loggedIn = localStorage.getItem('loggedIn'); // Kiểm tra trạng thái đăng nhập từ localStorage

        if (!loggedIn) {
            // Nếu chưa đăng nhập, điều hướng tới trang đăng nhập và truyền trang đích qua state
            navigate('/login', { state: { from: `/thong-tin-dat-phong/${id}` } });
            return;
        }
        if (roomDetails.TrangThai === 'Đang thuê' || roomDetails.TrangThai === 'Đã đặt') {
            alert('Không còn phòng trống');
        } else {
            navigate(`/thong-tin-dat-phong/${id}`);
        }
    };


    return (
        <div className='family-suite'>
            <div className="header-img-dn">
                <img src={imgheadercndn} alt="" />
            </div>
            <div className="container-chitiet-phong">
                <div className="breadcrumb">
                    <img src={icondoubleright} alt="" />
                    <Link to="/danh-sach-phong-da-nang" onClick={scrollToTop} className="link">
                        <h3>BONJOUR DaNang Hotel</h3>
                    </Link>
                    <img src={icondoubleright} alt="" />
                    <h3>{roomDetails.TenPhong}</h3>
                </div>
                <div className="content-chitiet-phong">
                    <div className="img-content-chitiet-phong">
                        {/* <img src={imgfamilysuite} alt="" /> */}
                        <Slider {...settings}>
                            {images.map((img, index) => (
                                <img
                                    key={index}
                                    src={img}
                                    alt={`Slide ${index + 1}`}
                                />
                            ))}
                        </Slider>
                    </div>
                    <div className="details-chitiet-phong">
                        <h2>{roomDetails.TenPhong}</h2>
                        <p>{roomDetails.MoTaPhong}</p>
                        <ul>
                            <li>
                                <img src={iconroomsize} alt="" />
                                Room size: {roomDetails.KichThuoc} m²
                            </li>
                            <li>
                                <img src={iconview} alt="" />
                                View:  {roomDetails.ViTri}
                            </li>
                            <li>
                                <img src={iconbed} alt="" />
                                Giường: {roomDetails.SLGiuong} giường
                            </li>
                            <li>
                                <img src={iconpeople} alt="" />
                                Số lượng người ở: {roomDetails.SLNguoi}
                            </li>
                            <li>
                                <img src={iconbathroom} alt="" />
                                Phòng tắm: {roomDetails.SLPhongTam}
                            </li>
                        </ul>
                        <button className='btn-datphong' onClick={handleBooking}>
                            Đặt phòng
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FamilySuite
