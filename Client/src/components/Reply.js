import React, { useState, useEffect } from "react";
import UserService from "../services/user.service";

const Reply = (props) => {
  const [content, setContent] = useState("");

  useEffect(() => {
    UserService.getPublicReplies(props["discussionId"]).then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();

        setContent(_content);
      }
    );
  }, []);

  return (
    <div>
      {localStorage.getItem("user")
        ? content
          ? content.length > 0
            ? content.map((value, index) => {
                return (
                  <div>
                    <ul>
                      <li key={index}>
                        <div>
                          <h6>{value["replies"]}</h6>
                        </div>
                      </li>
                    </ul>
                  </div>
                );
              })
            : ""
          : "Loading..."
        : ""}
    </div>
  );
};

export default Reply;
