import React, { useState } from 'react'
import './ThemDDP.css'
import icondelete from '../Assets/icon-delete.png'

const ThemDDP = ({ closePopupCreate }) => {

    const [roomRows, setRoomRows] = useState([
        { id: 'P001', name: 'Standard Double', type: 'Phòng đơn', price: '5.499.000', total: '5.499.000' },
    ]);

    const [serviceRows, setServiceRows] = useState([
        { id: 'DV001', name: 'Hồ bơi vô cực', price: '100.000' },
    ]);

    const [customerRows, setCustomerRows] = useState([
        { id: 'KH001', name: 'Nguyễn Văn A', cccd: '0123456789', phone: '0987654321', roombooking: 'P001' },
    ]);

    // States for showing modals
    const [showRoomModal, setShowRoomModal] = useState(false);
    const [showServiceModal, setShowServiceModal] = useState(false);
    const [showCustomerModal, setShowCustomerModal] = useState(false);

    // Available items
    const [availableRooms, setAvailableRooms] = useState([
        { id: 'P002', name: 'Deluxe Room', type: 'Phòng đôi', price: '7.500.000' },
        { id: 'P003', name: 'Suite Room', type: 'Phòng gia đình', price: '10.000.000', },
    ]);

    const [availableServices, setAvailableServices] = useState([
        { id: 'DV002', name: 'Spa', price: '200.000' },
        { id: 'DV003', name: 'Gym', price: '150.000' },
    ]);

    const [availableCustomers, setAvailableCustomers] = useState([
        { id: 'KH002', name: 'Trần Thị B', cccd: '0123456789', phone: '0987654321' },
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
        const servicesToAdd = availableServices.filter(service => selectedServices.includes(service.id));
        setServiceRows(prevRows => [...prevRows, ...servicesToAdd]);
        setAvailableServices(prevServices => prevServices.filter(service => !selectedServices.includes(service.id)));
        setSelectedServices([]); // Reset danh sách dịch vụ đã chọn
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
                { id: deletedItem.id, name: deletedItem.name, type: deletedItem.type, price: deletedItem.price, phone: deletedItem.phone, cccd: deletedItem.cccd },
            ]);
        }
    };

    // Hàm xoá dòng phòng
    const handleDeleteRoom = (roomId) => {
        handleDeleteRow(roomId, roomRows, setRoomRows, setAvailableRooms);
    };

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
    const [selectedRoomId, setSelectedRoomId] = useState(''); // State cho phòng được chọn

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

    // Hàm xử lý thay đổi số lượng phòng
    // const handleQuantityChange = (e, roomId) => {
    //     const newQuantity = parseInt(e.target.value, 10) || 1; // Đảm bảo giá trị là số nguyên và không nhỏ hơn 1
    //     setRoomRows(prevRows =>
    //         prevRows.map(row =>
    //             row.id === roomId
    //                 ? { ...row, quantity: newQuantity, total: (newQuantity * parseFloat(row.price.replace(/\./g, '').replace(',', '.'))).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }) }
    //                 : row
    //         )
    //     );
    // };

    return (
        <div className='them-ddp'>
            <div className="container-them-ddp">
                <h2>Thêm đơn đặt phòng mới</h2>
                <div className="form-container-them-ddp">

                    <div className="form-section-them-ddp">
                        <div className="form-group-them-ddp">
                            <label htmlFor="ma-ddp">
                                Mã DDP:<span>*</span>
                            </label>
                            <input type="text" id='ma-ddp' name='ma-ddp' required />
                        </div>
                        <div className="form-group-them-ddp">
                            <label htmlFor="ngay-dat-phong">Ngày đặt phòng:</label>
                            <input type="date" id="ngay-dat-phong" name="ngay-dat-phong" />
                        </div>
                        <div className="form-group-them-ddp">
                            <label htmlFor="so-dem-o">Số đêm ở:</label>
                            <input type="text" id="so-dem-o" name="so-dem-o" />
                        </div>
                    </div>

                    <div className="form-section-them-ddp">
                        <div className="form-group-them-ddp">
                            <label htmlFor="ten-kh">
                                Tên KH:<span>*</span>
                            </label>
                            <input type="text" id='ten-kh' name='ten-kh' required />
                        </div>
                        <div className="form-group-them-ddp">
                            <label htmlFor="ngay-nhan-phong">Ngày nhận phòng:</label>
                            <input type="date" id="ngay-nhan-phong" name="ngay-nhan-phong" />
                        </div>
                        <div className="form-group-them-ddp">
                            <label htmlFor="ngay-tra-phong-thuc">Ngày trả phòng thực tế:</label>
                            <input type="date" id="ngay-tra-phong-thuc" name="ngay-tra-phong-thuc" />
                        </div>
                    </div>

                    <div className="form-section-them-ddp">
                        <div className="form-group-them-ddp">
                            <label htmlFor="sdt-kh">
                                Số điện thoại:<span>*</span>
                            </label>
                            <input type="text" id='sdt-kh' name='sdt-kh' required />
                        </div>

                        <div className="form-group-them-ddp">
                            <label htmlFor="ngay-tra-phong">Ngày trả phòng:</label>
                            <input type="date" id="ngay-tra-phong" name="ngay-tra-phong" />
                        </div>

                        <div className="form-group-them-phong">
                            <label htmlFor="trang-thai-ddp">Trạng thái:</label>
                            <select name="trang-thai-ddp" id="trang-thai-ddp">
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
                        <button className='btn-them-phong-vao-ddp' onClick={() => setShowRoomModal(true)}>Thêm phòng</button>
                    </div>
                    <div className="table-container-themddp">
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
                                        {availableRooms.map((room) => (
                                            <tr key={room.id}>
                                                <td>1</td>
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
                    <div className="table-container-themddp">
                        <table>
                            <thead>
                                <tr>
                                    <th className='stt'>STT</th>
                                    <th>Mã dịch vụ</th>
                                    <th>Tên dịch vụ</th>
                                    <th>Giá</th>
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
                                    <button className='btn-add-service' onClick={handleAddMultipleServices}>Thêm</button>
                                </div>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>STT</th>
                                            <th>Tên dịch vụ</th>
                                            <th>Giá</th>
                                            <th>Chọn</th>
                                            {/* <th>Thao tác</th> */}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {availableServices.map((service) => (
                                            <tr key={service.id}>
                                                <td>1</td> {/* Số thứ tự tự tăng */}
                                                <td>{service.name}</td>
                                                <td>{service.price}</td>
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
                                </div> */}
                                <div className="available-customers">
                                    {/* <ul>
                                        {availableCustomers.map((customer) => (
                                            <li key={customer.id}>
                                                <span>{customer.name}</span>
                                                <span>{customer.cccd}</span>
                                                <span>{customer.phone}</span>
                                                <button className='btn-add-customer' onClick={() => handleAddCustomer(customer)}>Thêm</button>
                                            </li>
                                        ))}
                                    </ul> */}
                                </div>
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
                                        <input
                                            type="tel"
                                            placeholder="Số điện thoại"
                                            value={newCustomerPhone}
                                            onChange={(e) => setNewCustomerPhone(e.target.value)}
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
                                    {/* <div className="available-customers">
                                        <ul>
                                            {availableCustomers.map((customer) => (
                                                <li key={customer.id}>
                                                    <span>{customer.name}</span>
                                                    <span>{customer.cccd}</span>
                                                    <span>{customer.phone}</span>
                                                    <button className='btn-add-customer' onClick={() => handleAddCustomer(customer)}>Thêm</button>
                                                </li>
                                            ))}
                                        </ul>
                                    </div> */}
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <div className="total-ddp">
                    <p><span>Tổng cộng:</span> {calculateGrandTotal()}</p>
                </div>

                <div className="upload-action">
                    <div className='btn-action-them-ddp'>
                        <button className='btn-popup-create'>Lưu</button>
                        <button className='btn-popup-back' onClick={closePopupCreate}>Quay lại</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ThemDDP
