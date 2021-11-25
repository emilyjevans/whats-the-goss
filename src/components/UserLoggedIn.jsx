import React, { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

const UserLoggedIn = () => {
  const { user, setUser } = useContext(UserContext);
  if (!user) {
    return <div><h3>Welcome</h3>
</div>;
  }
  return (
    <div className="loginBox">
      You are logged in as: {user.username}
      <br />
      <button
        onClick={() => {
          setUser(null);
        }}
      >
        Log out
      </button>
    </div>
  );
};

export default UserLoggedIn;
