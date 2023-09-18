import React, { Dispatch, FC, SetStateAction, useState } from "react";
import { Modal, Button, Select, Form, Checkbox, Input } from "antd";
import { PageConfigType } from "@/app/page";
import TextArea from "antd/es/input/TextArea";
import { DeleteFilled } from "@ant-design/icons";

const { Option } = Select;

interface ComponentSelectorProps {
  pageConfig: PageConfigType;
  setPageConfig: Dispatch<SetStateAction<PageConfigType>>;
}

const ComponentSelector: FC<ComponentSelectorProps> = ({
  pageConfig,
  setPageConfig,
}) => {
  const [showBlockMenu, setShowBlockMenu] = useState<boolean>(false);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log("Received values:", values);
    setPageConfig((pre) => {
      const newValue: PageConfigType = {
        ...pre,
        layout: [...pre.layout, values],
      };
      return newValue;
    });
    // 在这里执行提交表单的操作
    setShowBlockMenu(false);
  };

  const handleTypeChange = (value: string) => {
    setSelectedType(value);
  };

  const renderConfigOptions = () => {
    switch (selectedType) {
      case "FileUploader":
        return <FileUploaderConfig />;
      case "VideoBroadcaster":
        return <VideoBroadcasterConfig />;
      case "TextBoard":
        return <TextBoardConfig />;
      case "ImageContainer":
        return <ImageContainerConfig />;
      case "CommentModule":
        return <CommentModuleConfig />;
      case "Checklist":
        return <ChecklistConfig />;
      default:
        return null;
    }
  };

  return (
    <div>
      <Button
        onClick={() => setShowBlockMenu(true)}
        type="dashed"
        style={{ width: "50vw" }}
      >
        Add Block
      </Button>
      <Modal
        title="Block Generator"
        visible={showBlockMenu}
        onCancel={() => setShowBlockMenu(false)}
        onOk={() => form.submit()}
      >
        <Form form={form} onFinish={onFinish}>
          <Form.Item label="Component Type" name="componentType">
            <Select
              placeholder="Select Component Type"
              style={{ width: "100%" }}
              onChange={handleTypeChange}
            >
              <Option value="FileUploader">File Uploader</Option>
              <Option value="VideoBroadcaster">Video Broadcaster</Option>
              <Option value="TextBoard">Text Board</Option>
              <Option value="ImageContainer">Image Container</Option>
              <Option value="CommentModule">Comment Module</Option>
              <Option value="Checklist">Checklist</Option>
            </Select>
          </Form.Item>
          {renderConfigOptions()}
        </Form>
      </Modal>
    </div>
  );
};

const FileUploaderConfig: React.FC = () => {
  // 添加File Uploader的配置项
  return (
    <>
      <Form.Item label="Naming Standard" name="namingStandard">
        <Select placeholder="Select Naming Standard">
          <Option value="namingStandard1">naming standard 1</Option>
          <Option value="namingStandard2">naming standard 2</Option>
          <Option value="namingStandard3">naming standard 3</Option>
        </Select>
      </Form.Item>
      <Form.Item label="File Type" name="fileType">
        <Checkbox.Group>
          <Checkbox value="fileType1">file type 1</Checkbox>
          <Checkbox value="fileType2">file type 2</Checkbox>
          <Checkbox value="fileType3">file type 3</Checkbox>
        </Checkbox.Group>
      </Form.Item>
      <Form.Item label="File Size Range" name="fileSizeRange">
        <Select placeholder="Select File Size Range">
          <Option value="lessThan50MB">Less than 50MB</Option>
          <Option value="50MBto100MB">50MB to 100MB</Option>
          <Option value="100MBto500MB">100MB to 500MB</Option>
          <Option value="500MBto1GB">500MB to 1GB</Option>
        </Select>
      </Form.Item>
      <Form.Item label="Check Missing Metadata" name="missingMetadata">
        <Checkbox.Group>
          <Checkbox value="metadata1">Metadata 1</Checkbox>
          <Checkbox value="metadata2">Metadata 2</Checkbox>
          <Checkbox value="metadata3">Metadata 3</Checkbox>
          <Checkbox value="metadata4">Metadata 4</Checkbox>
          <Checkbox value="metadata5">Metadata 5</Checkbox>
        </Checkbox.Group>
      </Form.Item>
    </>
  );
};

// FIXME: 多个相同组件的src???
const VideoBroadcasterConfig: React.FC = () => {
  // 添加Video Broadcaster的配置项
  return (
    <>
      <Form.Item
        label="Video Url"
        name="videoSrc"
        initialValue="https://www.youtube.com/watch?v=LXb3EKWsInQ"
      >
        <Input />
      </Form.Item>
    </>
  );
};

const TextBoardConfig: React.FC = () => {
  // 添加Text Board的配置项
  return (
    <>
      <Form.Item
        label="Text Content"
        name="textContent"
        initialValue="Beca is one of Asia Pacific’s largest independent advisory, design and
        engineering consultancies. After a century of operation, we have grown
        from a family-owned business to one of the most progressive,
        client-centric professional services consultancies in our region. We
        have more than 4,000 employees in 25 offices around the world and have
        delivered projects in more than 70 countries."
      >
        <TextArea rows={8} />
      </Form.Item>
    </>
  );
};

// ImageContainerConfig
const ImageContainerConfig: React.FC = () => {
  // 添加Image Container的配置项
  return (
    <>
      <Form.Item
        label="Image Url"
        name="imageSrc"
        initialValue="https://media.gettyimages.com/photos/political-map-of-the-united-states-picture-id514890112"
      >
        <Input />
      </Form.Item>
    </>
  );
};

// CommentModuleConfig
const CommentModuleConfig: React.FC = () => {
  // 添加Comment Module的配置项
  return <div>Comment Module </div>;
};

// ChecklistConfig
const ChecklistConfig: React.FC = () => {
  // 添加Checklist的配置项
  const [items, setItems] = useState<string[]>([]); // 用于存储待办事项的数组
  const [newItem, setNewItem] = useState<string>(""); // 用于输入新待办事项的状态
  // TODO: 这里支持新加的item就可以是completed, 支持添加ddl和被分配任务的人
  // 处理添加待办事项
  const handleAddItem = () => {
    if (newItem.trim() !== "") {
      setItems([...items, newItem]);
      setNewItem(""); // 清空输入框
    }
  };

  // 处理删除待办事项
  const handleDeleteItem = (index: number) => {
    const updatedItems = [...items];
    updatedItems.splice(index, 1);
    setItems(updatedItems);
  };
  return (
    <>
      Checklist
      {/* TODO */}
      {/* 添加了之后填充到表单里面 */}
      <Form.Item label="Checklist" name="checklist">
        {items.map((item, index) => (
          <div key={index} style={{ marginBottom: "8px" }}>
            <Checkbox>{item}</Checkbox>
            <Button
              type="link"
              onClick={() => handleDeleteItem(index)}
              danger
              size="small"
            >
              <DeleteFilled />
            </Button>
          </div>
        ))}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <Input
            placeholder="add todo"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            onPressEnter={handleAddItem}
          />
          <Button type="primary" onClick={handleAddItem}>
            add
          </Button>
        </div>
      </Form.Item>
    </>
  );
};

export default ComponentSelector;
