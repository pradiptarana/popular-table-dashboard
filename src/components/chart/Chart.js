// src/Chart/Chart.jsx

import React, { Component } from "react";
import { scaleBand, scaleLinear } from "d3-scale";
import Axes from "./Axes";
import Bars from "./Bars";

export default class Chart extends Component {
  constructor() {
    super();
    this.xScale = scaleBand();
    this.yScale = scaleLinear();
  }

  render() {
    const margins = { top: 50, right: 20, bottom: 100, left: 60 };
    const svgDimensions = { width: 1000, height: 700 };

    var data = JSON.parse(localStorage.getItem("table"));
    data = data;
    const maxValue = Math.max(...data.map(d => d.likes.length));

    const xScale = this.xScale
      .padding(0.5)
      .domain(data.map(d => d.name))
      .range([margins.left, svgDimensions.width - margins.right]);

    const yScale = this.yScale.domain([0, maxValue]).range([svgDimensions.height - margins.bottom, margins.top]);

    return (
      <svg width={svgDimensions.width} height={svgDimensions.height}>
        <Axes scales={{ xScale, yScale }} margins={margins} svgDimensions={svgDimensions} />
        <Bars
          scales={{ xScale, yScale }}
          margins={margins}
          data={data}
          maxValue={maxValue}
          svgDimensions={svgDimensions}
        />
      </svg>
    );
  }
}
