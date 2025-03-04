import React, { useState } from 'react';
import './QLNhanVien.css';
import iconsearch from '../Assets/icon-search.png';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'; // Import for pagination arrows

const QLNhanVien = ({ openPopupCreate, openPopupUpdate }) => {
  // Sample data (to be replaced with actual data)
  const data = [
    { id: 'NV001', name: 'Lê Thị Thu Diễm', phone: '0987612345', email: 'lttdiem98@gmail.com', gender: 'Nữ', dob: '11/07/1998', address: 'Đồng Nai', hireDate: '13/06/2022', branch: 'Nha Trang' },
    { id: 'NV002', name: 'Trần Đăng Dương', phone: '0912345678', email: 'duongtran02@gmail.com', gender: 'Nam', dob: '31/08/2000', address: 'Hải Dương', hireDate: '28/02/2023', branch: 'Đà Nẵng' },
    { id: 'NV003', name: 'Phạm Bảo Khang', phone: '0987654321', email: 'baokhangph@gmail.com', gender: 'Nam', dob: '05/05/1999', address: 'Hồ Chí Minh', hireDate: '16/06/2022', branch: 'Nha Trang' },
    { id: 'NV004', name: 'Phạm Lưu Thùy Ngân', phone: '0912873465', email: 'nganthuy01gmail.com', gender: 'Nữ', dob: '13/06/1988', address: 'Cần Thơ', hireDate: '30/07/2020', branch: 'Phú Yên' },
    { id: 'NV005', name: 'Phạm Anh Quân', phone: '0192837465', email: 'quanap@gmail.com', gender: 'Nam', dob: '24/01/1997', address: 'Hà Nội', hireDate: '22/05/2021', branch: 'Phú Yên' },
    { id: 'NV006', name: 'Nguyễn Quang Anh', phone: '0123456789', email: 'anhnguyen18@gmail.com', gender: 'Nam', dob: '18/03/2001', address: 'Thanh Hóa', hireDate: '07/08/2024', branch: 'Nha Trang' },
    { id: 'NV007', name: 'Đặng Thành An', phone: '0877123456', email: 'thanhandang@gmail.com', gender: 'Nam', dob: '12/04/2001', address: 'Hồ Chí Minh', hireDate: '07/05/2023', branch: 'Đà Nẵng' },
    { id: 'NV008', name: 'Trần Phong Hòa', phone: '0823145769', email: 'phoatran@gmail.com', gender: 'Nữ', dob: '06/03/1995', address: 'Hải Phòng', hireDate: '19/07/2021', branch: 'Đà Nẵng' },
    { id: 'NV009', name: 'Trần Minh Hiếu', phone: '0879651234', email: 'hieuminhtr99@gmail.com', gender: 'Nam', dob: '28/09/1999', address: 'Hồ Chí Minh', hireDate: '15/03/2022', branch: 'Phú Yên' },
    { id: 'NV010', name: 'Nguyễn Trường Sinh', phone: '0729134568', email: 'nguyensinh@gmail.com', gender: 'Nam', dob: '17/09/1991', address: 'Đồng Nai', hireDate: '27/08/2022', branch: 'Đà Nẵng' },
    { id: 'NV011', name: 'Lê Quang Hùng', phone: '0945127839', email: 'hunglee97@gmail.com', gender: 'Nam', dob: '07/10/1997', address: 'Huế', hireDate: '01/11/2020', branch: 'Nha Trang' },
    { id: 'NV012', name: 'Hoàng Kim Long', phone: '0129834065', email: 'hoangklong@gmail.com', gender: 'Nam', dob: '06/03/1994', address: 'Hà Nội', hireDate: '27/03/2019', branch: 'Phú Yên' },
  ];

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBranch, setSelectedBranch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const rowsPerPage = 5;

  // Lọc dữ liệu theo tìm kiếm và chi nhánh
  const filteredData = data.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBranch = selectedBranch ? item.branch === selectedBranch : true;
    return matchesSearch && matchesBranch;
  });

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredData.slice(indexOfFirstRow, indexOfLastRow);

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className='ql-nhanvien'>
      <div className="container-ql-nhanvien">
        <div className="option-ql-nhanvien">
          <div className="search">
            <img src={iconsearch} alt="" />
            <input
              type="text"
              placeholder="Tìm kiếm theo tên..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="branch">Chi nhánh:</label>
            <select id='branch'>
              <option value="">--Tất cả--</option>
              <option value="Đà Nẵng">Đà Nẵng</option>
              <option value="Nha Trang">Nha Trang</option>
              <option value="Phú Yên">Phú Yên</option>
            </select>
          </div>
          <button className="btn-create" onClick={openPopupCreate}>Thêm nhân viên</button>
        </div>
        <div className="content-table-ql-nhanvien">
          <div className="table-responsive-ql-nhanvien">
            <table>
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Mã NV</th>
                  <th>Tên NV</th>
                  <th>Số điện thoại</th>
                  <th>Email</th>
                  <th>Giới tính</th>
                  <th>Ngày sinh</th>
                  <th>Địa chỉ</th>
                  <th>Ngày vào làm</th>
                  <th>Chi nhánh</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {currentRows.map((row, index) => (
                  <tr key={row.id}>
                    <td>{indexOfFirstRow + index + 1}</td>
                    <td>{row.id}</td>
                    <td>{row.name}</td>
                    <td>{row.phone}</td>
                    <td>{row.email}</td>
                    <td>{row.gender}</td>
                    <td>{row.dob}</td>
                    <td>{row.address}</td>
                    <td>{row.hireDate}</td>
                    <td>{row.branch}</td>
                    <td className='btn-action'>
                      <button className="btn-update" onClick={openPopupUpdate}>Chi tiết</button>
                      <button className="btn-delete">Xóa</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Pagination */}
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

export default QLNhanVien;
