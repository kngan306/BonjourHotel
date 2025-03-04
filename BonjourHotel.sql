use master
drop database BonjourHotel

Create database BonjourHotel

use BonjourHotel

CREATE TABLE KHACHHANG
(
  MaKH VARCHAR(30) NOT NULL,
  TenKH NVARCHAR(100) NOT NULL,
  CCCD VARCHAR(12),
  Email VARCHAR(50),
  SDT CHAR(10),
  NgaySinh DATE,
  GioiTinh NVARCHAR(3),
  PRIMARY KEY (MaKH)
);

CREATE TABLE CHINHANH
(
  MaCN VARCHAR(30) NOT NULL,
  TenCN NVARCHAR(100) NOT NULL,
  DiaChi NVARCHAR(100),
  SDT CHAR(10),
  KichThuocCN FLOAT,
  TienNghi NVARCHAR(100),
  MoTaCN NVARCHAR(500),
  Email VARCHAR(50),
  TongSoPhong INT,
  HinhAnh VARCHAR(100),
  PRIMARY KEY (MaCN)
);

CREATE TABLE DICHVU
(
  MaDV VARCHAR(30) NOT NULL,
  TenDV NVARCHAR(100) NOT NULL,
  GiaDV MONEY,
  MoTaDV NVARCHAR(500),
  PRIMARY KEY (MaDV)
);

CREATE TABLE LOAIPHONG
(
  MaLP VARCHAR(30) NOT NULL,
  TenLP NVARCHAR(100) NOT NULL,
  PRIMARY KEY (MaLP)
);

CREATE TABLE ACCOUNT
(
  TaiKhoan VARCHAR(30),
  MatKhau VARCHAR(100),
  Email VARCHAR(50),
  VaiTro VARCHAR(30),
  TrangThai NVARCHAR(30)
);

CREATE TABLE NHANVIEN
(
  MaNV VARCHAR(30) NOT NULL,
  TenNV NVARCHAR(100) NOT NULL,
  Email VARCHAR(50),
  SDT CHAR(10),
  NgaySinh DATE,
  GioiTinh NVARCHAR(3),
  DiaChi NVARCHAR(100),
  NgayVaoLam DATE,
  HinhAnh VARCHAR(100),
  MaCN VARCHAR(30),
  PRIMARY KEY (MaNV),
  FOREIGN KEY (MaCN) REFERENCES CHINHANH(MaCN)
);

CREATE TABLE PHONG
(
  MaPhong VARCHAR(30) NOT NULL,
  TenPhong NVARCHAR(100) NOT NULL,
  TrangThai NVARCHAR(30),
  Gia MONEY,
  ViTri NVARCHAR(50),
  SLGiuong INT ,
  SLNguoi INT ,
  KichThuoc FLOAT ,
  SLPhongTam INT ,
  TienIch NVARCHAR(50) ,
  MoTaPhong NVARCHAR(MAX),
  HinhAnh1 VARCHAR(100),
  HinhAnh2 VARCHAR(100),
  HinhAnh3 VARCHAR(100),
  MaCN VARCHAR(30) ,
  MaLP VARCHAR(30) ,
  PRIMARY KEY (MaPhong),
  FOREIGN KEY (MaCN) REFERENCES CHINHANH(MaCN),
  FOREIGN KEY (MaLP) REFERENCES LOAIPHONG(MaLP)
);

CREATE TABLE Booking
(
  ID int primary key identity(1,1),
  NgayDat DATE,
  NgayNhan DATE,
  NgayTraPhong DATE,
  NgayTraPhongThucTe DATE,
  TrangThai NVARCHAR(50),
  MaNV VARCHAR(30),
  MaKH VARCHAR (30),
  FOREIGN KEY (MaNV) REFERENCES NHANVIEN(MaNV),
  FOREIGN KEY (MaKH) REFERENCES KHACHHANG(MaKH)
);

CREATE TABLE BookingDetail
(
  Booking_ID int,
  MaPhong VARCHAR(30),
  Gia MONEY,
  PRIMARY KEY (Booking_ID, MaPhong),
  FOREIGN KEY (Booking_ID) REFERENCES Booking(ID),
  FOREIGN KEY (MaPhong) REFERENCES PHONG(MaPhong)
);

