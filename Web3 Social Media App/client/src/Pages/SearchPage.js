import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../CSS/Profile.css";
import "../CSS/Post.css";
import LoginSignUp from "./LoginSignUp";
import SearchedProfile from "../Component/SearchedProfile";
import { Moralis } from "moralis";
Moralis.initialize("EOyzbfoz7b7uOcVvVWxEWrnIYHw7Q4MuOjX1Ce5u"); // Application id from moralis.io
Moralis.serverURL = "https://0kekamgqztbe.usemoralis.com:2053/server"; //Server url from moralis.io

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      PosterPP:
        "https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png",
      PosterName: "",
      PosterTag: "",
      logArray: [1],
    };
  }
  componentDidMount = async () => {
    console.log(localStorage.getItem("SearchTerm"));
    const SearchTerm = localStorage.getItem("SearchTerm");
    const Get = Moralis.Object.extend("Users");
    const query = new Moralis.Query(Get);
    query.equalTo("username", SearchTerm);
    const results = await query.find();
    for (let i = 0; i < results.length; i++) {
      const object = results[i];
      console.log(object);
      const PP = object.get("ProfilePicture");
      if (PP != undefined) {
        this.setState({
          PosterPP: object.get("ProfilePicture").url(),
        });
      }
      const PosterName = object.get("username");
      const userTag = object.get("userTag");
      this.setState({
        PosterName: PosterName,
        PosterTag: userTag,
      });
    }
  };
  render() {
    const LogOut = async () => {
      console.log("selman");
      localStorage.setItem("userId", "Not Set");
      window.location.reload();
    };
    const Search = async () => {
      console.log("Search");
      localStorage.setItem(
        "SearchTerm",
        document.getElementById("SearchBar").value
      );
    };
    const Search2 = async () => {
      console.log("Search");
      localStorage.setItem(
        "SearchTerm",
        document.getElementById("SearchBar2").value
      );
    };
    const OpenMenu = async () => {
      const Menu = document.getElementById("NavMenu");
      console.log("Menu", Menu.style.width);
      Menu.style.display = "flex";
      Menu.style.width = "300px";
    };
    const CloseMenu = async () => {
      const Menu = document.getElementById("NavMenu");
      console.log("Menu", Menu.style.width);
      Menu.style.display = "none";
      Menu.style.width = "0px";
    };
    const connectWallet = async () => {
      console.log("connect wallet");
      if (window.ethereum) {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        console.log(accounts[0]);
      } else {
        alert("Install Metamask");
      }
    };
    return (
      <div className="MainDiv">
        {this.state.logArray.map((value, index) => {
          if (localStorage.getItem("userId") == "Not Set") {
            return <LoginSignUp />;
          } else {
            return (
              <div className="MainDivRow">
                <div className="Menu">
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <input
                      style={{
                        height: "60px",
                        width: "80%",
                        fontSize: "large",
                        alignSelf: "center",
                        color: "white",
                        borderRadius: "20px 0px 0px 20px ",
                        border: "none",
                        backgroundColor: "#16181c",
                        marginBottom: "30px",
                      }}
                      placeholder="Search Something..."
                      id="SearchBar"
                    />
                    <Link to="/SearchPage">
                      <button
                        className="Btn2"
                        style={{ width: "50px", marginRight: "20px" }}
                        onClick={Search}
                      >
                        <i class="fa-solid fa-magnifying-glass"></i>
                      </button>
                    </Link>
                  </div>
                  <Link
                    style={{
                      textDecoration: "none",
                      fontSize: "x-large",
                      color: "white",

                      marginBottom: "30px",
                    }}
                    to="/"
                  >
                    <i class="fa-solid fa-house"></i>
                    Home
                  </Link>
                  <Link
                    style={{
                      textDecoration: "none",
                      fontSize: "x-large",
                      color: "white",
                      marginBottom: "30px",
                    }}
                    to="/Profile"
                  >
                    <i class="fa-solid fa-user"></i>
                    Profile
                  </Link>

                  <button onClick={LogOut} className="Btn">
                    <i class="fa-solid fa-arrow-right-from-bracket fa-xl"></i>{" "}
                    Log Out
                  </button>
                  <button onClick={connectWallet()} className="Btn">
                    <i class="fa-solid fa-wallet fa-xl"></i> Connect Wallet
                  </button>
                </div>
                <div style={{ height: "100vh" }} className="ProfileSection">
                  <div className="Header">
                    <h2 onClick={OpenMenu} className="HomeText">
                      <i class="fa-solid fa-bars"></i>
                    </h2>
                  </div>
                  <h1 className="HomeText">Search Results</h1>
                  <div
                    style={{
                      width: "0px",
                      color: "white",
                      position: "fixed",
                      zIndex: "2",
                      height: "100%",
                      backgroundColor: "#04040c",
                      display: "none",
                      flexDirection: "column",
                      paddingLeft: "3%",
                      alignItems: "left",
                      justifyContent: "flex-start",
                      paddingTop: "20px",
                      transition: "width 2s",
                    }}
                    id="NavMenu"
                  >
                    <div
                      id="NavMenu2"
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        alignContent: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <h2>Web3App</h2>
                      <button
                        className="CloseBtn"
                        style={{
                          backgroundColor: "#04040c",
                          color: "white",
                          marginTop: "3%",
                        }}
                        onClick={CloseMenu}
                      >
                        <i class="fa-solid fa-circle-xmark fa-xl"></i>
                      </button>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        marginTop: "20px",
                      }}
                    >
                      <input
                        style={{
                          height: "60px",
                          width: "80%",
                          fontSize: "large",
                          alignSelf: "center",
                          color: "white",
                          borderRadius: "20px 0px 0px 20px ",
                          border: "none",
                          backgroundColor: "#16181c",
                          marginBottom: "30px",
                        }}
                        placeholder="Search Something..."
                        id="SearchBar2"
                      />
                      <Link to="/SearchPage">
                        <button
                          className="Btn2"
                          style={{ width: "50px", marginRight: "20px" }}
                          onClick={Search2}
                        >
                          <i class="fa-solid fa-magnifying-glass"></i>
                        </button>
                      </Link>
                    </div>
                    <Link
                      style={{
                        textDecoration: "none",
                        fontSize: "x-large",
                        color: "white",

                        marginBottom: "30px",
                      }}
                      to="/"
                    >
                      <i class="fa-solid fa-house"></i>
                      Home
                    </Link>
                    <Link
                      style={{
                        textDecoration: "none",
                        fontSize: "x-large",
                        color: "white",
                        marginBottom: "30px",
                      }}
                      to="/Profile"
                    >
                      <i class="fa-solid fa-user"></i>
                      Profile
                    </Link>

                    <button onClick={LogOut} className="Btn">
                      <i class="fa-solid fa-arrow-right-from-bracket fa-xl"></i>{" "}
                      Log Out
                    </button>
                    <button onClick={connectWallet} className="Btn">
                      <i class="fa-solid fa-wallet fa-xl"></i> Connect Wallet
                    </button>
                  </div>
                  <div className="Post3">
                    <SearchedProfile
                      ProfilePP={this.state.PosterPP}
                      ProfileName={this.state.PosterName}
                      ProfileTag={this.state.PosterTag}
                    />
                  </div>
                </div>
              </div>
            );
          }
        })}
      </div>
    );
  }
}
export default Profile;
