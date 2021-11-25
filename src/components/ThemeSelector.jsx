import React, { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

const ThemeSelector = () => {
  const { darkTheme, setDarkTheme } = useContext(ThemeContext);

  const ThemeToggle = (e) => {
    e.preventDefault();
    setDarkTheme((currTheme) => !currTheme);
  };

  const darkThemeLabel = darkTheme ? "Dark" : "Light";

  return (
    <div>
      <button onClick={ThemeToggle}> {darkThemeLabel} Mode</button>
    </div>
  );
};

export default ThemeSelector;
