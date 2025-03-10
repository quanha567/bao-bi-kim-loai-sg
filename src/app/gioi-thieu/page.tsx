import { Metadata } from 'next'

const html = `<h1>Giới thiệu về Công Ty TNHH Sản Xuất Bao Bì Kim Loại Sài Gòn</h1>

    <div class="section">
        <h2>Thông tin chung</h2>
        <br />
        <h1><strong>CÔNG TY TNHH SẢN XUẤT BAO BÌ KIM LOẠI SÀI GÒN</strong></h1>
        <br />
        <ul>
            <li><strong>Trụ sở chính:</strong> 368/77O Tôn Đản, Phường 04, Quận 4, Thành phố Hồ Chí Minh, Việt Nam.</li>
            <li><strong>Lĩnh vực hoạt động:</strong> Sản xuất bao bì kim loại với các sản phẩm:</li>
            <ul>
                <li>Thùng lon sơn, thùng lon đựng hóa chất lỏng và khô.</li>
                <li>Hộp bút, văn phòng phẩm, hộp bánh kẹo, hộp thuốc lá, hộp trà và nhiều loại khác.</li>
            </ul>
        </ul>
    </div>

    <div class="section">
        <h2>Thế mạnh của chúng tôi</h2>
        <p>Với hơn <strong>14 năm kinh nghiệm</strong> trong ngành sản xuất bao bì kim loại, chúng tôi tự hào:</p>
        <ul>
            <li>Sở hữu hệ thống nhà cung cấp chất lượng cao và là đối tác đáng tin cậy của các khách hàng lớn trên toàn cầu.</li>
            <li>Đội ngũ nhân viên tận tâm, ưu tú, góp phần không nhỏ vào sự phát triển bền vững của công ty.</li>
        </ul>
        <p><strong>Khách hàng tiêu biểu:</strong></p>
        <ul>
            <li>Các tập đoàn sơn và hóa chất hàng đầu thế giới: BASF, AKZO NOBEL, AK CHEMTECH, KANSAI PAINT, NIPPON PAINT, KCC.</li>
            <li>Các doanh nghiệp sơn nổi tiếng tại Việt Nam:</li>
            <ul>
                <li>Công ty CP Sơn Tổng Hợp (Sơn Đại Bàng).</li>
                <li>Công ty CP Sơn Hải Phòng.</li>
                <li>Sơn Hóa Chất Hà Nội, Sơn Gỗ DK, Sơn Gỗ G8, và nhiều đơn vị khác.</li>
            </ul>
        </ul>
    </div>

    <div class="section">
        <h2>Phát triển vượt bậc</h2>
        <p>Nhằm đáp ứng nhu cầu ngày càng cao của thị trường, công ty đã đầu tư mạnh mẽ vào cơ sở hạ tầng:</p>
        <ul>
            <li><strong>Năm 2014:</strong> Khởi công xây dựng nhà máy mới.</li>
            <li><strong>Năm 2016:</strong> Hoàn thiện và đưa vào hoạt động nhà máy hiện đại với tổng diện tích <strong>28.000m²</strong>, bao gồm:</li>
            <ul>
                <li>11.000m² nhà xưởng tiêu chuẩn.</li>
                <li>1.200m² kho nguyên liệu.</li>
                <li>1.500m² văn phòng.</li>
                <li>250m² nhà ăn công nhân.</li>
            </ul>
        </ul>
    </div>

    <div class="section">
        <h2>Tầm nhìn và sứ mệnh</h2>
        <p>Chúng tôi cam kết mang đến những sản phẩm bao bì kim loại chất lượng cao, đáp ứng nhu cầu khắt khe nhất của khách hàng, góp phần vào sự phát triển bền vững của ngành công nghiệp và cộng đồng.</p>
    </div>`

export const metadata: Metadata = {
    title: 'Giới thiệu | Bao Bì Kim Loại Sài Gò',
    description: 'Giới thiệu về Công Ty TNHH Sản Xuất Bao Bì Kim Loại Sài Gòn',
}

const IntroducePage = () => {
    return <div className="container py-10" dangerouslySetInnerHTML={{ __html: html }}></div>
}

export default IntroducePage
