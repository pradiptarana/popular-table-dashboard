import React, { Component } from "react";
class Alert extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    var type = this.props.type ? this.props.type : "success";
    return <div class={"alert alert-" + type}>{this.props.text}</div>;
  }
}
export default Alert;
