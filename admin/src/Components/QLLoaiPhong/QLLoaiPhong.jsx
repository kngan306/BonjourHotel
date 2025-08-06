import React, { useState } from 'react';
import './QLLoaiPhong.css';
import iconsearch from '../Assets/icon-search.png';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const QLLoaiPhong = ({ openPopupCreate, openPopupUpdate }) => {

  // Dữ liệu mẫu
  const data = [
    { id: 'LP001', name: 'Phòng đơn', quantity: 60 },
    { id: 'LP002', name: 'Phòng đôi', quantity: 60 },
    { id: 'LP003', name: 'Phòng gia đình', quantity: 42 },
    // { id: 'LP004', name: 'Phòng VIP', quantity: 15 },
    // { id: 'LP005', name: 'Phòng Suite', quantity: 20 },
    // { id: 'LP006', name: 'Phòng Classic', quantity: 35 },
    // { id: 'LP007', name: 'Phòng Standard', quantity: 50 },
  ];
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset về trang 1 khi tìm kiếm
  };

  const filteredData = data.filter((row) =>
    row.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalRows = filteredData.length;
  const totalPages = Math.ceil(totalRows / rowsPerPage);
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredData.slice(indexOfFirstRow, indexOfLastRow);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className='ql-loaiphong'>
      <div className="container-ql-loaiphong">
        <div className="option-ql-loaiphong">
          <div className="search">
            <img src={iconsearch} alt="" />
            <input
              type="text"
              placeholder="Tìm kiếm theo tên"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>

          <button className="btn-create" onClick={openPopupCreate}>Thêm loại phòng</button>
        </div>
        <div className="content-table-ql-loaiphong">
          <div className="table-responsive-ql-loaiphong">
            <table>
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Mã loại phòng</th>
                  <th>Tên loại phòng</th>
                  <th>Số lượng</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {currentRows.map((row, index) => (
                  <tr key={row.id}>
                    <td>{indexOfFirstRow + index + 1}</td>
                    <td>{row.id}</td>
                    <td>{row.name}</td>
                    <td>{row.quantity}</td>
                    <td className='btn-action'>
                      <button className="btn-update" onClick={openPopupUpdate}>Chi tiết</button>
                      <button className="btn-delete">Xóa</button>
                    </td>
                  </tr>
                ))}
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

export default QLLoaiPhong;
