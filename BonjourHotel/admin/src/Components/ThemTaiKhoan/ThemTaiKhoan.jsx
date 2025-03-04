import React from 'react'
import './ThemTaiKhoan.css'

const ThemTaiKhoan = ({ closePopupCreate }) => {
  return (
    <div className='them-taikhoan'>
      <div className="container-them-taikhoan">
        <h2>Thêm tài khoản mới</h2>
        <div className="form-container-them-taikhoan">
          <div className="form-section-them-taikhoan">
            <div className="form-group-them-taikhoan">
              <label htmlFor="ma-dv">
                Tên đăng nhập:<span>*</span>
              </label>
              <input type="text" id='ma-dv' name='ma-dv' required />
            </div>
            <div className="form-group-them-taikhoan">
              <label htmlFor="ma-dv">
                Mật khẩu:<span>*</span>
              </label>
              <input type="text" id='ma-dv' name='ma-dv' required />
            </div>
          </div>
          <div className="form-section-them-taikhoan">
            <div className="form-group-them-phong">
              <label htmlFor="role">Vai trò:</label>
              <select id='role'>
                <option value="Admin">Admin</option>
                <option value="Nhân viên">Nhân viên</option>
                <option value="Khách hàng">Khách hàng</option>
              </select>
            </div>
            <div className="form-group-them-taikhoan">
              <label htmlFor="role">Trạng thái:</label>
              <select id='role'>
                <option value="Đang hoạt động">Đang hoạt động</option>
                <option value="Tạm khoá">Tạm khoá</option>
              </select>
            </div>
          </div>
        </div>

        <div className="upload-action">
          <div className='btn-action-them-taikhoan'>
            <button className='btn-popup-create'>Lưu</button>
            <button className='btn-popup-back' onClick={closePopupCreate}>Quay lại</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ThemTaiKhoan
