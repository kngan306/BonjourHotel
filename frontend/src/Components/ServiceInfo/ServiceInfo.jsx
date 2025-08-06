import React, { useEffect, useState } from 'react';
import './ServiceInfo.css';
import axios from 'axios';

const ServiceInfo = ({ formData, setFormData }) => {
    const [services, setServices] = useState([]);
    const [selectedServices, setSelectedServices] = useState({});

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/dich-vu');
                setServices(response.data);
            } catch (error) {
                console.error('Lỗi khi lấy dịch vụ:', error);
            }
        };

        fetchServices();
    }, []);

    const handleServiceChange = (e, service) => {
        const { checked } = e.target;
        const updatedSelectedServices = {
            ...selectedServices,
            [service.MaDV]: checked ? service.GiaDV : 0,
        };
        setSelectedServices(updatedSelectedServices);

        // Cập nhật selectedServices vào formData
        setFormData(prev => ({
            ...prev,
            selectedServices: updatedSelectedServices
        }));

        // Tính tổng giá dịch vụ mới
        const totalServiceFee = Object.values(updatedSelectedServices).reduce((total, price) => total + price, 0);
        setFormData(prev => ({ ...prev, serviceFee: totalServiceFee }));
    };

    // const handleChange = (e) => {
    //     const { name, checked } = e.target;
    //     setFormData({ ...formData, [name]: checked });
    // };

    return (
        <div className="service-info">
            <h2>Dịch vụ</h2>
            <div className="step-subtext-container">
                <p className="subtext">Vui lòng chọn dịch vụ</p>
                {/* <span className="step">Bước 3/4</span> */}
            </div>
            <div className="checkbox-container">
                {services.map(service => (
                    <div key={service.MaDV}>
                        <div className="form-group1">
                            <input
                                type="checkbox"
                                id={service.MaDV}
                                onChange={(e) => handleServiceChange(e, service)}
                            />
                            <label htmlFor={service.MaDV}>{service.TenDV}</label>
                        </div>
                        <div className="divider">
                            <hr className="line" />
                        </div>
                    </div>
                ))}

                {/* <hr className='line'/> */}
                {/* <div className="form-group1">
                    <input
                        type="checkbox"
                        name="airportPickup"
                        checked={formData.airportPickup}
                        onChange={handleChange}
                        id="airportPickup"
                    />
                    <label htmlFor="airportPickup">Đưa đón sân bay</label>
                    
                </div> */}
                {/* <hr className='line'/>
                <div className="form-group1">
                    <input
                        type="checkbox"
                        name="laundry"
                        checked={formData.laundry}
                        onChange={handleChange}
                        id="laundry"
                    />
                    <label htmlFor="laundry">Giặt là quần áo</label>
                    
                </div>
                <hr className='line'/>
                <div className="form-group1">
                    <input
                        type="checkbox"
                        name="twentyFourService"
                        checked={formData.twentyFourService}
                        onChange={handleChange}
                        id="twentyFourService"
                    />
                    <label htmlFor="twentyFourService">24/24</label>
                </div> */}
            </div>
        </div>
    );
};

export default ServiceInfo
