require('dotenv').config(); // Nạp các biến môi trường từ file .env
const express = require('express');
const sql = require('mssql');
const bcrypt = require('bcrypt');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors({ origin: ['http://localhost:3000', 'http://localhost:3001'] }));
app.use(express.json()); // Để xử lý JSON trong request body
// Cấu hình phục vụ tệp tĩnh
// app.use('/assets', express.static(path.join(__dirname, 'frontend/src/Components/Assets')));
// In ra giá trị biến môi trường để kiểm tra
console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_PASSWORD:', process.env.DB_PASSWORD);
console.log('DB_NAME:', process.env.DB_NAME);

// Cấu hình kết nối SQL Server
const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_HOST,
    database: process.env.DB_NAME,
    options: {
        encrypt: true,
        trustServerCertificate: true
    },
    // authentication: {
    //   type: 'default',
    //   options: {
    //     domain: '',
    //     userName: '',
    //     password: ''
    //   }
    // }
};

// Kết nối đến SQL Server
sql.connect(config)
    .then(pool => {
        console.log('Kết nối thành công!');
        // Phần còn lại của mã xử lý đăng ký
        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => {
            console.log(`Server đang chạy trên cổng ${PORT}`);
        });
    })
    .catch(err => {
        console.error('Kết nối thất bại:', err);
    });
// Thêm vào server.js sau khi kết nối SQL Server thành công
app.get('/api/phong-danang', async (req, res) => {
    try {
        const pool = await sql.connect(config);
        const result = await pool.request()
            .query(`SELECT * FROM PHONG WHERE MaCN = 'CN001'`); // CN001 là mã chi nhánh Đà Nẵng
        //console.log('Dữ liệu phòng từ database:', result.recordset);
        res.json(result.recordset);
    } catch (err) {
        console.error('Lỗi khi lấy dữ liệu:', err);
        res.status(500).send('Có lỗi xảy ra');
    }
});

app.get('/api/loai-phong', async (req, res) => {
    try {
        const pool = await sql.connect(config);
        const result = await pool.request().query('SELECT * FROM LOAIPHONG');
        res.json(result.recordset);
    } catch (err) {
        console.error('Lỗi khi lấy loại phòng:', err);
        res.status(500).send('Có lỗi xảy ra');
    }
});

app.get('/api/phong/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const pool = await sql.connect(config);
        const result = await pool.request()
            .input('id', sql.VarChar, id)
            .query('SELECT * FROM PHONG WHERE MaPhong = @id');
        res.json(result.recordset[0]);
    } catch (err) {
        console.error('Lỗi khi lấy phòng:', err);
        res.status(500).send('Có lỗi xảy ra');
    }
});

app.post('/api/login', async (req, res) => {
    const { TaiKhoan, MatKhau } = req.body;

    try {
        const pool = await sql.connect(config);
        console.log("Database connected successfully.");

        const result = await pool.request()
            .input('TaiKhoan', sql.VarChar, TaiKhoan)
            .query('SELECT * FROM ACCOUNT WHERE TaiKhoan = @TaiKhoan');

        if (result.recordset.length === 0) {
            console.log("Tài khoản không tồn tại:", TaiKhoan);
            return res.status(401).json({ message: 'Tài khoản không tồn tại' });
        }

        const user = result.recordset[0];

        if (MatKhau !== user.MatKhau) {
            console.log("Mật khẩu không đúng cho tài khoản:", TaiKhoan);
            return res.status(401).json({ message: 'Mật khẩu không đúng' });
        }

        // // Kiểm tra TrangThai và VaiTro
        // if (user.TrangThai !== 'Hoạt động' || user.VaiTro !== 'Khách hàng') {
        //     console.log("Tài khoản không hoạt động hoặc không phải là khách hàng:", TaiKhoan);
        //     return res.status(403).json({ message: 'Tài khoản không có quyền truy cập' });
        // }

        // Truy vấn lấy thông tin khách hàng từ bảng KHACHHANG
        const khachHangResult = await pool.request()
            .input('Email', sql.VarChar, user.Email)
            .query('SELECT * FROM KHACHHANG WHERE Email = @Email');
        const khachHangInfo = khachHangResult.recordset[0];

        res.json({
            message: 'Đăng nhập thành công',
            user: {
                TaiKhoan: user.TaiKhoan,
                VaiTro: user.VaiTro,
                ...khachHangInfo // Bao gồm các thông tin như tên, SĐT, email, v.v.
            }
        });

    } catch (err) {
        console.error('Lỗi khi đăng nhập:', err);
        res.status(500).json({ message: 'Có lỗi xảy ra trong quá trình đăng nhập' });
    } finally {
        sql.close();
    }
});

