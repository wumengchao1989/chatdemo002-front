import React from "react";
import { Layout, FloatButton } from "antd";
import ReactPlayer from "react-player/lazy";
import containerClient from "./utils";
import { AudioOutlined } from "@ant-design/icons";
import recorder from "./recorder";
import ChatBox from "../chatbox/ChatBox";
import { v4 as uuidv4 } from "uuid";

const { Content } = Layout;

import { post } from "../../axios";

const AiInstructor = () => {
  const [pressDown, setPressDown] = React.useState(false);

  const recordStart = () => {
    setPressDown(true);
    recorder.start().then(
      async () => {
        const sleep = (m) => {
          return new Promise((r) => setTimeout(r, m));
        };
        await sleep(5000);
        let wavBlob = recorder.getWAVBlob();
        const bolbName = `speech004-${uuidv4()}.wav`;
        const blockBlobClient = containerClient.getBlockBlobClient(bolbName);
        blockBlobClient.uploadData(wavBlob).then((res) => {
          if (res._response.status === 201) {
            post("/illustarte/send_illustrate_message", { bolbName }).then(
              (res) => {}
            );
          }
        });
      },
      (error) => {
        // 出错了
        console.log(error);
      }
    );
  };
  const recordEnd = () => {
    recorder.stop();
    setPressDown(false);
  };
  return (
    <Layout>
      <Content
        style={{
          padding: 24,
          margin: 0,
          minHeight: "100%",
          background: "#fff",
        }}
      >
        <div style={{ display: "flex", width: "100%" }}>
          <ReactPlayer
            width={400}
            height={500}
            url="/avatarvideo.mp4"
            loop
            muted
            playing
          />
          <div style={{ width: "80%", height: 980 }}>
            <ChatBox noMessageInput isIllustrate />
          </div>
        </div>
        <FloatButton
          type="danger"
          icon={<AudioOutlined style={{ color: "#fff" }} />}
          onMouseDown={recordStart}
          onMouseUp={recordEnd}
          onBlur={() => console.log("blur")}
          style={
            pressDown
              ? { boxShadow: "none", backgroundColor: "#f5222d" }
              : { backgroundColor: "#ff4d4f" }
          }
        >
          record
        </FloatButton>
      </Content>
    </Layout>
  );
};

export default AiInstructor;
