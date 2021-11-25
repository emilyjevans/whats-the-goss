import "./App.css";
import { Routes, Route } from "react-router-dom";
import Articles from "./components/Articles";
import Nav from "./components/Nav.jsx";
import LoginForm from "./components/LoginForm";
import SingleArticle from "./components/SingleArticle";
import UserLoggedIn from "./components/UserLoggedIn";
import ThemeSelector from "./components/ThemeSelector";
import { useContext, useState } from "react";
import { UserContext } from "./contexts/UserContext";
import { ThemeContext } from "./contexts/ThemeContext";

const RequireLogin = ({ children }) => {
  const { user } = useContext(UserContext);
  return user ? children : <LoginForm />;
};

function App() {
  const [topic, setTopic] = useState([]);
  const [user, setUser] = useState(null);
  const [darkTheme, setDarkTheme] = useState(false);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <ThemeContext.Provider value={{ darkTheme, setDarkTheme }}>
        <div className={`${
      darkTheme ? 'App-darkTheme' : 'App'
    }`}>
          <header className={`${
      darkTheme ? 'App-darkTheme-header' : 'App-header'
    }`}>
            <h1>What's The Goss</h1>
            <UserLoggedIn /> <ThemeSelector />
          </header>
          <RequireLogin>
            <Nav setTopic={setTopic} />
            <Routes>
              <Route path="/articles" element={<Articles topic={null} />} />
              <Route
                path="/:topic"
                element={<Articles topic={topic} setTopic={setTopic} />}
              />
              <Route path="/articles/:article_id" element={<SingleArticle />} />
            </Routes>
          </RequireLogin>
        </div>
      </ThemeContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
