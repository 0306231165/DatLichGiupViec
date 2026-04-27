import React from "react";
import { Layout, Menu } from "antd";
import { Link, Outlet } from "react-router-dom";
import {
    UserOutlined,
    CalendarOutlined,
    DashboardOutlined,
    } from "@ant-design/icons";

    const { Header, Content, Sider } = Layout;

    const AdminLayout = () => {
    return (
        <Layout style={{ minHeight: "100vh" }}>
        {/* Thanh menu bên trái */}
        <Sider theme="dark">
            <div
            style={{
                height: 32,
                margin: 16,
                color: "white",
                textAlign: "center",
                fontSize: "18px",
                fontWeight: "bold",
            }}
            >
            Admin Panel
            </div>
            <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
            <Menu.Item key="1" icon={<DashboardOutlined />}>
                <Link to="/admin">Tổng quan</Link>
            </Menu.Item>
            <Menu.Item key="2" icon={<UserOutlined />}>
                <Link to="/admin/users">Người dùng</Link>
            </Menu.Item>
            <Menu.Item key="3" icon={<CalendarOutlined />}>
                <Link to="/admin/bookings">Đơn đặt lịch</Link>
            </Menu.Item>
            </Menu>
        </Sider>

        {/* Khu vực nội dung bên phải */}
        <Layout>
            <Header
            style={{ padding: "0 20px", background: "#fff", textAlign: "right" }}
            >
            Xin chào, Admin
            </Header>
            <Content style={{ margin: "16px" }}>
            <div
                style={{
                padding: 24,
                minHeight: 360,
                background: "#fff",
                borderRadius: "8px",
                }}
            >
                <Outlet />
            </div>
            </Content>
        </Layout>
        </Layout>
    );
};

export default AdminLayout;
