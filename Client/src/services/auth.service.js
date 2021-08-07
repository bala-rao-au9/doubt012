import axios from "axios";

const register = (name, email, password) => {
  return axios.post("/user", {
    name,
    email,
    password,
  });
};

const login = (email, password) => {
  return axios
    .post("/user/login/", {
      email,
      password,
    })
    .then((response) => {
      console.log("Auth User", response);
      if (response.data.user.token) {
        localStorage.setItem("user", JSON.stringify(response.data.user));
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

export default {
  register,
  login,
  logout,
  getCurrentUser,
};
