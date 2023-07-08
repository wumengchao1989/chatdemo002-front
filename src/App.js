import React from "react";
import { Layout, Space, Menu } from "antd";
import ChatBox from "./components/chatbox/ChatBox";
import "./App.css";
import Navigation from "./components/navigation/Navigation";
const { Header, Footer, Sider, Content } = Layout;
function App() {
  const items1 = [
    { key: "1", label: "help center bot" },
    { key: "2", label: "Dashboard Analysis" },
    { key: "3", label: "Dashboard Analysis" },
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
          <Layout hasSider>
            <Sider width={200} style={{ background: "#fff" }}>
              <Navigation />
            </Sider>
            <Content
              style={{
                padding: 24,
                margin: 0,
                minHeight: "100%",
                background: "#fff",
              }}
            >
              <ChatBox />
            </Content>
          </Layout>
          <Footer style={{ textAlign: "center" }}>
            AI Bot Palyground ©2023 Created by Mark Wu
          </Footer>
        </Layout>
      </Space>
    </div>
  );
}

export default App;
