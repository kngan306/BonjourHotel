import React from 'react'
import Slider from 'react-slick'
import './GioiThieuKS.css'
import imgheader from '../Assets/image-header-trangchu.png'
import imggtks from '../Assets/image-gioithieuphong-chinhanh.png'
import imggtks2 from '../Assets/image-gioithieuphong-chinhanh3.png'

const GioiThieuKS = () => {
    const images = [imggtks, imggtks2];

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

        <div className='gioithieu-khachsan'>
            <div>
                <img className='img-header' src={imgheader} alt="" />
            </div>
            <div className="container-ks">
                <div className="content-left">
                    <h1>BONJOUR HOTEL</h1>
                    <p>Chuỗi khách sạn đang đặt dấu ấn trên bờ biển miền Trung cũng như trong lòng du khách yêu biển. Bên cạnh việc mang đến những trải nghiệm thư giãn, dịch vụ đẳng cấp, chúng tôi mong muốn đưa các giá trị truyền thống, văn hóa ẩm thực riêng của từng vùng đến gần hơn với du khách.</p>
                </div>
                <div className="content-right">
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
    )
}

export default GioiThieuKS
