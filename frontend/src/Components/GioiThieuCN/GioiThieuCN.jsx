import React from 'react'
import './GioiThieuCN.css'
import chinhanh1 from '../Assets/image-chinhanh1.png'
import chinhanh2 from '../Assets/image-chinhanh2.png'
import chinhanh3 from '../Assets/image-chinhanh3.png'
import { Link } from 'react-router-dom'

const GioiThieuCN = () => {
    const scrollToTop = () => {
        window.scrollTo(0, 0); // Cuộn lên đầu trang
    };

    return (
        <div className='gioithieu-chinhanh'>
            <div className="container-cn">
                <div className="hotel-card-wrapper">
                    <div className="hotel-card">
                        <Link to="/chi-nhanh-da-nang" onClick={scrollToTop}>
                            <img src={chinhanh1} alt="" />
                        </Link>
                        <h3>BONJOUR DaNang Hotel</h3>
                        <p>36-38 Lâm Hoành, P.Phước Mỹ, quận Sơn Trà, Đà Nẵng</p>
                    </div>
                    <div className="hotel-card">
                        <Link to="/chi-nhanh-nha-trang" onClick={scrollToTop}>
                            <img src={chinhanh2} alt="" />
                        </Link>
                        <h3>BONJOUR NhaTrang Hotel</h3>
                        <p>06 Trần Quang Khải, P. Tân Lập, TP. Nha Trang, Khánh Hòa</p>
                    </div>
                    <div className="hotel-card">
                        <Link to="/chi-nhanh-phu-yen" onClick={scrollToTop}>
                            <img src={chinhanh3} alt="" />
                        </Link>
                        <h3>BONJOUR PhuYen Hotel</h3>
                        <p>51 Độc Lập, phường 7, TP. Tuy Hòa, Phú Yên</p>
                    </div>
                </div>

                <div className="about-section">
                    <h2>VỀ CHÚNG TÔI</h2>
                    <p>Chúng tôi đã đưa vào hoạt động các chi nhánh tại Đà Nẵng, Phú Yên, Bình Định và sẽ sớm mở rộng để chào đón thành viên mới trong tương lai.</p>
                </div>
            </div>

        </div>
    )
}

export default GioiThieuCN
