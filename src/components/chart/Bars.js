import React, { Component } from "react";
import { scaleLinear } from "d3-scale";
import { interpolateLab } from "d3-interpolate";

export default class Bars extends Component {
  constructor(props) {
    super(props);

    this.colorScale = scaleLinear()
      .domain([0, this.props.maxValue])
      .range(["#1dc5c3", "#309c99"])
      .interpolate(interpolateLab);
  }

  render() {
    const { scales, margins, data, svgDimensions } = this.props;
    const { xScale, yScale } = scales;
    const { height } = svgDimensions;

    const bars = data.map(datum => (
      <rect
        key={datum.name}
        x={xScale(datum.name)}
        y={yScale(datum.likes.length)}
        height={height - margins.bottom - scales.yScale(datum.likes.length)}
        width={xScale.bandwidth()}
        fill={this.colorScale(datum.likes.length)}
      />
    ));

    return <g>{bars}</g>;
  }
}
