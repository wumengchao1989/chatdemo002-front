// eslint-disable-next-line
import React, { useEffect } from "react";
import { Menu, Button, Popover, message } from "antd";
import { get, post } from "../../axios";
import { Link, useNavigate } from "react-router-dom";
const Navigation = (props) => {
  const { setLoading } = props;
  const [menuItems, setMenuItems] = React.useState([]);
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  const handleDeleteChatGroups = (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    post("/delete_chat_groups", { id }).then((res) => {
      if (res.success) {
        messageApi.success("delete success");
        getChatGroups();
      } else {
        messageApi.success("delete failed");
      }
    });
  };
  const getChatGroups = async () => {
    return get("/get_chat_groups").then((res) => {
      if (res.res) {
        setMenuItems(
          res.res.map((item) => {
            return {
              key: item._id,
              label: (
                <Popover
                  placement="right"
                  content={
                    <Button
                      type="primary"
                      danger
                      onClick={(e) => handleDeleteChatGroups(e, item._id)}
                    >
                      Delete Conversation
                    </Button>
                  }
                >
                  <Link
                    style={{ display: "block", width: "100%" }}
                    to={`/chatbox/${item._id}`}
                  >
                    {item.chatGroupTitle}
                  </Link>
                </Popover>
              ),
            };
          })
        );
      }
    });
  };
  useEffect(() => {
    getChatGroups();
  }, []);

  const addNewChat = async () => {
    setLoading(true);
    post("/add_chat_groups", {
      chatGroupTitle: `chat${menuItems.length + 1}`,
    }).then((res) => {
      if (res.success) {
        const { _id } = res.res;
        post("/send_request", {
          prompt: "",
          chatGroupId: _id,
          is_init: true,
        }).then(() => {
          getChatGroups().then(() => {
            navigate(`/chatbox/${_id}`);
            setLoading(false);
          });
        });
      }
    });
  };

  return (
    <div style={{ height: "100%", marginTop: 32 }}>
      {contextHolder}
      <Button onClick={addNewChat}>New Chat</Button>
      <Menu style={{ height: "100%", marginTop: 8 }} items={menuItems} />
    </div>
  );
};

export default Navigation;
