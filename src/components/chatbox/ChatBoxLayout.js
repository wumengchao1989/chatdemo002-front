import React from "react";
import ChatBox from "./ChatBox";
import { Layout } from "antd";
import Navigation from "../navigation/Navigation";

const { Sider, Content } = Layout;

const ChatBoxLayout = () => {
  return (
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
  );
};

export default ChatBoxLayout;
