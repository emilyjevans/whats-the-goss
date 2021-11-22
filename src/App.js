import "./App.css";
import { Routes, Route } from "react-router-dom";
// import Home from "./components/home";
import Articles from "./components/articles";
import PostComment from "./components/postComment";
import Nav from "./components/Nav.jsx";
import { useState } from "react";

function App() {
  const [topic, setTopic] = useState([])
  return (
    <div className="App">
      <header className="App-header">What's The Goss</header>
      <Nav setTopic={setTopic}/>
      <Articles topic={topic} setTopic={setTopic}/>
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/articles" element={<Articles />} />
        <Route path="/postComment" element={<PostComment />} />
      </Routes>
    </div>
  );
}

export default App;
