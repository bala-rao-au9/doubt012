import axios from "axios";
import authHeader from "./auth-header";

const getPublicContent = () => {
  return axios.get("/discussion");
};

const getDiscussions = () => {
  return axios.get("/user/discussion/", {
    headers: authHeader(),
  });
};

const getPublicReplies = (discussionId) => {
  return axios.get("/replies/" + discussionId);
};

const addDiscussion = (topic, description) => {
  console.log(topic, description);
  return axios.post(
    "/discussion/",
    {
      topic,
      description,
    },
    {
      headers: authHeader(),
    }
  );
};

const addReply = (replies, discussion) => {
  console.log(replies, discussion);
  return axios.post(
    "/replies",
    {
      discussion,
      replies,
    },
    {
      headers: authHeader(),
    }
  );
};

export default {
  getPublicContent,
  addDiscussion,
  getPublicReplies,
  addReply,
  getDiscussions,
};
