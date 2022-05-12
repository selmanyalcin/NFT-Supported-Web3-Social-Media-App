import React, { Component } from "react";
import "../CSS/main.css";
import { Moralis } from "moralis";
import { Link } from "react-router-dom";
Moralis.initialize("EOyzbfoz7b7uOcVvVWxEWrnIYHw7Q4MuOjX1Ce5u"); // Application id from moralis.io
Moralis.serverURL = "https://0kekamgqztbe.usemoralis.com:2053/server"; //Server url from moralis.io
class Post extends Component {
  render() {
    const { PosterPP, PostText, PosterName, PosterTag } = this.props;
    const OnClick = async () => {
      console.log("div");
    };
    const ClickProfile = async () => {
      console.log("Profile");
      localStorage.setItem("ClickedProfile", PosterName);
    };
    return (
      <div onClick={OnClick} className="TimeLinePost">
        <div style={{ display: "flex", flexDirection: "row" }}>
          <Link to="/ForeignProfile">
            <div onClick={ClickProfile} className="ProfileImage">
              <img
                style={{
                  height: "70px",
                  width: "70px",
                  justifySelf: "center",
                  marginLeft: "5px",
                  borderRadius: "80%",
                }}
                src={PosterPP}
              />
            </div>
          </Link>

          <div className="PostSection">
            <div
              style={{
                backgroundColor: "#16181c",
                display: "flex",
                flexDirection: "row",
                paddingTop: "1%",
                borderRadius: "20px",
              }}
            >
              <h3 style={{ marginLeft: "10px", marginTop: "22px" }}>
                {PosterName}
              </h3>
              <h3
                style={{
                  marginLeft: "5px",
                  color: "gray",
                  marginTop: "22px",
                }}
              >
                @{PosterTag}
              </h3>
            </div>
            <div
              style={{
                backgroundColor: "#16181c",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "left",
                width: "90%",
              }}
            >
              <h3>{PostText}</h3>
            </div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingRight: "20%",
            paddingLeft: "20%",
            paddingBottom: "2%",
            color: "white",
          }}
        ></div>
      </div>
    );
  }
}

export default Post;
