import React, { useState, useEffect } from 'react';
import './CapNhatDDP.css';
import icondelete from '../Assets/icon-delete.png';
import axios from 'axios';

const CapNhatDDP = ({ bookingId, closePopupUpdate, refreshBookings }) => {

  const [roomRows, setRoomRows] = useState([]);
  const [serviceRows, setServiceRows] = useState([]);
  const [customerRows, setCustomerRows] = useState([]);
  const [bookingInfo, setBookingInfo] = useState({
    MaDDP: '',
    TenKH: '',
    SDT: '',
    NgayDat: '',
    NgayNhan: '',
    NgayTraPhong: '',
    NgayTraPhongThucTe: '',
    TrangThai: '',
    SoDemO: '',
  });

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`; // Định dạng phù hợp với input type="date"
  };




  useEffect(() => {
    if (bookingId) {
      fetchBookingDetails(bookingId);
    }
  }, [bookingId]);

  const fetchBookingDetails = async (id) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/thong-tin-don-dat-phong/${id}`);

      const data = response.data;

      const ngayNhan = new Date(data.NgayNhan);
      const ngayTraPhong = data.NgayTraPhong ? new Date(data.NgayTraPhong) : null;
      const ngayTraPhongThucTe = data.NgayTraPhongThucTe ? new Date(data.NgayTraPhongThucTe) : null;

      const soDemO = ngayTraPhongThucTe
        ? Math.ceil((ngayTraPhongThucTe - ngayNhan) / (1000 * 60 * 60 * 24))
        : ngayTraPhong
          ? Math.ceil((ngayTraPhong - ngayNhan) / (1000 * 60 * 60 * 24))
          : 0;

      setBookingInfo({
        MaDDP: data.MaDDP || '',
        TenKH: data.TenKH || '',
        SDT: data.SDT || '',
        NgayDat: data.NgayDat ? formatDate(data.NgayDat) : '',
        NgayNhan: data.NgayNhan ? formatDate(data.NgayNhan) : '',
        NgayTraPhong: data.NgayTraPhong ? formatDate(data.NgayTraPhong) : '',
        NgayTraPhongThucTe: data.NgayTraPhongThucTe ? formatDate(data.NgayTraPhongThucTe) : '',
        TrangThai: data.TrangThai || '',
        SoDemO: soDemO > 0 ? soDemO : '',
      });


      const { rooms, services, tenants } = response.data;

      // Chuyển đổi dữ liệu API thành định dạng state
      const formattedRooms = rooms.map((room, index) => ({
        id: room.MaPhong,
        name: room.TenPhong,
        price: room.Gia.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }),
        total: (room.Gia * soDemO).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }),
      }));
      setRoomRows(formattedRooms);

      const formattedServices = services.map((service, index) => ({
        id: service.MaDV,
        name: service.TenDV,
        roombooking: service.MaPhong,
        price: service.Gia.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }),
      }));
      setServiceRows(formattedServices);

      const formattedCustomers = tenants.map((tenant, index) => ({
        id: tenant.MaNguoiThue,
        name: tenant.TenNguoiThue,
        cccd: tenant.CMND,
        roombooking: tenant.PhongThue,
      }));
      setCustomerRows(formattedCustomers);
    } catch (error) {
      console.error('Lỗi khi lấy chi tiết đơn đặt phòng:', error);
    }
  };

  // States for showing modals
  const [showRoomModal, setShowRoomModal] = useState(false);
  const [showServiceModal, setShowServiceModal] = useState(false);
  const [showCustomerModal, setShowCustomerModal] = useState(false);

  // Available items
  const [availableRooms, setAvailableRooms] = useState([]);

  useEffect(() => {
    // Hàm gọi API lấy danh sách phòng khả dụng
    const fetchAvailableRooms = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/phong-trong');
        const rooms = response.data;

        // Định dạng dữ liệu trước khi lưu vào state
        const formattedRooms = rooms.map((room) => ({
          id: room.MaPhong,
          name: room.TenPhong,
          type: room.LoaiPhong, // Thêm loại phòng từ API
          price: room.Gia.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }),
        }));

        setAvailableRooms(formattedRooms);
      } catch (error) {
        console.error('Lỗi khi lấy danh sách phòng khả dụng:', error);
      }
    };

    fetchAvailableRooms();
  }, []); // Chỉ chạy một lần khi component mount



  // const [availableServices, setAvailableServices] = useState([
  //   { id: 'DV002', name: 'Spa', price: '200.000', roombooking: 'P001' },
  //   { id: 'DV003', name: 'Gym', price: '150.000', roombooking: 'P001' },
  // ]);
  const [availableServices, setAvailableServices] = useState([]);

  // Đảm bảo rằng khai báo và gán giá trị cho selectedRoomId luôn được thực hiện trước khi dùng.
  const [selectedRoomId, setSelectedRoomId] = useState(null); // hoặc giá trị mặc định hợp lý

  useEffect(() => {
    const fetchAvailableServices = async (bookingId, roomId) => {
      try {
        if (!bookingId || !roomId) {
          console.warn('Booking ID hoặc Room ID chưa được cung cấp.');
          return;
        }

        const response = await axios.get(
          `http://localhost:5000/api/dich-vu-chua-su-dung/${bookingId}/${roomId}`
        );

        if (response.status === 200) {
          const services = response.data;
          const formattedServices = services.map(service => ({
            id: service.MaDV,
            name: service.TenDV,
            price: (typeof service.GiaDV === 'number' && !isNaN(service.GiaDV))
              ? service.GiaDV.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })
              : 'Chưa có giá',
          }));
          setAvailableServices(formattedServices);
        }
      } catch (error) {
        console.error('Lỗi khi lấy danh sách dịch vụ chưa sử dụng:', error);
      }
    };

    if (selectedRoomId && bookingId) {
      fetchAvailableServices(bookingId, selectedRoomId);
    }
  }, [selectedRoomId, bookingId]);




  const [availableCustomers, setAvailableCustomers] = useState([
    { id: 'KH002', name: 'Trần Thị B' },
  ]);

  const handleAddRoom = (room) => {
    setRoomRows(prevRows => [...prevRows, { ...room, total: room.price }]);
    setAvailableRooms(prevRooms => prevRooms.filter(r => r.id !== room.id));
  };

  const handleAddService = (service) => {
    setServiceRows(prevRows => [...prevRows, { ...service }]);
    setAvailableServices(prevServices => prevServices.filter(s => s.id !== service.id));
  };

  const handleAddCustomer = (customer) => {
    setCustomerRows(prevRows => [...prevRows, { ...customer }]);
    setAvailableCustomers(prevCustomers => prevCustomers.filter(c => c.id !== customer.id));
  };

  const handleCloseRoomModal = () => setShowRoomModal(false);
  const handleCloseServiceModal = () => setShowServiceModal(false);
  const handleCloseCustomerModal = () => setShowCustomerModal(false);

  // Hàm cho checkbox
  const [selectedRooms, setSelectedRooms] = useState([]); // Phòng được chọn
  const [selectedServices, setSelectedServices] = useState([]); // Dịch vụ được chọn

  const handleRoomCheckboxChange = (roomId) => {
    setSelectedRooms(prevSelected => {
      if (prevSelected.includes(roomId)) {
        // Nếu phòng đã được chọn, bỏ chọn
        return prevSelected.filter(id => id !== roomId);
      } else {
        // Nếu chưa chọn, thêm vào danh sách đã chọn
        return [...prevSelected, roomId];
      }
    });
  };

  const handleSelectAllRooms = () => {
    // Kiểm tra xem tất cả phòng đã được chọn chưa
    if (selectedRooms.length === availableRooms.length) {
      // Nếu đã chọn tất cả, thì bỏ chọn tất cả
      setSelectedRooms([]);
    } else {
      // Nếu chưa chọn tất cả, chọn tất cả phòng
      setSelectedRooms(availableRooms.map(room => room.id));
    }
  };

  const handleSelectAllServices = () => {
    // Kiểm tra xem tất cả phòng đã được chọn chưa
    if (selectedServices.length === availableServices.length) {
      // Nếu đã chọn tất cả, thì bỏ chọn tất cả
      setSelectedServices([]);
    } else {
      // Nếu chưa chọn tất cả, chọn tất cả phòng
      setSelectedServices(availableServices.map(service => service.id));
    }
  };

  const handleAddMultipleRooms = () => {
    // Lọc các phòng được chọn từ availableRooms
    const roomsToAdd = availableRooms
      .filter(room => selectedRooms.includes(room.id)) // Lọc những phòng đã chọn
      .map(room => ({
        ...room,  // Sao chép thông tin của phòng
        total: room.price,  // Gán giá trị "Thành tiền" bằng giá của phòng
      }));

    // Cập nhật lại roomRows với các phòng đã chọn
    setRoomRows(prevRows => [...prevRows, ...roomsToAdd]);

    // Loại bỏ các phòng đã chọn khỏi availableRooms
    setAvailableRooms(prevRooms => prevRooms.filter(room => !selectedRooms.includes(room.id)));

    // Reset danh sách phòng đã chọn
    setSelectedRooms([]);
  };

  const handleAddMultipleServices = () => {
    const servicesToAdd = availableServices
      .filter(service => selectedServices.includes(service.id))
      .map(service => ({
        ...service, // Lấy tất cả các thuộc tính của dịch vụ
        roombooking: selectedRoomId, // Thêm thông tin Mã Phòng vào trường 'roombooking'
      }));

    // Thêm các dịch vụ đã chọn vào bảng serviceRows
    setServiceRows(prevRows => [...prevRows, ...servicesToAdd]);

    // Cập nhật lại danh sách availableServices để loại bỏ dịch vụ đã thêm
    setAvailableServices(prevServices => prevServices.filter(service => !selectedServices.includes(service.id)));

    // Reset danh sách dịch vụ đã chọn
    setSelectedServices([]);
  };



  const handleServiceCheckboxChange = (serviceId) => {
    setSelectedServices(prevSelected => {
      if (prevSelected.includes(serviceId)) {
        return prevSelected.filter(id => id !== serviceId);
      } else {
        return [...prevSelected, serviceId];
      }
    });
  };

  const handleDeleteRow = (itemId, itemType, setRows, setAvailableItems) => {
    // Hiển thị thông báo xác nhận
    const confirmed = window.confirm("Bạn có chắc chắn muốn xoá dòng này?");
    if (confirmed) {
      // Xoá dòng dữ liệu khỏi danh sách tương ứng (rooms, services, customers)
      setRows(prevRows => prevRows.filter(row => row.id !== itemId));

      // Tìm và thêm lại vào danh sách có sẵn nếu cần thiết
      const deletedItem = itemType.find(row => row.id === itemId);
      setAvailableItems(prevItems => [
        ...prevItems,
        { id: deletedItem.id, name: deletedItem.name, type: deletedItem.type, price: deletedItem.price },
      ]);
    }
  };

  // Hàm xoá dòng phòng
  const handleDeleteRoom = (roomId) => {
    handleDeleteRow(roomId, roomRows, setRoomRows, setAvailableRooms);
  };
  // const handleDeleteRoom = (roomId) => {
  //   setRoomRows((prevRows) => prevRows.filter((row) => row.id !== roomId));
  // };


  // Hàm xoá dòng dịch vụ
  const handleDeleteService = (serviceId) => {
    handleDeleteRow(serviceId, serviceRows, setServiceRows, setAvailableServices);
  };

  // Hàm xoá dòng khách hàng
  const handleDeleteCustomer = (customerId) => {
    handleDeleteRow(customerId, customerRows, setCustomerRows, setAvailableCustomers);
  };

  // Danh sách các phòng kết hợp từ roomRows và availableRooms
  const allRooms = [...roomRows, ...availableRooms];

  // Thêm state cho dữ liệu người thuê mới
  const [newCustomerName, setNewCustomerName] = useState('');
  const [newCustomerCCCD, setNewCustomerCCCD] = useState('');
  const [newCustomerPhone, setNewCustomerPhone] = useState('');
  // const [newRoomBooking, setNewRoomBooking] = useState('');
  //const [selectedRoomId, setSelectedRoomId] = useState(); // State cho phòng được chọn

  // Hàm để thêm khách hàng mới
  const handleAddNewCustomer = () => {
    // Kiểm tra nếu cả hai trường input đều không rỗng
    // if (newCustomerName.trim() && newRoomBooking.trim()) {
    if (newCustomerName.trim() && selectedRoomId) {
      // Tạo đối tượng customer mới
      const newCustomer = {
        id: `KH${customerRows.length + availableCustomers.length + 1}`, // Tạo id mới tự động
        name: newCustomerName,
        cccd: newCustomerCCCD,
        phone: newCustomerPhone,
        // roombooking: newRoomBooking,
        roombooking: selectedRoomId,
      };

      // Thêm customer mới vào danh sách
      setCustomerRows(prevRows => [...prevRows, newCustomer]);

      // Reset giá trị của các input
      setNewCustomerName('');
      setNewCustomerCCCD('');
      setNewCustomerPhone('');
      // setNewRoomBooking('');
      setSelectedRoomId('');
    } else {
      alert("Vui lòng nhập đầy đủ thông tin người thuê!");
    }
  };

  // Calculate grand total
  const calculateGrandTotal = () => {
    const roomTotal = roomRows.reduce((sum, row) => {
      const totalValue = parseFloat(row.total.replace(/\./g, '').replace(',', '.')) || 0;
      return sum + totalValue;
    }, 0);

    const serviceTotal = serviceRows.reduce((sum, row) => {
      const priceValue = parseFloat(row.price.replace(/\./g, '').replace(',', '.')) || 0;
      return sum + priceValue;
    }, 0);

    return (roomTotal + serviceTotal).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
  };

  const handleUpdate = async () => {
    try {
        // Chuẩn bị dữ liệu để gửi
        const bookingData = {
            ...bookingInfo,
            RoomDetails: roomRows.map(row => ({
                MaPhong: row.id,
                Gia: parseInt(row.price.replace(/[^0-9]/g, '')), // Chuyển đổi giá tiền thành số
            })),
            ServiceDetails: serviceRows.map(row => ({
                MaDV: row.id,
                Gia: parseInt(row.price.replace(/[^0-9]/g, '')), // Chuyển đổi giá dịch vụ thành số
                MaPhong: row.roombooking, // Đảm bảo mã phòng tồn tại
                ID: bookingInfo.MaDDP, // Sử dụng mã đơn đặt phòng từ bookingInfo
            })),
            CustomerDetails: customerRows.map(row => ({
                TenKH: row.name,
                CCCD: row.cccd,
                MaKH: row.MaKH || null, // Để xử lý khách hàng mới
                MaPhong: row.roombooking,
            })),
        };

        // 1. Kiểm tra dữ liệu `RoomDetails`
        if (bookingData.RoomDetails.some(room => !room.MaPhong || !room.Gia)) {
            alert('Danh sách phòng không đầy đủ hoặc giá trị không hợp lệ!');
            console.error('RoomDetails:', bookingData.RoomDetails);
            return;
        }

        // 2. Kiểm tra dữ liệu `ServiceDetails`
        if (!bookingData.ServiceDetails.every(detail => detail.ID && detail.MaDV && detail.MaPhong && detail.Gia)) {
            alert('Danh sách dịch vụ không đầy đủ hoặc không hợp lệ!');
            console.error('ServiceDetails:', bookingData.ServiceDetails);
            return;
        }

        // 3. Kiểm tra và xử lý khách hàng
        for (const customer of bookingData.CustomerDetails) {
            const { TenKH, CCCD } = customer;

            if (!TenKH || !CCCD) {
                alert('Thông tin khách hàng không đầy đủ!');
                console.error('CustomerDetails thiếu thông tin:', customer);
                return;
            }

            const { data: existingCustomer } = await axios.post(
                'http://localhost:5000/api/check-customer',
                { TenKH, CCCD }
            );

            if (existingCustomer && existingCustomer.length > 0) {
                customer.MaKH = existingCustomer[0].MaKH; // Gán mã khách hàng nếu đã tồn tại
            } else {
                // Thêm khách hàng mới nếu không tồn tại
                const { data: newCustomer } = await axios.post(
                    'http://localhost:5000/api/create-customer',
                    customer
                );
                customer.MaKH = newCustomer.MaKH;
            }

            if (!customer.MaKH) {
                alert(`Không thể xử lý khách hàng: ${TenKH}`);
                console.error('Lỗi xử lý khách hàng:', customer);
                return;
            }
        }

        // 4. Gửi dữ liệu cập nhật
        const { data: bookingResponse } = await axios.post(
            'http://localhost:5000/api/update-booking',
            bookingData
        );

        if (bookingResponse.success) {
            alert('Cập nhật thành công!');
            refreshBookings(); // Gọi callback để làm mới dữ liệu
            closePopupUpdate();
        } else {
            alert('Cập nhật thất bại!');
        }
    } catch (error) {
        console.error('Lỗi khi cập nhật:', error.response?.data || error.message);
        alert('Có lỗi xảy ra, vui lòng thử lại!');
    }
};

  return (
    <div className='capnhat-ddp'>
      <div className="container-capnhat-ddp">
        <h2>Chi tiết đơn đặt phòng</h2>
        <div className="form-container-capnhat-ddp">

          <div className="form-section-capnhat-ddp">
            <div className="form-group-capnhat-ddp">
              <label htmlFor="ma-ddp">
                Mã đơn đặt phòng:<span>*</span>
              </label>
              <input
                type="text"
                id="ma-ddp"
                value={bookingInfo.MaDDP}
                name="ma-ddp"
                required
              // onChange={(e) => setBookingInfo({ ...bookingInfo, MaDDP: e.target.value })}
              />
            </div>
            <div className="form-group-capnhat-ddp">
              <label htmlFor="ngay-dat-phong">Ngày đặt phòng:</label>
              <input
                type="date"
                id="ngay-dat-phong"
                value={bookingInfo.NgayDat}
                name="ngay-dat-phong"
                onChange={(e) => setBookingInfo({ ...bookingInfo, NgayDat: e.target.value })}
              />
            </div>
            <div className="form-group-capnhat-ddp">
              <label htmlFor="so-dem-o">Số đêm ở:</label>
              <input
                type="text"
                id="so-dem-o"
                value={bookingInfo.SoDemO}
                name="so-dem-o"
                required
              // onChange={(e) => setBookingInfo({ ...bookingInfo, SoDemO: e.target.value })}
              />
            </div>
          </div>

          <div className="form-section-capnhat-ddp">
            <div className="form-group-capnhat-ddp">
              <label htmlFor="ten-kh">
                Tên khách hàng:<span>*</span>
              </label>
              <input
                type="text"
                id="ten-kh"
                value={bookingInfo.TenKH}
                name="ten-kh"
                required
                onChange={(e) => setBookingInfo({ ...bookingInfo, TenKH: e.target.value })}
              />
            </div>
            <div className="form-group-capnhat-ddp">
              <label htmlFor="ngay-nhan-phong">Ngày nhận phòng:</label>
              <input
                type="date"
                id="ngay-nhan-phong"
                value={bookingInfo.NgayNhan}
                name="ngay-nhan-phong"
                onChange={(e) => setBookingInfo({ ...bookingInfo, NgayNhan: e.target.value })}
              />
            </div>
            <div className="form-group-capnhat-ddp">
              <label htmlFor="ngay-tra-phong-thuc">Ngày trả phòng thực tế:</label>
              <input
                type="date"
                id="ngay-tra-phong-thuc"
                value={bookingInfo.NgayTraPhongThucTe}
                name="ngay-tra-phong-thuc"
                onChange={(e) => setBookingInfo({ ...bookingInfo, NgayTraPhongThucTe: e.target.value })}
              />
            </div>
          </div>

          <div className="form-section-capnhat-ddp">
            <div className="form-group-capnhat-ddp">
              <label htmlFor="sdt-kh">
                Số điện thoại:<span>*</span>
              </label>
              <input
                type="text"
                id="sdt-kh"
                value={bookingInfo.SDT}
                name="sdt-kh"
                required
                onChange={(e) => setBookingInfo({ ...bookingInfo, SDT: e.target.value })}
              />
            </div>

            <div className="form-group-capnhat-ddp">
              <label htmlFor="ngay-tra-phong">Ngày trả phòng:</label>
              <input
                type="date"
                id="ngay-tra-phong"
                value={bookingInfo.NgayTraPhong}
                name="ngay-tra-phong"
                onChange={(e) => setBookingInfo({ ...bookingInfo, NgayTraPhong: e.target.value })}
              />
            </div>

            <div className="form-group-capnhat-phong">
              <label htmlFor="trang-thai-ddp">Trạng thái:</label>
              <select
                name="trang-thai-ddp"
                id="trang-thai-ddp"
                value={bookingInfo.TrangThai}
                onChange={(e) => setBookingInfo({ ...bookingInfo, TrangThai: e.target.value })}
              >
                <option value="Chờ xử lý">Chờ xử lý</option>
                <option value="Xác nhận">Xác nhận</option>
                <option value="Đã hủy">Đã hủy</option>
                <option value="Nhận phòng">Nhận phòng</option>
                <option value="Trả phòng">Trả phòng</option>
                <option value="Hoàn tất">Hoàn tất</option>
              </select>
            </div>
          </div>
        </div>

        <div className='danhsach-phong'>
          <div className="header-dachsach-phong">
            <h3>Danh sách phòng</h3>
            <button className='btn-capnhat-phong-vao-ddp' onClick={() => setShowRoomModal(true)}>Thêm phòng</button>
          </div>
          <div className="table-container-capnhatddp">
            <table>
              <thead>
                <tr>
                  <th className='stt'>STT</th>
                  <th>Mã phòng</th>
                  <th>Tên phòng</th>
                  <th>Giá</th>
                  <th>Thành tiền</th>
                  <th className='icon-delete'></th>
                </tr>
              </thead>
              <tbody>
                {roomRows.map((row, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td> {/* Số thứ tự tự tăng */}
                    <td>{row.id}</td>
                    <td>{row.name}</td>
                    <td>{row.price}</td>
                    {/* <td>{row.quantity}</td> */}
                    {/* <td>
                                            <input
                                                type="number"
                                                value={row.quantity}
                                                min="1" // Giá trị tối thiểu của số lượng là 1
                                                onChange={(e) => handleQuantityChange(e, row.id)} // Gọi hàm khi giá trị thay đổi
                                            />
                                        </td> */}
                    <td>{row.total}</td>
                    <td>
                      <img
                        src={icondelete}
                        alt="Delete"
                        onClick={() => handleDeleteRoom(row.id)} // Gọi hàm xoá khi nhấn icon delete
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal danh sách phòng */}
        {showRoomModal && (
          <div className="room-modal">
            <div className="room-modal-content">
              <div className="header-room-modal-content">
                <h3>Chọn phòng</h3>
                <button onClick={handleCloseRoomModal}>Đóng</button>
              </div>
              <div className="available-rooms">
                <div className="available-rooms-action">
                  <button onClick={handleSelectAllRooms}>
                    {selectedRooms.length === availableRooms.length ? 'Bỏ chọn tất cả' : 'Chọn tất cả'}
                  </button>
                  <button className="btn-add-room" onClick={handleAddMultipleRooms}>Thêm</button>
                </div>
                <table>
                  <thead>
                    <tr>
                      <th>STT</th>
                      <th>Tên phòng</th>
                      <th>Loại phòng</th>
                      <th>Giá</th>
                      <th>Chọn</th>
                      {/* <th>Thao tác</th> */}
                    </tr>
                  </thead>
                  <tbody>
                    {availableRooms.map((room, index) => (
                      <tr key={room.id}>
                        <td>{index + 1}</td>
                        <td>{room.name}</td>
                        <td>{room.type}</td>
                        <td>{room.price}</td>
                        <td>
                          <input
                            type="checkbox"
                            checked={selectedRooms.includes(room.id)}
                            onChange={() => handleRoomCheckboxChange(room.id)}
                          />
                        </td>
                        {/* <td>
                                                    <button className="btn-add-room" onClick={() => handleAddRoom(room)}>
                                                        Thêm
                                                    </button>
                                                </td> */}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        <div className='danhsach-dichvu'>
          <div className="header-danhsach-dichvu">
            <h3>Danh sách dịch vụ</h3>
            <button onClick={() => setShowServiceModal(true)}>Thêm dịch vụ</button>
          </div>
          <div className="table-container-capnhatddp">
            <table>
              <thead>
                <tr>
                  <th className='stt'>STT</th>
                  <th>Mã dịch vụ</th>
                  <th>Tên dịch vụ</th>
                  <th>Giá</th>
                  <th>Phòng thuê</th>
                  <th className='icon-delete'></th>
                </tr>
              </thead>
              <tbody>
                {serviceRows.map((row, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td> {/* Số thứ tự tự tăng */}
                    <td>{row.id}</td>
                    <td>{row.name}</td>
                    <td>{row.price}</td>
                    <td>{row.roombooking}</td>
                    <td>
                      <img
                        src={icondelete}
                        alt="Delete"
                        onClick={() => handleDeleteService(row.id)} // Gọi hàm xoá khi nhấn icon delete
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Service Modal */}
        {showServiceModal && (
          <div className="service-modal">
            <div className="service-modal-content">
              <div className="header-service-modal-content">
                <h3>Chọn dịch vụ</h3>
                <button onClick={handleCloseServiceModal}>Đóng</button>
              </div>
              <div className="available-services">
                <div className="available-services-action">
                  <button onClick={handleSelectAllServices}>
                    {selectedServices.length === availableServices.length ? 'Bỏ chọn tất cả' : 'Chọn tất cả'}
                  </button>
                  <select value={selectedRoomId || ''} onChange={(e) => setSelectedRoomId(e.target.value)}>
                    <option value="">Chọn phòng</option>
                    {roomRows.map((room) => (
                      <option key={room.id} value={room.id}>
                        {room.id} - {room.name}
                      </option>
                    ))}
                  </select>


                  <button className='btn-add-service' onClick={handleAddMultipleServices}>Thêm</button>
                </div>
                <table>
                  <thead>
                    <tr>
                      <th>STT</th>
                      <th>Tên dịch vụ</th>
                      <th>Giá</th>
                      {/* <th>Phòng thuê</th> */}
                      <th>Chọn</th>
                      {/* <th>Thao tác</th> */}
                    </tr>
                  </thead>
                  <tbody>
                    {availableServices.map((service, index) => (
                      <tr key={service.id}>
                        <td>{index + 1}</td>
                        <td>{service.name}</td>
                        <td>{service.price}</td>
                        {/* <td>{service.roombooking}</td> */}
                        <td>
                          <input
                            type="checkbox"
                            checked={selectedServices.includes(service.id)}
                            onChange={() => handleServiceCheckboxChange(service.id)}
                          />
                        </td>
                        {/* <td>
                                                    <button className='btn-add-service' onClick={() => handleAddService(service)}>Thêm</button>
                                                </td> */}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        <div className="danhsach-nguoithue">
          <div className="header-danhsach-nguoithue">
            <h3>Danh sách người thuê</h3>
            <button onClick={() => setShowCustomerModal(true)}>Thêm người thuê</button>
          </div>
          <div className="table-container-themddp">
            <table>
              <thead>
                <tr>
                  <th className='stt'>STT</th>
                  <th>Họ và tên</th>
                  <th>CCCD</th>
                  <th>Phòng thuê</th>
                  <th className='icon-delete'></th>
                </tr>
              </thead>
              <tbody>
                {customerRows.map((row, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td> {/* Số thứ tự tự tăng */}
                    <td>{row.name}</td>
                    <td>{row.cccd}</td>
                    <td>{row.roombooking}</td>
                    <td>
                      <img
                        src={icondelete}
                        alt="Delete"
                        onClick={() => handleDeleteCustomer(row.id)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Customer Modal */}
          {showCustomerModal && (
            <div className="customer-modal">
              <div className="customer-modal-content">
                {/* <div className="header-customer-modal-content">
                  <h3>Chọn người thuê</h3>
                  <button onClick={handleCloseCustomerModal}>Đóng</button>
                </div>
                <div className="available-customers">
                  <table>
                    <thead>
                      <tr>
                        <th>Tên người thuê</th>
                        <th>CCCD</th>
                        <th>Thao tác</th>
                      </tr>
                    </thead>
                    <tbody>
                      {availableCustomers.map((customer) => (
                        <tr key={customer.id}>
                          <td>{customer.name}</td>
                          <td>{customer.cccd}</td>
                          <td>
                            <button className='btn-add-customer' onClick={() => handleAddCustomer(customer)}>Thêm</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div> */}
                <div className="customer-add-new-content">
                  <div className="header-customer-modal-content">
                    <h3>Thêm người thuê</h3>
                    <button onClick={handleCloseCustomerModal}>Đóng</button>
                  </div>
                  <div className="add-new-customer">
                    <input
                      type="text"
                      placeholder="Họ và tên"
                      value={newCustomerName}
                      onChange={(e) => setNewCustomerName(e.target.value)}
                    />
                    <input
                      type="text"
                      placeholder="CCCD"
                      value={newCustomerCCCD}
                      onChange={(e) => setNewCustomerCCCD(e.target.value)}
                    />
                    <select
                      value={selectedRoomId}
                      onChange={(e) => setSelectedRoomId(e.target.value)}
                    >
                      <option value="">Chọn phòng</option>
                      {roomRows.map((room) => (
                        <option key={room.id} value={room.id}>
                          {room.id} - {room.name}
                        </option>
                      ))}
                    </select>
                    <button className='btn-add-customer' onClick={handleAddNewCustomer}>Thêm</button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="total-ddp">
          <p><span>Tổng cộng:</span> {calculateGrandTotal()}</p>
        </div>

        <div className="upload-action">
          <div className='btn-action-capnhat-ddp'>
            <button className='btn-popup-update' onClick={handleUpdate}>Cập nhật</button>
            <button className='btn-popup-back' onClick={closePopupUpdate}>Quay lại</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CapNhatDDP
