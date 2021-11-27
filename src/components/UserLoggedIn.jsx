import React, { useContext, useEffect } from "react";
import { UserContext } from "../contexts/UserContext";

const UserLoggedIn = () => {
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    setUser(localStorage.getItem("username"));
  });

  if (!user) {
    return (
      <div>
        <h3>Welcome</h3>
      </div>
    );
  }
  return (
    <div className="loginBox">
      You are logged in as: {localStorage.getItem("username")}
      <br />
      <button
        onClick={() => {
          setUser(null);
          localStorage.clear();
        }}
      >
        Log out
      </button>
    </div>
  );
};

export default UserLoggedIn;
