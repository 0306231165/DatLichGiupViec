import React, { useState } from 'react';
import { Steps, Button, Form, Input, Select, DatePicker, TimePicker, Card, Typography, Row, Col, Divider, Result, Radio, Space, Alert } from 'antd';
import { 
  ToolOutlined, 
  CalendarOutlined, 
  EnvironmentOutlined, 
  CheckCircleOutlined,
  UserOutlined,
  DollarCircleOutlined // Thêm icon thanh toán
} from '@ant-design/icons';
import './../../css/customer/Booking.css';

const { Title, Text } = Typography;
const { Option } = Select;
const { TextArea } = Input;

const Booking = () => {
  const [current, setCurrent] = useState(0);
  const [form] = Form.useForm();
  
  // Gán giá trị mặc định ngay từ đầu để Form không bị rỗng
  const [bookingData, setBookingData] = useState({
    addressType: 'saved',
    staffAssignmentType: 'auto', // Mặc định là Phát đơn nhanh (Miễn phí)
    paymentMethod: 'cash'        // Mặc định là Tiền mặt
  });
  
  // Watcher để theo dõi thay đổi trong Form
  const addressType = Form.useWatch('addressType', form);
  const staffAssignmentType = Form.useWatch('staffAssignmentType', form);

  // Nút Tiếp tục (Cho bước 1, 2)
  const next = async () => {
    try {
      const values = await form.validateFields();
      setBookingData({ ...bookingData, ...values });
      setCurrent(current + 1);
    } catch (errorInfo) {
      console.log('Validate failed:', errorInfo);
    }
  };

  // Nút Quay lại
  const prev = () => setCurrent(current - 1);

  // Nút Xác nhận đặt lịch (Bước 3)
  const onFinish = async () => {
    try {
      const values = await form.validateFields(); 
      const finalData = { ...bookingData, ...values };
      console.log('Dữ liệu chốt đơn cuối cùng:', finalData);
      
      setCurrent(current + 1);
    } catch (errorInfo) {
      console.log('Validate failed:', errorInfo);
    }
  };

  // --- NỘI DUNG CÁC BƯỚC ---

  const Step1Service = (
    <div className="step-content-box">
      <Title level={4}>Chọn loại dịch vụ</Title>
      <Form layout="vertical" form={form} initialValues={bookingData}>
        <Form.Item name="serviceType" label="Dịch vụ bạn cần" rules={[{ required: true, message: 'Vui lòng chọn dịch vụ!' }]}>
          <Select size="large" placeholder="-- Chọn dịch vụ --">
            <Option value="cleaning">Dọn dẹp nhà cửa</Option>
            <Option value="cooking">Nấu ăn tại nhà</Option>
            <Option value="repair">Sửa chữa điện nước</Option>
          </Select>
        </Form.Item>
        <Form.Item name="homeSize" label="Diện tích / Quy mô" rules={[{ required: true, message: 'Vui lòng chọn quy mô!' }]}>
          <Select size="large" placeholder="-- Chọn diện tích nhà --">
            <Option value="small">Dưới 50m2</Option>
            <Option value="medium">50m2 - 100m2</Option>
            <Option value="large">Trên 100m2</Option>
          </Select>
        </Form.Item>
      </Form>
    </div>
  );

  const Step2Time = (
    <div className="step-content-box">
      <Title level={4}>Thời gian làm việc</Title>
      <Form layout="vertical" form={form} initialValues={bookingData}>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item name="date" label="Ngày thực hiện" rules={[{ required: true, message: 'Chọn ngày!' }]}>
              <DatePicker size="large" style={{ width: '100%' }} format="DD/MM/YYYY" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="time" label="Giờ bắt đầu" rules={[{ required: true, message: 'Chọn giờ!' }]}>
              <TimePicker size="large" style={{ width: '100%' }} format="HH:mm" />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );

  const Step3Details = (
    <div className="step-content-box">
      <Title level={4}>Địa chỉ & Thanh toán</Title>
      <Form layout="vertical" form={form} initialValues={bookingData}>
        
        {/* PHẦN ĐỊA CHỈ */}
        <div className="booking-section-custom">
          <div style={{ marginBottom: '8px' }}>
            <span style={{ color: '#ff4d4f', marginRight: '4px', fontSize: '14px', fontFamily: 'SimSun, sans-serif' }}>*</span>
            <Text strong><EnvironmentOutlined /> Địa chỉ thực hiện</Text>
          </div>
          
          <Form.Item name="addressType" className="mt-2">
            <Radio.Group>
              <Radio value="saved">Sử dụng địa chỉ đã lưu</Radio>
              <Radio value="manual">Nhập địa chỉ mới</Radio>
            </Radio.Group>
          </Form.Item>

          {addressType === 'saved' ? (
            <Form.Item name="savedAddressId" rules={[{ required: true, message: 'Vui lòng chọn địa chỉ!' }]}>
              <Select size="large" placeholder="Chọn từ địa chỉ của bạn">
                <Option value="1">123 Nguyễn Văn Linh, Quận 7, TP.HCM</Option>
                <Option value="2">456 Lê Lợi, Quận 1, TP.HCM</Option>
              </Select>
            </Form.Item>
          ) : (
            <Form.Item name="manualAddress" rules={[
              { required: true, message: 'Vui lòng nhập địa chỉ cụ thể!' },
              { whitespace: true, message: 'Địa chỉ không được để trống!' }
            ]}>
              <Input size="large" placeholder="Nhập số nhà, tên đường, quận..." />
            </Form.Item>
          )}
        </div>

        <Divider style={{ margin: '16px 0' }} />

        {/* PHẦN LOGIC CHỌN THỢ */}
        <div className="booking-section-custom">
          <div style={{ marginBottom: '8px' }}>
            <span style={{ color: '#ff4d4f', marginRight: '4px', fontSize: '14px', fontFamily: 'SimSun, sans-serif' }}>*</span>
            <Text strong><UserOutlined /> Hình thức nhận đơn</Text>
          </div>
          {/* Đã sửa câu báo lỗi tiếng Anh thành tiếng Việt */}
          <Form.Item name="staffAssignmentType" className="mt-2" rules={[{ required: true, message: 'Vui lòng chọn hình thức nhận đơn!' }]}>
            <Radio.Group>
              <Space direction="vertical">
                <Radio value="auto">
                  Phát đơn nhanh (Thợ nào nhận đơn trước sẽ làm) - <Text style={{ color: '#52c41a' }}>Miễn phí</Text>
                </Radio>
                <Radio value="manual">
                  Đăng đơn để thợ ứng tuyển, tôi sẽ tự chọn thợ - <Text type="danger">Phí dịch vụ +50.000đ</Text>
                </Radio>
              </Space>
            </Radio.Group>
          </Form.Item>

          {staffAssignmentType === 'manual' && (
            <Alert
              message="Lưu ý hình thức ứng tuyển"
              description="Sau khi chốt đơn, đơn của bạn sẽ được đăng lên bảng chung. Khi có thợ ứng tuyển, bạn có thể vào 'Lịch sử đơn hàng' để xem hồ sơ và tự tay chọn thợ."
              type="info"
              showIcon
              style={{ marginTop: '10px' }}
            />
          )}
        </div>

        <Divider style={{ margin: '16px 0' }} />

        {/* PHẦN THANH TOÁN MỚI THÊM */}
        <div className="booking-section-custom">
          <div style={{ marginBottom: '8px' }}>
            <span style={{ color: '#ff4d4f', marginRight: '4px', fontSize: '14px', fontFamily: 'SimSun, sans-serif' }}>*</span>
            <Text strong><DollarCircleOutlined /> Phương thức thanh toán</Text>
          </div>
          <Form.Item name="paymentMethod" className="mt-2" rules={[{ required: true, message: 'Vui lòng chọn phương thức thanh toán!' }]}>
            <Radio.Group>
              <Space direction="vertical">
                <Radio value="cash">Thanh toán tiền mặt sau khi hoàn thành</Radio>
                <Radio value="transfer">Chuyển khoản ngân hàng / Ví điện tử (Momo, ZaloPay...)</Radio>
              </Space>
            </Radio.Group>
          </Form.Item>
        </div>

        <Divider style={{ margin: '16px 0' }} />
        
        <Form.Item name="notes" label="Ghi chú thêm">
          <TextArea rows={4} placeholder="Ghi chú cho nhân viên (Ví dụ: Cổng nhà màu xanh, bấm chuông khi tới, nhà có chó dữ...)" />
        </Form.Item>
      </Form>
    </div>
  );

  const Step4Success = (
    <Result
      status="success"
      title="Đặt lịch thành công!"
      subTitle="Đơn hàng của bạn đã được ghi nhận. Vui lòng theo dõi trạng thái đơn hàng."
      extra={[
        <Button type="primary" key="home" onClick={() => window.location.href='/'}>Về trang chủ</Button>,
        <Button key="history">Xem lịch sử đơn hàng</Button>
      ]}
    />
  );

  const steps = [
    { title: 'Dịch vụ', icon: <ToolOutlined />, content: Step1Service },
    { title: 'Thời gian', icon: <CalendarOutlined />, content: Step2Time },
    { title: 'Thông tin', icon: <EnvironmentOutlined />, content: Step3Details },
    { title: 'Hoàn tất', icon: <CheckCircleOutlined />, content: Step4Success },
  ];

  return (
    <div className="booking-page-container">
      <Card className="booking-card">
        <Title level={2} className="booking-page-title">Đặt lịch dịch vụ</Title>
        <Steps current={current} items={steps.map(s => ({ title: s.title, icon: s.icon }))} className="booking-steps" />
        <div className="steps-content">{steps[current].content}</div>
        
        {current < steps.length - 1 && (
          <div className="steps-action">
            {current > 0 && <Button onClick={prev} size="large" style={{ marginRight: 8 }}>Quay lại</Button>}
            
            <Button type="primary" size="large" onClick={current === steps.length - 2 ? onFinish : next}>
              {current === steps.length - 2 ? 'Xác nhận đặt lịch' : 'Tiếp tục'}
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
};

export default Booking;