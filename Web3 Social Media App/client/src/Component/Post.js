import React, { Component } from "react";
import "../CSS/main.css";
import { Moralis } from "moralis";
import { Link } from "react-router-dom";
Moralis.initialize("EOyzbfoz7b7uOcVvVWxEWrnIYHw7Q4MuOjX1Ce5u"); // Application id from moralis.io
Moralis.serverURL = "https://0kekamgqztbe.usemoralis.com:2053/server"; //Server url from moralis.io
class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      LikeFound: false,
    };
  }
  render() {
    let {
      PosterPP,
      PostText,
      PosterName,
      PosterTag,
      LikeCount,
      CommentCount,
      Price,
      PostId,
      Mediated = "none",
      MediaSource,
    } = this.props;
    if (Price == 0) {
      Price = "Not Minted";
    } else {
      Price = Price + " ETH";
    }
    const Like = async () => {
      console.log(localStorage.getItem("userId"));
      const Query = Moralis.Object.extend("Likes");
      const Like = new Query();
      const LikeQuery = new Moralis.Query(Query);
      LikeQuery.equalTo("LikedPost", PostId);
      LikeQuery.equalTo("LikerId", localStorage.getItem("userId"));
      const results = await LikeQuery.find();
      for (let i = 0; i < results.length; i++) {
        console.log("aaaaaaaaaaa");
        this.setState({ LikeFound: true });
      }
      if (this.state.LikeFound == false) {
        console.log("Lİke not fouund");
        const PostQuery = Moralis.Object.extend("Posts");
        const PostQuery2 = new Moralis.Query(PostQuery);
        PostQuery2.equalTo("PostId", PostId);
        Like.set("LikerId", localStorage.getItem("userId"));
        Like.set("LikedPost", PostId);
        await Like.save();
        const results = await PostQuery2.find();
        for (let i = 0; i < results.length; i++) {
          const object = results[i];
          console.log(object.get("LikeCount"));
          object.set("LikeCount", object.get("LikeCount") + 1);
          await object.save();
        }
      } else {
        console.log("Lİke fouund");
        const PostQuery = Moralis.Object.extend("Posts");
        const PostQuery2 = new Moralis.Query(PostQuery);
        PostQuery2.equalTo("PostId", PostId);
        const results = await PostQuery2.find();
        for (let i = 0; i < results.length; i++) {
          const object = results[i];
          console.log(object.get("LikeCount"));
          object.set("LikeCount", object.get("LikeCount") - 1);
          await object.save();
        }
        const Query = Moralis.Object.extend("Likes");
        const Like = new Query();
        const LikeQuery = new Moralis.Query(Query);
        LikeQuery.equalTo("LikedPost", PostId);
        LikeQuery.equalTo("LikerId", localStorage.getItem("userId"));
        const resultsLike = await LikeQuery.find();
        for (let i = 0; i < resultsLike.length; i++) {
          const object = resultsLike[i];
          console.log("likekaldır", object);
          await object.destroy();

          console.log("destroy");

          window.location.reload();
        }
      }
      window.location.reload();
    };
    const OnClick = async () => {
      console.log("div");
      localStorage.setItem("PostId", PostId);
    };
    const ClickProfile = async () => {
      console.log("Profile");
      localStorage.setItem("ClickedProfile", PosterName);
    };
    return (
      <div onClick={OnClick} className="TimeLinePost">
        <Link style={{ textDecoration: "none" }} to="/Post">
          <div style={{ display: "flex", flexDirection: "row" }}>
            <Link to="ForeignProfile">
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
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <h3>{PostText}</h3>
                  <img
                    style={{
                      display: Mediated,
                      height: "100%",
                      width: "100%",
                      borderRadius: "20px",
                      justifySelf: "center",
                      marginBottom: "20px",
                    }}
                    src={MediaSource}
                  />
                </div>
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
          >
            <div>
              <i class="fa-solid fa-comment fa-xl"></i> {CommentCount}
            </div>
            <Link style={{ textDecoration: "none", color: "white" }} to="/">
              <div onClick={Like}>
                <i style={{ color: "red" }} class="fa-solid fa-heart fa-xl"></i>
                {LikeCount}
              </div>
            </Link>
            <button
              className="Btn2"
              style={{ fontSize: "16px", width: "80px" }}
            >
              {Price}
            </button>
          </div>
        </Link>
      </div>
    );
  }
}

export default Post;
