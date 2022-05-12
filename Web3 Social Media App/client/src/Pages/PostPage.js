import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../CSS/Profile.css";
import "../CSS/Post.css";
import LoginSignUp from "./LoginSignUp";
import Post from "../Component/Post";
import Comment from "../Component/Comment";
import { Moralis } from "moralis";
Moralis.initialize("EOyzbfoz7b7uOcVvVWxEWrnIYHw7Q4MuOjX1Ce5u"); // Application id from moralis.io
Moralis.serverURL = "https://0kekamgqztbe.usemoralis.com:2053/server"; //Server url from moralis.io

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      PosterPP: "",
      PostText: "",
      PosterName: "",
      PosterTag: "",
      LikeCount: 0,
      CommentCount: 0,
      Price: 0,
      PostId: 0,
      logArray: [1],
      comment: [],
      pp: "https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png",
      name: "",
      tag: "",
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
      const name = object.get("username");
      const tag = object.get("userTag");
      this.setState({
        pp: pp,
        name: name,
        tag: tag,
      });
    }
    const PostId = parseInt(localStorage.getItem("PostId"));
    console.log("PostId", PostId);
    console.log(typeof PostId);
    const Get = Moralis.Object.extend("Posts");
    const query = new Moralis.Query(Get);
    query.equalTo("PostId", PostId);
    const results = await query.find();
    for (let i = 0; i < results.length; i++) {
      console.log("selman");
      const object = results[i];
      const PostText2 = object.get("PostText");
      this.setState({
        PosterPP: object.get("PosterPP"),
        PostText: PostText2,
        PosterName: object.get("PosterName"),
        PosterTag: object.get("PosterTag"),
        LikeCount: object.get("LikeCount"),
        CommentCount: object.get("CommentCount"),
        Price: object.get("Price"),
        PostId: object.get("PostId"),
        comment: [],
      });
      console.log(this.state.PostText);
    }
    const Comment = Moralis.Object.extend("Comments");
    const CommentQuery = new Moralis.Query(Comment);
    CommentQuery.equalTo("PostId", PostId);
    const CommentResults = await CommentQuery.find();
    for (let i = 0; i < CommentResults.length; i++) {
      const object = CommentResults[i];
      console.log(object);
      const PosterPP = object.get("CommentorPP");
      const PostText = object.get("CommentsText");
      const PosterName = object.get("CommentorName");
      const PosterTag = object.get("CommentorTag");
      const PosterPPState = "PosterPP" + i.toString();
      const PostTextState = "PostText" + i.toString();
      const PosterNameState = "PosterName" + i.toString();
      const PosterTagState = "PosterTag" + i.toString();
      this.setState({
        [PosterPPState]: PosterPP,
        [PostTextState]: PostText,
        [PosterNameState]: PosterName,
        [PosterTagState]: PosterTag,
        comment: this.state.comment.concat((i + 1).toString()),
      });
      console.log(this.state.comment);
    }
  };
  render() {
    const LogOut = async () => {
      console.log("selman");
      localStorage.setItem("userId", "Not Set");
      window.location.reload();
    };
    const Reply = async () => {
      /////////////bugu düzelt
      const PostId = parseInt(localStorage.getItem("PostId"));
      const Reply = Moralis.Object.extend("Comments");
      const MakeReply = new Reply();
      MakeReply.set("CommentsText", document.getElementById("Reply").value);
      MakeReply.set("PostId", parseInt(localStorage.getItem("PostId")));
      MakeReply.set("CommentorPP", this.state.pp);
      MakeReply.set("CommentorName", this.state.name);
      MakeReply.set("CommentorTag", this.state.tag);
      await MakeReply.save();
      const Post = Moralis.Object.extend("Posts");
      const PostQuery = new Moralis.Query(Post);
      PostQuery.equalTo("PostId", PostId);
      const results = await PostQuery.find();
      for (let i = 0; i < results.length; i++) {
        const object = results[i];
        const CommentCount = object.get("CommentCount");
        object.set("CommentCount", CommentCount + 1);
        await object.save();
      }
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
                      <i class="fa-solid fa-arrow-right-from-bracket fa-xl"></i>
                      Log Out
                    </button>
                    <button onClick={connectWallet} className="Btn">
                      <i class="fa-solid fa-wallet fa-xl"></i> Connect Wallet
                    </button>
                  </div>
                  <div className="Post3">
                    <Post
                      PosterPP={this.state.PosterPP}
                      PostText={this.state.PostText}
                      LikeCount={this.state.LikeCount}
                      CommentCount={this.state.CommentCount}
                      PosterName={this.state.PosterName}
                      PosterTag={this.state.PosterTag}
                      Price={this.state.Price}
                      PostId={this.state.PostId}
                    />
                  </div>
                  <div className="MakeComment">
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        paddingLeft: "30px",
                        flexBasis: "80%",
                      }}
                    >
                      <img
                        style={{
                          height: "70px",
                          width: "70px",
                          justifySelf: "center",
                          marginLeft: "5px",
                          borderRadius: "80%",
                        }}
                        src={this.state.pp}
                      />
                      <input id="Reply" placeholder="Make a Reply" />
                    </div>
                    <button style={{ marginTop: "25px" }} onClick={Reply}>
                      Reply
                    </button>
                  </div>
                  <div
                    style={{ minHeight: "100vh" }}
                    className="ProfileSection"
                  >
                    {this.state.comment.map((value, index) => {
                      const CommnetorPP2 = "PosterPP" + (value - 1).toString();
                      const CommentText2 = "PostText" + (value - 1).toString();
                      const CommentorName2 =
                        "PosterName" + (value - 1).toString();
                      const CommentorTag2 =
                        "PosterTag" + (value - 1).toString();
                      return (
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "center",
                            width: "100%",
                          }}
                        >
                          <Comment
                            key={index}
                            PosterPP={this.state[CommnetorPP2]}
                            PostText={this.state[CommentText2]}
                            PosterName={this.state[CommentorName2]}
                            PosterTag={this.state[CommentorTag2]}
                          />
                        </div>
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
export default Profile;
