import React, { useState } from 'react'
import './ThemDichVu.css'
import upload_area from '../Assets/upload_area.svg'

const ThemDichVu = ({ closePopupCreate }) => {

  const [image, setImage] = useState(null);

  const imageHandler = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  return (
    <div className='them-dichvu'>
      <div className="container-them-dichvu">
        <h2>Thêm dịch vụ mới</h2>
        <div className="form-container-them-dichvu">

          <div className="form-section-them-dichvu">
            <div className="form-group-them-dichvu">
              <label htmlFor="ma-dv">
                Mã dịch vụ:<span>*</span>
              </label>
              <input type="text" id='ma-dv' name='ma-dv' required />
            </div>
            <div className="form-group-them-dichvu">
              <label htmlFor="ten-dv">
                Tên dịch vụ:<span>*</span>
              </label>
              <input type="text" id='ten-dv' name='ten-dv' required />
            </div>
          </div>

          <div className="form-section-them-dichvu">
            <div className="form-group-them-dichvu">
              <label htmlFor="gia">Giá:</label>
              <input type="text" id='gia' name='gia' />
            </div>
            <div className="form-group-them-dichvu">
              <label htmlFor="mo-ta">Mô tả:</label>
              <textarea type="text" id='mo-ta' name='mo-ta' />
            </div>
          </div>
        </div>

        <div className="upload-action">
          <label htmlFor="them-anh">Ảnh:</label>
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
          <div className='btn-action-them-dichvu'>
            <button className='btn-popup-create'>Lưu</button>
            <button className='btn-popup-back' onClick={closePopupCreate}>Quay lại</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ThemDichVu
