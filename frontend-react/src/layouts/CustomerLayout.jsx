import React from 'react';
import { Layout, Menu, Button, Row, Col, Typography, Input } from 'antd'; // Thêm Input
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { 
  PhoneOutlined, 
  HomeOutlined, 
  DownOutlined 
} from '@ant-design/icons';
import './../css/CustomerLayout.css';

const { Header, Content, Footer } = Layout;
const { Title, Text } = Typography;
const { SubMenu } = Menu;
const { Search } = Input; // Khai báo Search từ Input

const CustomerLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <Layout className="customer-layout">
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
          
          {/* Mũi tên nhỏ gọn bên phải chữ Dịch vụ */}
          <SubMenu 
            key="services" 
            title={
              <span className="menu-service-title">
                Dịch vụ <DownOutlined className="dropdown-arrow-small" />
              </span>
            }
          >
            <Menu.Item key="/services/cleaning"><Link to="/services/cleaning">Dọn dẹp nhà cửa</Link></Menu.Item>
            <Menu.Item key="/services/cooking"><Link to="/services/cooking">Nấu ăn tại nhà</Link></Menu.Item>
            <Menu.Item key="/services/repair"><Link to="/services/repair">Sửa điện nước</Link></Menu.Item>
            <Menu.Divider />
            <Menu.Item key="/services"><Link to="/services"><strong>Xem tất cả</strong></Link></Menu.Item>
          </SubMenu>

          <Menu.Item key="/promotions"><Link to="/promotions">Khuyến mãi</Link></Menu.Item>
          <Menu.Item key="/partner"><Link to="/partner">Trở thành đối tác</Link></Menu.Item>
        </Menu>

        <div className="header-actions">
          {/* Thanh tìm kiếm nhỏ gọn */}
          <Search
            placeholder="Tìm dịch vụ..."
            allowClear
            onSearch={(value) => console.log(value)}
            className="header-search-bar"
          />

          {/* Nút Đăng nhập làm nổi bật hơn */}
          <Button type="default" className="btn-login-new" onClick={() => navigate('/login')}>
            Đăng nhập
          </Button>

          {/* Nút Đặt lịch ngay (CTA chính) */}
          <Button 
            type="primary" 
            shape="round" 
            className="btn-header-booking"
            onClick={() => navigate('/booking')}
          >
            Đặt lịch ngay
          </Button>
        </div>
      </Header>

      <Content className="customer-content">
        <Outlet /> 
      </Content>

      <Footer className="customer-footer">
        {/* Giữ nguyên phần Footer của bạn */}
        <Row gutter={[32, 32]}>
          <Col xs={24} md={8}>
            <Title level={4} className="footer-title">HomeService</Title>
            <Text className="footer-desc">Giải pháp giúp việc nhà thông minh, nhanh chóng và tận tâm.</Text>
          </Col>
          <Col xs={24} md={8}>
            <Title level={5} className="footer-title">Liên kết hữu ích</Title>
            <div className="footer-links">
              <Link to="/">Về chúng tôi</Link>
              <Link to="/">Chính sách bảo mật</Link>
            </div>
          </Col>
          <Col xs={24} md={8}>
            <Title level={5} className="footer-title">Liên hệ</Title>
            <div className="footer-contact">
              <Text className="footer-contact-item"><HomeOutlined /> 123 Đường ABC, Quận 1, TP.HCM</Text>
              <Text className="footer-contact-item"><PhoneOutlined /> Hotline: 1900 xxxx</Text>
            </div>
          </Col>
        </Row>
        <div className="footer-copyright">Đồ án Tốt nghiệp ©2026</div>
      </Footer>
    </Layout>
  );
};

export default CustomerLayout;