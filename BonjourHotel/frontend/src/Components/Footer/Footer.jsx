import React from 'react'
import './Footer.css'
import { Link } from 'react-router-dom';

const Footer = () => {
    const scrollToTop = () => {
        window.scrollTo(0, 0); // Cuộn lên đầu trang
    };

  return (
    <footer>
    <div className="footer-container">
        <div className="footer-section">
            <h3>BONJOUR HOTEL</h3>
            <p>36 - 38 Lâm Hoành, phường Phước Mỹ, quận Sơn Trà, Đà Nẵng</p>
            <p>Hotline: 1900 1234 / 1900 2345</p>
            <p>Email: bonjourhotel@gmail.com</p>
        </div>
        <div className="footer-section">
            <h3>CHI NHÁNH</h3>
            <p><Link to="/chi-nhanh-da-nang" onClick={scrollToTop}>BONJOUR DaNang Hotel</Link></p>
            <hr />
            <p><Link to="/chi-nhanh-nha-trang" onClick={scrollToTop}>BONJOUR NhaTrang Hotel</Link></p>
            <hr />
            <p><Link to="/chi-nhanh-phu-yen" onClick={scrollToTop}>BONJOUR PhuYen Hotel</Link></p>
        </div>
        <div className="footer-section">
            <h3>ĐIỀU KHOẢN & ĐIỀU KIỆN</h3>
            <p><Link to="/dieu-khoan-dich-vu" onClick={scrollToTop}>Điều khoản</Link></p>
            <hr />
            <p><Link to="/chinh-sach-bao-mat" onClick={scrollToTop}>Chính sách bảo mật thông tin</Link></p>
        </div>
    </div>
</footer>
  )
}

export default Footer
