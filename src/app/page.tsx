"use client";
import { Button, Col, Row, Space } from "antd";
import React, { useEffect, useState } from "react";
// import "antd/dist/antd.css";
import styles from "./index.module.scss";
import ComponentSelector from "@/components/ComponentSelector";
import {
  Checklist,
  CommentModule,
  FileUploader,
  ImageContainer,
  TextBoard,
  VideoBroadcaster,
} from "@/components/GeneratedComponent";
type EditMode = "edit" | "view";

type ComponentType =
  | "FileUploader"
  | "VideoBroadcaster"
  | "TextBoard"
  | "ImageContainer"
  | "CommentModule"
  | "Checklist";

type ComponentConfig = {
  componentType: ComponentType;
  imageSrc?: string;
  videoSrc?: string;
  content?: string;
};

type PageConfigType = {
  layout: ComponentConfig[];
};

const Home = () => {
  const [mode, setMode] = useState<EditMode>("view");
  const [pageConfig, setPageConfig] = useState<PageConfigType>({
    layout: [],
  });
  useEffect(() => {
    console.log(pageConfig, "now config");
  }, [pageConfig]);

  const renderComponents = () => {
    console.log("rerender");
    return pageConfig.layout.map(
      (component: ComponentConfig, index: number) => {
        console.log(component, "type");
        switch (component.componentType) {
          case "FileUploader":
            console.log("1");
            return <FileUploader key={index} />;
          case "VideoBroadcaster":
            return (
              <VideoBroadcaster
                key={index}
                videoSrc={component.videoSrc as string}
              />
            );
          case "TextBoard":
            return <TextBoard key={index} />;
          case "ImageContainer":
            return (
              <ImageContainer
                key={index}
                imageSrc={component.imageSrc as string}
              />
            );
          case "CommentModule":
            return <CommentModule key={index} />;
          case "Checklist":
            return <Checklist key={index} />;
          default:
            console.log("0");
            return null;
        }
      }
    );
  };
  const handleButtonClick = () => {
    if (mode === "edit") {
      setMode("view");
      // 在这里执行保存操作
    } else if (mode === "view") {
      setMode("edit");
      // 在这里执行编辑操作
    }
  };

  return (
    <div className={styles.app}>
      <Row justify="end">
        <Col>
          <div>
            <Button type="primary" onClick={handleButtonClick}>
              {mode === "edit" ? "Save" : "Edit"}
            </Button>
          </div>
        </Col>
      </Row>
      <div style={{ height: "30px" }} />
      {mode === "edit" && (
        <>
          <Row justify="center">
            <Col>
              <ComponentSelector
                pageConfig={pageConfig}
                setPageConfig={setPageConfig}
              />
            </Col>
          </Row>
          <div style={{ height: "30px" }} />
        </>
      )}

      <Space direction="vertical" className={styles["centered-space"]}>
        {renderComponents()}
      </Space>
    </div>
  );
};

export default Home;
export type { PageConfigType, ComponentConfig, ComponentType };
