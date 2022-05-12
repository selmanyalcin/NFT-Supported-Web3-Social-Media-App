import React, { Component } from "react";
import "../CSS/main.css";
import { Moralis } from "moralis";
Moralis.initialize("EOyzbfoz7b7uOcVvVWxEWrnIYHw7Q4MuOjX1Ce5u"); // Application id from moralis.io
Moralis.serverURL = "https://0kekamgqztbe.usemoralis.com:2053/server"; //Server url from moralis.io

class Share extends React.Component {
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
    const Share2 = async () => {
      let PpLink = "";
      let Name = "";
      let Tag = "";
      const userId = localStorage.getItem("userId");
      const Post = Moralis.Object.extend("Posts");
      const Get = Moralis.Object.extend("_User");
      const query = new Moralis.Query(Get);
      query.equalTo("objectId", userId);
      console.log(document.getElementById("PostText1").value);
      const results = await query.find();
      for (let i = 0; i < results.length; i++) {
        const object = results[i];
        PpLink = object.get("ProfilePicture").url();
        Name = object.get("username");
        Tag = object.get("userTag");
        console.log(object.get("userTag"), object.get("username"));
      }
      const Post1 = new Post();
      Post1.set("PosterPP", PpLink);
      Post1.set("PostText", document.getElementById("PostText1").value);
      Post1.set("LikeCount", 0);
      Post1.set("CommentCount", 0);
      Post1.set("PosterName", Name);
      Post1.set("PosterTag", Tag);
      Post1.set("Price", 0);
      Post1.set("PostId", this.state.PostCount + 1);
      Post1.set("Mediated", false);
      Post1.set("Minted", false);
      Post1.set("IDs", 0);
      const fileUploadControl = document.getElementById("file");
      if (fileUploadControl.files.length > 0) {
        const file = fileUploadControl.files[0];
        const name = "photo.jpg";
        const moralisFile = new Moralis.File(name, file);
        Post1.set("ProfilePicture", moralisFile);
        Post1.set("Mediated", true);
      }
      await Post1.save();
    };
    return (
      <div>
        <div className="PostArea">
          <div className="Post">
            <div className="Post1">
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
              <input id="PostText1" placeholder="Share Something..." />
            </div>
            <div className="Post2">
              <div style={{ paddingLeft: "3%" }}>
                <div class="file-input">
                  <input type="file" id="file" class="file" />
                  <label for="file">Select file</label>
                </div>
              </div>
              <div></div>
              <div
                onClick={Share2}
                className="Btn2"
                style={{
                  height: "50px",
                  width: "60px",
                  color: "black",
                  textAlign: "center",
                  verticalAlign: "middle",
                  lineHeight: "50px",
                }}
              >
                Share
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Share;
