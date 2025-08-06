import React from 'react'
import './ThemLoaiPhong.css'

const ThemLoaiPhong = ({ closePopupCreate }) => {
  return (
    <div className='them-loaiphong'>
      <div className="container-them-loaiphong">
        <h2>Thêm loại phòng mới</h2>
        <div className="form-container-them-loaiphong">
          <div className="form-section-them-loaiphong">
            <div className="form-group-them-loaiphong">
              <label htmlFor="ma-dv">
                Mã loại phòng:<span>*</span>
              </label>
              <input type="text" id='ma-dv' name='ma-dv' required />
            </div>
          </div>
          <div className="form-section-them-loaiphong">
            <div className="form-group-them-loaiphong">
              <label htmlFor="ten-dv">
                Tên loại phòng:<span>*</span>
              </label>
              <input type="text" id='ten-dv' name='ten-dv' required />
            </div>
          </div>
          <div className="form-section-them-loaiphong">
            <div className="form-group-them-loaiphong">
              <label htmlFor="so-luong">Số lượng:</label>
              <input type="text" id='so-luong' name='so-luong' />
            </div>
          </div>
        </div>

        <div className="upload-action">
          <div className='btn-action-them-loaiphong'>
            <button className='btn-popup-create'>Lưu</button>
            <button className='btn-popup-back' onClick={closePopupCreate}>Quay lại</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ThemLoaiPhong