app.post('/api/google-login', async (req, res) => {
    const { email, name } = req.body;

    try {
        const pool = await sql.connect(config);

        // Kiểm tra xem email đã tồn tại trong bảng KHACHHANG chưa
        const checkUser = await pool.request()
            .input('Email', sql.VarChar, email)
            .query('SELECT * FROM KHACHHANG WHERE Email = @Email');

        let khachHangInfo;
        if (checkUser.recordset.length === 0) {
            // Nếu email chưa tồn tại, thêm khách hàng mới
            const maxMaKHResult = await pool.request()
                .query(`SELECT MAX(MaKH) AS MaxMaKH FROM KHACHHANG`);
            let maxMaKH = maxMaKHResult.recordset[0].MaxMaKH || 'KH000';
            let nextMaKH = `KH${(parseInt(maxMaKH.slice(2)) + 1).toString().padStart(3, '0')}`;

            await pool.request()
                .input('MaKH', sql.VarChar, nextMaKH)
                .input('TenKH', sql.NVarChar, name)
                .input('Email', sql.VarChar, email)
                .query(`INSERT INTO KHACHHANG (MaKH, TenKH, Email) VALUES (@MaKH, @TenKH, @Email)`);

            khachHangInfo = {
                MaKH: nextMaKH,
                TenKH: name,
                Email: email
            };
        } else {
            // Nếu đã tồn tại, lấy thông tin khách hàng
            khachHangInfo = checkUser.recordset[0];
        }

        res.json({
            message: 'Đăng nhập Google thành công',
            user: khachHangInfo
        });
    } catch (err) {
        console.error('Lỗi khi đăng nhập bằng Google:', err);
        res.status(500).json({ message: 'Có lỗi xảy ra trong quá trình đăng nhập Google' });
    } finally {
        sql.close();
    }
});



app.post('/api/register', async (req, res) => {
    const { Email, TenKH, SDT, TaiKhoan, MatKhau } = req.body;

    try {
        const pool = await sql.connect(config);

        // Tìm mã khách hàng cao nhất hiện tại
        const maxMaKHResult = await pool.request()
            .query(`SELECT MAX(MaKH) AS MaxMaKH FROM KHACHHANG`);
        let maxMaKH = maxMaKHResult.recordset[0].MaxMaKH || 'KH000';
        let nextMaKH = `KH${(parseInt(maxMaKH.slice(2)) + 1).toString().padStart(3, '0')}`;

        {/*// Mã hóa mật khẩu trước khi lưu
        const hashedPassword = await bcrypt.hash(password, 10);*/}

        // Lưu vào bảng KHACHHANG
        await pool.request()
            .input('MaKH', sql.VarChar, nextMaKH)
            .input('TenKH', sql.NVarChar, TenKH)
            .input('Email', sql.VarChar, Email)
            .input('SDT', sql.Char, SDT)
            .query(`INSERT INTO KHACHHANG (MaKH, TenKH, Email, SDT) VALUES (@MaKH, @TenKH, @Email, @SDT)`);

        // Lưu vào bảng ACCOUNT
        await pool.request()
            .input('TaiKhoan', sql.VarChar, TaiKhoan)
            .input('MatKhau', sql.VarChar, MatKhau)
            .input('Email', sql.VarChar, Email)
            .query(`INSERT INTO ACCOUNT (TaiKhoan, MatKhau, Email, VaiTro, TrangThai) VALUES (@TaiKhoan, @MatKhau, @Email, N'Khách hàng', N'Hoạt động')`);

        res.json({ message: 'Đăng ký thành công' });

    } catch (err) {
        console.error('Lỗi khi đăng ký:', err);
        res.status(500).json({ message: 'Có lỗi xảy ra trong quá trình đăng ký' });
    }
});

const nodemailer = require('nodemailer');
const otpStore = {}; // Lưu OTP tạm thời

// Endpoint gửi OTP
app.post('/api/send-otp', async (req, res) => {
    const { email } = req.body;
    try {
        const pool = await sql.connect(config);

        // Kiểm tra email có tồn tại trong bảng ACCOUNT không
        const existingAccount = await pool.request()
            .input('Email', sql.VarChar, email)
            .query(`SELECT * FROM ACCOUNT WHERE Email = @Email`);

        if (existingAccount.recordset.length > 0) {
            return res.status(400).json({ message: 'Email đã được sử dụng' });
        }

        const otp = Math.floor(100000 + Math.random() * 900000); // Tạo OTP ngẫu nhiên 6 chữ số
        otpStore[email] = otp; // Lưu OTP

        // Cấu hình gửi email
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        // Nội dung email
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Xác thực Email - OTP',
            text: `Mã xác thực OTP đăng ký tài khoản của bạn là: ${otp}`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Lỗi khi gửi OTP:', error); // Log chi tiết lỗi
                return res.status(500).send('Lỗi khi gửi OTP');
            }
            res.status(200).send('OTP đã được gửi');
        });
    } catch (error) {
        console.error('Lỗi khi xử lý yêu cầu gửi OTP:', error);
        res.status(500).json({ message: 'Có lỗi xảy ra' });
    }

});

// Endpoint xác minh OTP
app.post('/api/verify-otp', (req, res) => {
    const { email, otp } = req.body;
    if (otpStore[email] && otpStore[email] === parseInt(otp)) {
        delete otpStore[email];
        return res.status(200).send('Xác thực OTP thành công');
    }
    res.status(400).send('OTP không hợp lệ');
});

app.get('/api/dich-vu', async (req, res) => {
    try {
        const pool = await sql.connect(config);
        const result = await pool.request().query('SELECT * FROM DICHVU');
        res.json(result.recordset);
    } catch (err) {
        console.error('Lỗi khi lấy dịch vụ:', err);
        res.status(500).send('Có lỗi xảy ra');
    }
});

