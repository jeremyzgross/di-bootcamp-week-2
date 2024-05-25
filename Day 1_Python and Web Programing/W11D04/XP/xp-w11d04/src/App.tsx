import React from 'react';
import './App.css';
import Greeting from './Components/Greeting';
import XPcounter from './Components/Counter';
import UserCard from './Components/UserCard';
import GetUsers from './Components/XP5';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Typescript Day 04 XP</h1>
        <Greeting greeting={'hello'}/>
        <XPcounter/>
        <UserCard name={"Jeremy"}/>
        <br />
        <GetUsers/>
      </header>
    </div>
  );
}

export default App;
