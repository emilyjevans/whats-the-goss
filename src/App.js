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

const ErrorPage = () => {
  return (<p> Sorry, looks like we don't have anything here! </p>)
}

function App() {
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
            <Nav/>
            <Routes>
            <Route path="*" element = {<ErrorPage/>} />
              <Route path="/" element={<Articles/>}/>
              <Route
                path="/:topic"
                element={<Articles />}
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
