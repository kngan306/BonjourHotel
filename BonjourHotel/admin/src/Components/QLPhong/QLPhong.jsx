import React, { useState, useMemo } from 'react';
import './QLPhong.css';
import iconsearch from '../Assets/icon-search.png';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';


const QLPhong = ({ openPopupCreate, openPopupUpdate }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5; // Số dòng mỗi trang

  // Danh sách dữ liệu giả lập
  const bookings = [
    { id: 1, code: 'P001', name: 'Standard Double', price: '5.499.000', status: 'Trống', people: '02', bed: '01 đôi', bathroom: '01', branch: 'Đà Nẵng' },
    { id: 2, code: 'P002', name: 'Twin Bed Suite', price: '5.499.000', status: 'Đang thuê', people: '02', bed: '01 đôi', bathroom: '01', branch: 'Đà Nẵng' },
    { id: 3, code: 'P003', name: 'Junior', price: '7.499.000', status: 'Đã đặt', people: '04', bed: '02 đôi', bathroom: '02', branch: 'Nha Trang' },
    { id: 4, code: 'P004', name: 'Family Suite', price: '9.499.000', status: 'Trống', people: '04', bed: '02 đôi', bathroom: '02', branch: 'Nha Trang' },
    { id: 5, code: 'P005', name: 'Superior Twin', price: '7.499.000', status: 'Đang thuê', people: '04', bed: '02 đôi', bathroom: '01', branch: 'Đà Nẵng' },
    { id: 6, code: 'P006', name: 'Deluxe Double', price: '5.499.000', status: 'Đã đặt', people: '02', bed: '01 đôi', bathroom: '01', branch: 'Phú Yên' },
    { id: 7, code: 'P007', name: 'Standard Double', price: '5.499.000', status: 'Trống', people: '02', bed: '01 đôi', bathroom: '01', branch: 'Phú Yên' },
    { id: 8, code: 'P008', name: 'Twin Bed Suite', price: '5.499.000', status: 'Đã đặt', people: '02', bed: '01 đôi', bathroom: '01', branch: 'Nha Trang' },
    { id: 9, code: 'P009', name: 'Junior', price: '7.499.000', status: 'Đã đặt', people: '04', bed: '02 đôi', bathroom: '02', branch: 'Nha Trang' },
    { id: 10, code: 'P010', name: 'Family Suite', price: '9.499.000', status: 'Đang thuê', people: '04', bed: '02 đôi', bathroom: '02', branch: 'Đà Nẵng' },
    { id: 11, code: 'P011', name: 'Superior Twin', price: '7.499.000', status: 'Đã đặt', people: '04', bed: '02 đôi', bathroom: '01', branch: 'Phú Yên' },
    { id: 12, code: 'P012', name: 'Deluxe Double', price: '5.499.000', status: 'Đang thuê', people: '02', bed: '01 đôi', bathroom: '01', branch: 'Nha Trang' },
  ];

  const [searchKeyword, setSearchKeyword] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterBranch, setFilterBranch] = useState('');

  // Danh sách sau khi áp dụng tìm kiếm và lọc
  const filteredBookings = useMemo(() => {
    return bookings.filter((room) => {
      const matchesKeyword = room.name.toLowerCase().includes(searchKeyword.toLowerCase());
      const matchesStatus = filterStatus ? room.status === filterStatus : true;
      const matchesBranch = filterBranch ? room.branch === filterBranch : true;
      return matchesKeyword && matchesStatus && matchesBranch;
    });
  }, [searchKeyword, filterStatus, filterBranch]);

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredBookings.slice(indexOfFirstRow, indexOfLastRow);

  const totalPages = Math.ceil(filteredBookings.length / rowsPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="ql-phong">
      <div className="container-ql-phong">
        <div className="option-ql-phong">
          <div className="search">
            <img src={iconsearch} alt="" />
            <input
              type="text"
              placeholder="Tìm kiếm..."
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="status">Trạng thái:</label>
            <select
              id="status"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="">--Tất cả--</option>
              <option value="Trống">Trống</option>
              <option value="Đã đặt">Đã đặt</option>
              <option value="Đang thuê">Đang thuê</option>
            </select>
          </div>
          <div>
            <label htmlFor="branch">Chi nhánh:</label>
            <select
              id="branch"
              value={filterBranch}
              onChange={(e) => setFilterBranch(e.target.value)}
            >
              <option value="">--Tất cả--</option>
              <option value="Đà Nẵng">Đà Nẵng</option>
              <option value="Nha Trang">Nha Trang</option>
              <option value="Phú Yên">Phú Yên</option>
            </select>
          </div>
          <button className="btn-create" onClick={openPopupCreate}>
            Thêm phòng
          </button>
        </div>
        <div className="content-table-ql-phong">
          <div className="table-responsive-ql-phong">
            <table>
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Mã phòng</th>
                  <th>Tên phòng</th>
                  <th>Giá</th>
                  <th>Trạng thái</th>
                  <th>SL người</th>
                  <th>SL giường</th>
                  <th>SL phòng tắm</th>
                  <th>Chi nhánh</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {currentRows.length > 0 ? (
                  currentRows.map((room, index) => (
                    <tr key={room.id}>
                      <td>{indexOfFirstRow + index + 1}</td>
                      <td>{room.code}</td>
                      <td>{room.name}</td>
                      <td>{room.price}</td>
                      <td>{room.status}</td>
                      <td>{room.people}</td>
                      <td>{room.bed}</td>
                      <td>{room.bathroom}</td>
                      <td>{room.branch}</td>
                      <td className="btn-action">
                        <button className="btn-update" onClick={openPopupUpdate}>
                          Chi tiết
                        </button>
                        <button className="btn-delete">Xóa</button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="10">Không tìm thấy kết quả phù hợp.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          {/* Phân trang */}
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

export default QLPhong;
