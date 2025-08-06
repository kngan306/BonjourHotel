import React from 'react'
import './TienIchPhong.css'
import iconlogo from '../Assets/icon-logo.png'

const TienIchPhong = () => {
    return (
        <div className='tienich-phong'>
            <h2>Tiện ích</h2>
            <div className="container-tienich-phong">
                <div className="tienich">
                    <div className="tienich-item">
                        <img src={iconlogo} alt="" />
                        <span>Truyền hình cáp</span>
                    </div>
                    <div className="tienich-item">
                        <img src={iconlogo} alt="" />
                        <span>Wifi miễn phí</span>
                    </div>
                    <div className="tienich-item">
                        <img src={iconlogo} alt="" />
                        <span>Két sắt an toàn</span>
                    </div>
                </div>
                <div className="tienich">
                    <div className="tienich-item">
                        <img src={iconlogo} alt="" />
                        <span>Bình siêu tốc</span>
                    </div>
                    <div className="tienich-item">
                        <img src={iconlogo} alt="" />
                        <span>Đồ dùng nhà tắm</span>
                    </div>
                    <div className="tienich-item">
                        <img src={iconlogo} alt="" />
                        <span>Áo choàng tắm</span>
                    </div>
                </div>
                <div className="tienich">
                    <div className="tienich-item">
                        <img src={iconlogo} alt="" />
                        <span>Máy sấy tóc</span>
                    </div>
                    <div className="tienich-item">
                        <img src={iconlogo} alt="" />
                        <span>Minibar</span>
                    </div>
                    <div className="tienich-item">
                        <img src={iconlogo} alt="" />
                        <span>Nước suối, trà và cà phê gói</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TienIchPhong
