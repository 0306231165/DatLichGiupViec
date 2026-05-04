import React, { useState } from 'react';
import { Steps, Button, Form, Input, Select, DatePicker, TimePicker, Card, Typography, Row, Col, Divider, Result, Radio, Space, Alert } from 'antd';
import { 
  ToolOutlined, 
  CalendarOutlined, 
  EnvironmentOutlined, 
  CheckCircleOutlined,
  UserOutlined,
  DollarCircleOutlined,
  AppstoreOutlined,
  HomeOutlined,
  ClockCircleOutlined
} from '@ant-design/icons';
import './../../css/customer/Booking.css';

const { Title, Text } = Typography;
const { Option } = Select;
const { TextArea } = Input;

const Booking = () => {
  const [current, setCurrent] = useState(0);
  const [form] = Form.useForm();
  
  const defaultValues = {
    addressType: 'saved',
    staffAssignmentType: 'auto',
    paymentMethod: 'cash'
  };

  const [bookingData, setBookingData] = useState(defaultValues);
  
  const addressType = Form.useWatch('addressType', form);
  const staffAssignmentType = Form.useWatch('staffAssignmentType', form);

  const next = async () => {
    try {
      const values = await form.validateFields();
      setBookingData({ ...bookingData, ...values });
      setCurrent(current + 1);
    } catch (errorInfo) {
      console.log('Validate failed:', errorInfo);
    }
  };

  const prev = () => setCurrent(current - 1);

  const onFinish = async () => {
    try {
      const values = await form.validateFields(); 
      const finalData = { ...bookingData, ...values };
      console.log('Dữ liệu đặt lịch cuối cùng:', finalData);
      
      setCurrent(current + 1);
    } catch (errorInfo) {
      console.log('Validate failed:', errorInfo);
    }
  };

  const handleResetBooking = () => {
    form.resetFields();
    form.setFieldsValue(defaultValues);
    setBookingData(defaultValues);
    setCurrent(0);
  };

  // --- BƯỚC 1: DỊCH VỤ (Đã đồng bộ Label) ---
  const Step1Service = (
    <div className="step-content-box">
      <Title level={4}>Chọn loại dịch vụ</Title>
      <Form layout="vertical" form={form} initialValues={bookingData}>
        <Form.Item 
          name="serviceType" 
          label={
            <span className="custom-label-wrapper">
              <AppstoreOutlined /> <Text strong>Dịch vụ bạn cần</Text>
            </span>
          } 
          rules={[{ required: true, message: 'Vui lòng chọn dịch vụ!' }]}
        >
          <Select size="large" placeholder="-- Chọn dịch vụ --">
            <Option value="cleaning">Dọn dẹp nhà cửa</Option>
            <Option value="cooking">Nấu ăn tại nhà</Option>
            <Option value="repair">Sửa chữa điện nước</Option>
          </Select>
        </Form.Item>

        <Form.Item 
          name="homeSize" 
          label={
            <span className="custom-label-wrapper">
              <HomeOutlined /> <Text strong>Diện tích / Quy mô</Text>
            </span>
          } 
          rules={[{ required: true, message: 'Vui lòng chọn quy mô!' }]}
        >
          <Select size="large" placeholder="-- Chọn diện tích nhà --">
            <Option value="small">Dưới 50m2</Option>
            <Option value="medium">50m2 - 100m2</Option>
            <Option value="large">Trên 100m2</Option>
          </Select>
        </Form.Item>
      </Form>
    </div>
  );

  // --- BƯỚC 2: THỜI GIAN (Đã đồng bộ Label) ---
  const Step2Time = (
    <div className="step-content-box">
      <Title level={4}>Thời gian làm việc</Title>
      <Form layout="vertical" form={form} initialValues={bookingData}>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item 
              name="date" 
              label={
                <span className="custom-label-wrapper">
                  <CalendarOutlined /> <Text strong>Ngày thực hiện</Text>
                </span>
              } 
              rules={[{ required: true, message: 'Chọn ngày!' }]}
            >
              <DatePicker size="large" className="full-width" format="DD/MM/YYYY" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item 
              name="time" 
              label={
                <span className="custom-label-wrapper">
                  <ClockCircleOutlined /> <Text strong>Giờ bắt đầu</Text>
                </span>
              } 
              rules={[{ required: true, message: 'Chọn giờ!' }]}
            >
              <TimePicker size="large" className="full-width" format="HH:mm" />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );

  // --- BƯỚC 3: THÔNG TIN (Đã căn chỉnh lại) ---
  const Step3Details = (
    <div className="step-content-box">
      <Title level={4}>Địa chỉ & Thanh toán</Title>
      <Form layout="vertical" form={form} initialValues={bookingData}>
        
        <div className="booking-section-custom">
          <Form.Item 
            name="addressType" 
            label={
              <span className="custom-label-wrapper">
                <EnvironmentOutlined /> <Text strong>Địa chỉ thực hiện</Text>
              </span>
            }
            required
            className="mb-2"
          >
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

        <Divider className="my-3" />

        <div className="booking-section-custom">
          <Form.Item 
            name="staffAssignmentType" 
            label={
              <span className="custom-label-wrapper">
                <UserOutlined /> <Text strong>Hình thức nhận việc</Text>
              </span>
            }
            rules={[{ required: true, message: 'Vui lòng chọn hình thức nhận việc!' }]}
          >
            <Radio.Group>
              <Space direction="vertical">
                <Radio value="auto">
                  Phát yêu cầu nhanh (Thợ nào nhận việc trước sẽ làm) - <Text className="text-free">Miễn phí</Text>
                </Radio>
                <Radio value="manual">
                  Đăng yêu cầu để thợ ứng tuyển, tôi sẽ tự chọn thợ - <Text type="danger">Phí dịch vụ +50.000đ</Text>
                </Radio>
              </Space>
            </Radio.Group>
          </Form.Item>

          {staffAssignmentType === 'manual' && (
            <Alert
              message="Lưu ý hình thức ứng tuyển"
              description="Sau khi hoàn tất đặt lịch, yêu cầu của bạn sẽ được đăng lên hệ thống. Khi có thợ ứng tuyển, bạn có thể vào 'Lịch sử đặt dịch vụ' để xem hồ sơ và tự tay chọn thợ."
              type="info"
              showIcon
              className="alert-info-mt"
            />
          )}
        </div>

        <Divider className="my-3" />

        <div className="booking-section-custom">
          <Form.Item 
            name="paymentMethod" 
            label={
              <span className="custom-label-wrapper">
                <DollarCircleOutlined /> <Text strong>Phương thức thanh toán</Text>
              </span>
            }
            rules={[{ required: true, message: 'Vui lòng chọn phương thức thanh toán!' }]}
          >
            <Radio.Group>
              <Space direction="vertical">
                <Radio value="cash">Thanh toán tiền mặt sau khi hoàn thành</Radio>
                <Radio value="transfer">Chuyển khoản ngân hàng / Ví điện tử (Momo, ZaloPay...)</Radio>
              </Space>
            </Radio.Group>
          </Form.Item>
        </div>

        <Divider className="my-3" />
        
        <Form.Item name="notes" label={<Text strong>Ghi chú thêm</Text>}>
          <TextArea rows={4} placeholder="Ghi chú cho nhân viên (Ví dụ: Cổng nhà màu xanh, bấm chuông khi tới, nhà có chó dữ...)" />
        </Form.Item>
      </Form>
    </div>
  );

  const Step4Success = (
    <Result
      status="success"
      title="Đặt lịch thành công!"
      subTitle="Yêu cầu dịch vụ của bạn đã được ghi nhận. Vui lòng theo dõi trạng thái lịch đặt."
      extra={
        <div className="success-action-group">
          <Button type="primary" size="large" key="history" className="success-btn">
            Xem lịch sử đặt dịch vụ
          </Button>
          <Button size="large" key="book-new" onClick={handleResetBooking} className="success-btn">
            Đặt lịch mới
          </Button>
          <Button size="large" key="home" onClick={() => window.location.href='/'} className="success-btn">
            Trở về Trang chủ
          </Button>
        </div>
      }
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
            {current > 0 && <Button onClick={prev} size="large" className="btn-back">Quay lại</Button>}
            
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