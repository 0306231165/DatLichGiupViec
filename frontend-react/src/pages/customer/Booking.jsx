import React, { useState } from 'react';
import { Steps, Button, Form, Input, Select, DatePicker, TimePicker, Card, Typography, Row, Col, Divider, Result, Radio, Space, Tag } from 'antd';
import { 
  ToolOutlined, 
  CalendarOutlined, 
  EnvironmentOutlined, 
  CheckCircleOutlined,
  DollarCircleOutlined,
  AppstoreOutlined,
  HomeOutlined,
  ClockCircleOutlined,
  SyncOutlined,
  InfoCircleOutlined,
  EditOutlined,
  WarningOutlined,
  UserOutlined,
  CheckOutlined,
} from '@ant-design/icons';
import dayjs from 'dayjs';
import './../../css/customer/Booking.css';

const { Title, Text } = Typography;
const { Option } = Select;
const { TextArea } = Input;

const Booking = () => {
  const [current, setCurrent] = useState(0);
  const [form] = Form.useForm();
  
  const [promoCode, setPromoCode] = useState('');
  const [isPromoApplied, setIsPromoApplied] = useState(false);

  const [bookingData, setBookingData] = useState({
    bookingFrequency: 'one-time',
    cycleType: 'single-weekly',
    addressType: 'saved',
    paymentMethod: 'cash',
    duration: '1',
    weekDays: [],
    staffSelection: 'auto'
  });

  // --- LOGIC TÍNH TOÁN & PHỤ PHÍ KHẨN CẤP ---
  const basePrice = 150000;
  let estimatedSessions = 1;

  if (bookingData.bookingFrequency === 'periodic') {
    // Nếu chọn Xuyên suốt linh hoạt -> Chỉ tính bill tạm cho 1 buổi
    if (bookingData.cycleType === 'continuous-weekly') {
      estimatedSessions = 1;
    } else {
      // Nếu chọn gói có tháng -> Tính như cũ
      const months = parseInt(bookingData.duration) || 1;
      if (bookingData.cycleType === 'multi-weekly') {
        const daysPerWeek = bookingData.weekDays && bookingData.weekDays.length > 0 ? bookingData.weekDays.length : 1;
        estimatedSessions = (months * 4) * daysPerWeek;
      } else {
        estimatedSessions = months * 4;
      }
    }
  }

  // Bắt logic Khẩn cấp (Từ 30 phút đến dưới 2 tiếng)
  let isUrgentBooking = false;
  const dateFieldToCheck = bookingData.bookingFrequency === 'periodic' ? bookingData.startDate : bookingData.date;
  
  if (dateFieldToCheck && bookingData.time) {
    const now = dayjs();
    if (dateFieldToCheck.isSame(now, 'day')) {
      const selectedDateTime = dateFieldToCheck.hour(bookingData.time.hour()).minute(bookingData.time.minute());
      if (selectedDateTime.isBefore(now.add(2, 'hour')) && selectedDateTime.isAfter(now.add(29, 'minute'))) {
        isUrgentBooking = true;
      }
    }
  }

  // --- LOGIC TÍNH TOÁN NHÂN VIÊN ---
  let staffFee = 0;
  // Kiểm tra gói tháng: Định kỳ nhưng KHÔNG PHẢI hàng tuần linh hoạt
  const isMonthlyPackage = bookingData.bookingFrequency === 'periodic' && bookingData.cycleType !== 'continuous-weekly';
  
  // Logic "Chốt chặn": Nếu là gói tháng thì phí luôn bằng 0, ngược lại nếu chọn favorite thì mới tính 30k
  if (!isMonthlyPackage && bookingData.staffSelection === 'favorite') {
    staffFee = 30000; 
  } else {
    staffFee = 0; 
  }

  const subTotal = basePrice * estimatedSessions;
  
  // Ưu đãi 10% chỉ dành cho gói tháng
  const periodicDiscount = isMonthlyPackage ? subTotal * 0.1 : 0;
  const voucherDiscount = isPromoApplied ? 50000 : 0;
  const urgentFee = isUrgentBooking ? 80000 : 0; 
  
  // Tổng cuối cùng sẽ luôn đúng vì staffFee đã được xử lý ở trên
  const finalTotal = subTotal + urgentFee + staffFee - periodicDiscount - voucherDiscount;

  const handleValuesChange = (changedValues, allValues) => {
    let updatedValues = { ...allValues };

    if (changedValues.cycleType || changedValues.weekDays) {
      if (updatedValues.cycleType === 'multi-weekly') {
        form.setFieldsValue({ startDate: null });
        updatedValues.startDate = null;
      }
    }

    // Xử lý tự động ép về 'auto' nếu chọn Gói tháng
    const isMonthlyNow = updatedValues.bookingFrequency === 'periodic' && updatedValues.cycleType !== 'continuous-weekly';
    
    if (isMonthlyNow && updatedValues.staffSelection !== 'auto') {
      // Nếu là gói tháng mà state đang là 'favorite', ép về 'auto'
      form.setFieldsValue({ staffSelection: 'auto' });
      updatedValues.staffSelection = 'auto';
    }

    setBookingData(prev => ({ ...prev, ...updatedValues }));
  };

  const next = async () => {
    try {
      await form.validateFields();
      setCurrent(current + 1);
    } catch (error) {
      console.log('Validate failed:', error);
    }
  };

  const onFinish = async () => {
    try {
      await form.validateFields();
      console.log('Dữ liệu gửi đi:', { ...bookingData, finalTotal, isUrgentBooking, urgentFee, staffFee });
      setCurrent(current + 1);
    } catch (error) {
      console.log('Validate failed:', error);
    }
  };

  const handleApplyPromo = () => {
    if (promoCode.toUpperCase() === 'GIAM50K') {
      setIsPromoApplied(true);
    } else {
      alert('Mã không hợp lệ! Thử mã: GIAM50K');
    }
  };

  const disabledDate = (current) => {
    if (current && current < dayjs().startOf('day')) {
      return true;
    }
    if (bookingData.cycleType === 'multi-weekly' && bookingData.weekDays && bookingData.weekDays.length > 0) {
      const currentDayOfWeek = current.day() === 0 ? 8 : current.day() + 1;
      return !bookingData.weekDays.includes(currentDayOfWeek.toString());
    }
    return false;
  };

  const getDayName = (dateObj) => {
    if (!dateObj) return '';
    const day = dateObj.day();
    return day === 0 ? 'Chủ nhật' : `Thứ ${day + 1}`;
  };

  const validateTimeRule = ({ getFieldValue }) => ({
    validator(_, value) {
      if (!value) return Promise.resolve();
      
      const dateField = bookingData.bookingFrequency === 'periodic' ? 'startDate' : 'date';
      const selectedDate = getFieldValue(dateField);
      
      if (!selectedDate) return Promise.resolve();

      const now = dayjs();
      if (selectedDate.isSame(now, 'day')) {
        const selectedDateTime = selectedDate.hour(value.hour()).minute(value.minute());
        if (selectedDateTime.isBefore(now.add(30, 'minute'))) {
          return Promise.reject(new Error('Vui lòng đặt trước ít nhất 30 phút để nhân viên kịp di chuyển!'));
        }
      }
      return Promise.resolve();
    }
  });

  const Step1 = (
    <>
      <Title level={4} className="mb-4">Thông tin dịch vụ</Title>
      <Form.Item name="bookingFrequency" label={<span className="custom-label-wrapper"><SyncOutlined /> <Text strong>Gói dịch vụ</Text></span>}>
        <Radio.Group className="full-width">
          <Space direction="vertical" className="full-width">
            <Radio value="one-time">Dùng 1 lần linh hoạt (Đặt buổi nào tính buổi đó)</Radio>
            <Radio value="periodic">Đặt định kỳ (Lặp lại dài hạn)</Radio>
          </Space>
        </Radio.Group>
      </Form.Item>

      <Divider />

      <Form.Item name="serviceType" label={<span className="custom-label-wrapper"><AppstoreOutlined /> <Text strong>Bạn cần dịch vụ gì?</Text></span>} rules={[{ required: true, message: 'Vui lòng chọn dịch vụ!' }]}>
        <Select size="large" placeholder="Chọn dịch vụ">
          <Option value="cleaning">Dọn dẹp nhà cửa</Option>
          <Option value="cooking">Nấu ăn tại gia</Option>
          <Option value="ac">Vệ sinh máy lạnh</Option>
        </Select>
      </Form.Item>

      <Form.Item name="homeSize" label={<span className="custom-label-wrapper"><HomeOutlined /> <Text strong>Diện tích nhà</Text></span>} rules={[{ required: true, message: 'Vui lòng chọn diện tích!' }]}>
        <Select size="large" placeholder="Chọn diện tích">
          <Option value="small">Dưới 50m2</Option>
          <Option value="medium">50m2 - 100m2</Option>
          <Option value="large">Trên 100m2</Option>
        </Select>
      </Form.Item>

      <Divider />
    </>
  );

  const Step2 = (
    <>
      <Title level={4} className="mb-4">Thời gian làm việc</Title>
      
      {bookingData.bookingFrequency === 'periodic' ? (
        <div className="periodic-options-container">
          <Form.Item name="cycleType" label={<span className="custom-label-wrapper"><SyncOutlined /> <Text strong>Tần suất lặp lại</Text></span>}>
            <Radio.Group optionType="button" buttonStyle="solid">
              <Radio.Button value="single-weekly">Gói tháng - 1 buổi / Tuần</Radio.Button>
              <Radio.Button value="multi-weekly">Gói tháng - Nhiều buổi / Tuần</Radio.Button>
              <Radio.Button value="continuous-weekly">Gói dài hạn (Lặp lại hàng tuần)</Radio.Button>
            </Radio.Group>
          </Form.Item>

          {bookingData.cycleType === 'multi-weekly' && (
            <Form.Item name="weekDays" label={<span className="custom-label-wrapper"><CheckOutlined /> <Text strong>Chọn các ngày làm trong tuần</Text></span>} rules={[{ required: true, message: 'Vui lòng chọn ít nhất 1 ngày!' }]}>
              <Select mode="multiple" size="large" placeholder="Ví dụ: Thứ 2, Thứ 4, Thứ 6">
                <Option value="2">Thứ 2</Option><Option value="3">Thứ 3</Option><Option value="4">Thứ 4</Option>
                <Option value="5">Thứ 5</Option><Option value="6">Thứ 6</Option><Option value="7">Thứ 7</Option>
                <Option value="8">Chủ nhật</Option>
              </Select>
            </Form.Item>
          )}

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="startDate" label={<span className="custom-label-wrapper"><CalendarOutlined /> <Text strong>Ngày bắt đầu</Text></span>} rules={[{ required: true, message: 'Vui lòng chọn ngày bắt đầu!' }]}>
                <DatePicker 
                  size="large" 
                  className="full-width" 
                  format="DD/MM/YYYY" 
                  placeholder={bookingData.cycleType === 'multi-weekly' && (!bookingData.weekDays || bookingData.weekDays.length === 0) ? "Vui lòng chọn Thứ trước" : "Chọn ngày"} 
                  disabledDate={disabledDate} 
                  disabled={bookingData.cycleType === 'multi-weekly' && (!bookingData.weekDays || bookingData.weekDays.length === 0)}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item 
                name="time" 
                dependencies={['startDate']} 
                label={<span className="custom-label-wrapper"><ClockCircleOutlined /> <Text strong>Giờ làm (Cố định)</Text></span>} 
                rules={[{ required: true, message: 'Vui lòng chọn giờ làm!' }, validateTimeRule]}
              >
                <TimePicker size="large" className="full-width" format="HH:mm" placeholder="Giờ tới làm" />
              </Form.Item>
            </Col>
          </Row>

          {isUrgentBooking && (
            <div style={{ marginBottom: 16, color: '#cf1322', padding: '10px 12px', background: '#fff1f0', border: '1px solid #ffa39e', borderRadius: '6px' }}>
              <WarningOutlined /> <Text strong type="danger">Lưu ý:</Text> Bạn đang yêu cầu dịch vụ gấp (dưới 2 tiếng). Hệ thống sẽ tự động cộng thêm <Text strong>{urgentFee.toLocaleString()}đ phụ phí</Text> cho ca làm việc đầu tiên để điều phối nhân viên nhanh nhất.
            </div>
          )}

          {(bookingData.cycleType === 'single-weekly' || bookingData.cycleType === 'continuous-weekly') && bookingData.startDate && (
             <div style={{ marginBottom: 16, color: '#1677ff', fontStyle: 'italic', padding: '8px 12px', background: '#e6f4ff', borderRadius: '6px' }}>
               <InfoCircleOutlined /> Lịch sẽ tự động lặp lại vào <b>{getDayName(bookingData.startDate)}</b> mỗi tuần.
             </div>
          )}
          
          {/* Ẩn mục chọn tháng nếu khách chọn Hàng tuần linh hoạt */}
          {bookingData.cycleType !== 'continuous-weekly' && (
            <Form.Item name="duration" label={<span className="custom-label-wrapper"><CalendarOutlined /> <Text strong>Thời gian duy trì hợp đồng</Text></span>}>
              <Select size="large">
                <Option value="1">Duy trì trong 1 tháng (Khuyến nghị)</Option>
                <Option value="3">Duy trì trong 3 tháng</Option>
                <Option value="6">Duy trì trong 6 tháng</Option>
              </Select>
            </Form.Item>
          )}
        </div>
      ) : (
        <Row gutter={16}>
          <Col span={12}>
             <Form.Item name="date" label={<span className="custom-label-wrapper"><CalendarOutlined /> <Text strong>Ngày thực hiện</Text></span>} rules={[{ required: true, message: 'Vui lòng chọn ngày thực hiện!' }]}>
                <DatePicker size="large" className="full-width" format="DD/MM/YYYY" disabledDate={(current) => current && current < dayjs().startOf('day')} />
              </Form.Item>
          </Col>
          <Col span={12}>
              <Form.Item 
                name="time" 
                dependencies={['date']} 
                label={<span className="custom-label-wrapper"><ClockCircleOutlined /> <Text strong>Giờ bắt đầu</Text></span>} 
                rules={[{ required: true, message: 'Vui lòng chọn giờ bắt đầu!' }, validateTimeRule]}
              >
                <TimePicker size="large" className="full-width" format="HH:mm" />
              </Form.Item>
          </Col>
          
          {isUrgentBooking && (
            <div style={{ marginBottom: 16, color: '#cf1322', padding: '10px 12px', background: '#fff1f0', border: '1px solid #ffa39e', borderRadius: '6px' }}>
              <WarningOutlined /> <Text strong type="danger">Lưu ý:</Text> Bạn đang yêu cầu dịch vụ gấp (dưới 2 tiếng). Hệ thống sẽ tự động cộng thêm <Text strong>{urgentFee.toLocaleString()}đ phụ phí</Text> cho ca làm việc đầu tiên để điều phối nhân viên nhanh nhất.
            </div>
          )}
        </Row>
      )}
    </>
  );


  // Khai báo biến kiểm tra: Chỉ ca lẻ HOẶC hàng tuần linh hoạt mới được chọn nhân viên
  const canSelectStaff = bookingData.bookingFrequency === 'one-time' || (bookingData.bookingFrequency === 'periodic' && bookingData.cycleType === 'continuous-weekly');

  const Step3 = (
    <Row gutter={24}>
      <Col span={14}>
        <Title level={4} className="mb-4">Địa chỉ & Thanh toán</Title>
        <Form.Item name="addressType" label={<span className="custom-label-wrapper"><EnvironmentOutlined /> <Text strong>Địa chỉ thực hiện</Text></span>}>
          <Radio.Group>
            <Radio value="saved">Địa chỉ đã lưu</Radio>
            <Radio value="manual">Nhập địa chỉ mới</Radio>
          </Radio.Group>
        </Form.Item>

        {bookingData.addressType === 'saved' ? (
          <Form.Item name="savedAddressId" rules={[{ required: true, message: 'Vui lòng chọn địa chỉ đã lưu!' }]}>
            <Select size="large" placeholder="Chọn địa chỉ">
              <Option value="1">123 Nguyễn Văn Linh, Quận 7, TP.HCM</Option>
              <Option value="2">456 Lê Lợi, Quận 1, TP.HCM</Option>
            </Select>
          </Form.Item>
        ) : (
          <Form.Item name="manualAddress" rules={[{ required: true, message: 'Vui lòng nhập địa chỉ mới của bạn!' }]}>
            <Input size="large" placeholder="Số nhà, tên đường, phường, quận..." />
          </Form.Item>
        )}

        <Divider />

        {/* --- TÙY CHỌN NHÂN VIÊN ĐƯỢC CHUYỂN SANG ĐÂY --- */}
        {canSelectStaff && (
          <>
            <Form.Item name="staffSelection" label={<span className="custom-label-wrapper"><UserOutlined /> <Text strong>Tùy chọn nhân viên</Text></span>}>
              <Radio.Group className="full-width">
                <Space direction="vertical" className="full-width">
                  <Radio value="auto">
                    <Text strong>Hệ thống tự điều phối</Text> (Miễn phí) - <Text type="secondary">Nhanh chóng nhất</Text>
                  </Radio>
                  <Radio value="favorite">
                    <Text strong>Tự chọn nhân viên (Yêu thích / Mới)</Text> 
                    <span style={{ color: '#cf1322', marginLeft: 8 }}>+30.000đ / ca</span>
                  </Radio>
                </Space>
              </Radio.Group>
            </Form.Item>
            <Divider />
          </>
        )}

        <Form.Item name="paymentMethod" label={<span className="custom-label-wrapper"><DollarCircleOutlined /> <Text strong>Thanh toán</Text></span>}>
          <Radio.Group>
            <Space direction="vertical">
              <Radio value="cash">Tiền mặt (Sau khi hoàn thành)</Radio>
              <Radio value="transfer">Chuyển khoản / Ví điện tử</Radio>
            </Space>
          </Radio.Group>
        </Form.Item>

        <Divider />

        <Form.Item name="notes" label={<span className="custom-label-wrapper"><EditOutlined /> <Text strong>Ghi chú cho nhân viên</Text></span>}>
          <TextArea rows={3} placeholder="Ví dụ: Nhà có chó dữ, cổng màu xanh, bấm chuông giúp..." />
        </Form.Item>
      </Col>

      <Col span={10}>
        <div className="order-summary-box">
          <Title level={4}>Tóm tắt dịch vụ</Title>
          
          <div className="summary-row">
            {bookingData.cycleType === 'continuous-weekly' ? (
              <>
                <Text>Hình thức:</Text>
                <Text strong style={{ color: '#1677ff' }}>Hàng tuần (Thanh toán từng buổi)</Text>
              </>
            ) : (
              <>
                <Text>Số buổi làm:</Text>
                <Text strong>{estimatedSessions} buổi</Text>
              </>
            )}
          </div>

          <div className="summary-row">
            <Text>Đơn giá:</Text>
            <Text>{basePrice.toLocaleString()} đ/buổi</Text>
          </div>
          
          {isUrgentBooking && (
            <div className="summary-row">
              <Text type="danger">Phụ phí đặt gấp:</Text>
              <Text type="danger" strong>+ {urgentFee.toLocaleString()} đ</Text>
            </div>
          )}

          {staffFee > 0 && (
            <div className="summary-row">
              <Text type="warning">Phí chọn nhân viên:</Text>
              <Text type="warning" strong>+ {staffFee.toLocaleString()} đ</Text>
            </div>
          )}

          {(bookingData.bookingFrequency === 'periodic' && bookingData.cycleType !== 'continuous-weekly') && (
            <div className="summary-row">
              <Text>Ưu đãi định kỳ (10%):</Text>
              <Text className="discount-text">- {periodicDiscount.toLocaleString()} đ</Text>
            </div>
          )}

          {isPromoApplied && (
            <div className="summary-row">
              <Text>Voucher giảm giá:</Text>
              <Text className="discount-text">- 50.000 đ</Text>
            </div>
          )}

          <div className="summary-row total">
            <Text strong>TỔNG CỘNG:</Text>
            <div className="total-price">{finalTotal.toLocaleString()} đ</div>
          </div>

          <Divider />
          <Space.Compact style={{ width: '100%' }}>
            <Input 
              placeholder="Mã giảm giá" 
              value={promoCode} 
              onChange={e => setPromoCode(e.target.value)}
              disabled={isPromoApplied}
            />
            <Button type="primary" onClick={handleApplyPromo} disabled={isPromoApplied}>Áp dụng</Button>
          </Space.Compact>
          {isPromoApplied && <Tag color="green" className="mt-2" closable onClose={() => setIsPromoApplied(false)}>Đã áp dụng Voucher</Tag>}
        </div>
      </Col>
    </Row>
  );

  const steps = [
    { title: 'Dịch vụ', icon: <ToolOutlined />, content: Step1 },
    { title: 'Thời gian', icon: <CalendarOutlined />, content: Step2 },
    { title: 'Thông tin', icon: <EnvironmentOutlined />, content: Step3 },
    { title: 'Hoàn tất', icon: <CheckCircleOutlined />, content: null },
  ];

  return (
    <div className="booking-page-container">
      <Card className="booking-card">
        <Title level={2} className="booking-page-title">Đặt lịch dịch vụ</Title>
        
        <Steps 
          current={current} 
          items={steps.map(s => ({ title: s.title, icon: s.icon }))} 
          className="booking-steps" 
        />

        <Form 
          form={form} 
          layout="vertical" 
          preserve={true}
          initialValues={bookingData}
          onValuesChange={handleValuesChange}
        >
          <div className="steps-content">
            {current === 0 && Step1}
            {current === 1 && Step2}
            {current === 2 && Step3}
            {current === 3 && (
              <Result 
                status="success" 
                title="Đặt lịch thành công!" 
                subTitle="Hệ thống đã ghi nhận yêu cầu của bạn. Chúng tôi sẽ điều phối nhân viên và thông báo lại trong thời gian sớm nhất."
                extra={[
                  <Button type="primary" key="history" size="large" onClick={() => window.location.href='/history'}>
                    Quản lý lịch đặt
                  </Button>,
                  <Button key="book_more" size="large" onClick={() => window.location.reload()}>
                    Đặt thêm dịch vụ
                  </Button>,
                  <Button key="home" size="large" onClick={() => window.location.href='/'}>
                    Về trang chủ
                  </Button>
                ]}
              />
            )}
          </div>

          {current < 3 && (
            <div className="steps-action" style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 24 }}>
              {current > 0 && (
                <Button onClick={() => setCurrent(current - 1)} className="btn-back" size="large">Quay lại</Button>
              )}
              <Button type="primary" size="large" onClick={current === 2 ? onFinish : next}>
                {current === 2 ? 'Xác nhận đặt lịch' : 'Tiếp tục'}
              </Button>
            </div>
          )}
        </Form>
      </Card>
    </div>
  );
};

export default Booking;