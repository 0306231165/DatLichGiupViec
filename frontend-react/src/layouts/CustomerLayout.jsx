import React, { useState } from "react";
import {
  Layout,
  Menu,
  Button,
  Row,
  Col,
  Typography,
  Input,
  Dropdown,
  Avatar,
  Space,
  message,
  Badge,
} from "antd";

import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";

import {
  PhoneOutlined,
  HomeOutlined,
  DownOutlined,
  UserOutlined,
  HistoryOutlined,
  EnvironmentOutlined,
  LogoutOutlined,
  MessageOutlined,
  CalendarOutlined,
  BellOutlined,
} from "@ant-design/icons";

import "./../css/customer/CustomerLayout.css";

const { Header, Content, Footer } = Layout;
const { Title, Text } = Typography;
const { Search } = Input;

const CustomerLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const handleLogout = () => {
    setIsLoggedIn(false);
    message.info("Đã đăng xuất");
  };

  const userMenuItems = [
    {
      key: "1",
      label: "Thông tin cá nhân",
      icon: <UserOutlined />,
      onClick: () => navigate("/profile"),
    },
    {
      key: "2",
      label: "Lịch sử đặt lịch",
      icon: <HistoryOutlined />,
      onClick: () => navigate("/history"),
    },
    {
      key: "3",
      label: "Sổ địa chỉ",
      icon: <EnvironmentOutlined />,
      onClick: () => navigate("/addresses"),
    },
    { type: "divider" },
    {
      key: "4",
      label: "Đăng xuất",
      icon: <LogoutOutlined />,
      danger: true,
      onClick: handleLogout,
    },
  ];

  return (
    <Layout className="customer-layout">
      {/* HEADER */}
      <Header className="customer-header">
        {/* Logo */}
        <div className="header-logo">
          <Link to="/">HomeService</Link>
        </div>

        {/* MENU */}
        <Menu
          mode="horizontal"
          selectedKeys={[location.pathname]}
          className="header-menu"
        >
          <Menu.Item key="/">
            <Link to="/">Trang chủ</Link>
          </Menu.Item>

          <Menu.SubMenu
            key="services"
            title={
              <span className="menu-service-title">
                Dịch vụ <DownOutlined className="dropdown-arrow-small" />
              </span>
            }
          >
            <Menu.Item key="/services/cleaning">
              <Link to="/services/cleaning">Dọn dẹp nhà cửa</Link>
            </Menu.Item>

            <Menu.Item key="/services/cooking">
              <Link to="/services/cooking">Nấu ăn tại nhà</Link>
            </Menu.Item>

            <Menu.Item key="/services/repair">
              <Link to="/services/repair">Sửa điện nước</Link>
            </Menu.Item>

            <Menu.Divider />

            <Menu.Item key="/services">
              <Link to="/services">
                <strong>Xem tất cả</strong>
              </Link>
            </Menu.Item>
          </Menu.SubMenu>

          <Menu.Item key="/promotions">
            <Link to="/promotions">Khuyến mãi</Link>
          </Menu.Item>

          <Menu.Item key="/contact">
            <Link to="/contact">Liên hệ</Link>
          </Menu.Item>
        </Menu>

        {/* RIGHT ACTIONS */}
        <div className="header-actions">
          {/* Search */}
          <Search
            placeholder="Tìm dịch vụ..."
            allowClear
            onSearch={(value) => console.log(value)}
            className="header-search-bar"
          />

          {isLoggedIn ? (
            <Space size={14} align="center">
              {/* ICONS */}
              <div className="header-icons-group">
                {/* Đơn của tôi */}
                <div
                  className="action-icon"
                  title="Đơn của tôi"
                  onClick={() => navigate("/my-bookings")}
                >
                  <Badge count={1} size="small" offset={[2, -1]}>
                    <CalendarOutlined className="icon-main" />
                  </Badge>
                </div>

                {/* Tin nhắn */}
                <div
                  className="action-icon"
                  title="Tin nhắn"
                  onClick={() => navigate("/messages")}
                >
                  <Badge count={2} size="small" offset={[2, -1]}>
                    <MessageOutlined className="icon-main" />
                  </Badge>
                </div>

                {/* Thông báo */}
                <div className="action-icon" title="Thông báo">
                  <Badge count={5} size="small" offset={[2, -1]}>
                    <BellOutlined className="icon-main" />
                  </Badge>
                </div>
              </div>

              {/* USER */}
              <Dropdown
                menu={{ items: userMenuItems }}
                placement="bottomRight"
                trigger={["hover"]}
                arrow
              >
                <div className="customer-user-box">
                  <Avatar
                    size={38}
                    src="https://api.dicebear.com/7.x/notionists/svg?seed=Felix"
                  />

                  <div className="customer-user-info">
                    <span className="customer-user-name">
                      Khách hàng
                    </span>

                    <DownOutlined className="customer-user-arrow" />
                  </div>
                </div>
              </Dropdown>
            </Space>
          ) : (
            <Button
              type="default"
              className="btn-login-new"
              onClick={() => setIsLoggedIn(true)}
            >
              Đăng nhập
            </Button>
          )}

          {/* BOOKING */}
          <Button
            type="primary"
            shape="round"
            className="btn-header-booking"
            onClick={() => navigate("/booking")}
          >
            Đặt lịch ngay
          </Button>
        </div>
      </Header>

      {/* CONTENT */}
      <Content className="customer-content">
        <Outlet />
      </Content>

      {/* FOOTER */}
      <Footer className="customer-footer">
        <Row gutter={[32, 32]}>
          <Col xs={24} md={8}>
            <Title level={4} className="footer-title">
              HomeService
            </Title>

            <Text className="footer-desc">
              Giải pháp giúp việc nhà thông minh, nhanh chóng và tận tâm.
            </Text>
          </Col>

          <Col xs={24} md={8}>
            <Title level={5} className="footer-title">
              Liên kết hữu ích
            </Title>

            <div className="footer-links">
              <Link to="/">Về chúng tôi</Link>
              <Link to="/">Chính sách bảo mật</Link>
            </div>
          </Col>

          <Col xs={24} md={8}>
            <Title level={5} className="footer-title">
              Liên hệ
            </Title>

            <div className="footer-contact">
              <Text className="footer-contact-item">
                <HomeOutlined /> 123 Đường ABC, Quận 1, TP.HCM
              </Text>

              <Text className="footer-contact-item">
                <PhoneOutlined /> Hotline: 1900 xxxx
              </Text>
            </div>
          </Col>
        </Row>

        <div className="footer-copyright">
          Đồ án Tốt nghiệp ©2026
        </div>
      </Footer>
    </Layout>
  );
};

export default CustomerLayout;