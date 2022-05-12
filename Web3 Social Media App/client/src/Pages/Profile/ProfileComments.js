import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../../CSS/Profile.css";
import LoginSignUp from "../LoginSignUp";
import Comment from "../../Component/Comment";
import Post from "../../Component/Post";
import { Moralis } from "moralis";
Moralis.initialize("EOyzbfoz7b7uOcVvVWxEWrnIYHw7Q4MuOjX1Ce5u"); // Application id from moralis.io
Moralis.serverURL = "https://0kekamgqztbe.usemoralis.com:2053/server"; //Server url from moralis.io

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Logged: "False",
      logArray: [1],
      userName: "",
      userTag: "",
      Description: "",
      following: 0,
      followers: 0,
      pp: "https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png",
      banner: "https://live.staticflickr.com/3678/8986672784_bbf77b2aeb_b.jpg",
      post: [],
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
    };
  }
  componentDidMount = async () => {
    const userId = localStorage.getItem("userId");
    const Get = new Moralis.Object.extend("_User");
    const query = new Moralis.Query(Get);
    query.equalTo("objectId", userId);
    const results = await query.find();
    console.log("selman", userId);
    for (let i = 0; i < results.length; i++) {
      const object = results[i];
      console.log(object);
      const Name = object.get("username");
      const userTag = object.get("userTag");
      const wallet = object.get("wallet");
      const description = object.get("description");
      const following = object.get("following");
      const followers = object.get("followers");
      const pp = object.get("ProfilePicture").url();
      const banner = object.get("Banner").url();
      this.setState({
        userName: Name,
        userTag: userTag,
        Description: description,
        following: following,
        followers: followers,
        pp: pp,
        banner: banner,
      });
      console.log("name", Name, "tag", userTag, "wallet", wallet, description);
    }
    const Comment = Moralis.Object.extend("Comments");
    const CommentQuery = new Moralis.Query(Comment);
    CommentQuery.equalTo("CommentorName", this.state.userName);
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
    const SetUp = async () => {
      const modal = document.getElementById("Modal");
      modal.style.display = "flex";
    };
    const Close = async () => {
      const modal = document.getElementById("Modal");
      modal.style.display = "none";
    };
    const Save = async () => {
      const userId = localStorage.getItem("userId");
      const Get = Moralis.Object.extend("_User");
      const query = new Moralis.Query(Get);
      query.equalTo("objectId", userId);
      const results = await query.find();
      for (let i = 0; i < results.length; i++) {
        const object = results[i];
        const Name = object.get("username");
        console.log(Name);
        object.set("username", document.getElementById("UserName").value);
        object.set("userTag", document.getElementById("UserTag").value);
        object.set("description", document.getElementById("Description").value);
        const fileUploadControl = document.getElementById(
          "profilePhotoFileUpload"
        );
        if (fileUploadControl.files.length > 0) {
          const file = fileUploadControl.files[0];
          const name = "photo.jpg";
          const moralisFile = new Moralis.File(name, file);
          object.set("ProfilePicture", moralisFile);
        }
        const fileUploadControl2 = document.getElementById(
          "profilePhotoFileUpload2"
        );
        if (fileUploadControl2.files.length > 0) {
          const file = fileUploadControl2.files[0];
          const name = "photo.jpg";
          const moralisFile = new Moralis.File(name, file);
          object.set("Banner", moralisFile);
        }
        await object.save();
      }
      const UserQuery = Moralis.Object.extend("Users");
      const User = new Moralis.Query(UserQuery);
      User.equalTo("username", this.state.userName);
      const resultsUser = await User.find();
      for (let i = 0; i < resultsUser.length; i++) {
        const object = resultsUser[i];
        console.log("attempt");
        console.log(object);
        const Name = object.get("username");
        const password = object.get("password");
        object.set("username", document.getElementById("UserName").value);
        object.set("userTag", document.getElementById("UserTag").value);
        object.set("description", document.getElementById("Description").value);
        const fileUploadControl = document.getElementById(
          "profilePhotoFileUpload"
        );
        if (fileUploadControl.files.length > 0) {
          const file = fileUploadControl.files[0];
          const name = "photo.jpg";
          const moralisFile = new Moralis.File(name, file);
          object.set("ProfilePicture", moralisFile);
        }
        const fileUploadControl2 = document.getElementById(
          "profilePhotoFileUpload2"
        );
        if (fileUploadControl2.files.length > 0) {
          const file = fileUploadControl2.files[0];
          const name = "photo.jpg";
          const moralisFile = new Moralis.File(name, file);
          object.set("Banner", moralisFile);
        }
        console.log(Name, password);
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
                  <div className="ProfileDetails">
                    <div
                      style={{ display: "none" }}
                      id="Modal"
                      className="SetUpAccount"
                    >
                      <div
                        style={{
                          display: "flex",
                          backgroundColor: "#04040c",
                          width: "100%",
                          paddingTop: "3%",
                          flexDirection: "row",
                          alignContent: "center",
                          justifyContent: "right",
                          borderRadius: "20px",
                        }}
                      >
                        <button
                          className="CloseBtn"
                          style={{ backgroundColor: "#04040c", color: "white" }}
                          onClick={Close}
                        >
                          <p style={{ fontSize: "25px" }}>X</p>
                        </button>
                      </div>

                      <input id="UserName" placeholder="User Name" />
                      <input id="UserTag" placeholder="User Tag" />
                      <input id="Description" placeholder="Desciption" />
                      <input
                        id="profilePhotoFileUpload"
                        type="file"
                        placeholder="Set a Profile Photo"
                      />
                      <input
                        id="profilePhotoFileUpload2"
                        type="file"
                        placeholder="Set a Profile Banner"
                      />
                      <button
                        style={{ justifySelf: "center" }}
                        className="CloseBtn"
                        onClick={Save}
                      >
                        Save
                      </button>
                    </div>

                    <div className="Banner">
                      <img src={this.state.banner} />
                    </div>
                    <img className="ProfileImg" src={this.state.pp} />

                    <div className="ProfileText">
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-between",
                        }}
                      >
                        <div className="TextArea">
                          <h2>{this.state.userName}</h2>
                          <h4>@{this.state.userTag}</h4>
                        </div>

                        <button className="SetUpBtn" onClick={SetUp}>
                          Set Account
                        </button>
                      </div>

                      <div className="Description">
                        <h4>{this.state.Description}</h4>
                      </div>
                      <div className="Follow">
                        <div style={{ display: "flex", flexDirection: "row" }}>
                          <h4>{this.state.following}</h4>
                          <h4 style={{ color: "gray" }}>Following</h4>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            marginLeft: "15px",
                          }}
                        >
                          <h4>{this.state.followers}</h4>
                          <h4 style={{ color: "gray" }}>Followers</h4>
                        </div>
                      </div>
                      <div className="ButtonsSection">
                        <Link className="Link" to="/Profile">
                          Post
                        </Link>

                        <Link className="Link" to="/Profile">
                          Comments
                        </Link>
                        <Link className="Link" to="/Profile">
                          Monetized
                        </Link>
                      </div>
                    </div>
                    <div className="ProfileSection">
                      {this.state.comment.map((value, index) => {
                        const CommnetorPP2 =
                          "PosterPP" + (value - 1).toString();
                        const CommentText2 =
                          "PostText" + (value - 1).toString();
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
              </div>
            );
          }
        })}
      </div>
    );
  }
}
export default Profile;
