import React, { useState, useEffect, useRef } from "react";
import Reply from "./Reply";
import UserService from "../services/user.service";
import PostReply from "./PostReply";

const Home = (props) => {
  const [content, setContent] = useState("");
  const [discussion, setDiscussion] = useState("");

  useEffect(() => {
    if (props.id) {
      UserService.getDiscussions(props.id).then(
        (response) => {
          setDiscussion(response.data);
        },
        (error) => {
          const _content =
            (error.response && error.response.data) ||
            error.message ||
            error.toString();

          setDiscussion([
            {
              topic: "Oops!",
              description:
                "No Discussion Started yet! Can you start with something?",
            },
          ]);
        }
      );
    } else {
      UserService.getPublicContent().then(
        (response) => {
          setContent(response.data);
        },
        (error) => {
          const _content =
            (error.response && error.response.data) ||
            error.message ||
            error.toString();

          setContent([
            { topic: "Oops!", description: "No Discussion Started yet" },
          ]);
        }
      );
    }
  }, []);

  return (
    <div>
      {props.id ? (
        discussion ? (
          <div className="container">
            <header className="jumbotron">
              {discussion.map((value, index) => {
                return (
                  <li key={index}>
                    <div>
                      <h3 className="display-3">{value["topic"]}</h3>
                      <h4 className="display-5">{value["description"]}</h4>
                      <br></br>
                      <Reply discussionId={value["_id"]}></Reply>
                    </div>
                    <br></br>
                    <hr></hr>
                  </li>
                );
              })}
            </header>
          </div>
        ) : (
          <h1>Loading...</h1>
        )
      ) : content ? (
        <div className="container">
          <header className="jumbotron">
            {content.map((value, index) => {
              return (
                <li key={index}>
                  <div>
                    <h3 className="display-3">{value["topic"]}</h3>
                    <h4 className="display-5">{value["description"]}</h4>
                    <br></br>
                    <Reply discussionId={value["_id"]}></Reply>
                  </div>
                  <br></br>
                  {localStorage.getItem("user") ? (
                    <PostReply discussionId={value["_id"]}></PostReply>
                  ) : (
                    ""
                  )}
                  <hr></hr>
                </li>
              );
            })}
          </header>
        </div>
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  );
};

export default Home;
