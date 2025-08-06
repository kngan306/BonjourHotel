import React, { useState } from 'react';
import './DangKy.css'
import imagebackground from '../Assets/image-login-register.jpg'
import logo from '../Assets/logo.png'
import iconlogo from '../Assets/icon-logo.png'
import iconuser from '../Assets/icon-user.png'
import iconpass from '../Assets/icon-password.png'
import iconemail from '../Assets/icon-email.png'
import iconrepeat from '../Assets/icon-repeatpass.png'
import iconotp from '../Assets/iconotp.png'
import iconfullname from '../Assets/iconfullname.png'
import iconphone from '../Assets/iconphone.png'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const DangKy = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [fullName, setFullName] = useState('');
    const [phone, setPhone] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [otp, setOtp] = useState('');
    const [otpSent, setOtpSent] = useState(false);
    const [otpVerified, setOtpVerified] = useState(false);

    const handleSendOtp = async () => {
        if (!email) {
            setError('Vui lòng nhập Email');
            return;
        }    
        try {
            await axios.post('http://localhost:5000/api/send-otp', { email });
            setOtpSent(true);
            alert('OTP đã được gửi đến email của bạn');
        } catch (error) {
            if (error.response && error.response.status === 400) {
                setError(error.response.data.message); // Email đã tồn tại
            } else {
                setError('Có lỗi xảy ra khi gửi OTP');
            }
        }
    };

    const handleVerifyOtp = async () => {
        if (!otp) {
            setError('Vui lòng nhập mã OTP');
            return;
        }
        try {
            const response = await axios.post('http://localhost:5000/api/verify-otp', { email, otp });
            if (response.status === 200) {
                setOtpVerified(true);
                setOtpSent(false); // Ẩn trường nhập OTP khi xác thực thành công
                alert('Xác thực OTP thành công');
            }
        } catch (error) {
            setError('OTP không hợp lệ');
        }
    };

    const handleRegister = async () => {
        if (!email || !fullName || !phone || !username || !password || !confirmPassword) {
            setError('Vui lòng điền đầy đủ thông tin');
            return;
        }
        if (password !== confirmPassword) {
            setError('Mật khẩu và mật khẩu xác nhận không khớp');
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/api/register', {
                Email: email,
                TenKH: fullName,
                SDT: phone,
                TaiKhoan: username,
                MatKhau: password
            });
            alert('Đăng ký thành công');
            setError(''); // Xóa lỗi nếu đăng ký thành công
            navigate('/login');
        } catch (error) {
            setError('Có lỗi xảy ra. Vui lòng thử lại.');
        }
    };
    return (
        <div className='dang-ky'>
            {/* <div className="logo">
                <img src={logo} alt="" />
            </div> */}
            <div className="container-dang-ky">
                <div className="logo-container">
                    <img src={iconlogo} alt="" />
                    <span>BONJOUR HOTEL</span>
                </div>
                <h1>Đăng ký</h1>
                {error && <p className="error-message">{error}</p>}
                <div className="input-group">
                    <input type="email" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                    <img src={iconemail} alt="" />
                </div>
                {!otpSent && !otpVerified && (
                    <button onClick={handleSendOtp}>Gửi OTP</button>
                )}
                {otpSent && !otpVerified && (
                    <div className="input-group">
                        <input type="text" placeholder='Nhập OTP' value={otp} onChange={(e) => setOtp(e.target.value)} />
                        <img src={iconotp} alt="" />
                        <button onClick={handleVerifyOtp}>Xác thực OTP</button>
                    </div>
                )}
                {otpVerified && (
                    <>
                        <div className="input-group">
                            <input type="text" placeholder='Họ và tên' value={fullName} onChange={(e) => setFullName(e.target.value)} />
                            <img src={iconfullname} alt="" />
                        </div>
                        <div className="input-group">
                            <input type="phone" placeholder='Số điện thoại' value={phone} onChange={(e) => setPhone(e.target.value)} />
                            <img src={iconphone} alt="" />
                        </div>
                        <div className="input-group">
                            <input type="text" placeholder='Tên đăng nhập' value={username} onChange={(e) => setUsername(e.target.value)} />
                            <img src={iconuser} alt="" />
                        </div>
                        <div className="input-group">
                            <input type="password" placeholder='Mật khẩu' value={password} onChange={(e) => setPassword(e.target.value)} />
                            <img src={iconpass} alt="" />
                        </div>
                        <div className="input-group">
                            <input type="password" placeholder='Nhập lại mật khẩu' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                            <img src={iconrepeat} alt="" />
                        </div>
                        <button onClick={handleRegister}>Đăng ký</button>
                    </>
                )}
                <span className="existing-account">Bạn đã có tài khoản? Ấn vào đây để <a href="/login">đăng nhập</a></span>
            </div>
        </div>
    )
}

export default DangKy
