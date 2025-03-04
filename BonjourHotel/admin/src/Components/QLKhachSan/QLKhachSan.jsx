import React, { useState, useEffect } from 'react';
import './QLKhachSan.css';
import imagecndanang from '../Assets/image-cn-danang.png';
import imagecnnhatrang from '../Assets/image-cn-nhatrang.png';
import imagecnphuyen from '../Assets/image-cn-phuyen.png';

const branchData = {
  'Đà Nẵng': {
    code: 'CN001',
    name: 'BONJOUR DaNang Hotel',
    address: '36 - 38 Lâm Hoành, phường Phước Mỹ, quận Sơn Trà, Đà Nẵng',
    phone: '1900 1234',
    size: '200.5m²',
    amenities: 'hồ bơi vô cực, 24/24, đưa đón sân bay...',
    description: 'Bể bơi vô cực với hàng dừa soi mình nơi mặt nước cùng khu vườn xanh ngát bao quanh...',
    email: 'bonjourhotel@gmail.com',
    rooms: '162 phòng',
    image: imagecndanang,
  },
  'Nha Trang': {
    code: 'CN002',
    name: 'BONJOUR NhaTrang Hotel',
    address: '06 Trần Quang Khải, P. Tân Lập TP. Nha Trang, Khánh Hòa',
    phone: '1900 2345',
    size: '150.0m²',
    amenities: 'hồ bơi vô cực, 24/24, đưa đón sân bay...',
    description: 'Tọa lạc tại tầng 17 của khách sạn, bể bơi vô cực trên cao cho ta thấy mình bé nhỏ giữa biển trời...',
    email: 'bonjourhotel@gmail.com',
    rooms: '162 phòng',
    image: imagecnnhatrang,
  },
  'Phú Yên': {
    code: 'CN003',
    name: 'BONJOUR PhuYen Hotel',
    address: '51 Độc Lập, phường 7, TP. Tuy Hòa, Phú Yên',
    phone: '1900 3456',
    size: '300.0m²',
    amenities: 'hồ bơi vô cực, 24/24, đưa đón sân bay...',
    description: 'Từ mặt hồ nước phẳng lặng, Tuy Hòa Beach Club trông như hai thế giới tồn tại song song...',
    email: 'bonjourhotel@gmail.com',
    rooms: '162 phòng',
    image: imagecnphuyen,
  },
};

const QLKhachSan = () => {
  const [selectedBranch, setSelectedBranch] = useState('Đà Nẵng');
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(branchData[selectedBranch]);

  // Cập nhật formData khi selectedBranch thay đổi
  useEffect(() => {
    setFormData(branchData[selectedBranch]);
  }, [selectedBranch]);

  const handleSelectBranch = (branch) => {
    setSelectedBranch(branch);
    setIsEditing(false); // Đóng chế độ chỉnh sửa khi chuyển chi nhánh
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing); // Chuyển đổi giữa chế độ xem và chỉnh sửa
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = () => {
    branchData[selectedBranch] = formData; // Lưu thông tin chỉnh sửa
    setIsEditing(false); // Đóng chế độ chỉnh sửa sau khi lưu
  };

  const renderBranchInfo = () => {
    return (
      <div className="branch-info">
        {formData.image && <img src={formData.image} alt={formData.name} className="branch-image" />}
        <div className="branch-details">
          {isEditing ? (
            <>
              <label>
                <strong>Mã CN:</strong>
                <input type="text" name="code" value={formData.code} onChange={handleInputChange} />
              </label>
              <label>
                <strong>Tên CN:</strong>
                <input type="text" name="name" value={formData.name} onChange={handleInputChange} />
              </label>
              <label>
                <strong>Địa chỉ:</strong>
                <input type="text" name="address" value={formData.address} onChange={handleInputChange} />
              </label>
              <label>
                <strong>Số điện thoại:</strong>
                <input type="text" name="phone" value={formData.phone} onChange={handleInputChange} />
              </label>
              <label>
                <strong>Kích thước CN:</strong>
                <input type="text" name="size" value={formData.size} onChange={handleInputChange} />
              </label>
              <label>
                <strong>Tiện nghi:</strong>
                <input type="text" name="amenities" value={formData.amenities} onChange={handleInputChange} />
              </label>
              <label>
                <strong>Mô tả:</strong>
                <textarea name="description" value={formData.description} onChange={handleInputChange} />
              </label>
              <label>
                <strong>Email:</strong>
                <input type="email" name="email" value={formData.email} onChange={handleInputChange} />
              </label>
              <label>
                <strong>Tổng số phòng:</strong>
                <input type="text" name="rooms" value={formData.rooms} onChange={handleInputChange} />
              </label>
            </>
          ) : (
            <>
              <p><strong>Mã CN:</strong> {formData.code}</p>
              <p><strong>Tên CN:</strong> {formData.name}</p>
              <p><strong>Địa chỉ:</strong> {formData.address}</p>
              <p><strong>Số điện thoại:</strong> {formData.phone}</p>
              <p><strong>Kích thước CN:</strong> {formData.size}</p>
              <p><strong>Tiện nghi:</strong> {formData.amenities}</p>
              <p><strong>Mô tả:</strong> {formData.description}</p>
              <p><strong>Email:</strong> {formData.email}</p>
              <p><strong>Tổng số phòng:</strong> {formData.rooms}</p>
            </>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="ql-khachsan">
      <div className="branch-buttons">
        {Object.keys(branchData).map((branch) => (
          <button
            key={branch}
            className={selectedBranch === branch ? 'active' : ''}
            onClick={() => handleSelectBranch(branch)}
          >
            {branch}
          </button>
        ))}
      </div>

      {renderBranchInfo()}

      <div className="edit-buttons">
        {isEditing ? (
          <button onClick={handleSave}>Lưu</button>
        ) : (
          <button onClick={handleEditToggle}>Chỉnh sửa</button>
        )}
      </div>
    </div>
  );
};

export default QLKhachSan;
