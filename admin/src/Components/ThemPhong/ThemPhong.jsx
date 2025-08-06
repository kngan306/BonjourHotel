import React, { useState } from 'react'
import './ThemPhong.css'
import upload_area from '../Assets/upload_area.svg'

const ThemPhong = ({ closePopupCreate }) => {

    const [image1, setImage1] = useState(null);
    const [image2, setImage2] = useState(null);
    const [image3, setImage3] = useState(null);

    const imageHandler = (e, imageNumber) => {
        const file = e.target.files[0];
        if (imageNumber === 1) setImage1(file);
        else if (imageNumber === 2) setImage2(file);
        else if (imageNumber === 3) setImage3(file);
    };

    return (
        <div className='them-phong'>
            <div className="container-them-phong">
                <h2>Thêm phòng mới</h2>
                <div className="form-container-them-phong">

                    {/* First form section */}
                    <div className="form-section-them-phong">
                        <div className="form-group-them-phong">
                            <label htmlFor="ma-phong">
                                Mã phòng:<span>*</span>
                            </label>
                            <input type="text" id='ma-phong' name='ma-phong' required />
                        </div>
                        <div className="form-group-them-phong">
                            <label htmlFor="ten-phong">
                                Tên phòng:<span>*</span>
                            </label>
                            <input type="text" id='ten-phong' name='ten-phong' required />
                        </div>
                        <div className="form-group-them-phong">
                            <label htmlFor="gia">Giá:</label>
                            <input type="text" id='gia' name='gia' />
                        </div>
                        <div className="form-group-them-phong">
                            <label htmlFor="vi-tri">Vị trí:</label>
                            <input type="text" id='vi-tri' name='vi-tri' />
                        </div>
                    </div>

                    {/* Second form section */}
                    <div className="form-section-them-phong">
                        <div className="form-group-them-phong">
                            <label htmlFor="trang-thai">Trạng thái:</label>
                            <select name="trang-thai" id="trang-thai">
                                <option value="Trống">Trống</option>
                                <option value="Đã đặt">Đã đặt</option>
                                <option value="Đang thuê">Đang thuê</option>
                            </select>
                        </div>
                        <div className="form-group-them-phong">
                            <label htmlFor="chi-nhanh">Chi nhánh:</label>
                            <select name="chi-nhanh" id="chi-nhanh">
                                <option value="Đà Nẵng">Đà Nẵng</option>
                                <option value="Nha Trang">Nha Trang</option>
                                <option value="Phú Yên">Phú Yên</option>
                            </select>
                        </div>
                        <div className="form-group-them-phong">
                            <label htmlFor="sl-nguoi">SL người:</label>
                            <input type="text" id='sl-nguoi' name='sl-nguoi' />
                        </div>
                        <div className="form-group-them-phong">
                            <label htmlFor="sl-giuong">SL giường:</label>
                            <input type="text" id='sl-giuong' name='sl-giuong' />
                        </div>
                    </div>

                    {/* Third form section */}
                    <div className="form-section-them-phong">
                        <div className="form-group-them-phong">
                            <label htmlFor="sl-phong-tam">SL phòng tắm:</label>
                            <input type="text" id='sl-phong-tam' name='sl-phong-tam' />
                        </div>
                        <div className="form-group-them-phong">
                            <label htmlFor="kich-thuoc">Kích thước:</label>
                            <input type="text" id='kich-thuoc' name='kich-thuoc' />
                        </div>
                        <div className="form-group-them-phong">
                            <label htmlFor="tien-ich">Tiện ích:</label>
                            <textarea type="text" id='tien-ich' name='tien-ich' />
                        </div>
                        <div className="form-group-them-phong">
                            <label htmlFor="mo-ta">Mô tả:</label>
                            <textarea type="text" id='mo-ta' name='mo-ta' />
                        </div>
                    </div>
                </div>
                <div className="upload-action">
                    <label htmlFor="them-anh">Ảnh:</label>
                    <div className="img-upload">
                        {/* Image 1 upload */}
                        <label htmlFor="file-input1">
                            <img src={image1 ? URL.createObjectURL(image1) : upload_area} alt="" />
                        </label>
                        <input
                            type="file"
                            id="file-input1"
                            hidden
                            onChange={(e) => imageHandler(e, 1)}
                        />

                        {/* Image 2 upload */}
                        <label htmlFor="file-input2">
                            <img src={image2 ? URL.createObjectURL(image2) : upload_area} alt="" />
                        </label>
                        <input
                            type="file"
                            id="file-input2"
                            hidden
                            onChange={(e) => imageHandler(e, 2)}
                        />

                        {/* Image 3 upload */}
                        <label htmlFor="file-input3">
                            <img src={image3 ? URL.createObjectURL(image3) : upload_area} alt="" />
                        </label>
                        <input
                            type="file"
                            id="file-input3"
                            hidden
                            onChange={(e) => imageHandler(e, 3)}
                        />
                    </div>
                    <div className='btn-action-them-phong'>
                        <button className='btn-popup-create'>Lưu</button>
                        <button className='btn-popup-back' onClick={closePopupCreate}>Quay lại</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ThemPhong
