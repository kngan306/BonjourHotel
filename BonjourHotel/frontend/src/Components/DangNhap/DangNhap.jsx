import React, { useState } from 'react';
import './DangNhap.css'
import imagebackground from '../Assets/image-login-register.jpg'
import logo from '../Assets/logo.png'
import iconlogo from '../Assets/icon-logo.png'
import iconuser from '../Assets/icon-user.png'
import iconpass from '../Assets/icon-password.png'
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom'; // Thêm useNavigate để điều hướng
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode'; // Import thư viện giải mã JWT

const DangNhap = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const location = useLocation();
  const navigate = useNavigate(); // Khởi tạo useNavigate
  
  const handleLogin = async () => {
    setError(''); // Đặt lại thông báo lỗi trước khi thực hiện đăng nhập

    if (!username.trim() && !password.trim()) {
      setError('Vui lòng nhập đầy đủ thông tin');
      return;
    }

    if (!username.trim()) {
      setError('Vui lòng nhập tên đăng nhập');
      return;
    }

    if (!password.trim()) {
      setError('Vui lòng nhập mật khẩu');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/login', {
        TaiKhoan: username,
        MatKhau: password
      });


      if (response.data.message === 'Đăng nhập thành công') {
        const { VaiTro } = response.data.user;
        const userData = response.data.user; // Lưu thông tin người dùng từ response

        // Lưu thông tin vào localStorage
        localStorage.setItem('userData', JSON.stringify(userData));

        if (VaiTro === 'Khách hàng') {
          localStorage.setItem('loggedIn', 'true');
          // navigate('/'); // Chuyển đến trang chính nếu là Customer
          const redirectTo = location.state?.from || '/'; // Trả về trang trước đó hoặc trang chính
          navigate(redirectTo);
        } else {
          // setError('Bạn không có quyền truy cập vào chức năng này'); // Hiển thị thông báo lỗi nếu không phải Customer
          window.location.href = 'http://localhost:3001/dashboard'; // Nếu điều hướng sang ứng dụng khác.
        }
      } else {
        setError(response.data.message); // Hiển thị thông báo lỗi từ server nếu đăng nhập không thành công
      }
    } catch (error) {
      console.error('Lỗi khi đăng nhập:', error?.response?.data || error.message);
      setError(error?.response?.data?.message || 'Có lỗi xảy ra. Vui lòng thử lại.');
    }
  };

  // Hàm xử lý thành công Google Login
  const handleGoogleLoginSuccess = async (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse.credential);
    const email = decoded.email;
    const name = decoded.name;

    try {
      const response = await axios.post('http://localhost:5000/api/google-login', { email, name });

      if (response.data.message === 'Đăng nhập Google thành công') {
        const userData = response.data.user;

        // Lưu thông tin vào localStorage
        localStorage.setItem('userData', JSON.stringify(userData));
        localStorage.setItem('loggedIn', 'true');

        navigate('/'); // Điều hướng đến trang chính
      }
    } catch (error) {
      console.error('Lỗi khi xử lý đăng nhập bằng Google:', error);
      setError('Đăng nhập bằng Google thất bại. Vui lòng thử lại.');
    }
  };

  const handleGoogleLoginFailure = () => {
    console.log('Google login failed');
    setError('Đăng nhập bằng Google thất bại. Vui lòng thử lại.');
  };

  return (
    //google developer console
    //Client ID thực tế từ Google Developer Console
    <GoogleOAuthProvider clientId="787274272440-askmvl9clus44s2lbbvg2p69gv7kbu86.apps.googleusercontent.com">
      <div className='dang-nhap'>
        {/* <div className="logo">
          <img src={logo} alt="" />
        </div> */}
        <div className="container-dang-nhap">
          <div className="logo-container">
            <img src={iconlogo} alt="" />
            <span>BONJOUR HOTEL</span>
          </div>
          <h1>Đăng nhập</h1>
          <div className="input-group">
            <input type="text" placeholder='Tên đăng nhập' value={username} onChange={(e) => setUsername(e.target.value)} />
            <img src={iconuser} alt="" />
          </div>
          <div className="input-group">
            <input type="password" placeholder='Mật khẩu' value={password} onChange={(e) => setPassword(e.target.value)} />
            <img src={iconpass} alt="" />
          </div>
          {error && <p className="error-message">{error}</p>}
          <div class="options">
            <label className='checkbox'>
              <input type="checkbox" />Nhớ mật khẩu
            </label>
            <a href="#" className='forgot-pass'>Quên mật khẩu?</a>
          </div>

          <button onClick={handleLogin}>Đăng nhập</button>
          <span className="google-login">
            {/* <img src={googleIcon} alt="Google logo" className="google-icon" />
          Đăng nhập bằng Google */}
            <GoogleLogin
              onSuccess={handleGoogleLoginSuccess}
              onError={handleGoogleLoginFailure}
            />
          </span>

          <span className="existing-account">Bạn chưa có tài khoản? Ấn vào đây để <a href="/register">đăng ký</a></span>
        </div>
      </div>
    </GoogleOAuthProvider>
  )
}

export default DangNhap
