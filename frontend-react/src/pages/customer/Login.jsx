import React from 'react';
import { Row, Col, Form, Input, Button, Checkbox, Typography, Divider } from 'antd';
import { UserOutlined, LockOutlined, GoogleOutlined, FacebookOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import './../../css/customer/Login.css';

const { Title, Text } = Typography;

const Login = () => {
    const navigate = useNavigate();

    // Hàm xử lý khi người dùng bấm Đăng nhập thành công
    const onFinish = (values) => {
        console.log('Dữ liệu đăng nhập:', values);
        // Tạm thời giả lập đăng nhập thành công và đẩy về trang chủ
        navigate('/');
    };

    return (
        <div className="login-container">
        <Row style={{ minHeight: '100vh' }}>
            {/* CỘT TRÁI: BANNER (Sẽ ẩn trên điện thoại xs={0}) */}
            <Col xs={0} md={12} lg={14} className="login-banner">
            <div className="login-shape login-shape-1"></div>
            <div className="login-shape login-shape-2"></div>
            <div className="login-banner-content">
                <Title className="login-banner-title">HomeService</Title>
                <Text className="login-banner-subtitle">
                Giải pháp giúp việc nhà thông minh.<br />
                Nhanh chóng, an toàn và tận tâm.
                </Text>
            </div>
            </Col>

            {/* CỘT PHẢI: FORM ĐĂNG NHẬP */}
            <Col xs={24} md={12} lg={10} className="login-form-section">
            <Button 
                type="default" 
                shape="round" 
                icon={<ArrowLeftOutlined />} 
                className="btn-floating-back"
                onClick={() => navigate('/')}
            >
                Trang chủ
            </Button>
            <div className="login-form-box">
                <Title level={2} className="login-title">Chào mừng trở lại!</Title>
                <Text type="secondary" className="login-desc">
                Vui lòng đăng nhập để tiếp tục đặt lịch dịch vụ.
                </Text>

                <Form
                name="login_form"
                layout="vertical"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                className="login-form"
                >
                <Form.Item
                    name="email"
                    label="Email hoặc Số điện thoại"
                    rules={[
                    { required: true, message: 'Vui lòng nhập Email hoặc Số điện thoại!' }
                    ]}
                >
                    <Input 
                    prefix={<UserOutlined className="site-form-item-icon" />} 
                    placeholder="Nhập email/SĐT của bạn" 
                    size="large"
                    />
                </Form.Item>

                <Form.Item
                    name="password"
                    label="Mật khẩu"
                    rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
                >
                    <Input.Password
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    placeholder="Nhập mật khẩu"
                    size="large"
                    />
                </Form.Item>

                <div className="login-options">
                    <Form.Item name="remember" valuePropName="checked" noStyle>
                    <Checkbox>Ghi nhớ tài khoản</Checkbox>
                    </Form.Item>
                    <Link className="login-forgot" to="/forgot-password">
                    Quên mật khẩu?
                    </Link>
                </div>

                <Form.Item>
                    <Button type="primary" htmlType="submit" size="large" block className="btn-submit-login">
                    Đăng nhập
                    </Button>
                </Form.Item>
                </Form>

                <Divider plain className="login-divider">Hoặc đăng nhập với</Divider>

                <div className="social-login-group">
                <Button icon={<GoogleOutlined />} size="large" block className="btn-social btn-google">
                    Google
                </Button>
                <Button icon={<FacebookOutlined />} size="large" block className="btn-social btn-facebook">
                    Facebook
                </Button>
                </div>

                <div className="login-footer">
                <Text>Bạn chưa có tài khoản? </Text>
                <Link to="/register" className="register-link">Đăng ký ngay</Link>
                </div>
            </div>
            </Col>
        </Row>
        </div>
    );
};

export default Login;