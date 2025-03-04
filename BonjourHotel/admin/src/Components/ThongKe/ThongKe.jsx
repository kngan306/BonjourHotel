import React, { useState } from 'react';
import { MdRoomService } from "react-icons/md";
import { GiTakeMyMoney } from "react-icons/gi";
import { IoBed } from "react-icons/io5";
import { MdEmojiPeople } from "react-icons/md";
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './ThongKe.css';
import { Link } from 'react-router-dom';

const ThongKe = () => {
    const [startDate, setStartDate] = useState("2023-11-01"); // Default start date
    const [endDate, setEndDate] = useState("2024-11-01"); // Default end date
    const [branch, setBranch] = useState("Tất cả"); // Default branch

    // Sample data for statistics
    const data = [
        { name: 'Tháng 11', roomBooked: 150, serviceBooked: 80, revenue: 110, date: '2023-11-01', branch: 'Đà Nẵng' },
        { name: 'Tháng 11', roomBooked: 120, serviceBooked: 60, revenue: 90, date: '2023-11-01', branch: 'Nha Trang' },
        { name: 'Tháng 11', roomBooked: 130, serviceBooked: 70, revenue: 95, date: '2023-11-01', branch: 'Phú Yên' },
        { name: 'Tháng 12', roomBooked: 160, serviceBooked: 90, revenue: 120, date: '2023-12-01', branch: 'Đà Nẵng' },
        { name: 'Tháng 12', roomBooked: 140, serviceBooked: 70, revenue: 105, date: '2023-12-01', branch: 'Nha Trang' },
        { name: 'Tháng 12', roomBooked: 150, serviceBooked: 80, revenue: 110, date: '2023-12-01', branch: 'Phú Yên' },
        { name: 'Tháng 1', roomBooked: 170, serviceBooked: 100, revenue: 130, date: '2024-01-01', branch: 'Đà Nẵng' },
        { name: 'Tháng 1', roomBooked: 150, serviceBooked: 90, revenue: 115, date: '2024-01-01', branch: 'Nha Trang' },
        { name: 'Tháng 1', roomBooked: 160, serviceBooked: 95, revenue: 120, date: '2024-01-01', branch: 'Phú Yên' },
        { name: 'Tháng 2', roomBooked: 180, serviceBooked: 110, revenue: 140, date: '2024-02-01', branch: 'Đà Nẵng' },
        { name: 'Tháng 2', roomBooked: 160, serviceBooked: 90, revenue: 120, date: '2024-02-01', branch: 'Nha Trang' },
        { name: 'Tháng 2', roomBooked: 170, serviceBooked: 100, revenue: 125, date: '2024-02-01', branch: 'Phú Yên' },
        { name: 'Tháng 3', roomBooked: 190, serviceBooked: 105, revenue: 145, date: '2024-03-01', branch: 'Đà Nẵng' },
        { name: 'Tháng 3', roomBooked: 170, serviceBooked: 95, revenue: 125, date: '2024-03-01', branch: 'Nha Trang' },
        { name: 'Tháng 3', roomBooked: 180, serviceBooked: 100, revenue: 130, date: '2024-03-01', branch: 'Phú Yên' },
        { name: 'Tháng 4', roomBooked: 160, serviceBooked: 80, revenue: 115, date: '2024-04-01', branch: 'Đà Nẵng' },
        { name: 'Tháng 4', roomBooked: 150, serviceBooked: 75, revenue: 110, date: '2024-04-01', branch: 'Nha Trang' },
        { name: 'Tháng 4', roomBooked: 140, serviceBooked: 70, revenue: 105, date: '2024-04-01', branch: 'Phú Yên' },
        { name: 'Tháng 5', roomBooked: 200, serviceBooked: 120, revenue: 160, date: '2024-05-01', branch: 'Đà Nẵng' },
        { name: 'Tháng 5', roomBooked: 180, serviceBooked: 100, revenue: 140, date: '2024-05-01', branch: 'Nha Trang' },
        { name: 'Tháng 5', roomBooked: 190, serviceBooked: 110, revenue: 150, date: '2024-05-01', branch: 'Phú Yên' },
        { name: 'Tháng 6', roomBooked: 170, serviceBooked: 90, revenue: 125, date: '2024-06-01', branch: 'Đà Nẵng' },
        { name: 'Tháng 6', roomBooked: 150, serviceBooked: 70, revenue: 105, date: '2024-06-01', branch: 'Nha Trang' },
        { name: 'Tháng 6', roomBooked: 160, serviceBooked: 80, revenue: 110, date: '2024-06-01', branch: 'Phú Yên' },
        { name: 'Tháng 7', roomBooked: 220, serviceBooked: 130, revenue: 175, date: '2024-07-01', branch: 'Đà Nẵng' },
        { name: 'Tháng 7', roomBooked: 200, serviceBooked: 120, revenue: 165, date: '2024-07-01', branch: 'Nha Trang' },
        { name: 'Tháng 7', roomBooked: 210, serviceBooked: 125, revenue: 170, date: '2024-07-01', branch: 'Phú Yên' },
        { name: 'Tháng 8', roomBooked: 180, serviceBooked: 100, revenue: 135, date: '2024-08-01', branch: 'Đà Nẵng' },
        { name: 'Tháng 8', roomBooked: 160, serviceBooked: 90, revenue: 125, date: '2024-08-01', branch: 'Nha Trang' },
        { name: 'Tháng 8', roomBooked: 170, serviceBooked: 95, revenue: 130, date: '2024-08-01', branch: 'Phú Yên' },
        { name: 'Tháng 9', roomBooked: 200, serviceBooked: 110, revenue: 150, date: '2024-09-01', branch: 'Đà Nẵng' },
        { name: 'Tháng 9', roomBooked: 180, serviceBooked: 100, revenue: 140, date: '2024-09-01', branch: 'Nha Trang' },
        { name: 'Tháng 9', roomBooked: 190, serviceBooked: 105, revenue: 145, date: '2024-09-01', branch: 'Phú Yên' },
        { name: 'Tháng 10', roomBooked: 170, serviceBooked: 85, revenue: 120, date: '2024-10-01', branch: 'Đà Nẵng' },
        { name: 'Tháng 10', roomBooked: 150, serviceBooked: 75, revenue: 110, date: '2024-10-01', branch: 'Nha Trang' },
        { name: 'Tháng 10', roomBooked: 160, serviceBooked: 80, revenue: 115, date: '2024-10-01', branch: 'Phú Yên' },
        { name: 'Tháng 11', roomBooked: 210, serviceBooked: 120, revenue: 165, date: '2024-11-01', branch: 'Đà Nẵng' },
        { name: 'Tháng 11', roomBooked: 190, serviceBooked: 100, revenue: 145, date: '2024-11-01', branch: 'Nha Trang' },
        { name: 'Tháng 11', roomBooked: 200, serviceBooked: 110, revenue: 150, date: '2024-11-01', branch: 'Phú Yên' },
    ];    

    // Filter data based on date range and branch
    const filteredData = data.filter(item => {
        const withinDateRange = item.date >= startDate && item.date <= endDate;
        const matchesBranch = branch === "Tất cả" || item.branch === branch;
        return withinDateRange && matchesBranch;
    });

    const totalRevenue = filteredData.reduce((acc, item) => acc + item.revenue, 0);
    const totalRoomsBooked = filteredData.reduce((acc, item) => acc + item.roomBooked, 0);
    const totalServicesBooked = filteredData.reduce((acc, item) => acc + item.serviceBooked, 0);
    const totalGuests = totalRoomsBooked * 2; // Assuming 2 people per room

    return (
        <div className='thong-ke'>
            <div className="thongke-container">
                <div className="thongke-cards">
                    <div className="thongke-card">
                        <div className="thongke-card-inner">
                            <h3>Tổng phòng được book
                                <IoBed className='card-icon' />
                            </h3>
                            <h1>{totalRoomsBooked}</h1>
                        </div>
                    </div>
                    <div className="thongke-card">
                        <div className="thongke-card-inner">
                            <h3>Tổng dịch vụ được book
                                <MdRoomService className='card-icon' />
                            </h3>
                            <h1>{totalServicesBooked}</h1>
                        </div>
                    </div>
                    <div className="thongke-card">
                        <div className="thongke-card-inner">
                            <h3>Tổng lượng khách đã ở
                                <MdEmojiPeople className='card-icon' />
                            </h3>
                            <h1>{totalGuests}</h1>
                        </div>
                    </div>
                    <div className="thongke-card">
                        <div className="thongke-card-inner">
                            <h3>Tổng doanh thu (triệu)
                                <GiTakeMyMoney className='card-icon' />
                            </h3>
                            <h1>{totalRevenue}</h1>
                        </div>
                    </div>
                </div>
            </div>

            <div className="thongke-options">
                <div className="date-range-selector">
                    <label>
                        Từ ngày:
                        <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                    </label>
                    <label>
                        Đến ngày:
                        <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                    </label>
                </div>

                <div className="branch-selector">
                    <label>
                        Chi nhánh:
                        <select value={branch} onChange={(e) => setBranch(e.target.value)}>
                            <option value="Tất cả">Tất cả</option>
                            <option value="Đà Nẵng">Đà Nẵng</option>
                            <option value="Nha Trang">Nha Trang</option>
                            <option value="Phú Yên">Phú Yên</option>
                        </select>
                    </label>
                </div>

                <div className="view-toggle">
                    <Link to=''>
                        <button className='btn-view-details'>Thống kê hoạt động</button>
                    </Link>
                </div>
            </div>

            {/* Doanh thu - Area Chart */}
            <div className="chart-doanhthu">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={filteredData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend formatter={(value) => (value === "revenue" ? "Doanh thu" : value)} />
                        <Area type="monotone" dataKey="revenue" stroke="#8884d8" fillOpacity={0.3} fill="#8884d8" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default ThongKe;
