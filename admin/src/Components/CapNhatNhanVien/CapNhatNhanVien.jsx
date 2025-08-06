import React from 'react'
import './CapNhatNhanVien.css'

const CapNhatNhanVien = ({closePopupUpdate}) => {
  return (
    <div className='capnhat-nhanvien'>
      <div className="container-capnhat-nhanvien">
        <h2>Cập nhật nhân viên</h2>
        <div className="form-container-them-nhanvien">

          <div className="form-section-them-nhanvien">
            <div className="form-group-them-nhanvien">
              <label htmlFor="ma-nv">
                Mã nhân viên:<span>*</span>
              </label>
              <input type="text" id='ma-nv' name='ma-nv' required />
            </div>
            <div className="form-group-them-nhanvien">
              <label htmlFor="ten-nv">
                Tên nhân viên:<span>*</span>
              </label>
              <input type="text" id='ten-nv' name='ten-nv' required />
            </div>
            <div className="form-group-them-nhanvien">
              <label htmlFor="phone-nv">Số điện thoại:</label>
              <input type="tel" id='phone-nv' name='phone-nv' />
            </div>
            <div className="form-group-them-nhanvien">
              <label htmlFor="email-nv">Email:</label>
              <input type="email" id='email-nv' name='email-nv' />
            </div>
            <div className="form-group-them-nhanvien">
              <label htmlFor="address-nv">Địa chỉ:</label>
              <input type="text" id='address-nv' name='address-nv' />
            </div>
          </div>

          <div className="form-section-them-nhanvien">
            <div className="form-group-them-nhanvien">
              <label htmlFor="sex-nv">Giới tính:</label>
              <input type="text" id='sex-nv' name='sex-nv' />
            </div>
            <div className="form-group-them-nhanvien">
              <label htmlFor="birthdate-nv">Ngày sinh:</label>
              <input type="date" id="birthdate-nv" name="birthdate-nv" />
            </div>
            <div className="form-group-them-nhanvien">
              <label htmlFor="ngay-vao-lam">Ngày vào làm:</label>
              <input type="date" id="ngay-vao-lam" name="ngay-vao-lam" />
            </div>
            <div className="form-group-them-nhanvien">
              <label htmlFor="chi-nhanh">Chi nhánh:</label>
              <select name="chi-nhanh" id="chi-nhanh">
                <option value="Đà Nẵng">Đà Nẵng</option>
                <option value="Nha Trang">Nha Trang</option>
                <option value="Phú Yên">Phú Yên</option>
              </select>
            </div>
          </div>
        </div>

        <div className="upload-action">
          <div className='btn-action-capnhat-dichvu'>
            <button className='btn-popup-update'>Cập nhật</button>
            <button className='btn-popup-back' onClick={closePopupUpdate}>Quay lại</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CapNhatNhanVien