CREATE TABLE UserDetail
(
  Booking_ID int,
  MaPhong VARCHAR(30),
  MaKH VARCHAR(30),
  PRIMARY KEY (Booking_ID, MaPhong, MaKH),
  FOREIGN KEY (Booking_ID) REFERENCES Booking(ID),
  FOREIGN KEY (MaPhong) REFERENCES PHONG(MaPhong),
  FOREIGN KEY (MaKH) REFERENCES KHACHHANG(MaKH)
);

CREATE TABLE ServiceDetail
(
  ID int,
  MaPhong VARCHAR(30),
  MaDV VARCHAR(30),
  Gia Money,
  PRIMARY KEY (ID, MaPhong, MaDV),
  FOREIGN KEY (ID) REFERENCES Booking(ID),
  FOREIGN KEY (MaPhong) REFERENCES PHONG(MaPhong),
  FOREIGN KEY (MaDV) REFERENCES DICHVU(MaDV)
);

select * from CHINHANH
select * from PHONG
select * from Booking
select * from BookingDetail
select * from ServiceDetail
select * from UserDetail
select * from KHACHHANG
select * from ACCOUNT
delete from ServiceDetail where  ID = 7
go
delete from BookingDetail where Booking_ID = 7
go
delete from Booking

        SELECT b.ID, b.NgayDat, b.TrangThai, kh.TenKH AS TenKhachHang, nv.TenNV AS TenNhanVien
        FROM Booking b
        LEFT JOIN KHACHHANG kh ON b.MaKH = kh.MaKH
        LEFT JOIN NHANVIEN nv ON b.MaNV = nv.MaNV
-------------------------------------------------------------
-- Insert data into KHACHANG
INSERT INTO KHACHHANG (MaKH, TenKH, Email, SDT, CCCD,NgaySinh, GioiTinh) VALUES
('KH001', N'Dương Duy Kha', 'duykhaduong24@gmail.com', '0764474686', '079204011608', '2004-08-09', 'Nam'),
('KH002', N'Trần Huyền My', 'huyenmee00@gmail.com', '0945678321', NULL,'2000-03-23', N'Nữ'),
('KH003', N'Lê Trung Thành', 'leetrungthanh@gmail.com', '0703987654', NULL, '1997-10-13', 'Nam'),
('KH004', N'Nguyễn Minh Hằng', 'minminhang12@gmail.com', '0768912345', NULL, '1988-12-07', N'Nữ'),
('KH005', N'Nguyễn Thảo Linh', 'tlinhnguyen@gmail.com', '0749956712', NULL, '2000-10-07 ', N'Nữ'),
('KH006', N'Đặng Thị Kim Ngân', 'ngankim3006@gmail.com', '0702725294', '079304020076', '2004-06-30 ', N'Nữ');

