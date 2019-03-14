import React, { Component } from "react";
import CarList from "./CarList";

class App extends Component {
  render() {
    return (
      <div>
        <h2>CarShop</h2>
        <CarList />
      </div>
    );
  }
}

export default App;
