import React, { Component } from "react";
import "./../App.css";
import profile from "./../dummydata/profile.json";
import { browserHistory } from "react-router";
import Alert from "./inc/Alert";

var fs = require("fs");

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      role: "",
      mode: "login",
      alert: "",
      alertType: "success"
    };
  }
  componentDidMount = () => {
    if (!localStorage.getItem("profile")) {
      localStorage.setItem("profiles", JSON.stringify(profile));
    }
  };
  handleNotToRedirect(e) {
    e.preventDefault();
  }
  onChangeUsername = e => {
    this.setState({
      username: e.target.value
    });
  };
  onChangePassword = e => {
    this.setState({
      password: e.target.value
    });
  };
  onChangeRole = e => {
    this.setState({
      role: e.target.value
    });
  };
  changeMode = e => {
    let { mode } = this.state;
    if (mode === "login") {
      this.setState({
        mode: "sign_up",
        username: "",
        password: "",
        role: ""
      });
    } else {
      this.setState({
        mode: "login",
        username: "",
        password: "",
        role: ""
      });
    }
  };
  checkCredential = (username, password) => {
    let profileSource = profile.profiles;
    let loginSuccess = false;
    for (var i = 0; i < profileSource.length; i++) {
      if (profileSource[i].username === username && profileSource[i].password === password) {
        loginSuccess = true;
        localStorage.setItem("profile", JSON.stringify(profileSource[i]));
        break;
      }
    }
    if (loginSuccess) {
      this.setAlert("Login success", "success");
      window.location.href = "/list";
    } else {
      this.setAlert("wrong username or password", "danger");
    }
  };
  doSignUp = () => {
    let { username, password, role } = this.state;
    let newId = profile.profiles.length + 1;
    var newUser = { profile_id: newId, username: username, password: password, role: role };
    profile.profiles.push(newUser);
    localStorage.setItem("profiles", JSON.stringify(profile));
    this.setAlert(username + ", you had successfully sign up your account", "success");
    this.setState({
      username: "",
      password: "",
      role: ""
    });
  };
  doLogin = () => {
    let { username, password, mode } = this.state;
    if (mode === "login") {
      this.checkCredential(username, password);
    } else {
      this.doSignUp();
    }
  };
  setAlert = (text, type) => {
    var _this = this;
    this.setState({
      alert: text,
      alertType: type
    });
    setTimeout(function() {
      _this.setState({
        alert: ""
      });
    }, 2000);
  };
  render() {
    const { mode, username, password, alert, alertType, role } = this.state;
    return (
      <div className="login-page">
        <div className="form">
          {alert ? <Alert text={alert} type={alertType} /> : ""}
          <form className="register-form" onSubmit={this.handleNotToRedirect.bind(this)}>
            <input type="text" placeholder="username" onChange={this.onChangeUsername} value={username} />
            <input type="password" placeholder="password" onChange={this.onChangePassword} value={password} />
            {mode === "sign_up" ? (
              <select onChange={this.onChangeRole} value={role}>
                <option value="">Please Select Your Role</option>
                <option value="Admin">Admin</option>
                <option value="Member">Member</option>
              </select>
            ) : (
              ""
            )}
            {mode === "login" ? (
              <div>
                <button onClick={this.doLogin}>Login</button>
                <p>
                  Not have an account?<a href="javascript:void(0)" onClick={this.changeMode}>
                    Create an account
                  </a>
                </p>
              </div>
            ) : (
              <div>
                <button onClick={this.doLogin}>Sign Up</button>
                <p>
                  Already have an account?<a href="javascript:void(0)" onClick={this.changeMode}>
                    Sign in
                  </a>
                </p>
              </div>
            )}
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