// Cập nhật thông tin khách hàng
app.put('/api/khachhang/:id', async (req, res) => {
    const { id } = req.params;
    const { TenKH, SDT, Email } = req.body;

    try {
        const pool = await sql.connect(config);
        await pool.request()
            .input('TenKH', sql.NVarChar, TenKH)
            .input('SDT', sql.Char, SDT)
            .input('Email', sql.VarChar, Email)
            .input('MaKH', sql.VarChar, id)
            .query('UPDATE KHACHHANG SET TenKH = @TenKH, SDT = @SDT, Email = @Email WHERE MaKH = @MaKH');

        res.status(200).json({ message: 'Cập nhật thông tin khách hàng thành công' });
    } catch (error) {
        console.error('Lỗi khi cập nhật thông tin khách hàng:', error);
        res.status(500).json({ error: 'Lỗi khi cập nhật thông tin khách hàng' });
    }
});




// Tạo đơn đặt phòng mới
app.post('/api/booking', async (req, res) => {
    const { MaKH, NgayDat, NgayNhan, NgayTraPhong, NgayTraPhongThucTe, TrangThai, MaNV } = req.body;

    try {
        const pool = await sql.connect(config);
        // Thêm thông tin đặt phòng vào bảng Booking
        const result = await pool.request()
            .input('NgayDat', sql.Date, NgayDat)
            .input('NgayNhan', sql.Date, NgayNhan)
            .input('NgayTraPhong', sql.Date, NgayTraPhong)
            .input('NgayTraPhongThucTe', sql.Date, NgayTraPhongThucTe)
            .input('TrangThai', sql.NVarChar, TrangThai)
            .input('MaNV', sql.VarChar, MaNV)
            .input('MaKH', sql.VarChar, MaKH)
            .query(`INSERT INTO Booking (NgayDat, NgayNhan, NgayTraPhong, NgayTraPhongThucTe, TrangThai, MaNV, MaKH) 
                    OUTPUT INSERTED.ID 
                    VALUES (@NgayDat, @NgayNhan, @NgayTraPhong, @NgayTraPhongThucTe, @TrangThai, @MaNV, @MaKH)`);

        const bookingID = result.recordset[0].ID;
        // Gửi thông báo về trạng thái thành công của việc đặt phòng
        res.status(201).json({ message: 'Đặt phòng thành công', bookingID });

        // Lấy thông tin khách hàng để gửi email
        const khachHang = await pool.request()
            .input('MaKH', sql.VarChar, MaKH)
            .query('SELECT TenKH, Email FROM KHACHHANG WHERE MaKH = @MaKH');

        const khachHangData = khachHang.recordset[0];
        const email = khachHangData.Email;
        const tenKH = khachHangData.TenKH;

        // Lấy thông tin phòng từ bảng PHONG
        const phong = await pool.request()
            .input('Booking_ID', sql.Int, bookingID)
            .query(`SELECT p.TenPhong, lp.TenLP 
                 FROM PHONG p 
                 JOIN LOAIPHONG lp ON p.MaLP = lp.MaLP 
                 JOIN BookingDetail bd ON bd.MaPhong = p.MaPhong 
                 WHERE bd.Booking_ID = @Booking_ID`);

        const phongData = phong.recordset[0];
        const tenPhong = phongData.TenPhong;
        const loaiPhong = phongData.TenLP;

        // Định dạng lại ngày
        const formattedNgayNhan = new Date(NgayNhan).toLocaleDateString('vi-VN', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
        const formattedNgayTraPhong = new Date(NgayTraPhong).toLocaleDateString('vi-VN', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });

        // Tạo nội dung email với HTML và định dạng font
        const emailContent = `
     <div style="font-family: 'Sans-serif'; font-size: 14px;">
         <p>Kính gửi <b>${tenKH}</b>,</p>

         <p>Chúng tôi rất vui mừng thông báo rằng đơn đặt phòng của quý khách tại Bonjour Hotel đã được xác nhận.</p>
         <p>Xin chân thành cảm ơn quý khách đã lựa chọn Bonjour Hotel cho kỳ nghỉ của mình. Chúng tôi rất mong được đón tiếp quý khách vào ngày <b>${formattedNgayNhan}</b>.</p>

         <p>Để xác nhận lại thông tin đặt phòng, xin vui lòng kiểm tra các chi tiết sau:</p>
         <p><b>Loại phòng:</b> ${loaiPhong}</p>
         <p><b>Tên phòng:</b> ${tenPhong}</p>
         <p><b>Ngày nhận phòng:</b> ${formattedNgayNhan}</p>
         <p><b>Ngày trả phòng:</b> ${formattedNgayTraPhong}</p>

         <p>Nếu thông tin trên có bất kỳ sai sót nào, xin quý khách vui lòng liên hệ với chúng tôi ngay để được hỗ trợ.</p>

         <p>Trong thời gian tới, chúng tôi sẽ sớm liên hệ với quý khách qua số điện thoại 0764474686 để xác nhận lại thông tin đặt phòng và hỗ trợ quý khách trong quá trình chuẩn bị cho chuyến đi.</p>

         <p>Trong suốt thời gian lưu trú, chúng tôi cam kết mang đến cho quý khách những trải nghiệm tuyệt vời nhất. Nếu quý khách có bất kỳ yêu cầu đặc biệt nào, xin đừng ngần ngại liên hệ với bộ phận lễ tân của chúng tôi.</p>

         <p>Một lần nữa, xin cảm ơn quý khách. Chúng tôi rất mong được chào đón quý khách đến với Bonjour Hotel.</p>

         <p style="font-weight: bold; text-align: left;">Trân trọng,<br>
             Bonjour Hotel<br>
             Địa chỉ: 36 - 38 Lâm Hoành, phường Phước Mỹ, quận Sơn Trà, Đà Nẵng<br>
             Mail: bonjourhotel@gmail.com<br>
             SĐT: 0764474686
         </p>
     </div>
    `;
        // Cấu hình gửi email
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Thông báo đặt phòng thành công tại Bonjour Hotel',
            html: emailContent,  // Đặt email dưới dạng HTML
        };

        // Gửi email
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Lỗi khi gửi email xác nhận:', error);
            } else {
                console.log('Email xác nhận đã được gửi:', info.response);
            }
        });
    } catch (error) {
        console.error('Lỗi khi tạo đơn đặt phòng:', error);
        res.status(500).json({ error: 'Lỗi khi tạo đơn đặt phòng' });
    }
});


// Thêm chi tiết phòng vào BookingDetail
app.post('/api/booking-detail', async (req, res) => {
    const { Booking_ID, MaPhong, Gia } = req.body;

    try {
        const pool = await sql.connect(config);
        await pool.request()
            .input('Booking_ID', sql.Int, Booking_ID)
            .input('MaPhong', sql.VarChar, MaPhong)
            .input('Gia', sql.Money, Gia)
            .query(`INSERT INTO BookingDetail (Booking_ID, MaPhong, Gia) VALUES (@Booking_ID, @MaPhong, @Gia)`);

        res.status(201).json({ message: 'Thêm chi tiết phòng thành công' });
    } catch (error) {
        console.error('Lỗi khi thêm chi tiết phòng:', error);
        res.status(500).json({ error: 'Lỗi khi thêm chi tiết phòng' });
    }
});


// Thêm chi tiết dịch vụ vào ServiceDetail
app.post('/api/service-detail', async (req, res) => {
    const { ID, MaPhong, MaDV, Gia } = req.body;

    try {
        const pool = await sql.connect(config);
        await pool.request()
            .input('ID', sql.Int, ID)
            .input('MaPhong', sql.VarChar, MaPhong)
            .input('MaDV', sql.VarChar, MaDV)
            .input('Gia', sql.Money, Gia)
            .query(`INSERT INTO ServiceDetail (ID, MaPhong, MaDV, Gia) VALUES (@ID, @MaPhong, @MaDV, @Gia)`);

        res.status(201).json({ message: 'Thêm chi tiết dịch vụ thành công' });
    } catch (error) {
        console.error('Lỗi khi thêm chi tiết dịch vụ:', error);
        res.status(500).json({ error: 'Lỗi khi thêm chi tiết dịch vụ' });
    }
});

// Cập nhật trạng thái phòng thành "Đang thuê"
app.put('/api/phong/update-status', async (req, res) => {
    const { MaPhong, TrangThai } = req.body;

    try {
        const pool = await sql.connect(config);
        await pool.request()
            .input('MaPhong', sql.VarChar, MaPhong)
            .input('TrangThai', sql.NVarChar, TrangThai)
            .query('UPDATE PHONG SET TrangThai = @TrangThai WHERE MaPhong = @MaPhong');

        res.status(200).json({ message: 'Cập nhật trạng thái phòng thành công' });
    } catch (error) {
        console.error('Lỗi khi cập nhật trạng thái phòng:', error);
        res.status(500).json({ error: 'Lỗi khi cập nhật trạng thái phòng' });
    }
});

app.get('/api/khachhang/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const pool = await sql.connect(config);
        const result = await pool.request()
            .input('MaKH', sql.VarChar, id)
            .query('SELECT * FROM KHACHHANG WHERE MaKH = @MaKH');

        if (result.recordset.length > 0) {
            res.json(result.recordset[0]);
        } else {
            res.status(404).json({ message: 'Không tìm thấy khách hàng' });
        }
    } catch (error) {
        console.error('Lỗi khi lấy thông tin khách hàng:', error);
        res.status(500).json({ message: 'Có lỗi xảy ra khi lấy thông tin khách hàng' });
    }
});

// Cập nhật thông tin chi tiết của khách hàng
app.put('/api/khachhang/update-detail/:id', async (req, res) => {
    const { id } = req.params;
    const { TenKH, SDT, Email, GioiTinh, NgaySinh } = req.body;

    try {
        const pool = await sql.connect(config);
        await pool.request()
            .input('TenKH', sql.NVarChar, TenKH)
            .input('SDT', sql.Char, SDT)
            .input('Email', sql.VarChar, Email)
            .input('GioiTinh', sql.NVarChar, GioiTinh)
            .input('NgaySinh', sql.Date, NgaySinh)
            .input('MaKH', sql.VarChar, id)
            .query(`UPDATE KHACHHANG 
                    SET TenKH = @TenKH, SDT = @SDT, Email = @Email, GioiTinh = @GioiTinh, NgaySinh = @NgaySinh 
                    WHERE MaKH = @MaKH`);

        res.status(200).json({ message: 'Cập nhật thông tin chi tiết khách hàng thành công' });
    } catch (error) {
        console.error('Lỗi khi cập nhật thông tin chi tiết khách hàng:', error);
        res.status(500).json({ error: 'Lỗi khi cập nhật thông tin chi tiết khách hàng' });
    }
});

// Lấy danh sách đơn đặt phòng
{/*app.get('/api/danh-sach-don-dat-phong', async (req, res) => {
    try {
        const pool = await sql.connect(config);
        const result = await pool.request()
            .query(`
                SELECT 
                    b.ID, 
                    b.NgayDat, 
                    b.NgayNhan, 
                    b.NgayTraPhong, 
                    b.NgayTraPhongThucTe, 
                    b.TrangThai,
                    kh.TenKH,
                    kh.SDT,
                    nv.TenNV
                FROM 
                    Booking b
                JOIN 
                    KHACHHANG kh ON b.MaKH = kh.MaKH
                LEFT JOIN 
                    NHANVIEN nv ON b.MaNV = nv.MaNV
            `);

        res.status(200).json(result.recordset);
    } catch (error) {
        console.error('Lỗi khi lấy danh sách đơn đặt phòng:', error);
        res.status(500).json({ message: 'Có lỗi xảy ra trong quá trình lấy danh sách đơn đặt phòng' });
    }
});*/}
app.get('/api/danh-sach-don-dat-phong', async (req, res) => {
    try {
        const { branch, status, fromDate, toDate } = req.query;

        let query = `
            SELECT 
                b.ID, 
                b.NgayDat, 
                b.NgayNhan, 
                b.NgayTraPhong, 
                b.NgayTraPhongThucTe, 
                b.TrangThai,
                kh.TenKH,
                kh.SDT,
                nv.TenNV
            FROM 
                Booking b
            JOIN 
                KHACHHANG kh ON b.MaKH = kh.MaKH
            LEFT JOIN 
                NHANVIEN nv ON b.MaNV = nv.MaNV
            WHERE 
                1=1
        `;

        // Thêm điều kiện lọc nếu có
        if (status) {
            query += ` AND b.TrangThai = @status`;
        }
        if (fromDate) {
            query += ` AND b.NgayDat >= @fromDate`;
        }
        if (toDate) {
            query += ` AND b.NgayDat <= @toDate`;
        }

        const pool = await sql.connect(config);
        const request = pool.request();

        // Gán tham số truy vấn
        if (branch) request.input('branch', sql.NVarChar, branch);
        if (status) request.input('status', sql.NVarChar, status);
        if (fromDate) request.input('fromDate', sql.Date, fromDate);
        if (toDate) request.input('toDate', sql.Date, toDate);

        const result = await request.query(query);
        res.status(200).json(result.recordset);
    } catch (error) {
        console.error('Lỗi khi lấy danh sách đơn đặt phòng:', error);
        res.status(500).json({ message: 'Có lỗi xảy ra trong quá trình lấy danh sách đơn đặt phòng' });
    }
});


// Endpoint để lấy thông tin chi tiết về đơn đặt phòng
app.get('/api/thong-tin-don-dat-phong/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const pool = await sql.connect(config);

        // Lấy thông tin chính của đơn đặt phòng từ bảng Booking và thông tin khách hàng từ bảng KHACHHANG
        const bookingInfo = await pool.request()
            .input('BookingID', sql.Int, id)
            .query(`
                SELECT 
                    b.ID AS MaDDP,
                    kh.TenKH, kh.SDT, 
                    b.NgayDat, b.NgayNhan, b.NgayTraPhong, b.NgayTraPhongThucTe,
                    b.TrangThai
                FROM Booking b
                JOIN KHACHHANG kh ON b.MaKH = kh.MaKH
                WHERE b.ID = @BookingID
            `);

        // Kiểm tra nếu không tìm thấy đơn đặt phòng
        if (bookingInfo.recordset.length === 0) {
            return res.status(404).json({ message: 'Không tìm thấy đơn đặt phòng' });
        }

        const bookingDetails = bookingInfo.recordset[0];

        // Lấy danh sách các phòng trong đơn đặt phòng từ bảng BookingDetail
        const roomDetails = await pool.request()
            .input('BookingID', sql.Int, id)
            .query(`
                SELECT 
                    bd.MaPhong, p.TenPhong, lp.TenLP, bd.Gia
                FROM BookingDetail bd
                JOIN PHONG p ON bd.MaPhong = p.MaPhong
                JOIN LOAIPHONG lp ON p.MaLP = lp.MaLP
                WHERE bd.Booking_ID = @BookingID
            `);

        bookingDetails.rooms = roomDetails.recordset;

        // Lấy danh sách các dịch vụ đã sử dụng trong đơn đặt phòng từ bảng ServiceDetail
        const serviceDetails = await pool.request()
            .input('BookingID', sql.Int, id)
            .query(`
                SELECT 
                    sd.MaDV, dv.TenDV, sd.Gia, sd.MaPhong
                FROM ServiceDetail sd
                JOIN DICHVU dv ON sd.MaDV = dv.MaDV
                WHERE sd.ID = @BookingID
            `);

        bookingDetails.services = serviceDetails.recordset;

        // Lấy danh sách người thuê từ bảng UserDetail
        const userDetails = await pool.request()
            .input('BookingID', sql.Int, id)
            .query(`
                SELECT 
                    ud.MaKH AS MaNguoiThue, kh.TenKH AS TenNguoiThue, kh.CCCD AS CMND, ud.MaPhong AS PhongThue
                FROM UserDetail ud
                JOIN KHACHHANG kh ON ud.MaKH = kh.MaKH
                WHERE ud.Booking_ID = @BookingID
            `);

        bookingDetails.tenants = userDetails.recordset;

        res.json(bookingDetails);
    } catch (error) {
        console.error('Lỗi khi lấy thông tin đơn đặt phòng:', error);
        res.status(500).json({ error: 'Có lỗi xảy ra khi lấy thông tin đơn đặt phòng' });
    }
});

// API lấy danh sách phòng trống
app.get("/api/phong-trong", async (req, res) => {
    try {
        // Truy vấn SQL
        const query = `
        SELECT 
          p.MaPhong, 
          p.TenPhong, 
          lp.TenLP AS LoaiPhong, 
          p.Gia, 
          p.TrangThai
        FROM PHONG p
        JOIN LOAIPHONG lp ON p.MaLP = lp.MaLP
        WHERE p.TrangThai = N'Trống'
      `;

        // Thực thi truy vấn
        const result = await sql.query(query);

        // Trả về kết quả
        res.status(200).json(result.recordset);
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).json({ error: "Lỗi lấy danh sách phòng trống" });
    }
});

// API lấy danh sách dịch vụ chưa sử dụng theo đơn đặt phòng
{/*app.get('/api/dich-vu-chua-su-dung/:id', async (req, res) => {
    const { id } = req.params; // ID của đơn đặt phòng

    try {
        const pool = await sql.connect(config);

        // Lấy danh sách dịch vụ chưa sử dụng theo đơn đặt phòng
        const result = await pool.request()
            .input('BookingID', sql.Int, id)
            .query(`
                SELECT 
                    dv.MaDV, 
                    dv.TenDV, 
                    dv.GiaDV, 
                    p.MaPhong, 
                    p.TenPhong
                FROM BookingDetail bd
                JOIN PHONG p ON bd.MaPhong = p.MaPhong
                CROSS JOIN DICHVU dv
                WHERE bd.Booking_ID = @BookingID
                  AND NOT EXISTS (
                      SELECT 1 
                      FROM ServiceDetail sd
                      WHERE sd.MaDV = dv.MaDV 
                        AND sd.MaPhong = p.MaPhong 
                        AND sd.ID = @BookingID
                  )
            `);

        res.status(200).json(result.recordset);
    } catch (error) {
        console.error("Lỗi khi lấy danh sách dịch vụ chưa sử dụng:", error);
        res.status(500).json({ error: "Có lỗi xảy ra khi lấy danh sách dịch vụ chưa sử dụng." });
    }
});*/}

app.get('/api/dich-vu-chua-su-dung/:bookingid/:roomid', async (req, res) => {
    const { bookingid, roomid } = req.params; // Lấy BookingID và RoomID từ URL

    try {
        const pool = await sql.connect(config);

        // Lấy danh sách dịch vụ chưa sử dụng theo BookingID và RoomID
        const result = await pool.request()
            .input('BookingID', sql.Int, bookingid)
            .input('RoomID', sql.VarChar, roomid)
            .query(`
                SELECT 
                    dv.MaDV, 
                    dv.TenDV, 
                    dv.GiaDV
                FROM DICHVU dv
                WHERE NOT EXISTS (
                    SELECT 1 
                    FROM ServiceDetail sd
                    WHERE sd.MaDV = dv.MaDV 
                      AND sd.MaPhong = @RoomID 
                      AND sd.ID = @BookingID
                )
            `);

        res.status(200).json(result.recordset);
    } catch (error) {
        console.error("Lỗi khi lấy danh sách dịch vụ chưa sử dụng:", error);
        res.status(500).json({ error: "Có lỗi xảy ra khi lấy danh sách dịch vụ chưa sử dụng." });
    }
});

//Xử lý cập nhật
app.post('/api/check-customer', async (req, res) => {
    try {
        const { TenKH, CCCD } = req.body;

        const pool = await sql.connect(config); // Kết nối với SQL Server
        const result = await pool.request()
            .input('TenKH', sql.NVarChar, TenKH)
            .input('CCCD', sql.VarChar, CCCD)
            .query('SELECT * FROM KHACHHANG WHERE TenKH = @TenKH AND CCCD = @CCCD');

        res.status(200).json(result.recordset); // Trả về kết quả truy vấn
    } catch (error) {
        console.error('Lỗi truy vấn:', error);
        res.status(500).json({ message: 'Lỗi server' });
    }
});

app.post('/api/create-customer', async (req, res) => {
    const { TenKH, CCCD, Email, SDT, NgaySinh, GioiTinh } = req.body;

    try {
        const pool = await sql.connect(config);

        // Tìm mã khách hàng lớn nhất hiện tại
        const maxResult = await pool.request()
            .query('SELECT MAX(CAST(SUBSTRING(MaKH, 3, LEN(MaKH)) AS INT)) AS MaxMaKH FROM KHACHHANG');
        const maxMaKH = maxResult.recordset[0].MaxMaKH || 0;
        const nextId = maxMaKH + 1;
        const MaKH = `KH${nextId.toString().padStart(3, '0')}`;

        // Thêm thông tin khách hàng mới
        await pool.request()
            .input('MaKH', sql.VarChar, MaKH)
            .input('TenKH', sql.NVarChar, TenKH)
            .input('CCCD', sql.VarChar, CCCD)
            // .input('Email', sql.VarChar, Email)
            // .input('SDT', sql.VarChar, SDT)
            // .input('NgaySinh', sql.Date, NgaySinh)
            // .input('GioiTinh', sql.NVarChar, GioiTinh)
            .query(`
                INSERT INTO KHACHHANG (MaKH, TenKH, CCCD)
                VALUES (@MaKH, @TenKH, @CCCD)
            `);

        res.json({ MaKH });
    } catch (error) {
        console.error('Lỗi khi tạo khách hàng:', error);
        res.status(500).json({ message: 'Lỗi server' });
    }
});

app.post('/api/update-booking', async (req, res) => {
    const { MaDDP, TenKH, SDT, NgayDat, NgayNhan, NgayTraPhong, TrangThai, RoomDetails, ServiceDetails, CustomerDetails } = req.body;

    try {
        const pool = await sql.connect(config);

        // Cập nhật bảng Booking
        await pool.request()
            .input('MaDDP', sql.Int, MaDDP)
            .input('NgayDat', sql.Date, NgayDat)
            .input('NgayNhan', sql.Date, NgayNhan)
            .input('NgayTraPhong', sql.Date, NgayTraPhong)
            .input('TrangThai', sql.NVarChar, TrangThai)
            .query(`
                UPDATE Booking
                SET NgayDat = @NgayDat, NgayNhan = @NgayNhan, NgayTraPhong = @NgayTraPhong, TrangThai = @TrangThai
                WHERE ID = @MaDDP
            `);

        // -------------------- Xử lý BookingDetail (RoomDetails) --------------------
        // Lấy danh sách hiện tại trong BookingDetail
        const currentRoomDetails = (await pool.request()
            .input('MaDDP', sql.Int, MaDDP)
            .query('SELECT MaPhong FROM BookingDetail WHERE Booking_ID = @MaDDP')).recordset.map(row => row.MaPhong);

        const newRoomDetails = RoomDetails.map(room => room.MaPhong);

        // Xóa các phòng không còn tồn tại trong RoomDetails
        for (const room of currentRoomDetails) {
            if (!newRoomDetails.includes(room)) {
                await pool.request()
                    .input('MaDDP', sql.Int, MaDDP)
                    .input('MaPhong', sql.VarChar, room)
                    .query('DELETE FROM BookingDetail WHERE Booking_ID = @MaDDP AND MaPhong = @MaPhong');
            }
        }

        // Thêm hoặc cập nhật phòng trong RoomDetails
        for (const { MaPhong, Gia } of RoomDetails) {
            await pool.request()
                .input('MaDDP', sql.Int, MaDDP)
                .input('MaPhong', sql.VarChar, MaPhong)
                .input('Gia', sql.Money, Gia)
                .query(`
                    MERGE INTO BookingDetail AS target
                    USING (SELECT @MaDDP AS Booking_ID, @MaPhong AS MaPhong, @Gia AS Gia) AS source
                    ON target.Booking_ID = source.Booking_ID AND target.MaPhong = source.MaPhong
                    WHEN MATCHED THEN UPDATE SET Gia = source.Gia
                    WHEN NOT MATCHED THEN INSERT (Booking_ID, MaPhong, Gia) VALUES (source.Booking_ID, source.MaPhong, source.Gia);
                `);
        }

        // -------------------- Xử lý UserDetail (CustomerDetails) --------------------
        // Lấy danh sách hiện tại trong UserDetail
        const currentUserDetails = (await pool.request()
            .input('MaDDP', sql.Int, MaDDP)
            .query('SELECT MaPhong, MaKH FROM UserDetail WHERE Booking_ID = @MaDDP')).recordset;

        const newUserDetails = CustomerDetails.map(detail => `${detail.MaPhong}-${detail.MaKH}`);

        // Xóa các khách hàng không còn trong danh sách
        for (const { MaPhong, MaKH } of currentUserDetails) {
            const key = `${MaPhong}-${MaKH}`;
            if (!newUserDetails.includes(key)) {
                await pool.request()
                    .input('MaDDP', sql.Int, MaDDP)
                    .input('MaPhong', sql.VarChar, MaPhong)
                    .input('MaKH', sql.VarChar, MaKH)
                    .query('DELETE FROM UserDetail WHERE Booking_ID = @MaDDP AND MaPhong = @MaPhong AND MaKH = @MaKH');
            }
        }

        // Thêm hoặc cập nhật khách hàng trong CustomerDetails
        for (const { MaPhong, MaKH } of CustomerDetails) {
            await pool.request()
                .input('MaDDP', sql.Int, MaDDP)
                .input('MaPhong', sql.VarChar, MaPhong)
                .input('MaKH', sql.VarChar, MaKH)
                .query(`
                    MERGE INTO UserDetail AS target
                    USING (SELECT @MaDDP AS Booking_ID, @MaPhong AS MaPhong, @MaKH AS MaKH) AS source
                    ON target.Booking_ID = source.Booking_ID AND target.MaPhong = source.MaPhong AND target.MaKH = source.MaKH
                    WHEN NOT MATCHED THEN INSERT (Booking_ID, MaPhong, MaKH) VALUES (source.Booking_ID, source.MaPhong, source.MaKH);
                `);
        }

        // -------------------- Xử lý ServiceDetail --------------------
        const currentServices = (await pool.request()
            .input('MaDDP', sql.Int, MaDDP)
            .query('SELECT MaDV, MaPhong FROM ServiceDetail WHERE ID = @MaDDP')).recordset;

        const servicesToKeep = ServiceDetails.map(detail => `${detail.MaDV}-${detail.MaPhong}`);

        // Xóa dịch vụ không còn tồn tại
        for (const { MaDV, MaPhong } of currentServices) {
            const key = `${MaDV}-${MaPhong}`;
            if (!servicesToKeep.includes(key)) {
                await pool.request()
                    .input('MaDDP', sql.Int, MaDDP)
                    .input('MaDV', sql.VarChar, MaDV)
                    .input('MaPhong', sql.VarChar, MaPhong)
                    .query('DELETE FROM ServiceDetail WHERE ID = @MaDDP AND MaDV = @MaDV AND MaPhong = @MaPhong');
            }
        }

        // Thêm hoặc cập nhật dịch vụ trong ServiceDetails
        for (const { MaDV, Gia, MaPhong } of ServiceDetails) {
            await pool.request()
                .input('MaDDP', sql.Int, MaDDP)
                .input('MaDV', sql.VarChar, MaDV)
                .input('MaPhong', sql.VarChar, MaPhong)
                .input('Gia', sql.Money, Gia)
                .query(`
                    MERGE INTO ServiceDetail AS target
                    USING (SELECT @MaDDP AS ID, @MaPhong AS MaPhong, @MaDV AS MaDV, @Gia AS Gia) AS source
                    ON target.ID = source.ID AND target.MaPhong = source.MaPhong AND target.MaDV = source.MaDV
                    WHEN MATCHED THEN UPDATE SET Gia = source.Gia
                    WHEN NOT MATCHED THEN INSERT (ID, MaPhong, MaDV, Gia) VALUES (source.ID, source.MaPhong, source.MaDV, source.Gia);
                `);
        }

        res.json({ success: true });
    } catch (error) {
        console.error('Lỗi khi cập nhật thông tin đặt phòng:', error);
        res.status(500).json({ message: 'Lỗi server' });
    }
});

