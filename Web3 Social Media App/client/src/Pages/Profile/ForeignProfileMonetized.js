import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../../CSS/Profile.css";
import LoginSignUp from "../LoginSignUp";
import Post from "../../Component/Post";
import MonetizedPost from "../../Component/MonetizedPost";
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
      LikeFound: false,
      FollowerName: "",
      subscribed: false,
    };
  }
  componentDidMount = async () => {
    const userId2 = localStorage.getItem("userId");
    const Get3 = new Moralis.Object.extend("_User");
    const query3 = new Moralis.Query(Get3);
    query3.equalTo("objectId", userId2);
    const results3 = await query3.find();
    for (let i = 0; i < results3.length; i++) {
      const object = results3[i];
      console.log(object);
      const Name = object.get("username");
      this.setState({ FollowerName: Name });
    }
    const userId = localStorage.getItem("ClickedProfile");
    const Get = new Moralis.Object.extend("Users");
    const query = new Moralis.Query(Get);
    query.equalTo("username", userId);
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
      const pp = object.get("ProfilePicture");
      const banner = object.get("Banner");
      console.log(pp, banner);
      if (banner != undefined) {
        this.setState({
          banner: object.get("Banner").url(),
        });
      }
      if (pp != undefined) {
        this.setState({
          pp: object.get("ProfilePicture").url(),
        });
      }
      this.setState({
        userName: Name,
        userTag: userTag,
        Description: description,
        following: following,
        followers: followers,
      });
      console.log("name", Name, "tag", userTag, "wallet", wallet, description);
    }
    const Get2 = Moralis.Object.extend("Monetized");
    const query2 = new Moralis.Query(Get2);
    query2.equalTo("PosterName", this.state.userName);
    const results2 = await query2.find();
    for (let i = 0; i < results2.length; i++) {
      const object = results2[i];
      const count = i;
      const PosterPP = object.get("PosterPP");
      const PostText = object.get("PostText");
      const LikeCount = object.get("LikeCount");
      const CommentCount = object.get("CommentCount");
      const PosterName = object.get("PosterName");
      const PosterTag = object.get("PosterTag");
      const PostId = object.get("PostId");
      const Price = object.get("Price");
      const PosterPPState = "PosterPP" + i.toString();
      const PostTextState = "PostText" + i.toString();
      const LikeCountState = "LikeCount" + i.toString();
      const CommentCountState = "CommentCount" + i.toString();
      const PosterNameState = "PosterName" + i.toString();
      const PosterTagState = "PosterTag" + i.toString();
      const PriceState = "Price" + i.toString();
      const PostIdState = "PostId" + i.toString();
      this.setState({
        [PosterPPState]: PosterPP,
        [PostTextState]: PostText,
        [LikeCountState]: LikeCount,
        [CommentCountState]: CommentCount,
        [PosterNameState]: PosterName,
        [PosterTagState]: PosterTag,
        [PriceState]: Price,
        [PostIdState]: PostId,
        post: this.state.post.concat((i + 1).toString()),
      });
    }
    const subscribed = localStorage.getItem("ClickedProfile");
    const subscriber = this.state.FollowerName;
    console.log(subscribed, subscriber);
    const Query = Moralis.Object.extend("Subscriptions");
    const Like = new Query();
    const LikeQuery = new Moralis.Query(Query);
    LikeQuery.equalTo("Followed", subscribed);
    LikeQuery.equalTo("Follower", subscriber);
    const results5 = await LikeQuery.find();
    for (let i = 0; i < results5.length; i++) {
      console.log("aaaaaaaaaaa");
      this.setState({ subscribed: true });
      console.log("subscribe", this.state.subscribed);
    }
  };
  render() {
    const LogOut = async () => {
      console.log("selman");
      localStorage.setItem("userId", "Not Set");
      window.location.reload();
    };
    const Follow = async () => {
      const Followed = localStorage.getItem("ClickedProfile");
      const Follower = this.state.FollowerName;
      console.log(Followed, Follower);
      const Query = Moralis.Object.extend("Follows");
      const Like = new Query();
      const LikeQuery = new Moralis.Query(Query);
      LikeQuery.equalTo("Followed", Followed);
      LikeQuery.equalTo("Follower", Follower);
      const results = await LikeQuery.find();
      console.log("test");
      for (let i = 0; i < results.length; i++) {
        console.log("aaaaaaaaaaa");
        this.setState({ LikeFound: true });
      }
      if (this.state.LikeFound == false) {
        console.log("Lİke not fouund");
        const PostQuery = Moralis.Object.extend("Users");
        const PostQuery2 = new Moralis.Query(PostQuery);
        PostQuery2.equalTo("username", Followed);
        Like.set("Follower", Follower);
        Like.set("Followed", Followed);
        await Like.save();
        const results = await PostQuery2.find();
        for (let i = 0; i < results.length; i++) {
          const object = results[i];
          console.log(object.get("followers"));
          object.set("followers", object.get("followers") + 1);
          await object.save();
        }
        const results2 = await PostQuery2.find();
        for (let i = 0; i < results2.length; i++) {
          console.log("aaaaaaaa");
          const object = results2[i];
          console.log(object.get("following"));
          object.set("following", object.get("following") + 1);
          await object.save();
        }
      } else {
        console.log("Lİke fouund"); ///////_User için de aynı şeyler
        const PostQuery = Moralis.Object.extend("Users");
        const PostQuery2 = new Moralis.Query(PostQuery);
        const PostQueryz = Moralis.Object.extend("_User");
        const PostQueryz2 = new Moralis.Query(PostQueryz);
        PostQuery2.equalTo("username", Followed);
        PostQueryz2.equalTo("username", Followed);
        const results = await PostQuery2.find();
        const results2 = await PostQueryz2.find();
        for (let i = 0; i < results.length; i++) {
          const object = results[i];
          console.log(object.get("followers"));
          object.set("followers", object.get("followers") - 1);
          await object.save();
        }
        for (let i = 0; i < results2.length; i++) {
          const object = results2[i];
          console.log(object.get("followers"));
          object.set("followers", object.get("followers") - 1);
          await object.save();
        }
        const Query = Moralis.Object.extend("Follows");
        const Like = new Query();
        const LikeQuery = new Moralis.Query(Query);
        LikeQuery.equalTo("Followed", Followed);
        LikeQuery.equalTo("Followed", Followed);
        const resultsLike = await LikeQuery.find();
        for (let i = 0; i < resultsLike.length; i++) {
          const object = resultsLike[i];
          console.log("likekaldır", object);
          object.destroy();
          window.location.reload();
        }
      }
      window.location.reload();
    };
    const Monetize = async () => {};
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
                  <div className="ProfileDetails">
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

                        <button className="SetUpBtn" onClick={Monetize}>
                          Subscribe
                        </button>
                        <button className="SetUpBtn" onClick={Follow}>
                          Follow
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
                        <Link className="Link" to="/ForeignProfile">
                          Post
                        </Link>

                        <Link className="Link" to="/ForeignProfileComments">
                          Comments
                        </Link>
                        <Link className="Link" to="/ForeignMonetized">
                          Monetized
                        </Link>
                      </div>
                    </div>
                    <div className="ProfileSection">
                      {this.state.post.map((value, index) => {
                        const PosterPP2 = "PosterPP" + (value - 1).toString();
                        const PostText2 = "PostText" + (value - 1).toString();
                        const LikeCount2 = "LikeCount" + (value - 1).toString();
                        const CommentCount2 =
                          "CommentCount" + (value - 1).toString();
                        const PosterName2 =
                          "PosterName" + (value - 1).toString();
                        const PosterTag2 = "PosterTag" + (value - 1).toString();
                        const Price2 = "Price" + (value - 1).toString();
                        const PostId2 = "PostId" + (value - 1).toString();
                        if (this.state.subscribed == true) {
                          return (
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "center",
                                width: "100%",
                              }}
                            >
                              <MonetizedPost
                                key={index}
                                PosterPP={this.state[PosterPP2]}
                                PostText={this.state[PostText2]}
                                LikeCount={this.state[LikeCount2]}
                                CommentCount={this.state[CommentCount2]}
                                PosterName={this.state[PosterName2]}
                                PosterTag={this.state[PosterTag2]}
                                Price={this.state[Price2]}
                                PostId={this.state[PostId2]}
                              />
                            </div>
                          );
                        }
                      })}
                      {this.state.logArray.map((value, index) => {
                        if (this.state.subscribed == false) {
                          return (
                            <h2
                              style={{
                                color: "white",
                                alignSelf: "center",
                                marginTop: "30px",
                              }}
                            >
                              You are not subscribed to this account
                            </h2>
                          );
                        }
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
