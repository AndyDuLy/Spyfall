import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Landing from './Components/Landing';
import Room from './Components/Room';


function App() {
  return (
    <Router>
      <Route exact path="/" component={Landing} />
      <Route path="/room-:id" component={Room} />
    </Router>
  );
}

export default App;
