import React, { Component } from 'react';
import './App.css';
import Body from './components/body/Body';


class App extends Component {
      render() {
      /**
      Draw the Body component to the screen
      s
      Return: None
      */
      return (
        <div className="App">
            <Body/>
        </div>
      );
    }
}
export default App;