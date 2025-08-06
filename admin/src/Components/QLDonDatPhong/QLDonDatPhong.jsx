import React, { useEffect, useState } from 'react';
import './QLDonDatPhong.css';
import iconsearch from '../Assets/icon-search.png';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const QLDonDatPhong = ({ openPopupCreate, openPopupUpdate, refreshFlag }) => {
  const [bookings, setBookings] = useState([]); // Lưu danh sách đơn đặt phòng
  const [searchTerm, setSearchTerm] = useState(''); // Từ khóa tìm kiếm

  // Lấy danh sách đơn đặt phòng từ API khi component được mount
  useEffect(() => {
    fetchBookings();
  }, [refreshFlag]);

  const fetchBookings = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/danh-sach-don-dat-phong', {
        params: {
          status: statusFilter,
          fromDate: fromDate || '',
          toDate: toDate || ''
        }
      });
      setBookings(response.data);
    } catch (error) {
      console.error('Lỗi khi lấy danh sách đơn đặt phòng:', error);
    }
  };


  // Xử lý tìm kiếm
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  // // Xử lý xóa đơn đặt phòng
  // const handleDelete = async (bookingId) => {
  //   try {
  //     await axios.delete(`http://localhost:5000/api/danh-sach-don-dat-phong/${bookingId}`);
  //     fetchBookings(); // Cập nhật danh sách sau khi xóa
  //   } catch (error) {
  //     console.error('Lỗi khi xóa đơn đặt phòng:', error);
  //   }
  // };

  // Lọc danh sách theo tìm kiếm
  const filteredBookings = bookings.filter((booking) => {
    return (
      (booking.TenKH.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.NgayDat.includes(searchTerm))
    );
  });

  const formatDateVN = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5; // Số dòng mỗi trang
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredBookings.slice(indexOfFirstRow, indexOfLastRow);
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const totalPages = Math.ceil(filteredBookings.length / rowsPerPage);

  const [statusFilter, setStatusFilter] = useState(''); // Bộ lọc trạng thái
  const [fromDate, setFromDate] = useState(''); // Ngày bắt đầu
  const [toDate, setToDate] = useState(''); // Ngày kết thúc

  const handleStatusChange = (event) => {
    setStatusFilter(event.target.value);
  };

  const handleFromDateChange = (event) => {
    // setFromDate(event.target.value);
    const newFromDate = event.target.value;
    setFromDate(newFromDate);

    // Cập nhật giá trị tối thiểu cho "Đến ngày"
    if (toDate && new Date(toDate) < new Date(newFromDate)) {
      setToDate(''); // Reset nếu không hợp lệ
    }
  };

  const handleToDateChange = (event) => {
    // setToDate(event.target.value);
    const newToDate = event.target.value;

    // Kiểm tra ngày hợp lệ
    if (new Date(newToDate) < new Date(fromDate)) {
      alert('Ngày "Đến ngày" phải sau hoặc bằng "Từ ngày".');
      return;
    }
    setToDate(newToDate);
  };

  // Gọi lại API khi bộ lọc thay đổi
  useEffect(() => {
    fetchBookings();
  }, [statusFilter, fromDate, toDate]);

  const handleDelete = async (bookingId) => {
    const confirmed = window.confirm(`Bạn chắc chắn muốn xóa đơn đặt phòng mã đơn: ${bookingId}?`);
    if (!confirmed) return;

    try {
      // Gọi API xóa từng bảng theo thứ tự: UserDetail, ServiceDetail, BookingDetail, rồi Booking
      await axios.delete(`http://localhost:5000/api/user-detail/${bookingId}`);
      await axios.delete(`http://localhost:5000/api/service-detail/${bookingId}`);
      await axios.delete(`http://localhost:5000/api/booking-detail/${bookingId}`);
      await axios.delete(`http://localhost:5000/api/booking/${bookingId}`);

      // Thông báo thành công và cập nhật lại danh sách
      alert('Xóa đơn đặt phòng thành công!');
      fetchBookings(); // Cập nhật danh sách sau khi xóa
    } catch (error) {
      console.error('Lỗi khi xóa đơn đặt phòng:', error);
      alert('Đã xảy ra lỗi khi xóa đơn đặt phòng. Vui lòng thử lại sau.');
    }
  };


  return (
    <div className='ql-dondatphong'>
      <div className="container-ql-dondatphong">
        <div className="option-ql-dondatphong">
          <div className="search">
            <img src={iconsearch} alt="" />
            <input
              type="text"
              placeholder='Tìm kiếm...'
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          <div className="filter-date">
            <label>
              Từ ngày:
              <input type="date" value={fromDate} onChange={handleFromDateChange} />
            </label>
            <label>
              Đến ngày:
              <input
                type="date"
                value={toDate}
                onChange={handleToDateChange}
                min={fromDate || ''} // Đặt giá trị tối thiểu dựa trên "Từ ngày"
              />
            </label>
          </div>
          <div>
            <label htmlFor="status">Trạng thái:</label>
            <select id='status' value={statusFilter} onChange={handleStatusChange}>
              <option value="">--Tất cả--</option>
              <option value="Chờ xử lý">Chờ xử lý</option>
              <option value="Xác nhận">Xác nhận</option>
              <option value="Đã hủy">Đã hủy</option>
              <option value="Nhận phòng">Nhận phòng</option>
              <option value="Trả phòng">Trả phòng</option>
              <option value="Hoàn tất">Hoàn tất</option>
            </select>
          </div>
          {/* <div>
            <label htmlFor="branch">Chi nhánh:</label>
            <select id='branch' value={branchFilter} onChange={handleBranchChange}>
              <option value="">--Tất cả--</option>
              <option value="BONJOUR DaNang Hotel">BONJOUR DaNang Hotel</option>
              <option value="Nha Trang">Nha Trang</option>
              <option value="Phú Yên">Phú Yên</option>
            </select>
          </div> */}
          <button className="btn-create" onClick={openPopupCreate}>Thêm đơn</button>
        </div>
        <div className="content-table-ql-dondatphong">
          <div className="table-responsive-ql-dondatphong">
            <table>
              <thead>
                <tr>
                  <th>STT</th>
                  {/* <th>Mã đơn</th> */}
                  <th>Tên khách hàng</th>
                  <th>Ngày đặt phòng</th>
                  <th>Trạng thái</th>
                  <th>Nhân viên phụ trách</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {/* filteredBookings.map((booking, index) */}
                {currentRows.map((booking, index) => (
                  <tr key={booking.ID}>
                    {/* <td>{index + 1}</td> */}
                    <td>{indexOfFirstRow + index + 1}</td>
                    {/* <td>{booking.ID}</td> */}
                    <td>{booking.TenKH}</td>
                    <td>{formatDateVN(booking.NgayDat)}</td>
                    <td>{booking.TrangThai}</td>
                    <td>{booking.TenNV || 'Chưa phân công'}</td>
                    <td className='btn-action'>
                      <button className="btn-update" onClick={() => openPopupUpdate(booking.ID, fetchBookings)}>Chi tiết</button>
                      <button className="btn-delete" onClick={() => handleDelete(booking.ID)}>Xóa</button>
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
}

export default QLDonDatPhong;
