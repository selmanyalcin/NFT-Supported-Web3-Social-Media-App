import ReactDOM from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Profile from "./Pages/Profile/Profile";
import ForeignProfile from "./Pages/Profile/ForeignProfile";
import Post from "./Pages/PostPage";
import MonetizedPost from "./Pages/PostPageMonetized";
import ProfileComments from "./Pages/Profile/ProfileComments";
import ForeignProfileComments from "./Pages/Profile/ForeignProfileComments";
import SearchPage from "./Pages/SearchPage";
import ProfileMonetized from "./Pages/Profile/ProfileMonetized";
import ForeignMonetized from "./Pages/Profile/ForeignProfileMonetized";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="Profile" element={<Profile />} />
        <Route path="ForeignProfile" element={<ForeignProfile />} />
        <Route path="Post" element={<Post />} />
        <Route path="ProfileComments" element={<ProfileComments />} />
        <Route
          path="ForeignProfileComments"
          element={<ForeignProfileComments />}
        />
        <Route path="SearchPage" element={<SearchPage />} />
        <Route path="ProfileMonetized" element={<ProfileMonetized />} />
        <Route path="MonetizedPost" element={<MonetizedPost />} />
        <Route path="ForeignMonetized" element={<ForeignMonetized />} />
      </Routes>
    </BrowserRouter>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
