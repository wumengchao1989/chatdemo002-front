import React from 'react';
import logo from './logo.svg';
import './App.css';
import {post} from './axios';
function App() {
  const [name,setName]=React.useState("");
  const handleClick=()=>{
    post("/getName").then((data)=>{
      setName(data.name)
    })
  }
  return (
    <div className="App">
      <header className="App-header">
        <button onClick={handleClick}>click</button>
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Myname is {name}
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
