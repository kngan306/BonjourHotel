import React from 'react'
import './GioiThieuDV.css'
import dichvu1 from '../Assets/image-dichvu1.png'
import dichvu2 from '../Assets/image-dichvu2.png'
import dichvu3 from '../Assets/image-dichvu3.png'
import dichvu4 from '../Assets/image-dichvu4.png'
import imgdv24 from '../Assets/image-dv-24.png'
import { Link } from 'react-router-dom'

const GioiThieuDV = () => {

    const scrollToTop = () => {
        window.scrollTo(0, 0); // Cuộn lên đầu trang
    };

    return (
        <div className='gioithieu-dichvu'>
            <div className="container-dv">
                <h1>VỀ DỊCH VỤ</h1>
                <div className="services">
                    <div className="service-card">
                        <div className="img-service">
                            <Link to="/dich-vu" onClick={scrollToTop}>
                                <img src={imgdv24} alt="" />
                            </Link>
                        </div>
                        <h2>24/24</h2>
                        <p>Dễ dàng gọi món ăn từ thực đơn phong phú, bao gồm các món ăn địa phương và quốc tế, bất cứ lúc nào trong ngày hoặc đêm. Đội ngũ phục vụ chuyên nghiệp, mang đồ ăn đến tận phòng, đảm bảo chất lượng và sự tươi ngon.</p>
                    </div>
                    <div className="service-card">
                        <div className="img-service">
                            <Link to="/dich-vu" onClick={scrollToTop}>
                                <img src={dichvu2} alt="" />
                            </Link>
                        </div>
                        <h2>Đưa đón sân bay</h2>
                        <p>Khách hàng sẽ được đón và tiễn tận nơi bởi đội ngũ lái xe chuyên nghiệp, giúp tiết kiệm thời gian và giảm bớt lo lắng về việc di chuyển. Dịch vụ này thường được đặt trước, đảm bảo khách có thể bắt đầu và kết thúc chuyến đi một cách thoải mái và suôn sẻ.</p>
                    </div>
                    <div className="service-card">
                        <div className="img-service">
                            <Link to="/dich-vu" onClick={scrollToTop}>
                                <img src={dichvu3} alt="" />
                            </Link>
                        </div>
                        <h2>Hồ bơi vô cực</h2>
                        <p>Bể bơi vô cực với hàng dừa soi mình nơi mặt nước cùng khu vườn xanh ngát bao quanh sẽ cho bạn cảm giác như được bơi trong lòng khu rừng nhiệt đới thu nhỏ cùng khung cảnh đại dương bao la.</p>
                    </div>
                    <div className="service-card">
                        <div className="img-service">
                            <Link to="/dich-vu" onClick={scrollToTop}>
                                <img src={dichvu4} alt="" />
                            </Link>
                        </div>
                        <h2>Giặt là quần áo</h2>
                        <p>Khách hàng có thể thoải mái lựa chọn các hình thức giặt ủi, giặt hấp và giặt khô cao cấp phù hợp theo nhu cầu của mình. Bộ phận giặt là của khách sạn sẽ thực hiện theo quy trình chuyên nghiệp từ khâu nhận đồ đến giao đồ, để đảm bảo sự hài lòng của khách hàng.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GioiThieuDV
