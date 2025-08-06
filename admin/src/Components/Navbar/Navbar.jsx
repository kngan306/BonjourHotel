import React, { useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';
import { FaHotel } from "react-icons/fa6";
import { MdRoomService } from "react-icons/md";
import { CgMenuLeftAlt } from "react-icons/cg";
import { IoBed } from "react-icons/io5";
import { FaClipboardList } from "react-icons/fa";
import { IoIosPeople } from "react-icons/io";
import { MdEmojiPeople } from "react-icons/md";
import { MdManageAccounts } from "react-icons/md";
import { MdDashboard } from "react-icons/md";
import { GoSidebarCollapse, GoSidebarExpand } from "react-icons/go";

const Navbar = ({ show, toggleNav }) => {
  // Tạo ref cho nút toggle
  const toggleRef = useRef(null);

  useEffect(() => {
    // Khi `show` thay đổi, cập nhật vị trí của toggle button
    if (toggleRef.current) {
      toggleRef.current.style.left = show ? '290px' : '77px'; // Điều chỉnh vị trí
    }
  }, [show]);

  return (
    <div className="navbar-container">
      {/* Sidebar toggle button */}
      <div className="sidebar-toggle" onClick={toggleNav} ref={toggleRef}>
        {show ? <GoSidebarCollapse /> : <GoSidebarExpand />}
      </div>
      <div className={show ? 'navbar active' : 'navbar'}>
        <ul>
          <li>
            <NavLink to="/dashboard">
              <MdDashboard />
              {show && <span>Dashboard</span>}
            </NavLink>
          </li>
        </ul>
        {/* Add other menu items */}
        <ul>
          <li>
            <NavLink to="/quan-ly-khach-san">
              <FaHotel />
              {show && <span>Quản lý khách sạn</span>}
            </NavLink>
          </li>
        </ul>
        <ul>
          <li>
            <NavLink to="/quan-ly-loai-phong">
              <CgMenuLeftAlt />
              {show && <span>Quản lý loại phòng</span>}
            </NavLink>
          </li>
        </ul>
        <ul>
          <li>
            <NavLink to="/quan-ly-phong">
              <IoBed />
              {show && <span>Quản lý phòng</span>}
            </NavLink>
          </li>
        </ul>
        <ul>
          <li>
            <NavLink to="/quan-ly-dich-vu">
              <MdRoomService />
              {show && <span>Quản lý dịch vụ</span>}
            </NavLink>
          </li>
        </ul>
        <ul>
          <li>
            <NavLink to="/quan-ly-khach-hang">
              <MdEmojiPeople />
              {show && <span>Quản lý khách hàng</span>}
            </NavLink>
          </li>
        </ul>
        <ul>
          <li>
            <NavLink to="/quan-ly-don-dat-phong">
              <FaClipboardList />
              {show && <span>Quản lý đơn đặt phòng</span>}
            </NavLink>
          </li>
        </ul>
        <ul>
          <li>
            <NavLink to="/quan-ly-nhan-vien">
              <IoIosPeople />
              {show && <span>Quản lý nhân viên</span>}
            </NavLink>
          </li>
        </ul>
        <ul>
          <li>
            <NavLink to="/quan-ly-tai-khoan">
              <MdManageAccounts />
              {show && <span>Quản lý tài khoản</span>}
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