select * from KHACHHANG
delete from KHAChHANG where MaKH = 'KH008'
-- Insert data into CHINHANH
INSERT INTO CHINHANH (MaCN, TenCN, DiaChi, SDT, KichThuocCN, TienNghi, MoTaCN, Email, TongSoPhong, HinhAnh) VALUES
('CN001', N'BONJOUR DaNang Hotel', N' 36 - 38 Lâm Hoành, phường Phước Mỹ, quận Sơn Trà, Đà Nẵng', '1900 1234', 200.5, N'hồ bơi vô cực, 24/24, đưa đón sân bay,...', N'Bể bơi vô cực với hàng dừa soi mình nơi mặt nước cùng khu vườn xanh ngát bao quanh sẽ cho bạn cảm giác như được bơi trong lòng khu rừng nhiệt đới thu nhỏ cùng khung cảnh đại dương bao la bên núi Sơn Trà thoai thoải.', 'bonjourhotel@gmail.com', NULL, NULL),
('CN002', N'BONJOUR NhaTrang Hotel', N'06 Trần Quang Khải, P. Tân Lập TP. Nha Trang, Khánh Hòa', '1900 2345', 150.0, N'hồ bơi vô cực, 24/24, đưa đón sân bay,...', N'Tọa lạc tại tầng 17 của khách sạn, bể bơi vô cực trên cao cho ta thấy mình bé nhỏ giữa biển trời xanh biếc đến vô cùng. Không chỉ được say sưa cùng ly cocktail trên tay trong không gian Pool Bar hiện đại, cảnh đẹp 360 độ toàn thành phố và biển Nha Trang sẽ khiến bạn ngây ngất chẳng muốn rời.', 'bonjourhotel@gmail.com', NULL, NULL),
('CN003', N'BONJOUR PhuYen Hotel', N'51 Độc Lập, phường 7, TP. Tuy Hòa, Phú Yên', '1900 3456', 300.0, N'hồ bơi vô cực, 24/24, đưa đón sân bay,...', N'Từ mặt hồ nước phẳng lặng, Tuy Hòa Beach Club trông như hai thế giới tồn tại song song. Được ngồi dưới kiến trúc đương đại với mây tre thanh tao đậm bản sắc Việt, ngắm nhìn đại dương tựa dải lụa trong gió giúp trải nghiệm ẩm thực của du khách nơi đây thêm mặn mòi, lưu luyến hương vị biển cả.', 'bonjourhotel@gmail.com', NULL, NULL);

select * from CHINHANH
-- Insert data into DICHVU
INSERT INTO DICHVU (MaDV, TenDV, GiaDV, MoTaDV) VALUES
('DV001', N'Hồ bơi vô cực', 100000, N'Bể bơi vô cực với hàng dừa soi mình nơi mặt nước cùng khu vườn xanh ngát bao quanh sẽ cho bạn cảm giác như được bơi trong lòng khu rừng nhiệt đới thu nhỏ cùng khung cảnh đại dương bao la.'),
('DV002', N'Đưa đón sân bay', 200000, N'Khách hàng sẽ được đón và tiễn tận nơi bởi đội ngũ lái xe chuyên nghiệp, giúp tiết kiệm thời gian và giảm bớt lo lắng về việc di chuyển. Dịch vụ này thường được đặt trước, đảm bảo khách có thể bắt đầu và kết thúc chuyến đi một cách thoải mái và suôn sẻ.'),
('DV003', N'Giặt là quần áo', 350000, N'Khách hàng có thể thoải mái lựa chọn các hình thức giặt ủi, giặt hấp và giặt khô cao cấp phù hợp theo nhu cầu của mình. Bộ phận giặt là của khách sạn sẽ thực hiện theo quy trình chuyên nghiệp từ khâu nhận đồ đến giao đồ, để đảm bảo sự hài lòng của khách hàng.'),
('DV004', N'24/24', 500000, N'Dễ dàng gọi món ăn từ thực đơn phong phú, bao gồm các món ăn địa phương và quốc tế, bất cứ lúc nào trong ngày hoặc đêm. Đội ngũ phục vụ chuyên nghiệp, mang đồ ăn đến tận phòng, đảm bảo chất lượng và sự tươi ngon.');

SELECT * from DICHVU
-- Insert data into LOAIPHONG
INSERT INTO LOAIPHONG (MaLP, TenLP) VALUES
('LP001', N'Phòng đơn'),
('LP002', N'Phòng đôi'),
('LP003', N'Phòng gia đình');

SELECT * FROM LOAIPHONG
-- Insert data into ACCOUNT
INSERT INTO ACCOUNT (TaiKhoan, MatKhau, VaiTro,TrangThai) VALUES
('admin', 'admin123', N'Quản lý',N'Hoạt động'),
('DuyKha', 'DuyKha123', N'Khách hàng',N'Hoạt động'),
('user2', 'user456', N'Khách hàng',N'Vô hiệu hóa'),
('staff1', 'staff123', N'Nhân viên',N'Hoạt động'),
('staff2', 'staff456', N'Nhân viên',N'Hoạt động');

