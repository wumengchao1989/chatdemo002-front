import React, { useEffect, useRef } from "react";
import { Layout, Tree, Button, Empty } from "antd";
const { DirectoryTree } = Tree;
import hljs from "highlight.js";
import "highlight.js/styles/a11y-dark.css";
import "./diff2html.min.css";
import "./index.css";
import { get, post } from "../../axios";
import { Spin } from "antd";

const { Content, Sider } = Layout;
const endSuffix = "$$$$$$end$$$$$$";
const AutoUpgradeLayout = () => {
  const [fileList, setFileList] = React.useState([]);
  const [fileContent, setFileContent] = React.useState("");
  const [buildLogs, setBuildLogs] = React.useState("");
  const upgradeCidRef = React.useRef();
  const buildCidRef = React.useRef();
  const testCidRef = React.useRef();
  const getFileList = () => {
    get("/autoupgrade/get_file_list").then((res) => {
      if (res.success === true) {
        setFileList(res.res.filter((item) => item !== null));
      }
    });
  };
  const getUpdateProgress = () => {
    get("/autoupgrade/get_update_progress").then((res) => {
      if (res.success) {
        const logs = res.res.updatedFileList.map((item) => {
          return `${item.key} updated at: ${item.value}\n`;
        });
        setBuildLogs(logs.join(" "));
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
  }, []);

  useEffect(() => {
    upgradeCidRef.current = setInterval(() => {
      getFileList();
      getUpdateProgress();
    }, 5000);
    return () => {
      clearInterval(upgradeCidRef.current);
      clearInterval(buildCidRef.current);
      clearInterval(testCidRef.current);
    };
  }, []);

  const triggerUpdate = () => {
    post("/autoupgrade/trigger_upgrade");
  };

  const triggerRunBuild = () => {
    clearInterval(upgradeCidRef.current);
    post("/autoupgrade/trigger_build").then((res) => {
      if (res.success) {
        buildCidRef.current = setInterval(() => {
          get("/autoupgrade/get_build_logs", { id: res.res.id }).then((res) => {
            if (res.success) {
              const buildLogsText = res.res.buildLogs;
              if (buildLogsText.indexOf(endSuffix) !== -1) {
                clearInterval(buildCidRef.current);
              }
              setBuildLogs(res.res.buildLogs.replace(endSuffix, ""));
            }
          });
        }, 1500);
      }
    });
  };

  const triggerCypressTest = () => {
    clearInterval(upgradeCidRef.current);
    post("/autotest/trigger_cypress_test").then((res) => {
      if (res.success) {
        testCidRef.current = setInterval(() => {
          get("/autotest/get_cypress_test_logs", { id: res.res.id }).then(
            (res) => {
              if (res.success) {
                const testLogsText = res.res.testLogs;
                if (testLogsText.indexOf(endSuffix) !== -1) {
                  clearInterval(testCidRef.current);
                }
                setBuildLogs(res.res.testLogs.replace(endSuffix, ""));
              }
            }
          );
        }, 1500);
      }
    });
  };

  const handleSelect = (key, item) => {
    if (item.node.isLeaf) {
      get("/autoupgrade/get_diff_html_string", { path: key }).then((res) => {
        if (res.success && res.diff !== "") {
          console.log("set diff");
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
          <Sider width={350} style={{ background: "#fff", height: "100%" }}>
            <DirectoryTree
              defaultExpandAll
              treeData={fileList}
              onSelect={handleSelect}
              titleRender={(nodeData) => {
                return (
                  <span
                    style={{ color: nodeData.isModified ? "#EAB528" : "black" }}
                  >
                    {nodeData.title}
                    {nodeData.isCurrentHandling ? (
                      <Spin style={{ marginLeft: 8 }} size="small" />
                    ) : (
                      ""
                    )}
                  </span>
                );
              }}
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
                style={{ height: 450, overflow: "scroll" }}
                dangerouslySetInnerHTML={{ __html: fileContent }}
              ></div>
            ) : (
              <Empty
                description="No Changes in this file"
                imageStyle={{ height: 450 }}
              />
            )}
            <Content
              width="100%"
              style={{ background: "#000", height: "30%", zIndex: 99999 }}
            >
              <Button
                style={{ marginTop: 16, marginLeft: 8 }}
                onClick={triggerUpdate}
                type="primary"
              >
                Run Update
              </Button>
              <Button
                style={{ marginTop: 16, marginLeft: 8 }}
                onClick={triggerRunBuild}
                type="primary"
              >
                Run Build
              </Button>
              <Button
                style={{ marginTop: 16, marginLeft: 8 }}
                onClick={triggerCypressTest}
                type="primary"
              >
                Run Test
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
