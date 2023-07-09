import React, { useEffect, useState } from "react";
import { Avatar, Divider, List, Skeleton, Spin } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import "./style/Chatbox.scss";
import ClassNames from "classnames";
import { get, post } from "../../axios";
import { useParams } from "react-router-dom";
import { Input } from "antd";

const { TextArea } = Input;
const ChatBox = () => {
  const { chatid } = useParams();
  const [data, setData] = useState([]);
  const [textareaLoading, setTextAreaLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const loadMoreData = () => {
    if (chatid) {
      get("/get_chat_groups", { id: chatid }).then((res) => {
        if (res.success === true) {
          if (res.res && res.res.chatMessages) {
            setData(
              res.res.chatMessages.filter((msg) => msg.role !== "system")
            );
          } else {
            setData([]);
          }
        }
      });
    }
  };
  useEffect(() => {
    loadMoreData();
  }, [chatid]);

  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setTextAreaLoading(true);
    const tempData = Array.from(data);
    tempData.push({
      role: "user",
      message: inputValue,
      createAt: new Date(),
      userName: "Mark",
      reverse: false,
    });
    setData(tempData);
    post("/send_request", { prompt: inputValue, chatGroupId: chatid }).then(
      (res) => {
        if (res.success === true) {
          loadMoreData();
          setTextAreaLoading(false);
          setInputValue("");
        }
      }
    );
  };

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const itemRenderer = (item) => {
    const listItemClassnames = ClassNames({ reverse: !item.reverse });
    return (
      <List.Item key={item.email} className={listItemClassnames}>
        <List.Item.Meta
          avatar={<Avatar>{item.userName}</Avatar>}
          title={item.userName}
          description={item.message}
        />
      </List.Item>
    );
  };
  return (
    <div className="chatboxContainer">
      <div id="scrollableDiv" className="listboxContainer">
        <InfiniteScroll
          dataLength={data.length}
          next={loadMoreData}
          hasMore={false}
          loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
          endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
          scrollableTarget="scrollableDiv"
        >
          <List dataSource={data} renderItem={itemRenderer} />
        </InfiniteScroll>
      </div>
      <div className="textAreaContainer">
        <Spin spinning={textareaLoading}>
          <TextArea
            placeholder="Please enter text you want to ask..."
            value={inputValue}
            onChange={handleChange}
            autoSize={{ maxRows: 8, minRows: 8 }}
            onPressEnter={handleSubmit}
          />
        </Spin>
      </div>
    </div>
  );
};

export default ChatBox;
