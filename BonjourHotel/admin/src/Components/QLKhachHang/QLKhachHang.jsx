import React, { useState } from 'react';
import './QLKhachHang.css';
import iconsearch from '../Assets/icon-search.png';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const QLKhachHang = ({ openPopupCreate, openPopupUpdate }) => {
  const data = [
    { stt: 1, maKH: 'KH001', tenKH: 'Phạm Anh Duy', sdt: '0192837465', email: 'anhduypham@gmail.com', gioiTinh: 'Nam', ngaySinh: '13/01/1992' },
    { stt: 2, maKH: 'KH002', tenKH: 'Trần Huyền My', sdt: '0945678321', email: 'huyenmee00@gmail.com', gioiTinh: 'Nữ', ngaySinh: '23/03/2000' },
    { stt: 3, maKH: 'KH003', tenKH: 'Lê Trung Thành', sdt: '0703987654', email: 'leetrungthanh@gmail.com', gioiTinh: 'Nam', ngaySinh: '13/10/1997' },
    { stt: 4, maKH: 'KH004', tenKH: 'Nguyễn Minh Hằng', sdt: '0768912345', email: 'minminhang12@gmail.com', gioiTinh: 'Nữ', ngaySinh: '07/12/1988' },
    { stt: 5, maKH: 'KH005', tenKH: 'Nguyễn Thảo Linh', sdt: '0749956712', email: 'tlinhnguyen@gmail.com', gioiTinh: 'Nữ', ngaySinh: '07/10/2000' },
    { stt: 6, maKH: 'KH006', tenKH: 'Bùi Anh Tú', sdt: '0543216780', email: 'anhtubuii93@gmail.com', gioiTinh: 'Nam', ngaySinh: '03/10/1993' },
    { stt: 7, maKH: 'KH007', tenKH: 'Lê Thượng Long', sdt: '0838612345', email: 'thuonglong98@gmail.com', gioiTinh: 'Nam', ngaySinh: '07/10/1998' },
    { stt: 8, maKH: 'KH008', tenKH: 'Nguyễn Lê Minh Huy', sdt: '0954637281', email: 'huynguyen04@gmail.com', gioiTinh: 'Nam', ngaySinh: '04/12/1996' },
    { stt: 9, maKH: 'KH009', tenKH: 'Trần Thị Phương Thảo', sdt: '0987162534', email: 'phuongthaoHz@gmail.com', gioiTinh: 'Nữ', ngaySinh: '05/02/1999' },
    { stt: 10, maKH: 'KH010', tenKH: 'Nguyễn Hoàng Long', sdt: '0951753842', email: 'hoanglongng@gmail.com', gioiTinh: 'Nam', ngaySinh: '09/01/2001' },
    { stt: 11, maKH: 'KH011', tenKH: 'Trần Hải Đăng', sdt: '0985274136', email: 'dangrangto@gmail.com', gioiTinh: 'Nam', ngaySinh: '05/04/2002' },
    { stt: 12, maKH: 'KH012', tenKH: 'Nguyễn Thanh Hưng', sdt: '0914362587', email: 'ngthanhhung@gmail.com', gioiTinh: 'Nam', ngaySinh: '30/10/1991' },
  ];

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset về trang đầu khi tìm kiếm
  };

  const filteredData = data.filter((row) =>
    row.tenKH.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredData.slice(indexOfFirstRow, indexOfLastRow);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className='ql-khachhang'>
      <div className="container-ql-khachhang">
        <div className="option-ql-khachhang">
          <div className="search">
            <img src={iconsearch} alt="" />
            <input
              type="text"
              placeholder="Tìm kiếm theo tên"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
          <button className="btn-create" onClick={openPopupCreate}>Thêm khách hàng</button>
        </div>
        <div className="content-table-ql-khachhang">
          <div className="table-responsive-ql-khachhang">
            <table>
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Mã KH</th>
                  <th>Tên KH</th>
                  <th>Số điện thoại</th>
                  <th>Email</th>
                  <th>Giới tính</th>
                  <th>Ngày sinh</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {currentRows.map((row, index) => (
                  <tr key={row.maKH}>
                    <td>{indexOfFirstRow + index + 1}</td>
                    <td>{row.maKH}</td>
                    <td>{row.tenKH}</td>
                    <td>{row.sdt}</td>
                    <td>{row.email}</td>
                    <td>{row.gioiTinh}</td>
                    <td>{row.ngaySinh}</td>
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
            <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
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
            <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
              <FaChevronRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QLKhachHang;
