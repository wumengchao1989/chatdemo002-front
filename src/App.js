import React from "react";
import { Layout, Space, Menu } from "antd";
import "./App.css";
import { Outlet } from "react-router-dom";
const { Header, Footer } = Layout;
function App() {
  const items1 = [
    { key: "1", label: <a href="/chatbox">help center bot</a> },
    { key: "2", label: <a href="/autoupgrade">Auto Upgrade</a> },
    { key: "3", label: <a href="/dashboardanalysis">Dashboard Analysis</a> },
    { key: "4", label: <a href="/archdesign">Architecture Design</a> },
    { key: "5", label: <a href="/ai_instructor">AI Instructor</a> },
  ];
  return (
    <div className="App" style={{ height: "100%" }}>
      <Space
        direction="vertical"
        style={{ width: "100%", height: "100%" }}
        size={[0, 48]}
      >
        <Layout style={{ height: "100%" }}>
          <Header>
            <Menu theme="dark" mode="horizontal" items={items1} />
          </Header>
          <Outlet />
          <Footer style={{ textAlign: "center" }}>
            AI Bot Palyground ©2023 Created by Mark Wu
          </Footer>
        </Layout>
      </Space>
    </div>
  );
}

export default App;
