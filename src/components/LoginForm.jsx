import React from "react";
import { UserContext } from "../contexts/UserContext";
import { useContext, useState } from "react";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const { setUser } = useContext(UserContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    setUser({ username });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Please enter your username to get started</label>
        <input
          type="text"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <br />
        <input type="submit" value="Log in" />
      </form>
    </div>
  );
};

export default LoginForm;
