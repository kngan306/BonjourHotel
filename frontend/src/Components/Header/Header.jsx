import React, { useEffect, useState } from 'react';
import './Header.css';
import logo from '../Assets/logo.png';
import profile from '../Assets/profile.png';
import avatar from '../Assets/avt-customer.jpg';
import vietnamFlag from '../Assets/vietnam-flag.png';
import { Link } from 'react-router-dom';

const Header = () => {
    const [activeLink, setActiveLink] = useState('');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const loggedInStatus = localStorage.getItem('loggedIn') === 'true';
        setIsLoggedIn(loggedInStatus);
    }, []);

    const handleLinkClick = (link) => {
        setActiveLink(link);
        if (link === 'room') {
            setIsDropdownOpen((prev) => !prev); // Toggle dropdown on click
        } else {
            setIsDropdownOpen(false);
        }
        setIsMenuOpen(false); // Close menu after selecting a link
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header>
            <div className="logo">
                <img src={logo} alt="Bonjour Hotel Logo" />
            </div>

            {/* Center section for dropdown icon */}
            <div className="center-section">
                <div className="dropdown-icon" onClick={toggleMenu}>
                    ☰ {/* Icon for dropdown menu */}
                </div>
            </div>

            <div className={`nav-profile ${isMenuOpen ? 'show' : ''}`}>
                <nav>
                    <ul className={isMenuOpen ? 'show' : ''}>
                        <li>
                            <Link to="/" className={`nav-link ${activeLink === 'home' ? 'active' : ''}`} onClick={() => handleLinkClick('home')}>
                                TRANG CHỦ
                            </Link>
                        </li>
                        <li className="dropdown">
                            <Link to="#" className={`nav-link ${activeLink === 'room' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); handleLinkClick('room'); }}>
                                PHÒNG
                            </Link>
                            {isDropdownOpen && (
                                <ul className="dropdown-menu">
                                    <li><Link to="/chi-nhanh-da-nang" onClick={() => handleLinkClick('room')}>Đà Nẵng</Link></li>
                                    <li><Link to="/chi-nhanh-nha-trang" onClick={() => handleLinkClick('room')}>Nha Trang</Link></li>
                                    <li><Link to="/chi-nhanh-phu-yen" onClick={() => handleLinkClick('room')}>Phú Yên</Link></li>
                                </ul>
                            )}
                        </li>
                        <li>
                            <Link to="/dich-vu" className={`nav-link ${activeLink === 'service' ? 'active' : ''}`} onClick={() => handleLinkClick('service')}>
                                DỊCH VỤ
                            </Link>
                        </li>
                    </ul>
                </nav>

                <div className="flag">
                    <img src={vietnamFlag} alt="Vietnam Flag" />
                </div>

                <div className="profile">
                    {isLoggedIn ? (
                        <Link to="/thong-tin-ca-nhan">
                            <img src={avatar} alt="Profile" />
                        </Link>
                    ) : (
                        <div className='btn-dangnhap'>
                            <Link to="/login">
                                <button>ĐĂNG NHẬP</button>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
