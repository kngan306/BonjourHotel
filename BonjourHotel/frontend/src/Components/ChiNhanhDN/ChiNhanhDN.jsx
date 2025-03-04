import React from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './ChiNhanhDN.css'
import imgheadercndn from '../Assets/image-header-chinhanhdn.png'
import imgheadercndn2 from '../Assets/image-header-chinhanhdn2.png'
import imgtndn from '../Assets/image-gioithieu-tiennghidn.png'

const ChiNhanhDN = () => {

    const images = [imgheadercndn, imgheadercndn2];

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: false,
    };

    return (
        <div className='chinhanh-danang'>
            <div className='header-cndn'>
                <Slider {...settings}>
                    {images.map((img, index) => (
                        <img
                            key={index}
                            className='img-header-cndn'
                            src={img}
                            alt={`Slide ${index + 1}`}
                        />
                    ))}
                </Slider>
            </div>

            <div className="container-cndn">
                <h2 className="text-header-cndn">BONJOUR DaNang Hotel</h2>
                <div className="tiennghi-cndn">
                    <img src={imgtndn} alt="" />
                    <div className="text-tiennghi-cndn">
                        <h2>Tiện nghi</h2>
                        <p>Bể bơi vô cực với hàng dừa soi mình nơi mặt nước cùng khu vườn xanh ngát bao quanh sẽ cho bạn cảm giác như được bơi trong lòng khu rừng nhiệt đới thu nhỏ cùng khung cảnh đại dương bao la bên núi Sơn Trà thoai thoải.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChiNhanhDN
