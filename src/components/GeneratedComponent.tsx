import React, { FC, useState } from "react";
import {
  Upload,
  Button,
  Checkbox,
  Form,
  Image,
  Input,
  Typography,
  UploadProps,
  message,
  Card,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import { InboxOutlined, UploadOutlined } from "@ant-design/icons";
import ReactPlayer from "react-player";

const { Title, Paragraph } = Typography;

const { Dragger } = Upload;

const props: UploadProps = {
  name: "file",
  multiple: true,
  action: "https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188",
  onChange(info) {
    const { status } = info.file;
    if (status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (status === "done") {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e) {
    console.log("Dropped files", e.dataTransfer.files);
  },
};

const FileUploader: React.FC = () => {
  console.log("render FileUploader");
  // 添加 File Uploader 组件的代码
  const checkFile = (file) => {
    // Check file size (in bytes)
    // const maxSize = 5 * 1024 * 1024; // 5 MB
    const maxSize = 100 * 1024; // 5 MB
    if (file.size > maxSize) {
      message.error("File size exceeds the limit (100 KB)");
      return false;
    }

    // Check file type (extension)
    const allowedFileTypes = ["jpg", "jpeg", "png", "pdf"]; // Add allowed file types
    const fileExtension = file.name.split(".").pop().toLowerCase();
    if (!allowedFileTypes.includes(fileExtension)) {
      message.error("Invalid file type. Allowed types: jpg, jpeg, png, pdf");
      return false;
    }
    
    const fileName = file.name;
    if (/^[A-Z]/.test(fileName)) {
      message.error('File name cannot start with an uppercase letter');
      return false;
    }

    // Additional custom checks can be added here

    return true; // File passes all checks
  };
  return (
    <Dragger {...props} beforeUpload={checkFile}>
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p className="ant-upload-text">
        Click or drag file to this area to upload
      </p>
      <p className="ant-upload-hint">
        Support for a single or bulk upload. Strictly prohibited from uploading
        company data or other banned files.
      </p>
    </Dragger>
  );
};

const VideoPlayer: FC<{ videoSrc: string }> = ({ videoSrc }) => {
  // 添加 Video Player 组件的代码
  return (
    <div>
      {/* <Input placeholder="Video Player Input" /> */}
      <ReactPlayer url={videoSrc} />
    </div>
  );
};

const TextBoard: React.FC = () => {
  // 添加 Text Board 组件的代码
  return (
    <Card style={{ backgroundColor: "antiquewhite" }}>
      {/* <Input placeholder="Text Board Input" /> */}
      {/* <TextArea placeholder="Text Board Text Area" rows={4} /> */}
      <Paragraph>
        Beca is one of Asia Pacific’s largest independent advisory, design and
        engineering consultancies. After a century of operation, we have grown
        from a family-owned business to one of the most progressive,
        client-centric professional services consultancies in our region. We
        have more than 4,000 employees in 25 offices around the world and have
        delivered projects in more than 70 countries.
      </Paragraph>
    </Card>
  );
};

const ImageContainer: FC<{ imageSrc: string }> = ({ imageSrc }) => {
  // 添加 Image Container 组件的代码
  return (
    <div>
      <Title level={4}>Image Container Title</Title>
      <Image src={imageSrc} alt="test image" />
    </div>
  );
};

const CommentModule: React.FC = () => {
  // 添加 Comment Module 组件的代码
  return (
    <div style={{ width: "40vw" }}>
      {/* <Comment
		  author={<a href="#">Author Name</a>}
		  avatar={<Avatar src="avatar_url_here" alt="Author Name" />}
		  content={<p>Your comment content goes here.</p>}
		/> */}
      {/* Add comment form if needed */}
      <Form.Item>
        <Input.TextArea rows={4} placeholder="Leave a comment" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Add Comment
        </Button>
      </Form.Item>
    </div>
  );
};

const Checklist: React.FC = () => {
  const [todos, setTodos] = useState<{ completed: boolean; text: string }[]>([
    { text: "test1", completed: false },
    { text: "test2", completed: false },
    { text: "test3", completed: false },
  ]);

  const toggleTodo = (index: number) => {
    const updatedTodos = [...todos];
    updatedTodos[index].completed = !updatedTodos[index].completed;
    setTodos(updatedTodos);
  };
  // 添加 Checklist 组件的代码
  return (
    <div style={{ width: "30vw" }}>
      {todos.map((todo, index) => (
        <div key={index}>
          <Checkbox checked={todo.completed} onChange={() => toggleTodo(index)}>
            {todo.text}
          </Checkbox>
        </div>
      ))}
    </div>
  );
};

export {
  FileUploader,
  VideoPlayer,
  TextBoard,
  ImageContainer,
  CommentModule,
  Checklist,
};
