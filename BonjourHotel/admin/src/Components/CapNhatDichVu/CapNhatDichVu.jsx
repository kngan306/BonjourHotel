import React, { useState } from 'react'
import './CapNhatDichVu.css'
import upload_area from '../Assets/upload_area.svg'

const CapNhatDichVu = ({ closePopupUpdate }) => {

  const [image, setImage] = useState(null);

  const imageHandler = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  return (
    <div className='capnhat-dichvu'>
      <div className="container-capnhat-dichvu">
        <h2>Cập nhật dịch vụ</h2>
        <div className="form-container-capnhat-dichvu">

          <div className="form-section-capnhat-dichvu">
            <div className="form-group-capnhat-dichvu">
              <label htmlFor="ma-dv">
                Mã dịch vụ:<span>*</span>
              </label>
              <input type="text" id='ma-dv' name='ma-dv' required />
            </div>
            <div className="form-group-capnhat-dichvu">
              <label htmlFor="ten-dv">
                Tên dịch vụ:<span>*</span>
              </label>
              <input type="text" id='ten-dv' name='ten-dv' required />
            </div>
          </div>

          <div className="form-section-capnhat-dichvu">
            <div className="form-group-capnhat-dichvu">
              <label htmlFor="gia">Giá:</label>
              <input type="text" id='gia' name='gia' />
            </div>
            <div className="form-group-capnhat-dichvu">
              <label htmlFor="mo-ta">Mô tả:</label>
              <textarea type="text" id='mo-ta' name='mo-ta' />
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
          <div className='btn-action-capnhat-dichvu'>
            <button className='btn-popup-update'>Cập nhật</button>
            <button className='btn-popup-back' onClick={closePopupUpdate}>Quay lại</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CapNhatDichVu
