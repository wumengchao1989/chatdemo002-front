import React from "react";
import { Layout, Space, Menu } from "antd";
import "./App.css";
import { Outlet } from "react-router-dom";

const { Header, Footer } = Layout;
function App() {
  const items1 = [
    { key: "1", label: <a href="/helpcenterbot">{"help center bot"}</a> },
    { key: "2", label: "Dashboard Analysis" },
    { key: "3", label: "Architecture Design" },
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
            <Menu
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={["2"]}
              items={items1}
            />
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
