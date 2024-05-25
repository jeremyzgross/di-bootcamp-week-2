import React from 'react';
import './App.css';
import Greeting from './components/Greeting';
import UserProfile from './components/UserProfile';
import Counter from './components/Counter';
import ToDo from './components/ToDo';
import ThemeToggle from './components/ThemeToggle';
import CounterTwo from './components/CounterReducer';
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Greeting name={'jeremy'}/>
        <UserProfile name = {'gross'} age={27}/>
        <Counter/>
        <ToDo/>
        <br />
        <ThemeToggle/>
        <CounterTwo/>
      </header>
    </div>
  );
}

export default App;
