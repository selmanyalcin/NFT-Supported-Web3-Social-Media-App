import React, { Component } from "react";
import { Moralis } from "moralis";
import { Link } from "react-router-dom";
import "../CSS/LoginSignUp.css";
Moralis.initialize("EOyzbfoz7b7uOcVvVWxEWrnIYHw7Q4MuOjX1Ce5u"); // Application id from moralis.io
Moralis.serverURL = "https://0kekamgqztbe.usemoralis.com:2053/server"; //Server url from moralis.io

class LoginSignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logArray: [1],
    };
  }

  componentDidMount = async () => {
    localStorage.setItem("userId", "Not Set");
  };
  render() {
    const SignUp = async () => {
      const user = new Moralis.User();
      user.set("username", document.getElementById("NameArea").value);
      user.set("password", document.getElementById("PasswordArea").value);
      user.set("description", "Not Set");
      user.set("userTag", "NotSet");
      user.set("wallet", "Not Set");
      user.set("followers", 0);
      user.set("following", 0);

      try {
        await user.signUp();
      } catch (error) {
        alert("Error: " + error.code + " " + error.message);
      }
      console.log(user.get("objectId"));
      const User = Moralis.Object.extend("Users");
      const Users = new User();
      Users.set("username", document.getElementById("NameArea").value);
      Users.set("password", document.getElementById("PasswordArea").value);
      Users.set("description", "Not Set");
      Users.set("userTag", "NotSet");
      Users.set("wallet", "Not Set");
      Users.set("followers", 0);
      Users.set("following", 0);
      Users.set("objectId", user.get("objectId"));
      await Users.save();
    };
    const Login = async () => {
      try {
        const user = await Moralis.User.logIn(
          document.getElementById("NameArea").value,
          document.getElementById("PasswordArea").value
        );
        localStorage.setItem("userId", user.id);
        console.log("user", user, user.id, localStorage.getItem("userId"));
        window.location.reload();
      } catch (error) {
        alert("Error: " + error.code + " " + error.message);
      }
    };
    return (
      <div className="Main">
        <div className="LogArea">
          <h1>Login Your Account</h1>
          <input placeholder="name" id="NameArea" />
          <input placeholder="password" id="PasswordArea" />
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-end",
              marginRight: "10%",
            }}
          >
            <button onClick={Login}>Login</button>
            <button onClick={SignUp}>Sign Up</button>
          </div>
        </div>
      </div>
    );
  }
}
export default LoginSignUp;
