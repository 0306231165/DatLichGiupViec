import React from 'react';
import { Row, Col, Form, Input, Button, Typography } from 'antd';
import { 
  UserOutlined, 
  LockOutlined, 
  PhoneOutlined, 
  MailOutlined, 
  ArrowLeftOutlined 
} from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import './../../css/customer/Register.css';

const { Title, Text } = Typography;

const Register = () => {
  const navigate = useNavigate();

  const onFinish = (values) => {
    console.log('Dữ liệu đăng ký:', values);
    // Giả lập đăng ký thành công, chuyển hướng về trang đăng nhập
    navigate('/login');
  };

  return (
    <div className="register-container">
      <Row style={{ minHeight: '100vh' }}>
        {/* CỘT TRÁI: BANNER (Sẽ ẩn trên điện thoại xs={0}) */}
        <Col xs={0} md={12} lg={14} className="register-banner">
          <div className="register-shape register-shape-1"></div>
          <div className="register-shape register-shape-2"></div>
          <div className="register-banner-content">
            <Title className="register-banner-title">Gia nhập cùng chúng tôi</Title>
            <Text className="register-banner-subtitle">
              Tạo tài khoản ngay hôm nay để trải nghiệm <br />
              dịch vụ gia đình tiện ích nhất!
            </Text>
          </div>
        </Col>

        {/* CỘT PHẢI: FORM ĐĂNG KÝ */}
        <Col xs={24} md={12} lg={10} className="register-form-section">
          
          {/* Nút Floating quay lại trang chủ (Giống trang Login) */}
          <Button 
            type="default" 
            shape="round" 
            icon={<ArrowLeftOutlined />} 
            className="btn-floating-back"
            onClick={() => navigate('/')}
          >
            Trang chủ
          </Button>

          <div className="register-form-box">
            <Title level={2} className="register-title">Đăng ký tài khoản</Title>
            <Text type="secondary" className="register-desc">
              Điền thông tin bên dưới để tạo tài khoản mới.
            </Text>

            <Form
              name="register_form"
              layout="vertical"
              onFinish={onFinish}
              className="register-form"
            >
              <Form.Item
                name="fullName"
                label="Họ và tên"
                rules={[{ required: true, message: 'Vui lòng nhập họ và tên!' }]}
              >
                <Input 
                  prefix={<UserOutlined className="site-form-item-icon" />} 
                  placeholder="Nhập họ và tên của bạn" 
                  size="large"
                />
              </Form.Item>

              <Form.Item
                name="phone"
                label="Số điện thoại"
                rules={[
                  { required: true, message: 'Vui lòng nhập số điện thoại!' },
                  { pattern: /^[0-9]{10}$/, message: 'Số điện thoại không hợp lệ!' }
                ]}
              >
                <Input 
                  prefix={<PhoneOutlined className="site-form-item-icon" />} 
                  placeholder="Nhập số điện thoại" 
                  size="large"
                />
              </Form.Item>

              <Form.Item
                name="email"
                label="Email"
                rules={[
                  { required: true, message: 'Vui lòng nhập email!' },
                  { type: 'email', message: 'Email không đúng định dạng!' }
                ]}
              >
                <Input 
                  prefix={<MailOutlined className="site-form-item-icon" />} 
                  placeholder="Nhập địa chỉ email" 
                  size="large"
                />
              </Form.Item>

              <Form.Item
                name="password"
                label="Mật khẩu"
                rules={[
                  { required: true, message: 'Vui lòng nhập mật khẩu!' },
                  { min: 6, message: 'Mật khẩu phải có ít nhất 6 ký tự!' }
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  placeholder="Tạo mật khẩu"
                  size="large"
                />
              </Form.Item>

              <Form.Item
                name="confirm"
                label="Xác nhận mật khẩu"
                dependencies={['password']}
                rules={[
                  { required: true, message: 'Vui lòng xác nhận lại mật khẩu!' },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error('Mật khẩu xác nhận không khớp!'));
                    },
                  }),
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  placeholder="Nhập lại mật khẩu"
                  size="large"
                />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" size="large" block className="btn-submit-register">
                  Đăng ký ngay
                </Button>
              </Form.Item>
            </Form>

            <div className="register-footer">
              <Text>Bạn đã có tài khoản? </Text>
              <Link to="/login" className="login-link">Đăng nhập</Link>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Register;