import React from "react";
import { Layout, Button } from "antd";
import ReactPlayer from "react-player/lazy";
import RecordRTC, { StereoAudioRecorder } from "recordrtc";
import containerClient from "./utils";
import Recorder from "js-audio-recorder";

const { Content } = Layout;

const AiInstructor = () => {
  const recordStart = () => {
    const recorder = new Recorder({
      sampleBits: 16, // 采样位数，支持 8 或 16，默认是16
      sampleRate: 16000, // 采样率，支持 11025、16000、22050、24000、44100、48000，根据浏览器默认值，我的chrome是48000
      numChannels: 1,
    });
    recorder.start().then(
      async () => {
        // 开始录音
        console.log("开始录音了=========");
        const sleep = (m) => new Promise((r) => setTimeout(r, m));
        await sleep(10000);
        recorder.stop();
        let wavBlob = recorder.getWAVBlob();
        const blockBlobClient =
          containerClient.getBlockBlobClient("test004.wav");
        blockBlobClient.uploadData(wavBlob);
      },
      (error) => {
        // 出错了
        console.log(error);
      }
    );
    // navigator.mediaDevices
    //   .getUserMedia({
    //     audio: true,
    //   })
    //   .then(async function (stream) {
    //     let recorder = RecordRTC(stream, {
    //       type: "audio",
    //       mimeType: "audio/wav",
    //       desiredSampRate: 16 * 1000,
    //       recorder: StereoAudioRecorder,
    //       sampleBits: 16,
    //       disableLogs: true,
    //     });
    //     recorder.startRecording();

    //     const sleep = (m) => new Promise((r) => setTimeout(r, m));
    //     await sleep(10000);

    //     recorder.stopRecording(function () {
    //       let blob = recorder.getBlob();
    //       const blockBlobClient =
    //         containerClient.getBlockBlobClient("test004.wav");
    //       blockBlobClient.uploadData(blob);
    //     });
    //   });
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
        <div>
          <ReactPlayer url="/avatarvideo.mp4" loop muted playing />
          <Button onClick={recordStart}>record</Button>
        </div>
      </Content>
    </Layout>
  );
};

export default AiInstructor;
