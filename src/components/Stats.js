import React, { Component } from "react";
import Header from "./inc/Header";
import Chart from "./chart/Chart";

class List extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Header />
        <div className="stats-container">
          <Chart />
        </div>
      </div>
    );
  }
}

export default List;
