import React from 'react'
import './DichVu.css'
import imgheader from '../Assets/image-header-trangchu.png'
import imgdvhoboi from '../Assets/image-dv-hoboi.png'
import imgdv24 from '../Assets/image-dv-24.png'
import imgduadon from '../Assets/image-dv-duadon.png'
import imggiatla from '../Assets/image-dv-giatla.png'

const DichVu = () => {
    return (
        <div className='dich-vu'>
            <div>
                <img className='img-header' src={imgheader} alt="" />
            </div>
            <div className="dichvu-container">
                <div className="dichvu">
                    <img src={imgdvhoboi} alt="" />
                    <div className="dichvu-text">
                        <h3>Hồ bơi vô cực</h3>
                        <p>Bể bơi vô cực với hàng dừa soi mình nơi mặt nước cùng khu vườn xanh ngát bao quanh sẽ cho bạn cảm giác như được bơi trong lòng khu rừng nhiệt đới thu nhỏ cùng khung cảnh đại dương bao la.</p>
                    </div>
                </div>
                <div className="dichvu">
                    <img src={imgdv24} alt="" />
                    <div className="dichvu-text">
                        <h3>24/24</h3>
                        <p>Dễ dàng gọi món ăn từ thực đơn phong phú, bao gồm các món ăn địa phương và quốc tế, bất cứ lúc nào trong ngày hoặc đêm. Đội ngũ phục vụ chuyên nghiệp, mang đồ ăn đến tận phòng, đảm bảo chất lượng và sự tươi ngon.</p>
                    </div>
                </div>
                <div className="dichvu">
                    <img src={imgduadon} alt="" />
                    <div className="dichvu-text">
                        <h3>Đưa đón sân bay</h3>
                        <p>Khách hàng sẽ được đón và tiễn tận nơi bởi đội ngũ lái xe chuyên nghiệp, giúp tiết kiệm thời gian và giảm bớt lo lắng về việc di chuyển. Dịch vụ này thường được đặt trước, đảm bảo khách có thể bắt đầu và kết thúc chuyến đi một cách thoải mái và suôn sẻ.</p>
                    </div>
                </div>
                <div className="dichvu">
                    <img src={imggiatla} alt="" />
                    <div className="dichvu-text">
                        <h3>Giặt là quần áo</h3>
                        <p>Khách hàng có thể thoải mái lựa chọn các hình thức giặt ủi, giặt hấp và giặt khô cao cấp phù hợp theo nhu cầu của mình. Bộ phận giặt là của khách sạn sẽ thực hiện theo quy trình chuyên nghiệp từ khâu nhận đồ đến giao đồ, để đảm bảo sự hài lòng của khách hàng.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DichVu
