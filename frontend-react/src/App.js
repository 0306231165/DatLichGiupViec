import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CustomerLayout from './layouts/CustomerLayout';
import AdminLayout from './layouts/AdminLayout';

// Import các trang thật (Đảm bảo đường dẫn thư mục đúng với máy bạn nhé)
import Home from './pages/customer/Home';
import Booking from './pages/customer/Booking';
import Login from './pages/customer/Login';
import Register from './pages/customer/Register';
import Contact from './pages/customer/Contact';

// Component giả cho các trang chưa làm tới
const AdminDashboard = () => <div><h2>Thống kê hệ thống</h2></div>;
const ManageUsers = () => <div><h2>Bảng quản lý người dùng</h2></div>;

function App() {
  return (
    <Router>
      <Routes>
        {/* --- CÁC TRANG ĐỨNG ĐỘC LẬP (Không có Header/Footer) --- */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* --- LUỒNG KHÁCH HÀNG (Có Header/Footer của CustomerLayout) --- */}
        <Route path="/" element={<CustomerLayout />}>
          <Route index element={<Home />} />
          <Route path="booking" element={<Booking />} />
          <Route path="contact" element={<Contact />} /> {/* Đã thay thế partner thành contact */}
        </Route>

        {/* --- LUỒNG ADMIN --- */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="users" element={<ManageUsers />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;