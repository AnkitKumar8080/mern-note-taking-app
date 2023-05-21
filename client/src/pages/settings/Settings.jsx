import "./settings.css";
import { FaUserCircle } from "react-icons/fa";
import { useContext } from "react";
import { Context } from "../../context/Context";
import axios from "axios";
import { useState } from "react";
export default function Settings() {
  const { user, dispatch } = useContext(Context);
  const [file, setFile] = useState(null);
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const handleSubmit = async (e) => {
    dispatch({ type: "UPDATE_START" });
    e.preventDefault();
    const updatedUser = {
      userId: user._id,
      username,
      email,
    };
    if (file) {
      const data = new FormData();
      data.append("file", file);
      updatedUser.profilePic = file.name;
      try {
        await axios.post("/api/upload", data);
      } catch (err) {}
    }
    try {
      if (password) {
        updatedUser.password = password;
      }
      const res = await axios.put("/api/users/" + user._id, updatedUser);
      setSuccess(true);
      dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
    } catch (err) {
      dispatch({ type: "UPDATE_FAILURE" });
    }
  };
  const handleDelete = async () => {
    try {
      await axios.delete("api/users/" + user._id, {
        data: { userId: user._id },
      });
      window.location.reload();
      localStorage.clear();
    } catch (err) {
      console.log(err);
    }
  };
  const PF = process.env.REACT_APP_PF;
  return (
    <div className="settings">
      <div className="settingsWrapper">
        <div className="settingsTitle">
          <span className="settingsUpdateTitle">Update Account</span>
          <span className="settingsDeleteTitle" onClick={handleDelete}>
            Delete Account
          </span>
        </div>
        <div className="asdf">
          <div className="settingsPP">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : user.profilePic
                  ? PF + user.profilePic
                  : PF + "/noProf.png"
              }
              alt="ppImg"
            />
            <label htmlFor="fileInput">
              <FaUserCircle className="settingsPPIcon" />
            </label>

            <input
              type="file"
              id="fileInput"
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
          <form className="settingsForm" onSubmit={handleSubmit}>
            <label>Username</label>
            <input
              type="text"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
            />
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter new password...."
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="off"
            />
            <button type="submit" className="settingsSubmit">
              Update
            </button>
            {success && (
              <span
                style={{
                  marginTop: "20px",
                  color: "teal",
                  alignSelf: "center",
                }}
              >
                profile has been updated.
              </span>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
