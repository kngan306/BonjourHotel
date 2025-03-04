import React, { useState } from 'react'
import './ThemKhachHang.css'
import upload_area from '../Assets/upload_area.svg'

const ThemKhachHang = ({ closePopupCreate }) => {

    const [image, setImage] = useState(null);

    const imageHandler = (e) => {
        const file = e.target.files[0];
        setImage(file);
    };

    return (
        <div className='them-khachhang'>
            <div className="container-them-khachhang">
                <h2>Thêm khách hàng mới</h2>
                <div className="form-container-them-khachhang">

                    <div className="form-section-them-khachhang">
                        <div className="form-group-them-khachhang">
                            <label htmlFor="ma-kh">
                                Mã khách hàng:<span>*</span>
                            </label>
                            <input type="text" id='ma-kh' name='ma-kh' required />
                        </div>
                        <div className="form-group-them-khachhang">
                            <label htmlFor="ten-kh">
                                Tên khách hàng:<span>*</span>
                            </label>
                            <input type="text" id='ten-dv' name='ten-dv' required />
                        </div>
                        <div className="form-group-them-khachhang">
                            <label htmlFor="gioi-tinh">Giới tính:</label>
                            <input type="text" id='gioi-tinh' name='gioi-tinh' />
                        </div>
                    </div>

                    <div className="form-section-them-khachhang">
                        <div className="form-group-them-khachhang">
                            <label htmlFor="email">Email:</label>
                            <input type="email" id='email' name='email' />
                        </div>
                        <div className="form-group-them-khachhang">
                            <label htmlFor="phone-kh">Số điện thoại:</label>
                            <input type="tel" id='phone-kh' name='phone-kh' />
                        </div>
                        <div className="form-group-them-khachhang">
                            <label htmlFor="ngay-sinh">Ngày sinh:</label>
                            <input type="date" id="ngay-sinh" name="ngay-sinh" />
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
                    <div className='btn-action-them-khachhang'>
                        <button className='btn-popup-create'>Lưu</button>
                        <button className='btn-popup-back' onClick={closePopupCreate}>Quay lại</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ThemKhachHang
