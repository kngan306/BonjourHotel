import React, { useState } from 'react';
import './QLDichVu.css';
import iconsearch from '../Assets/icon-search.png';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const QLDichVu = ({ openPopupCreate, openPopupUpdate }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5; // Số dòng mỗi trang

  // Dữ liệu mẫu
  const services = [
    { id: 'DV001', name: 'Hồ bơi vô cực', price: '100.000' },
    { id: 'DV002', name: 'Đưa đón sân bay', price: '200.000' },
    { id: 'DV003', name: 'Giặt là quần áo', price: '350.000' },
    { id: 'DV004', name: '24/24', price: '500.000' },
    // { id: 'DV005', name: 'Spa', price: '300.000' },
  ];

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset về trang đầu khi tìm kiếm
  };

  const filteredServices = services.filter((service) =>
    service.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredServices.length / rowsPerPage);
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredServices.slice(indexOfFirstRow, indexOfLastRow);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className='ql-dichvu'>
      <div className="container-ql-dichvu">
        <div className="option-ql-dichvu">
          <div className="search">
            <img src={iconsearch} alt="" />
            <input
              type="text"
              placeholder="Tìm kiếm theo tên"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
          <button className="btn-create" onClick={openPopupCreate}>Thêm dịch vụ</button>
        </div>

        <div className="content-table-ql-dichvu">
          <div className="table-responsive-ql-dichvu">
            <table>
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Mã dịch vụ</th>
                  <th>Tên dịch vụ</th>
                  <th>Giá</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {currentRows.map((service, index) => (
                  <tr key={service.id}>
                    <td>{indexOfFirstRow + index + 1}</td>
                    <td>{service.id}</td>
                    <td>{service.name}</td>
                    <td>{service.price}</td>
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

export default QLDichVu;
