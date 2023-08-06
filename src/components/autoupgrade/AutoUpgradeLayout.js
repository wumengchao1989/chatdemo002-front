/*
 * @Author: LAPTOP-P7G9LM4M\wumen 332982129@qq.com
 * @Date: 2023-07-29 09:51:04
 * @LastEditors: LAPTOP-P7G9LM4M\wumen 332982129@qq.com
 * @LastEditTime: 2023-08-06 20:53:53
 * @FilePath: \chaofun-frontc:\Users\wumen\Documents\demochat002-front\src\components\autoupgrade\AutoUpgradeLayout.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { useEffect } from "react";
import { Layout, Tree, Button, Empty } from "antd";
const { DirectoryTree } = Tree;
import hljs from "highlight.js";
import "highlight.js/styles/a11y-dark.css";
import "./diff2html.min.css";
import "./index.css";
import { get, post } from "../../axios";

const { Content, Sider } = Layout;

const AutoUpgradeLayout = () => {
  const [fileList, setFileList] = React.useState([]);
  const [fileContent, setFileContent] = React.useState("");
  const [buildLogs, setBuildLogs] = React.useState("");
  const getFileList = () => {
    get("/autoupgrade/get_file_list").then((res) => {
      if (res.success === true) {
        setFileList(res.res.filter((item) => item !== null));
      }
    });
  };

  useEffect(() => {
    document.querySelectorAll("code").forEach((block) => {
      try {
        hljs.highlightBlock(block);
      } catch (e) {
        console.log(e);
      }
    });
  });

  useEffect(() => {
    getFileList();
  }, []);

  const triggerRunBuild = () => {
    post("/autoupgrade/trigger_build").then((res) => {
      if (res.success) {
        const cid = setInterval(() => {
          get("/autoupgrade/get_build_logs", { id: res.res.id }).then((res) => {
            if (res.success) {
              const buildLogsText = res.res.buildLogs;
              if (buildLogsText.indexOf("$$$$$$end$$$$$$") !== -1) {
                clearInterval(cid);
              }
              setBuildLogs(res.res.buildLogs.replace("$$$$$$end$$$$$$", ""));
            }
          });
        }, 1500);
      }
    });
  };

  const handleSelect = (key, item) => {
    if (item.node.isLeaf) {
      get("/autoupgrade/get_diff_html_string", { path: key }).then((res) => {
        if (res.success && res.diff !== "") {
          setFileContent(res.res);
        } else {
          setFileContent("");
        }
      });
    }
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
        <Layout hasSider style={{ height: "100%" }}>
          <Sider width={280} style={{ background: "#fff", height: "100%" }}>
            <DirectoryTree
              defaultExpandAll
              treeData={fileList}
              onSelect={handleSelect}
            />
          </Sider>
          <Content
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              height: "100%",
            }}
          >
            {fileContent ? (
              <div
                style={{ height: 450 }}
                dangerouslySetInnerHTML={{ __html: fileContent }}
              ></div>
            ) : (
              <Empty
                description="No Changes in this file"
                imageStyle={{ height: 450 }}
              />
            )}
            <Content width="100%" style={{ background: "#000", height: "30%" }}>
              <Button
                style={{ marginTop: 16, marginLeft: 8 }}
                onClick={triggerRunBuild}
                type="primary"
              >
                Run Build
              </Button>
              <pre
                className="code"
                style={{ height: "100%", overflowY: "scroll" }}
              >
                <code style={{ height: "100%" }}>{buildLogs}</code>
              </pre>
            </Content>
          </Content>
        </Layout>
      </Content>
    </Layout>
  );
};

export default AutoUpgradeLayout;
