import "./App.css";
import { Routes, Route } from "react-router-dom";
// import Home from "./components/LoginForm";
import Articles from "./components/Articles";
import Nav from "./components/Nav.jsx";
import LoginForm from "./components/LoginForm";
import SingleArticle from "./components/SingleArticle";
import UserLoggedIn from "./components/UserLoggedIn";
import { useContext, useState } from "react";
import { UserContext } from "./contexts/UserContext";

const RequireLogin = ({ children }) => {
  const { isLoggedIn } = useContext(UserContext);
  return isLoggedIn ? children : <LoginForm />;
};

function App() {
  const [topic, setTopic] = useState([]);
  const [user, setUser] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <UserContext.Provider value={{ user, setUser, isLoggedIn, setIsLoggedIn }}>
      <div className="App">
        <header className="App-header">
          <h1>What's The Goss</h1> <UserLoggedIn />{" "}
        </header>
        <RequireLogin>
          <Nav setTopic={setTopic} />
          <Routes>
            {/* <Route path="/" element={<Home />} /> */}
            <Route path="/articles" element={<Articles topic={null} />} />
            <Route
              path="/:topic"
              element={<Articles topic={topic} setTopic={setTopic} />}
            />
            <Route path="/articles/:article_id" element={<SingleArticle />} />
          </Routes>
        </RequireLogin>
      </div>
    </UserContext.Provider>
  );
}

export default App;
