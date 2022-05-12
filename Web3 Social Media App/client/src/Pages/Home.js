import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../CSS/main.css";
import Post from "../Component/Post";
import LoginSignUp from "./LoginSignUp";
import { Moralis } from "moralis";
import Share from "../Component/Share";
import Share2 from "../Component/Share2";
Moralis.initialize("EOyzbfoz7b7uOcVvVWxEWrnIYHw7Q4MuOjX1Ce5u"); // Application id from moralis.io
Moralis.serverURL = "https://0kekamgqztbe.usemoralis.com:2053/server"; //Server url from moralis.io
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Logged: "False",
      logArray: [1],
      post: [],
      PostCount: 0,
      pp: "https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png",
    };
  }
  componentDidMount = async () => {
    const userId = localStorage.getItem("userId");
    const Get2 = new Moralis.Object.extend("_User");
    const query2 = new Moralis.Query(Get2);
    query2.equalTo("objectId", userId);
    const results2 = await query2.find();
    console.log("selman", userId);
    for (let i = 0; i < results2.length; i++) {
      const object = results2[i];
      console.log(object);
      const pp = object.get("ProfilePicture").url();
      this.setState({
        pp: pp,
      });
    }
    const Get = Moralis.Object.extend("Posts");
    const query = new Moralis.Query(Get);
    const results = await query.find();
    for (let i = 0; i < results.length; i++) {
      const object = results[i];
      const count = i;
      let Mediated2 = "";
      let MediaSrc = "";
      const PosterPP = object.get("PosterPP");
      const PostText = object.get("PostText");
      const LikeCount = object.get("LikeCount");
      const CommentCount = object.get("CommentCount");
      const PosterName = object.get("PosterName");
      const PosterTag = object.get("PosterTag");
      const PostId = object.get("PostId");
      const Price = object.get("Price");
      const Mediated = object.get("Mediated");
      if (Mediated == true) {
        Mediated2 = "block";
        MediaSrc = object.get("ProfilePicture").url();
      } else {
        Mediated2 = "none";
        MediaSrc = "";
      }
      const PosterPPState = "PosterPP" + i.toString();
      const PostTextState = "PostText" + i.toString();
      const LikeCountState = "LikeCount" + i.toString();
      const CommentCountState = "CommentCount" + i.toString();
      const PosterNameState = "PosterName" + i.toString();
      const PosterTagState = "PosterTag" + i.toString();
      const PriceState = "Price" + i.toString();
      const PostIdState = "PostId" + i.toString();
      const MediatedState = "Mediated" + i.toString();
      const MediaSrcState = "MediaSource" + i.toString();
      this.setState({
        [PosterPPState]: PosterPP,
        [PostTextState]: PostText,
        [LikeCountState]: LikeCount,
        [CommentCountState]: CommentCount,
        [PosterNameState]: PosterName,
        [PosterTagState]: PosterTag,
        [PriceState]: Price,
        [PostIdState]: PostId,
        [MediatedState]: Mediated2,
        [MediaSrcState]: MediaSrc,
        post: this.state.post.concat((i + 1).toString()),
        PostCount: count + 1,
      });
      console.log(this.state.PostCount);
    }
  };

  render() {
    const LogOut = async () => {
      localStorage.setItem("userId", "Not Set");
      window.location.reload();
    };

    const Close = async () => {
      const modal = document.getElementById("Modal");
      modal.style.display = "none";
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
                  <button onClick={connectWallet} className="Btn">
                    <i class="fa-solid fa-wallet fa-xl"></i> Connect Wallet
                  </button>
                </div>

                <div className="ProfileSection">
                  <div className="Header">
                    <h2 onClick={OpenMenu} className="HomeText">
                      <i class="fa-solid fa-bars"></i>
                    </h2>
                  </div>
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
                  <h1 className="HomeText">Home</h1>
                  <div
                    style={{
                      paddingLeft: "10%",
                    }}
                  >
                    <Share2 />
                  </div>
                  <div className="TimeLine">
                    {this.state.post.map((value, index) => {
                      const PosterPP2 = "PosterPP" + (value - 1).toString();
                      const PostText2 = "PostText" + (value - 1).toString();
                      const LikeCount2 = "LikeCount" + (value - 1).toString();
                      const CommentCount2 =
                        "CommentCount" + (value - 1).toString();
                      const PosterName2 = "PosterName" + (value - 1).toString();
                      const PosterTag2 = "PosterTag" + (value - 1).toString();
                      const Price2 = "Price" + (value - 1).toString();
                      const PostId2 = "PostId" + (value - 1).toString();
                      const Mediated2 = "Mediated" + (value - 1).toString();
                      const MediaSource2 =
                        "MediaSource" + (value - 1).toString();
                      return (
                        <Post
                          key={index}
                          PosterPP={this.state[PosterPP2]}
                          PostText={this.state[PostText2]}
                          LikeCount={this.state[LikeCount2]}
                          CommentCount={this.state[CommentCount2]}
                          PosterName={this.state[PosterName2]}
                          PosterTag={this.state[PosterTag2]}
                          Price={this.state[Price2]}
                          PostId={this.state[PostId2]}
                          Mediated={this.state[Mediated2]}
                          MediaSource={this.state[MediaSource2]}
                        />
                      );
                    })}
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
export default Home;
