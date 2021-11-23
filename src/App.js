import "./App.css";
import { Routes, Route } from "react-router-dom";
// import Home from "./components/home";
import Articles from "./components/articles";
import PostComment from "./components/postComment";
import Nav from "./components/Nav.jsx";
import SingleArticle from "./components/SingleArticle";
import { useState } from "react";

function App() {
  const [topic, setTopic] = useState([]);
  return (
    <div className="App">
      <header className="App-header">What's The Goss</header>
      <Nav setTopic={setTopic} />
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/articles" element={<Articles topic={null} />} />
        <Route
          path="/:topic"
          element={<Articles topic={topic} setTopic={setTopic} />}
        />
        <Route path="/postComment" element={<PostComment />} />
        <Route path="/articles/:article_id" element ={<SingleArticle/>}/>
      </Routes>
    </div>
  );
}

export default App;
