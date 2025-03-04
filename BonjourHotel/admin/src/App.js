import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import HotelManagement from './Pages/HotelManagement';
import ServiceManagement from './Pages/ServiceManagement';
import RoomTypeManagement from './Pages/RoomTypeManagement';
import RoomManagement from './Pages/RoomManagement';
import BookingManagement from './Pages/BookingManagement';
import EmployeeManagement from './Pages/EmployeeManagement';
import AccountManagement from './Pages/AccountManagement';
import { GiHamburgerMenu } from "react-icons/gi";
// import logo from './Components/Assets/image-logo.png';
import logo from './Components/Assets/logo-admin.png';
import vietnamFlag from './Components/Assets/vietnam-flag.png'
import profile from './Components/Assets/image-avatar-admin.png'
import CustomerManagement from './Pages/CustomerManagement';
import { Dashboard } from './Pages/Dashboard';

function App() {

  // Khởi tạo showNav với giá trị true để navbar hiển thị mặc định
  const [showNav, setShowNav] = useState(true);

  // Toggle nav visibility
  const toggleNav = () => {
    setShowNav(!showNav);
  };

  return (
    <Router>
      <header>
        {/* <GiHamburgerMenu onClick={() => setShowNav(!showNav)} /> */}
        <div className='logo' >
          <img src={logo} onClick={() => setShowNav(!showNav)} />
        </div>
        <div className='nav-profile'>
          <div className="flag">
            <img src={vietnamFlag} alt="Vietnam Flag" />
          </div>
          <div className="profile">
            <img src={profile} alt="Profile" />
          </div>
        </div>
      </header>

      <div className={`app ${showNav ? 'navbar-active' : ''}`}>
        <Navbar show={showNav} toggleNav={toggleNav} />
        <div className='main'>
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path='/quan-ly-khach-san' element={<HotelManagement />} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/quan-ly-dich-vu' element={<ServiceManagement />} />
            <Route path='/quan-ly-loai-phong' element={<RoomTypeManagement />} />
            <Route path='/quan-ly-phong' element={<RoomManagement />} />
            <Route path='/quan-ly-don-dat-phong' element={<BookingManagement />} />
            <Route path='/quan-ly-nhan-vien' element={<EmployeeManagement />} />
            <Route path='/quan-ly-khach-hang' element={<CustomerManagement />} />
            <Route path='/quan-ly-tai-khoan' element={<AccountManagement />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
