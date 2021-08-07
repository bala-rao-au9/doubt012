import React from "react";
import AuthService from "../services/auth.service";

const Profile = () => {
  const currentUser = AuthService.getCurrentUser();

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>Welcome {currentUser.email}</h3>
        <h5>You can look at some discussion or create your own!</h5>
      </header>
    </div>
  );
};

export default Profile;
