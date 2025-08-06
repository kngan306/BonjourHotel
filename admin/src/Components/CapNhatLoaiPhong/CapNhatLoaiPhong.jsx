import React from 'react'
import './CapNhatLoaiPhong.css'

const CapNhatLoaiPhong = ({ closePopupUpdate }) => {
  return (
    <div className='capnhat-loaiphong'>
      <div className="container-capnhat-loaiphong">
        <h2>Cập nhật loại phòng</h2>
        <div className="form-container-capnhat-loaiphong">
          <div className="form-section-capnhat-loaiphong">
            <div className="form-group-capnhat-loaiphong">
              <label htmlFor="ma-dv">
                Mã loại phòng:<span>*</span>
              </label>
              <input type="text" id='ma-dv' name='ma-dv' required />
            </div>
          </div>
          <div className="form-section-capnhat-loaiphong">
            <div className="form-group-capnhat-loaiphong">
              <label htmlFor="ten-dv">
                Tên loại phòng:<span>*</span>
              </label>
              <input type="text" id='ten-dv' name='ten-dv' required />
            </div>
          </div>
          <div className="form-section-capnhat-loaiphong">
            <div className="form-group-capnhat-loaiphong">
              <label htmlFor="so-luong">Số lượng:</label>
              <input type="text" id='so-luong' name='so-luong' />
            </div>
          </div>
        </div>

        <div className="upload-action">
          <div className='btn-action-capnhat-loaiphong'>
            <button className='btn-popup-update'>Cập nhật</button>
            <button className='btn-popup-back' onClick={closePopupUpdate}>Quay lại</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CapNhatLoaiPhong