SELECT * FROM ACCOUNT
select * from KHACHHANG
delete from ACCOUNT where TaiKhoan = 'HongNhung'
-- Insert data into NHANVIEN
INSERT INTO NHANVIEN (MaNV, TenNV, Email, SDT, NgaySinh, GioiTinh, DiaChi, NgayVaoLam, HinhAnh, MaCN) VALUES
('NV001', N'Lê Thị Thu Diễm', 'lttdiem98@gmail.com', '0987612345', '1998-07-11', N'Nữ', N'Đồng Nai', '2022-06-13', NULL, 'CN002'),
('NV002', N'Trần Đăng Dương', 'duongtran02@gmail.com', '0912345678', '2000-08-31', N'Nam', N'Hải Dương', '2023-02-28', NULL, 'CN001'),
('NV003', N'Phạm Bảo Khang', 'baokhangph@gmail.com', '0987654321', '1999-05-05', N'Nam', N'Hồ Chí Minh', '2022-06-16', NULL, 'CN002'),
('NV004', N'Phạm Lưu Thùy Ngân', 'nganthuy01gmail.com', '0912873465', '1988-06-13', N'Nữ', N'Cần Thơ', '2020-07-30', NULL, 'CN003'),
('NV005', N'Phạm Anh Quân', 'quanap@gmail.com', '0192837465', '1997-01-24',N'Nam', N'Hà Nội', '2021-05-22', NULL, 'CN003');

SELECT * FROM NHANVIEN

