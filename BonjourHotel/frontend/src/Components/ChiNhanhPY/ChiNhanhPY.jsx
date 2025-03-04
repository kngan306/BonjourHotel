import React from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './ChiNhanhPY.css'
import imgheadercnpy from '../Assets/image-header-chinhanhpy.png'
import imgheadercnpy2 from '../Assets/image-header-chinhanhpy2.png'
import imgtnpy from '../Assets/image-gioithieu-tiennghipy.png'

const ChiNhanhPY = () => {

  const images = [imgheadercnpy, imgheadercnpy2];

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
      <div className='chinhanh-phuyen'>
          <div className='header-cnpy'>
              <Slider {...settings}>
                  {images.map((img, index) => (
                      <img
                          key={index}
                          className='img-header-cnpy'
                          src={img}
                          alt={`Slide ${index + 1}`}
                      />
                  ))}
              </Slider>
          </div>

          <div className="container-cnpy">
              <h2 className="text-header-cnpy">BONJOUR PhuYen Hotel</h2>
              <div className="tiennghi-cnpy">
                  <img src={imgtnpy} alt="" />
                  <div className="text-tiennghi-cnpy">
                      <h2>Tiện nghi</h2>
                      <p>Từ mặt hồ nước phẳng lặng, Tuy Hòa Beach Club trông như hai thế giới tồn tại song song. Được ngồi dưới kiến trúc đương đại với mây tre thanh tao đậm bản sắc Việt, ngắm nhìn đại dương tựa dải lụa trong gió giúp trải nghiệm ẩm thực của du khách nơi đây thêm mặn mòi, lưu luyến hương vị biển cả.</p>
                  </div>
              </div>
          </div>
      </div>
  )
}

export default ChiNhanhPY
