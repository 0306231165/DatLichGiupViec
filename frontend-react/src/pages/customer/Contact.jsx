import React from 'react';
import { Row, Col, Card, Typography, Form, Input, Button, Modal, Divider, Select } from 'antd';
import { 
  EnvironmentOutlined, 
  PhoneOutlined, 
  MailOutlined, 
  ClockCircleOutlined, 
  UserAddOutlined 
} from '@ant-design/icons';
// Đã cập nhật lại chuẩn đường dẫn CSS mới
import './../../css/customer/Contact.css';

const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;
const { Option } = Select;

const Contact = () => {
  const [form] = Form.useForm();

  // Xử lý khi thợ/nhân viên bấm Đăng ký
  const onFinish = (values) => {
    console.log('Dữ liệu đăng ký đối tác:', values);
    
    // Thay thế message bằng Modal popup giữa màn hình cực kỳ dễ nhìn
    Modal.success({
      title: 'Gửi hồ sơ thành công!',
      content: (
        <div>
          <p>Cảm ơn bạn đã đăng ký trở thành đối tác của HomeService.</p>
          <p>Bộ phận nhân sự sẽ liên hệ với bạn qua số điện thoại hoặc email trong vòng <strong>24h tới</strong> để sắp xếp lịch phỏng vấn.</p>
        </div>
      ),
      okText: 'Đã hiểu',
      centered: true, // Ép popup hiển thị ngay giữa màn hình
      maskClosable: true, // Cho phép click ra ngoài để đóng
    });

    form.resetFields();
  };

  return (
    <div className="contact-page-container">
      <div className="contact-header">
        <Title level={2} style={{ color: '#fff', margin: 0 }}>Liên hệ & Hợp tác</Title>
        <Paragraph style={{ color: '#e6f7ff', fontSize: '16px', marginTop: '10px' }}>
          Đăng ký trở thành đối tác để gia tăng thu nhập cùng HomeService
        </Paragraph>
      </div>

      <div className="contact-content">
        <Card className="contact-card" bordered={false}>
          <Row gutter={[40, 40]}>
            
            {/* CỘT TRÁI: THÔNG TIN CÔNG TY */}
            <Col xs={24} md={10}>
              <Title level={3} style={{ color: '#1890ff', marginTop: 0, marginBottom: '24px' }}>
                Thông tin liên hệ
              </Title>
              
              <div className="info-list" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                  <div className="info-icon"><EnvironmentOutlined /></div>
                  <div>
                    <Text strong style={{ display: 'block' }}>Địa chỉ trụ sở:</Text>
                    <Text>123 Nguyễn Văn Linh, Phường Tân Phong, Quận 7, TP. HCM</Text>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                  <div className="info-icon"><PhoneOutlined /></div>
                  <div>
                    <Text strong style={{ display: 'block' }}>Hotline hỗ trợ:</Text>
                    <Text style={{ color: '#1890ff', fontWeight: 'bold', fontSize: '16px' }}>1900 8888</Text>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                  <div className="info-icon"><MailOutlined /></div>
                  <div>
                    <Text strong style={{ display: 'block' }}>Email:</Text>
                    <Text>support@dichvunha.vn</Text>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                  <div className="info-icon"><ClockCircleOutlined /></div>
                  <div>
                    <Text strong style={{ display: 'block' }}>Giờ làm việc:</Text>
                    <Text>Thứ 2 - Chủ Nhật: 08:00 - 20:00</Text>
                  </div>
                </div>
              </div>

              <Divider />
              
              <div className="map-container">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3920.023521617478!2d106.69745587483669!3d10.732668889413988!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317528b2747a81a5%3A0xea373b98dd270e51!2zxJDhuqFpIGjhu41jIFTDtG4gxJDhu6ljIFRo4bqvbmc!5e0!3m2!1svi!2s!4v1714812345678!5m2!1svi!2s" 
                  width="100%" 
                  height="220" 
                  style={{ border: 0, borderRadius: '8px' }} 
                  allowFullScreen="" 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Google Map"
                ></iframe>
              </div>
            </Col>

            {/* CỘT PHẢI: FORM ĐĂNG KÝ TRỞ THÀNH ĐỐI TÁC */}
            <Col xs={24} md={14}>
              <div className="contact-form-wrapper">
                <Title level={3} style={{ marginTop: 0, marginBottom: '8px' }}>
                  Đăng ký làm thợ / Đối tác
                </Title>
                <Paragraph type="secondary" style={{ marginBottom: '24px' }}>
                  Điền đầy đủ thông tin bên dưới, chúng tôi sẽ gọi lại phỏng vấn bạn.
                </Paragraph>

                <Form 
                  layout="vertical" 
                  form={form} 
                  onFinish={onFinish}
                  size="large"
                >
                  <Row gutter={16}>
                    <Col xs={24} sm={12}>
                      <Form.Item 
                        name="fullName" 
                        label="Họ và tên" 
                        rules={[{ required: true, message: 'Vui lòng nhập họ tên!' }]}
                      >
                        <Input placeholder="Nhập họ và tên của bạn" />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={12}>
                      <Form.Item 
                        name="phone" 
                        label="Số điện thoại" 
                        rules={[
                          { required: true, message: 'Vui lòng nhập số điện thoại!' },
                          { pattern: /^[0-9]{10}$/, message: 'Số điện thoại phải gồm 10 số!' }
                        ]}
                      >
                        <Input placeholder="Nhập số điện thoại" />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row gutter={16}>
                    <Col xs={24} sm={12}>
                      <Form.Item 
                        name="email" 
                        label="Email liên hệ" 
                        rules={[
                          { required: true, message: 'Vui lòng nhập email!' },
                          { type: 'email', message: 'Email không đúng định dạng!' }
                        ]}
                      >
                        <Input placeholder="Nhập địa chỉ email" />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={12}>
                      <Form.Item 
                        name="address" 
                        label="Khu vực sinh sống hiện tại" 
                        rules={[{ required: true, message: 'Vui lòng nhập khu vực!' }]}
                      >
                        <Input placeholder="Ví dụ: Quận 7, TP. HCM" />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row gutter={16}>
                    <Col xs={24} sm={12}>
                      <Form.Item 
                        name="skill" 
                        label="Chuyên môn của bạn" 
                        rules={[{ required: true, message: 'Vui lòng chọn chuyên môn!' }]}
                      >
                        <Select placeholder="-- Chọn công việc --">
                          <Option value="cleaning">Nhân viên dọn dẹp</Option>
                          <Option value="repair">Thợ điện / nước</Option>
                          <Option value="cooking">Đầu bếp tại nhà</Option>
                          <Option value="other">Công việc khác</Option>
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={12}>
                      <Form.Item 
                        name="experience" 
                        label="Kinh nghiệm làm việc" 
                        rules={[{ required: true, message: 'Vui lòng chọn kinh nghiệm!' }]}
                      >
                        <Select placeholder="-- Chọn kinh nghiệm --">
                          <Option value="none">Chưa có (Cần đào tạo)</Option>
                          <Option value="1yr">Dưới 1 năm</Option>
                          <Option value="3yrs">1 đến 3 năm</Option>
                          <Option value="pro">Trên 3 năm (Thợ lành nghề)</Option>
                        </Select>
                      </Form.Item>
                    </Col>
                  </Row>

                  <Form.Item 
                    name="notes" 
                    label="Giới thiệu ngắn về bản thân (Không bắt buộc)" 
                  >
                    <TextArea rows={3} placeholder="Ví dụ: Có phương tiện đi lại, có thể làm ca tối..." />
                  </Form.Item>

                  <Form.Item style={{ marginTop: '20px', marginBottom: 0 }}>
                    <Button type="primary" htmlType="submit" icon={<UserAddOutlined />} block className="btn-send-contact">
                      GỬI HỒ SƠ ỨNG TUYỂN
                    </Button>
                  </Form.Item>
                </Form>
              </div>
            </Col>

          </Row>
        </Card>
      </div>
    </div>
  );
};

export default Contact;