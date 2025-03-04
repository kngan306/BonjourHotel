import React from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './ChiNhanhNT.css'
import imgheadercnnt from '../Assets/image-header-chinhanhnt.png'
import imgheadercnnt2 from '../Assets/image-header-chinhanhnt2.png'
import imgtnnt from '../Assets/image-gioithieu-tiennghint.png'

const ChiNhanhNT = () => {
  
    const images = [imgheadercnnt, imgheadercnnt2];

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
        <div className='chinhanh-nhatrang'>
            <div className='header-cnnt'>
                <Slider {...settings}>
                    {images.map((img, index) => (
                        <img
                            key={index}
                            className='img-header-cnnt'
                            src={img}
                            alt={`Slide ${index + 1}`}
                        />
                    ))}
                </Slider>
            </div>

            <div className="container-cnnt">
                <h2 className="text-header-cnnt">BONJOUR NhaTrang Hotel</h2>
                <div className="tiennghi-cnnt">
                    <img src={imgtnnt} alt="" />
                    <div className="text-tiennghi-cnnt">
                        <h2>Tiện nghi</h2>
                        <p>Tọa lạc tại tầng 17 của khách sạn, bể bơi vô cực trên cao cho ta thấy mình bé nhỏ giữa biển trời xanh biếc đến vô cùng. Không chỉ được say sưa cùng ly cocktail trên tay trong không gian Pool Bar hiện đại, cảnh đẹp 360 độ toàn thành phố và biển Nha Trang sẽ khiến bạn ngây ngất chẳng muốn rời.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChiNhanhNT
