require('dotenv').config(); // Nạp các biến môi trường từ file .env
const express = require('express');
const sql = require('mssql');
const bcrypt = require('bcrypt');
const cors = require('cors');

const app = express();
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json()); // Để xử lý JSON trong request body

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
      res.json(result.recordset);
  } catch (err) {
      console.error('Lỗi khi lấy dữ liệu:', err);
      res.status(500).send('Có lỗi xảy ra');
  }
});

app.get('/api/phong-phuyen', async (req, res) => {
    try {
        const pool = await sql.connect(config);
        const result = await pool.request()
            .query(`SELECT * FROM PHONG WHERE MaCN = 'CN003'`); // CN003 là mã chi nhánh Phú Yên
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

        const result = await pool.request()
            .input('TaiKhoan', sql.VarChar, TaiKhoan)
            .query('SELECT * FROM ACCOUNT WHERE TaiKhoan = @TaiKhoan');

        if (result.recordset.length === 0) {
            console.log("Tài khoản không tồn tại:", TaiKhoan);
            return res.status(401).json({ message: 'Tài khoản không tồn tại' });
        }

        const user = result.recordset[0];

        console.log("Mật khẩu từ database (đã mã hóa):", user.MatKhau);

        const isPasswordMatch = await bcrypt.compare(MatKhau, user.MatKhau);
        console.log("Kết quả so sánh mật khẩu:", isPasswordMatch);

        if (!isPasswordMatch) {
            return res.status(401).json({ message: 'Mật khẩu không đúng' });
        }

        const token = jwt.sign(
            { TaiKhoan: user.TaiKhoan, VaiTro: user.VaiTro },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({
            message: 'Đăng nhập thành công',
            user: {
                TaiKhoan: user.TaiKhoan,
                VaiTro: user.VaiTro
            },
            token
        });

    } catch (err) {
        console.error('Lỗi khi đăng nhập:', err);
        res.status(500).send('Có lỗi xảy ra');
    }
});
