import React, { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

const UserLoggedIn = () => {
  const { user } = useContext(UserContext);
  if (!user) {
    return <div>Welcome</div>;
  }
  return <div className="loginBox">You are logged in as: {user.username}</div>;
};

export default UserLoggedIn;
