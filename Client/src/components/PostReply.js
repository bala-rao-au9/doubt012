import React, { useState, useEffect, useRef, useCallback } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";

import UserService from "../services/user.service";

const Sample = (props) => {
  const form = useRef();

  const [textBoxState, setTextBoxState] = useState(false);
  const [reply, setReply] = useState("");

  const [message, setMessage] = useState("");

  const onChangeReply = (e) => {
    const reply = e.target.value;
    setReply(reply);
  };

  const handleRegister = (e) => {
    e.preventDefault();

    setMessage("");

    form.current.validateAll();

    UserService.addReply(reply, props["discussionId"]).then(
      (response) => {
        setReply("");
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
    <div>
      <button onClick={() => setTextBoxState(!textBoxState)}>
        Add reply {textBoxState ? true : false}
      </button>

      {textBoxState ? (
        <div>
          <Form onSubmit={handleRegister} ref={form}>
            {true && (
              <div>
                <div className="form-group">
                  <label htmlFor="reply"></label>
                  <Input
                    type="text"
                    className="form-control"
                    name="reply"
                    required
                    value={reply}
                    onChange={onChangeReply}
                  />
                </div>

                <div className="form-group">
                  <button className="btn btn-primary btn-block">
                    Post Reply
                  </button>
                </div>
              </div>
            )}
          </Form>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Sample;