-- Insert data into PHONG
INSERT INTO PHONG (MaPhong, TenPhong, TrangThai, Gia, ViTri, SLGiuong, SLNguoi, KichThuoc, SLPhongTam, TienIch, MoTaPhong, HinhAnh1, HinhAnh2, HinhAnh3, MaCN, MaLP) VALUES
-- Chi nhánh CN001
('P001', N'Standard Double', N'Trống', 500000, N'Trực diện biển', 1, 2, 30.0, 1, N'Máy lạnh', N'Phòng có giường đôi ấm cúng, nội thất hiện đại. Trang bị TV, 
minibar và wifi miễn phí, phòng tắm riêng đầy đủ tiện nghi hứa hẹn mang đến cho bạn một kỳ nghỉ thoải mái. Cửa sổ lớn cho phép ánh sáng tự nhiên tràn ngập, 
tạo cảm giác thoáng đãng và gần gũi với thiên nhiên.', '/Assets/standard1.png', '/Assets/standard2.png', NULL, 'CN001', 'LP002'),
('P002', N'Twin Bed Suite', N'Đang thuê', 700000, N'Sân vườn', 2, 2, 35.0, 1, N'Máy lạnh, TV', N'Phòng ngủ đôi mang đến không gian hiện đại và thoải mái. 
Phòng được trang trí thanh lịch với hai giường, phù hợp cho bạn bè hoặc gia đình. Ánh sáng tự nhiên từ cửa sổ lớn tạo cảm giác thoáng đãng, phòng tắm riêng 
hiện đại với vòi sen hoặc bồn tắm mang lại sự tiện lợi và thư giãn.', '/Assets/twinbed1.png', '/Assets/twinbed2.png', '/Assets/twinbed3.png', 'CN001', 'LP001'),
('P003', N'Junior', N'Đã đặt', 900000, N'Toàn cảnh biển', 1, 2, 40.0, 1, N'Máy lạnh, Bồn tắm', N'Vẫn đảm bảo được sự thoải mái, tiện nghi cho tất cả các thành 
viên là gian phòng khách chung rộng rãi hơn từ căn phòng gia đình. Cả 2 gian phòng ngủ và phòng khách với ban công thoáng đãng, mang gió biển mát lành và thiên 
nhiên gần bên từ mọi góc nhìn, để bạn có được một kỳ nghỉ trọn vẹn bên gia đình, bạn bè.', '/Assets/junior1.png', '/Assets/junior2.png', '/Assets/junior3.png', 'CN001', 'LP001'),
('P004', N'Family Suite', N'Trống', 1200000, N'Góc biển và sân vườn', 2, 4, 50.0, 2, N'Máy lạnh, Mini bar', N'Với hàng dừa xanh mướt trên bãi cát vàng cùng biển 
xanh lấp lánh ngay trước mắt, bức tranh biển trời được thu gọn trong ô cửa khi thức dậy tại căn phòng Family Suite. Còn gì tuyệt vời hơn để kết thúc ngày dài khi 
được ngắm nhìn phố phường cùng bồn tắm nằm sang trọng và ly rượu vang.', '/Assets/family1.png', '/Assets/family2.png', '/Assets/family3.png', 'CN001', 'LP003'),
('P005', N'Superior Twin', N'Đang thuê', 300000, N'Hướng vườn, hồ bơi', 2, 4, 80.0, 2, N'Máy lạnh, WiFi', N'Nhắm mắt để nghe âm thanh vỗ về của biển và thư thái 
bên tách trà chiều với ghế lười của phòng Superior Twin. Dù đang trong kỳ nghỉ hay chuyến công tác xa, du khách chắc chắn sẽ có khoảng thời gian thật yên bình với 
thiết kế thanh lịch, tao nhã từ căn Superior Twin.', NULL, NULL, NULL, 'CN001', 'LP001'),
('P006', N'Deluxe Double', N'Trống', 1500000, N'Hướng nhìn về thành phố', 1, 2, 45.0, 1, N'Máy lạnh, Bồn tắm, WiFi', N'Nếu bạn vừa thích ngắm cảnh biển thơ mộng, 
vừa mong muốn được thưởng thức vẻ đẹp chân thật của thành phố thì đây chắc chắn là căn phòng dành cho bạn. Với thiết kế hiện đại và gần gũi thiên nhiên, Deluxe Double 
nhất định sẽ giúp các vị khách có những giây phút nghỉ ngơi, thư giãn một cách hiệu quả nhất.', NULL, NULL, NULL, 'CN001', 'LP001')
SELECT * FROM PHONG WHERE MaCN = 'CN001'
delete from Phong
---------------

--------------------------------
INSERT INTO PHONG (MaPhong, TenPhong, TrangThai, Gia, ViTri, SLGiuong, SLNguoi, KichThuoc, SLPhongTam, TienIch, MoTaPhong, HinhAnh, MaCN, MaLP) VALUES
-- Chi nhánh CN002
('P007', N'Standard Double', N'Trống', 500000, N'Trực diện biển', 1, 2, 30.0, 1, N'Máy lạnh', N'Phòng có giường đôi ấm cúng, nội thất hiện đại. Trang bị TV, 
minibar và wifi miễn phí, phòng tắm riêng đầy đủ tiện nghi hứa hẹn mang đến cho bạn một kỳ nghỉ thoải mái. Cửa sổ lớn cho phép ánh sáng tự nhiên tràn ngập, 
tạo cảm giác thoáng đãng và gần gũi với thiên nhiên.', NULL, 'CN002', 'LP001'),
('P008', N'Twin Bed Suite', N'Đang thuê', 700000, N'Sân vườn', 1, 2, 35.0, 1, N'Máy lạnh, TV', N'Phòng ngủ đôi mang đến không gian hiện đại và thoải mái. 
Phòng được trang trí thanh lịch với hai giường, phù hợp cho bạn bè hoặc gia đình. Ánh sáng tự nhiên từ cửa sổ lớn tạo cảm giác thoáng đãng, phòng tắm riêng 
hiện đại với vòi sen hoặc bồn tắm mang lại sự tiện lợi và thư giãn.', NULL, 'CN002', 'LP002'),
('P009', N'Junior', N'Đã đặt', 900000, N'Toàn cảnh biển', 2, 4, 40.0, 2, N'Máy lạnh, Bồn tắm', N'Vẫn đảm bảo được sự thoải mái, tiện nghi cho tất cả các thành 
viên là gian phòng khách chung rộng rãi hơn từ căn phòng gia đình. Cả 2 gian phòng ngủ và phòng khách với ban công thoáng đãng, mang gió biển mát lành và thiên 
nhiên gần bên từ mọi góc nhìn, để bạn có được một kỳ nghỉ trọn vẹn bên gia đình, bạn bè.', NULL, 'CN002', 'LP003'),
('P010', N'Family Suite', N'Trống', 1200000, N'Góc biển và sân vườn', 2, 4, 50.0, 2, N'Máy lạnh, Mini bar', N'Với hàng dừa xanh mướt trên bãi cát vàng cùng biển 
xanh lấp lánh ngay trước mắt, bức tranh biển trời được thu gọn trong ô cửa khi thức dậy tại căn phòng Family Suite. Còn gì tuyệt vời hơn để kết thúc ngày dài khi 
được ngắm nhìn phố phường cùng bồn tắm nằm sang trọng và ly rượu vang.', NULL, 'CN002', 'LP003'),
('P011', N'Superior Twin', N'Đang thuê', 300000, N'Hướng vườn, hồ bơi', 2, 4, 80.0, 2, N'Máy lạnh, WiFi', N'Nhắm mắt để nghe âm thanh vỗ về của biển và thư thái 
bên tách trà chiều với ghế lười của phòng Superior Twin. Dù đang trong kỳ nghỉ hay chuyến công tác xa, du khách chắc chắn sẽ có khoảng thời gian thật yên bình với 
thiết kế thanh lịch, tao nhã từ căn Superior Twin.', NULL, 'CN002', 'LP002'),
('P012', N'Deluxe Double', N'Trống', 1500000, N'Hướng nhìn về thành phố', 1, 2, 45.0, 1, N'Máy lạnh, Bồn tắm, WiFi', N'Nếu bạn vừa thích ngắm cảnh biển thơ mộng, 
vừa mong muốn được thưởng thức vẻ đẹp chân thật của thành phố thì đây chắc chắn là căn phòng dành cho bạn. Với thiết kế hiện đại và gần gũi thiên nhiên, Deluxe Double 
nhất định sẽ giúp các vị khách có những giây phút nghỉ ngơi, thư giãn một cách hiệu quả nhất.', NULL, 'CN002', 'LP001'),
-- Chi nhánh CN003
('P013', N'Standard Double', N'Trống', 500000, N'Trực diện biển', 1, 2, 30.0, 1, N'Máy lạnh', N'Phòng có giường đôi ấm cúng, nội thất hiện đại. Trang bị TV, 
minibar và wifi miễn phí, phòng tắm riêng đầy đủ tiện nghi hứa hẹn mang đến cho bạn một kỳ nghỉ thoải mái. Cửa sổ lớn cho phép ánh sáng tự nhiên tràn ngập, 
tạo cảm giác thoáng đãng và gần gũi với thiên nhiên.', NULL, 'CN003', 'LP001'),
('P014', N'Twin Bed Suite', N'Đang thuê', 700000, N'Sân vườn', 1, 2, 35.0, 1, N'Máy lạnh, TV', N'Phòng ngủ đôi mang đến không gian hiện đại và thoải mái. 
Phòng được trang trí thanh lịch với hai giường, phù hợp cho bạn bè hoặc gia đình. Ánh sáng tự nhiên từ cửa sổ lớn tạo cảm giác thoáng đãng, phòng tắm riêng 
hiện đại với vòi sen hoặc bồn tắm mang lại sự tiện lợi và thư giãn.', NULL, 'CN003', 'LP002'),
('P015', N'Junior', N'Đã đặt', 900000, N'Toàn cảnh biển', 2, 4, 40.0, 2, N'Máy lạnh, Bồn tắm', N'Vẫn đảm bảo được sự thoải mái, tiện nghi cho tất cả các thành 
viên là gian phòng khách chung rộng rãi hơn từ căn phòng gia đình. Cả 2 gian phòng ngủ và phòng khách với ban công thoáng đãng, mang gió biển mát lành và thiên 
nhiên gần bên từ mọi góc nhìn, để bạn có được một kỳ nghỉ trọn vẹn bên gia đình, bạn bè.', NULL, 'CN003', 'LP003'),
('P016', N'Family Suite', N'Trống', 1200000, N'Góc biển và sân vườn', 2, 4, 50.0, 2, N'Máy lạnh, Mini bar', N'Với hàng dừa xanh mướt trên bãi cát vàng cùng biển 
xanh lấp lánh ngay trước mắt, bức tranh biển trời được thu gọn trong ô cửa khi thức dậy tại căn phòng Family Suite. Còn gì tuyệt vời hơn để kết thúc ngày dài khi 
được ngắm nhìn phố phường cùng bồn tắm nằm sang trọng và ly rượu vang.', NULL, 'CN003', 'LP003'),
('P017', N'Superior Twin', N'Đang thuê', 300000, N'Hướng vườn, hồ bơi', 2, 4, 80.0, 2, N'Máy lạnh, WiFi', N'Nhắm mắt để nghe âm thanh vỗ về của biển và thư thái 
bên tách trà chiều với ghế lười của phòng Superior Twin. Dù đang trong kỳ nghỉ hay chuyến công tác xa, du khách chắc chắn sẽ có khoảng thời gian thật yên bình với 
thiết kế thanh lịch, tao nhã từ căn Superior Twin.', NULL, 'CN003', 'LP002'),
('P018', N'Deluxe Double', N'Trống', 1500000, N'Hướng nhìn về thành phố', 1, 2, 45.0, 1, N'Máy lạnh, Bồn tắm, WiFi', N'Nếu bạn vừa thích ngắm cảnh biển thơ mộng, 
vừa mong muốn được thưởng thức vẻ đẹp chân thật của thành phố thì đây chắc chắn là căn phòng dành cho bạn. Với thiết kế hiện đại và gần gũi thiên nhiên, Deluxe Double 
nhất định sẽ giúp các vị khách có những giây phút nghỉ ngơi, thư giãn một cách hiệu quả nhất.', NULL, 'CN003', 'LP001');
----------------------------
SELECT * FROM PHONG
---------------------------------------------------------------------------------------
INSERT INTO Booking (NgayDat, NgayNhan, NgayTraPhong, NgayTraPhongThucTe, TrangThai, MaNV, MaKH) VALUES
('2024-11-01', '2024-11-05', '2024-11-06', '2024-11-06', N'Hoàn tất', 'NV001', 'KH001'),
('2024-11-02', '2024-11-06', '2024-11-08', NULL, N'Đã hủy', 'NV002', 'KH002'),
('2024-11-03', '2024-11-07', '2024-11-09', '2024-11-09', N'Hoàn tất', 'NV001', 'KH003'),
('2024-11-04', '2024-11-08', '2024-11-10', '2024-11-10', N'Hoàn tất', 'NV002', 'KH004'),
('2024-11-05', '2024-11-09', '2024-11-13', NULL, N'Chờ xử lý', 'NV001', 'KH005'),
('2024-11-11', '2024-11-17', '2024-11-20', NULL, N'Chờ xử lý', NULL, 'KH001'),
('2024-11-17', '2024-11-19', '2024-11-21', NULL, N'Chờ xử lý', NULL, 'KH001');
select * from Booking
select * from PHONG
---------------------------------------------------------------------------------------
INSERT INTO BookingDetail (Booking_ID, MaPhong, Gia) VALUES
(1, 'P001', 500000),
(1, 'P002', 700000),
(2, 'P003', 900000),
(3, 'P004', 1200000),
(4, 'P005', 300000),
(5, 'P005', 300000),
(6, 'P006', 1500000);
select * from BookingDetail
select * from DICHVU
---------------------------------------------------------------------------------------
INSERT INTO ServiceDetail (ID, MaPhong, MaDV, Gia) VALUES
(1, 'P001', 'DV001', 100000),
(1, 'P001', 'DV002', 200000),
(2, 'P003', 'DV003', 350000),
(3, 'P004', 'DV004', 500000),
(4, 'P005', 'DV002', 200000),
(5, 'P005', 'DV002', 200000),
(6, 'P006', 'DV004', 200000);
select * from ServiceDetail
---------------------------------------------------------------------------------------
INSERT INTO UserDetail (Booking_ID, MaPhong, MaKH) VALUES
(1, 'P001', 'KH001'),
(1, 'P002', 'KH006'),
(2, 'P002', 'KH002'),
(3, 'P003', 'KH003'),
(4, 'P004', 'KH004'),
(5, 'P005', 'KH005'),
(6, 'P006', 'KH001');
select * from UserDetail