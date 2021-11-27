import React from "react";
import { UserContext } from "../contexts/UserContext";
import { useContext, useState } from "react";
import { getUsers } from "../utils/api";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const { setUser } = useContext(UserContext);

  const handleSubmit = (e) => {
    e.preventDefault();
 
    getUsers().then((users) => {
      let usersArray = []
      for (const item in users){
        usersArray.push(users[item].username)
      }
      if (usersArray.includes(username)) {
        setUser({ username });
        localStorage.setItem("username", username);
      }
      else {
        alert("Username does not exist, please try again")
      }
    })
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Please enter your username to get started</label>
        <br />
        Note: to use app in testing, please use username <b>jessjelly</b>
        <br />
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
