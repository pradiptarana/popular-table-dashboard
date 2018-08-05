import React, { Component } from "react";

class List extends Component {
  constructor(props) {
    super(props);
  }
  doLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };
  render() {
    var profile = JSON.parse(localStorage.getItem("profile"));
    return (
      <div className="header-container">
        <ul>
          <li className="header-name">
            <a>Table Portal</a>
          </li>
          <li>
            <a href="/list">Search</a>
          </li>
          {profile.role === "Admin" ? (
            <li>
              <a href="/stats">Stats</a>
            </li>
          ) : (
            ""
          )}
          <li>
            <a onClick={this.doLogout}>Logout</a>
          </li>
          <li className="pull-right">
            <a>Hi, {profile.username}</a>
          </li>
        </ul>
      </div>
    );
  }
}

export default List;
