import './App.css';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import Home from './Pages/Home';
import TrangChuDN from './Pages/TrangChuDN';
import TrangChuNT from './Pages/TrangChuNT';
import TrangChuPY from './Pages/TrangChuPY';
import DanhSachPhongDN from './Pages/DanhSachPhongDN';
import CTPhongFamilySuite from './Pages/CTPhongFamilySuite';
import Register from './Pages/Register';
import Login from './Pages/Login';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import Services from './Pages/Services';
import ThongTinDatPhong from './Pages/ThongTinDatPhong';
import Provision from './Pages/Provision';
import Polices from './Pages/Polices';
import ThongTinCaNhan from './Components/ThongTinCaNhan/ThongTinCaNhan';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Content />
      </BrowserRouter>
    </div>
  );
}

function Content() {
  const location = useLocation();

  const hideHeaderFooter = location.pathname === '/login' || location.pathname === '/register';

  return (
    <>
      {!hideHeaderFooter && <Header />}
      <Routes>
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/' element={<Home />} />
        <Route path='/dich-vu' element={<Services/>}/>
        <Route path='/thong-tin-ca-nhan' element={<ThongTinCaNhan/>}/>
        <Route path='/dieu-khoan-dich-vu' element={<Provision/>}/>
        <Route path='/chinh-sach-bao-mat' element={<Polices/>}/>
        <Route path='/chi-nhanh-da-nang' element={<TrangChuDN />} />
        <Route path='/chi-nhanh-nha-trang' element={<TrangChuNT />} />
        <Route path='/chi-nhanh-phu-yen' element={<TrangChuPY />} />
        <Route path='/danh-sach-phong-da-nang' element={<DanhSachPhongDN />} />
        <Route path='/chi-tiet-phong/:id' element={<CTPhongFamilySuite />} />
        <Route path='/thong-tin-dat-phong/:id' element={<ThongTinDatPhong/>}/>
      </Routes>
      {!hideHeaderFooter && <Footer />}
    </>
  );
}

export default App;
