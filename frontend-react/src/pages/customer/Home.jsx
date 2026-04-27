import React from 'react';
import { Row, Col, Card, Button, Typography, Badge } from 'antd';
import { useNavigate } from 'react-router-dom';
import { 
  SafetyCertificateOutlined, ClockCircleOutlined, TeamOutlined,
  HomeOutlined, CoffeeOutlined, SmileOutlined, SkinOutlined,
  StarOutlined, ToolOutlined, HeartOutlined, BgColorsOutlined,
  CheckCircleOutlined, GiftOutlined
} from '@ant-design/icons';
import './../../css/Home.css'; 

const { Title, Paragraph, Text } = Typography;

const services = [
  { id: 1, name: 'Tổng vệ sinh', price: '100,000đ/giờ', desc: 'Dọn dẹp chuyên sâu nhà mới xây, chuyển nhà.', icon: <StarOutlined />, isHot: true },
  { id: 2, name: 'Dọn dẹp nhà cửa', price: '60,000đ/giờ', desc: 'Làm sạch.', icon: <HomeOutlined /> },
  { id: 3, name: 'Nấu ăn tại nhà', price: '80,000đ/giờ', desc: 'Đi chợ và nấu các bữa ăn gia đình đầy đủ dinh dưỡng.', icon: <CoffeeOutlined /> },
  { id: 4, name: 'Giặt ủi', price: '50,000đ/giờ', desc: 'Giặt quần áo, phơi, gấp và ủi phẳng phiu.', icon: <SkinOutlined /> },
  { id: 5, name: 'Vệ sinh sofa, nệm', price: '300,000đ/món', desc: 'Giặt khô, giặt ướt sofa, nệm, thảm diệt khuẩn.', icon: <BgColorsOutlined /> },
  { id: 6, name: 'Trông trẻ', price: '70,000đ/giờ', desc: 'Chăm sóc, chơi đùa và cho bé ăn theo yêu cầu.', icon: <SmileOutlined /> },
  { id: 7, name: 'Chăm sóc người già', price: '90,000đ/giờ', desc: 'Hỗ trợ sinh hoạt, ăn uống và trò chuyện mỗi ngày.', icon: <HeartOutlined /> },
  { id: 8, name: 'Sửa điện nước', price: '150,000đ/lần', desc: 'Khắc phục sự cố rò rỉ đòi hỏi sự an toàn và xử lý nhanh chóng. Khắc phục sự cố rò rỉ (điện, gas) đòi hỏi sự an toàn tuyệt đối và xử lý nhanh chóng để ngăn ngừa hỏa hoạn, cháy nổ hoặc giật điện. Quy trình cơ bản bao gồm ngắt nguồn (điện/gas), thông thoáng khu vực, tuyệt đối không tạo tia lửa, kiểm tra bằng nước xà phòng và gọi thợ chuyên nghiệp nếu cần thiết.', icon: <ToolOutlined /> },
];

const Home = () => {
  const navigate = useNavigate();

  const handleBooking = () => {
    navigate('/booking');
  };

  return (
    <div className="home-container">
      {/* 1. HERO BANNER */}
      <div className="hero-banner">
        <div className="hero-shape shape-1"></div>
        <div className="hero-shape shape-2"></div>
        <div className="hero-shape shape-3"></div>

        <div className="hero-content">
          <Title className="hero-title">
            Thảnh thơi tận hưởng cuộc sống
          </Title>
          <Paragraph className="hero-subtitle">
            Đặt lịch người giúp việc uy tín, chuyên nghiệp chỉ với vài thao tác. Tùy chọn dịch vụ linh hoạt theo nhu cầu của gia đình bạn.
          </Paragraph>

          <div className="hero-tags">
            <div className="hero-tag tag-white">
              <CheckCircleOutlined className="tag-icon" /> Dùng 1 lần linh hoạt
            </div>
            <div className="hero-tag tag-gradient">
              <GiftOutlined className="tag-icon" /> Đặt định kỳ - Giảm ngay 10%
            </div>
          </div>

          <Button type="primary" size="large" className="hero-btn" onClick={handleBooking}>
            Đặt lịch ngay
          </Button>
        </div>
      </div>

      <div className="home-main-content">
        {/* 2. DANH SÁCH DỊCH VỤ */}
        <div className="section-header">
          <Title level={2}>Dịch vụ của chúng tôi</Title>
          <div className="section-divider"></div>
        </div>

        <Row gutter={[24, 24]} justify="center" align="stretch">
          {services.map(service => {
            const cardContent = (
              <Card hoverable className="service-card">
                {/* Đưa cover vào thẳng body để không bị Antd ghi đè class ẩn */}
                <div className="service-cover">
                  <div className="service-icon-wrapper">
                    {service.icon}
                  </div>
                </div>

                <div className="service-info">
                  <Title level={4} className="service-name">{service.name}</Title>
                  <Text type="danger" strong className="service-price">{service.price}</Text>
                  
                  <Paragraph 
                    type="secondary" 
                    className="service-desc"
                    ellipsis={{ rows: 2, tooltip: service.desc }}
                  >
                    {service.desc}
                  </Paragraph>

                  <Button type="primary" block onClick={() => navigate('/booking')} className="btn-select-service">
                    Chọn dịch vụ
                  </Button>
                </div>
              </Card>
            );

            return (
              <Col xs={24} sm={12} md={6} key={service.id} className="service-col">
                {service.isHot ? (
                  <Badge.Ribbon text="Phổ biến" color="volcano" className="full-height-ribbon">
                    {cardContent}
                  </Badge.Ribbon>
                ) : (
                  <div className="full-height-wrapper">
                    {cardContent}
                  </div>
                )}
              </Col>
            );
          })}
        </Row>

        {/* 3. TẠI SAO CHỌN CHÚNG TÔI */}
        <div className="why-choose-us">
          <div className="section-header">
            <Title level={2} className="why-title">Vì sao chọn chúng tôi?</Title>
            <div className="section-divider why-divider"></div>
          </div>
          
          <Row gutter={[32, 32]}>
            <Col xs={24} md={8}>
              <div className="feature-card">
                <SafetyCertificateOutlined className="feature-icon icon-safe" />
                <Title level={4}>An toàn & Uy tín</Title>
                <Paragraph>Người giúp việc có lý lịch rõ ràng, được đào tạo bài bản và kiểm tra chất lượng định kỳ.</Paragraph>
              </div>
            </Col>
            <Col xs={24} md={8}>
              <div className="feature-card">
                <ClockCircleOutlined className="feature-icon icon-fast" />
                <Title level={4}>Nhanh chóng & Linh hoạt</Title>
                <Paragraph>Đặt lịch dễ dàng mọi lúc mọi nơi. Phục vụ cả ngoài giờ hành chính và cuối tuần.</Paragraph>
              </div>
            </Col>
            <Col xs={24} md={8}>
              <div className="feature-card">
                <TeamOutlined className="feature-icon icon-support" />
                <Title level={4}>Hỗ trợ tận tâm</Title>
                <Paragraph>Đội ngũ chăm sóc khách hàng luôn sẵn sàng lắng nghe và giải quyết mọi vấn đề của bạn.</Paragraph>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default Home;