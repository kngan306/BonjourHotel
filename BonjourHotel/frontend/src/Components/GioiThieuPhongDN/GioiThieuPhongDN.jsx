import React from 'react'
import { Link } from 'react-router-dom';
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './GioiThieuPhongDN.css'
import imgphongdn from '../Assets/image-gioithieuphong-chinhanh.png'
import imgphongdn2 from '../Assets/image-gioithieuphong-chinhanh2.png'
import imgphongdn3 from '../Assets/image-gioithieuphong-chinhanh3.png'
import iconroomsize from '../Assets/icon-roomsize.png'
import iconview from '../Assets/icon-view.png'
import iconbed from '../Assets/icon-bed.png'
import iconpeople from '../Assets/icon-people.png'
import iconbathroom from '../Assets/icon-bathroom.png'
import iconprevious from '../Assets/icon-previous.png'
import iconnext from '../Assets/icon-next.png'

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

const GioiThieuPhongDN = () => {

    const images = [imgphongdn, imgphongdn2, imgphongdn3];

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

    const scrollToTop = () => {
        window.scrollTo(0, 0); // Cuộn lên đầu trang
    };

    return (
        <div className='gioithieu-phongdn'>
            <div className="container-phongdn">
                <div className="content-phongdn">
                    <div className="content-phongdn-left">
                        <h2>JUNIOR ROOM</h2>
                        <p>Phòng được thiết kế tinh tế với giường king-size mang đến không gian sang trọng và thoải mái. Cửa sổ lớn mở ra tầm nhìn biển tuyệt đẹp, cùng với phòng tắm riêng sang trọng và các tiện nghi hiện đại. Thật lý tưởng để thư giãn và tận hưởng kỳ nghỉ hoàn hảo bên bờ biển.</p>
                        <ul>
                            <li>
                                <img src={iconroomsize} alt="" />
                                Room size: 48m2
                            </li>
                            <li>
                                <img src={iconview} alt="" />
                                View: Trực diện biển
                            </li>
                            <li>
                                <img src={iconbed} alt="" />
                                Giường: 01 giường đôi
                            </li>
                            <li>
                                <img src={iconpeople} alt="" />
                                Số lượng người ở: 02
                            </li>
                            <li>
                                <img src={iconbathroom} alt="" />
                                Phòng tắm: Bồn tắm và vòi sen
                            </li>
                        </ul>
                        <Link to="/danh-sach-phong-da-nang" onClick={scrollToTop} className='no-decoration'>
                            <button className='btn-datphong'>Đặt phòng</button>
                        </Link>
                        <p className='xem-tatca-phong'><Link to="/danh-sach-phong-da-nang" onClick={scrollToTop}>Xem tất cả phòng</Link></p>
                    </div>
                    <div className="content-phongdn-right">
                        {/* <img src={imgphongdn} alt="" /> */}
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
                </div>
            </div>
        </div>
    )
}

export default GioiThieuPhongDN
