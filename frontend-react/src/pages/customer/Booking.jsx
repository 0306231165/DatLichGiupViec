import React from 'react';
import { Form, Input, Button, DatePicker, Select, message, Typography } from 'antd';

const { Title } = Typography;
const { Option } = Select;
const { TextArea } = Input;

const Booking = () => {
  const onFinish = (values) => {
    console.log('Dữ liệu đặt lịch:', values);
    message.success('Đặt lịch thành công! Đang chờ xác nhận.');
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <Title level={3} style={{ textAlign: 'center', marginBottom: '24px' }}>
        Đặt lịch dịch vụ
      </Title>
      
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item 
          label="Chọn dịch vụ" 
          name="service" 
          rules={[{ required: true, message: 'Vui lòng chọn dịch vụ!' }]}
        >
          <Select placeholder="-- Chọn dịch vụ --">
            <Option value="don_dep">Dọn dẹp nhà cửa</Option>
            <Option value="nau_an">Nấu ăn tại nhà</Option>
            <Option value="trong_tre">Trông trẻ</Option>
          </Select>
        </Form.Item>

        <Form.Item 
          label="Ngày và giờ thực hiện" 
          name="dateTime" 
          rules={[{ required: true, message: 'Vui lòng chọn ngày giờ!' }]}
        >
          <DatePicker showTime format="YYYY-MM-DD HH:mm" style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item label="Địa chỉ" name="address" rules={[{ required: true, message: 'Vui lòng nhập địa chỉ!' }]}>
          <Input placeholder="Số nhà, tên đường, phường/xã..." />
        </Form.Item>

        <Form.Item label="Mô tả công việc chi tiết" name="description">
          <TextArea rows={4} placeholder="Ví dụ: Cần lau dọn kỹ khu vực bếp và phòng khách..." />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block size="large">
            Xác nhận đặt lịch
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Booking;