//xử lý xóa đơn
app.delete('/api/user-detail/:bookingId', async (req, res) => {
    const { bookingId } = req.params;
    try {
        const pool = await sql.connect(config);
        const query = 'DELETE FROM UserDetail WHERE Booking_ID = @bookingId';
        await pool.request()
            .input('bookingId', sql.Int, bookingId)
            .query(query);
        res.status(200).send({ message: 'Deleted from UserDetail' });
    } catch (err) {
        console.error(err);
        res.status(500).send({ error: 'Failed to delete from UserDetail' });
    }
});

app.delete('/api/service-detail/:bookingId', async (req, res) => {
    const { bookingId } = req.params;
    try {
        const pool = await sql.connect(config);
        const query = 'DELETE FROM ServiceDetail WHERE ID = @bookingId';
        await pool.request()
            .input('bookingId', sql.Int, bookingId)
            .query(query);
        res.status(200).send({ message: 'Deleted from ServiceDetail' });
    } catch (err) {
        console.error(err);
        res.status(500).send({ error: 'Failed to delete from ServiceDetail' });
    }
});

app.delete('/api/booking-detail/:bookingId', async (req, res) => {
    const { bookingId } = req.params;
    try {
        const pool = await sql.connect(config);
        const query = 'DELETE FROM BookingDetail WHERE Booking_ID = @bookingId';
        await pool.request()
            .input('bookingId', sql.Int, bookingId)
            .query(query);
        res.status(200).send({ message: 'Deleted from BookingDetail' });
    } catch (err) {
        console.error(err);
        res.status(500).send({ error: 'Failed to delete from BookingDetail' });
    }
});

app.delete('/api/booking/:bookingId', async (req, res) => {
    const { bookingId } = req.params;
    try {
        const pool = await sql.connect(config);
        const query = 'DELETE FROM Booking WHERE ID = @bookingId';
        await pool.request()
            .input('bookingId', sql.Int, bookingId)
            .query(query);
        res.status(200).send({ message: 'Deleted from Booking' });
    } catch (err) {
        console.error(err);
        res.status(500).send({ error: 'Failed to delete from Booking' });
    }
});
