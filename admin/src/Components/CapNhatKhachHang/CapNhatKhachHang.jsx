import React, { useState } from 'react'
import './CapNhatKhachHang.css'
import upload_area from '../Assets/upload_area.svg'

const CapNhatKhachHang = ({ closePopupUpdate }) => {

  const [image, setImage] = useState(null);

  const imageHandler = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  return (
    <div className='capnhat-khachhang'>
      <div className="container-capnhat-khachhang">
        <h2>Cập nhật khách hàng</h2>
        <div className="form-container-capnhat-khachhang">

          <div className="form-section-capnhat-khachhang">
            <div className="form-group-capnhat-khachhang">
              <label htmlFor="ma-kh">
                Mã khách hàng:<span>*</span>
              </label>
              <input type="text" id='ma-kh' name='ma-kh' required />
            </div>
            <div className="form-group-capnhat-khachhang">
              <label htmlFor="ten-kh">
                Tên khách hàng:<span>*</span>
              </label>
              <input type="text" id='ten-dv' name='ten-dv' required />
            </div>
            <div className="form-group-capnhat-khachhang">
              <label htmlFor="sex-kh">Giới tính:</label>
              <input type="text" id='sex-kh' name='sex-kh' />
            </div>
          </div>

          <div className="form-section-capnhat-khachhang">
            <div className="form-group-capnhat-khachhang">
              <label htmlFor="email-kh">Email:</label>
              <input type="email" id='email-kh' name='email-kh' />
            </div>
            <div className="form-group-capnhat-khachhang">
              <label htmlFor="phone-kh">Số điện thoại:</label>
              <input type="tel" id='phone-kh' name='phone-kh' />
            </div>
            <div className="form-group-capnhat-khachhang">
              <label htmlFor="birthdate-kh">Ngày sinh:</label>
              <input type="date" id="birthdate-kh" name="birthdate-kh" />
            </div>
          </div>
        </div>

        <div className="upload-action">
          <label htmlFor="capnhat-anh">Ảnh:</label>
          <div className="img-upload">
            <label htmlFor="file-input">
              <img src={image ? URL.createObjectURL(image) : upload_area} alt="" />
            </label>
            <input
              type="file"
              id="file-input"
              hidden
              onChange={imageHandler}
            />
          </div>
          <div className='btn-action-capnhat-khachhang'>
            <button className='btn-popup-update'>Cập nhật</button>
            <button className='btn-popup-back' onClick={closePopupUpdate}>Quay lại</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CapNhatKhachHang
