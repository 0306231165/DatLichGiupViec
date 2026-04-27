import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CustomerLayout from './layouts/CustomerLayout';
import AdminLayout from './layouts/AdminLayout';

// Import các trang thật
import Home from './pages/customer/Home';
import Booking from './pages/customer/Booking';

// Component giả cho các trang chưa làm tới
const Login = () => <div><h2>Form Đăng nhập</h2></div>;
const AdminDashboard = () => <div><h2>Thống kê hệ thống</h2></div>;
const ManageUsers = () => <div><h2>Bảng quản lý người dùng</h2></div>;

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CustomerLayout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="booking" element={<Booking />} />
        </Route>

        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="users" element={<ManageUsers />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;