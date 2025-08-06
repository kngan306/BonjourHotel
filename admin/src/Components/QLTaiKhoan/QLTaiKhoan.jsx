import React, { useState } from 'react';
import './QLTaiKhoan.css';
import iconsearch from '../Assets/icon-search.png';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const QLTaiKhoan = ({ openPopupCreate, openPopupUpdate }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('--Tất cả--');
  const [selectedStatus, setSelectedStatus] = useState('--Tất cả--');
  const [currentPage, setCurrentPage] = useState(1);

  const rowsPerPage = 5; // Number of rows per page

  // Sample data for demonstration, replace with your actual data
  const users = [
    { id: 1, username: 'admin', name: 'Nguyễn Thanh Tùng', role: 'Quản lý', status: 'Đang hoạt động' },
    { id: 2, username: 'user1', name: 'Phạm Anh Duy', role: 'Khách hàng', status: 'Đang hoạt động' },
    { id: 3, username: 'user2', name: 'Trần Huyền My', role: 'Khách hàng', status: 'Đang hoạt động' },
    { id: 4, username: 'staff1', name: 'Lê Thị Thu Diễm', role: 'Nhân viên', status: 'Đang hoạt động' },
    { id: 5, username: 'staff2', name: 'Trần Đăng Dương', role: 'Nhân viên', status: 'Đang hoạt động' },
    { id: 6, username: 'user2', name: 'Lê Thanh Tâm', role: 'Nhân viên', status: 'Tạm khoá' },
    { id: 7, username: 'user3', name: 'Trần Minh Tuấn', role: 'Admin', status: 'Đang hoạt động' },
    { id: 8, username: 'user4', name: 'Phan Hữu Tâm', role: 'Khách hàng', status: 'Đang hoạt động' },
    { id: 9, username: 'user5', name: 'Nguyễn Minh Thư', role: 'Khách hàng', status: 'Tạm khoá' },
    { id: 10, username: 'user6', name: 'Đoàn Thiên Hữu', role: 'Nhân viên', status: 'Đang hoạt động' },
    { id: 11, username: 'user7', name: 'Nguyễn Hoàng Tâm', role: 'Admin', status: 'Đang hoạt động' },
    { id: 12, username: 'user8', name: 'Võ Thiên Phúc', role: 'Khách hàng', status: 'Đang hoạt động' },
    { id: 13, username: 'user9', name: 'Trần Thiên Hữu', role: 'Nhân viên', status: 'Tạm khoá' },
    { id: 14, username: 'user10', name: 'Lê Thiện Khánh', role: 'Admin', status: 'Đang hoạt động' },
  ];

  // Lọc và tìm kiếm
  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole === '--Tất cả--' || user.role === selectedRole;
    const matchesStatus = selectedStatus === '--Tất cả--' || user.status === selectedStatus;

    return matchesSearch && matchesRole && matchesStatus;
  });

  // Pagination logic
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredUsers.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(filteredUsers.length / rowsPerPage);

  const handlePageChange = (newPage) => setCurrentPage(newPage);

  return (
    <div className='ql-taikhoan'>
      <div className="container-ql-taikhoan">
        <div className="option-ql-taikhoan">
          <div className="search">
            <img src={iconsearch} alt="" />
            <input
              type="text"
              placeholder="Tìm kiếm..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="role">Vai trò:</label>
            <select
              id="role"
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
            >
              <option value="--Tất cả--">--Tất cả--</option>
              <option value="Admin">Admin</option>
              <option value="Nhân viên">Nhân viên</option>
              <option value="Khách hàng">Khách hàng</option>
            </select>
          </div>
          <div>
            <label htmlFor="status">Trạng thái:</label>
            <select
              id="status"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option value="--Tất cả--">--Tất cả--</option>
              <option value="Đang hoạt động">Đang hoạt động</option>
              <option value="Tạm khoá">Tạm khoá</option>
            </select>
          </div>
          <button className="btn-create" onClick={openPopupCreate}>Thêm tài khoản</button>
        </div>
        <div className="content-table-ql-taikhoan">
          <div className="table-responsive-ql-taikhoan">
            <table>
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Tên đăng nhập</th>
                  <th>Tên người dùng</th>
                  <th>Vai trò</th>
                  <th>Trạng thái</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {currentRows.map((user, index) => (
                  <tr key={user.id}>
                    <td>{indexOfFirstRow + index + 1}</td>
                    <td>{user.username}</td>
                    <td>{user.name}</td>
                    <td>{user.role}</td>
                    <td>{user.status}</td>
                    <td className='btn-action'>
                      <button className="btn-update" onClick={openPopupUpdate}>Chi tiết</button>
                      <button className="btn-delete">Xóa</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Pagination controls */}
          <div className="pagination">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <FaChevronLeft />
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                className={currentPage === i + 1 ? 'active' : ''}
                onClick={() => handlePageChange(i + 1)}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <FaChevronRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QLTaiKhoan;
