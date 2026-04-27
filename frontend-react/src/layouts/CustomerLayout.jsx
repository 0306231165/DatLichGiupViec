import React from 'react';
import { Layout, Menu, Button, Row, Col, Typography } from 'antd';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { PhoneOutlined, MailOutlined, HomeOutlined } from '@ant-design/icons';
import './../css/CustomerLayout.css'; // Import file CSS

const { Header, Content, Footer } = Layout;
const { Title, Text } = Typography;

const CustomerLayout = () => {
  const location = useLocation();

  return (
    <Layout className="customer-layout">
      {/* Header Sticky */}
      <Header className="customer-header">
        <div className="header-logo">
          <Link to="/">HomeService</Link>
        </div>
        
        <Menu 
          mode="horizontal" 
          selectedKeys={[location.pathname]} 
          className="header-menu"
        >
          <Menu.Item key="/"><Link to="/">Trang chủ</Link></Menu.Item>
          <Menu.Item key="/booking"><Link to="/booking">Đặt lịch ngay</Link></Menu.Item>
        </Menu>

        <div className="header-actions">
          <Button type="text" className="btn-login">
            <Link to="/login">Đăng nhập</Link>
          </Button>
          <Button type="primary" shape="round">
            Đăng ký
          </Button>
        </div>
      </Header>

      {/* Content */}
      <Content className="customer-content">
        <Outlet /> 
      </Content>

      {/* Footer */}
      <Footer className="customer-footer">
        <Row gutter={[32, 32]}>
          <Col xs={24} md={8}>
            <Title level={4} className="footer-title">HomeService</Title>
            <Text className="footer-desc">
              Giải pháp giúp việc nhà thông minh, nhanh chóng và tận tâm. Chúng tôi mang đến không gian sống sạch sẽ và thoải mái cho gia đình bạn.
            </Text>
          </Col>
          <Col xs={24} md={8}>
            <Title level={5} className="footer-title">Liên kết hữu ích</Title>
            <div className="footer-links">
              <Link to="/">Về chúng tôi</Link>
              <Link to="/">Chính sách bảo mật</Link>
              <Link to="/">Câu hỏi thường gặp</Link>
            </div>
          </Col>
          <Col xs={24} md={8}>
            <Title level={5} className="footer-title">Liên hệ</Title>
            <div className="footer-contact">
              <Text className="footer-contact-item"><HomeOutlined /> 123 Đường ABC, Quận 1, TP.HCM</Text>
              <Text className="footer-contact-item"><PhoneOutlined /> Hotline: 1900 xxxx</Text>
              <Text className="footer-contact-item"><MailOutlined /> Email: support@homeservice.vn</Text>
            </div>
          </Col>
        </Row>
        <div className="footer-copyright">
          Đồ án Tốt nghiệp ©2026 - Phát triển bởi Mai Trường Dũ - Nguyễn Thành Tín
        </div>
      </Footer>
    </Layout>
  );
};

export default CustomerLayout;