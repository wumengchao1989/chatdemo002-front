import React, { useEffect } from "react";
import { Menu, Button } from "antd";
import { get, post } from "../../axios";

const Navigation = () => {
  const [menuItems, setMenuItems] = React.useState([]);

  const getChatGroups = () => {
    get("/get_chat_groups").then((res) => {
      setMenuItems(
        res.res.map((item) => {
          return { key: item.id, label: item.chatGroupTitle };
        })
      );
    });
  };
  useEffect(() => {
    getChatGroups();
  }, []);

  const addNewChat = async () => {
    post("/add_chat_groups", {
      chatGroupTitle: `chat${menuItems.length + 1}`,
    }).then(() => {
      getChatGroups();
    });
  };

  return (
    <div style={{ height: "100%", marginTop: 32 }}>
      <Button onClick={addNewChat}>New Chat</Button>
      <Menu style={{ height: "100%", marginTop: 8 }} items={menuItems} />
    </div>
  );
};

export default Navigation;
