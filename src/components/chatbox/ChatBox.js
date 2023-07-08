import React, { useState } from "react";
import { Avatar, Divider, List, Skeleton } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
const ChatBox = (props) => {
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState([
    {
      userName: "Jack",
      reverse: false,
    },
    {
      userName: "Jack",
      reverse: true,
    },
    {
      userName: "Jack",
      reverse: false,
    },
    {
      userName: "Jack",
      reverse: true,
    },
  ]);
  const loadMoreData = () => {
    console.log("load more");
    return;
  };
  return (
    <div
      id="scrollableDiv"
      style={{
        height: "100%",
        overflow: "auto",
        padding: "0 16px",
        border: "1px solid rgba(140, 140, 140, 0.35)",
      }}
    >
      <InfiniteScroll
        dataLength={data.length}
        next={loadMoreData}
        hasMore={false}
        loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
        endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
        scrollableTarget="scrollableDiv"
      >
        <List
          dataSource={data}
          renderItem={(item) => (
            <List.Item key={item.email}>
              <List.Item.Meta
                avatar={<Avatar>{item.userName}</Avatar>}
                title={<a href="https://ant.design">{item.name}</a>}
                description={item.email}
              />
              <div>Content</div>
            </List.Item>
          )}
        />
      </InfiniteScroll>
    </div>
  );
};

export default ChatBox;
