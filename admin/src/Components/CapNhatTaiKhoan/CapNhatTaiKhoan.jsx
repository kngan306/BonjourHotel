import React, { useState } from 'react'
import './CapNhatTaiKhoan.css'

const CapNhatTaiKhoan = ({ closePopupUpdate }) => {
  return (
    <div className='capnhat-taikhoan'>
      <div className="container-capnhat-taikhoan">
        <h2>Cập nhật tài khoản</h2>
        <div className="form-container-capnhat-taikhoan">
          <div className="form-section-capnhat-taikhoan">
            <div className="form-group-capnhat-taikhoan">
              <label htmlFor="ma-dv">
                Tên đăng nhập:<span>*</span>
              </label>
              <input type="text" id='ma-dv' name='ma-dv' required />
            </div>
            <div className="form-group-capnhat-taikhoan">
              <label htmlFor="ma-dv">
                Mật khẩu:<span>*</span>
              </label>
              <input type="text" id='ma-dv' name='ma-dv' required />
            </div>
          </div>
          <div className="form-section-capnhat-taikhoan">
            <div className="form-group-capnhat-phong">
              <label htmlFor="role">Vai trò:</label>
              <select id='role'>
                <option value="Admin">Admin</option>
                <option value="Nhân viên">Nhân viên</option>
                <option value="Khách hàng">Khách hàng</option>
              </select>
            </div>
            <div className="form-group-capnhat-taikhoan">
              <label htmlFor="role">Trạng thái:</label>
              <select id='role'>
                <option value="Đang hoạt động">Đang hoạt động</option>
                <option value="Tạm khoá">Tạm khoá</option>
              </select>
            </div>
          </div>
        </div>

        <div className="upload-action">
          <div className='btn-action-capnhat-taikhoan'>
            <button className='btn-popup-update'>Cập nhật</button>
            <button className='btn-popup-back' onClick={closePopupUpdate}>Quay lại</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CapNhatTaiKhoan
