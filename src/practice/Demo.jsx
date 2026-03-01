import React, { useState, createContext, useContext } from 'react';

// 1. THE CONTEXT (Shared "Lobby Temperature")
const ThemeContext = createContext();

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light"); // This is the ONE shared state
  const toggleTheme = () => setTheme(t => t === "light" ? "dark" : "light");
  const [global, setGlobal] = useState(0);
  const change = () => setGlobal(i => i+2);
  
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme ,global, change}}>
      {children}
    </ThemeContext.Provider>
  );
}

// 2. THE HOOK (Private "Bathroom")
function useCounter() {
  const [count, setCount] = useState(0); // This is NEW for every component
  const add = () => setCount(count + 1);
  return { count, add };
}

// 3. THE COMPONENT (Uses both)
function Card({ name }) {
  const { theme, toggleTheme, global, change } = useContext(ThemeContext); // Shared
  const { count, add } = useCounter(); // Private

  const style = {
    border: "2px solid grey",
    padding: "10px",
    margin: "10px",
    background: theme === "light" ? "#fff" : "#444",
    color: theme === "light" ? "#000" : "#fff"
  };

  return (
    <div style={style}>
      <h3>{name}</h3>
      <p>Global Theme: <b>{theme}</b></p>
      <p>Local Count: <b>{count}</b></p>
      <p>new: <b>{global}</b></p>
      <button onClick={change}>Yo</button>
      <button onClick={add}>+ Local Count</button>
      <button onClick={toggleTheme}>Change Global Theme</button>
    </div>
  );
}

// 4. THE APP
export default function App() {
  return (
    <ThemeProvider>
      <div style={{ display: "flex" }}>
        <Card name="Component A" />
        <Card name="Component B" />
      </div>
    </ThemeProvider>
  );
}