import React, { useState, useRef, useEffect } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";

import Home from "./Home";
import authHeader from "../services/auth-header";
import UserService from "../services/user.service";

const Discussion = () => {
  const form = useRef();

  const [topic, setTopic] = useState("");
  const [description, setDescription] = useState("");

  const [discussion, setDiscussion] = useState("");

  const [message, setMessage] = useState("");

  useEffect(() => {
    UserService.getDiscussions().then(
      (response) => {
        setDiscussion(response.data);
      },
      (error) => {
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();

        setDiscussion(_content);
      }
    );
  }, []);

  const onChangeTopic = (e) => {
    const topic = e.target.value;
    setTopic(topic);
  };

  const onChangeDescription = (e) => {
    const description = e.target.value;
    setDescription(description);
  };

  const handleRegister = (e) => {
    e.preventDefault();

    setMessage("");

    form.current.validateAll();

    UserService.addDiscussion(topic, description).then(
      (response) => {
        setTopic("");
        setDescription("");
        setMessage(response.data);
        window.location.reload(false);
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setMessage(resMessage);
      }
    );
  };

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>Start the New Discussion</h3>
      </header>
      <Form onSubmit={handleRegister} ref={form}>
        {true && (
          <div>
            <div className="form-group">
              <label htmlFor="topic">Topic</label>
              <Input
                type="text"
                className="form-control"
                name="topic"
                value={topic}
                required
                onChange={onChangeTopic}
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>
              <Input
                type="text"
                className="form-control"
                name="description"
                value={description}
                onChange={onChangeDescription}
              />
            </div>

            <div className="form-group">
              <button className="btn btn-primary btn-block">Post</button>
            </div>
          </div>
        )}
      </Form>
      <Home id={authHeader}></Home>
    </div>
  );
};

export default Discussion;
