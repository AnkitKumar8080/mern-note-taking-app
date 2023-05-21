import "./topbar.css";
import { AiOutlineUser } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../../context/Context";

export default function Topbar() {
  const { user, dispatch } = useContext(Context);
  const handleLogout = () => {
    dispatch({
      type: "LOGOUT",
    });
  };
  const logo = process.env.REACT_APP_LOGO;
  const PF = process.env.REACT_APP_PF;
  return (
    <div className="top">
      <div className="topLeft">
        <img className="logo" src={logo} alt="" />
      </div>
      <div className="topCenter">
        <ul className="topList">
          <li className="topListItem">
            <Link className="link" to="/">
              Home
            </Link>
          </li>
          <li className="topListItem">
            <Link className="link" to="/write">
              Write
            </Link>
          </li>
          <li
            style={{ color: "red" }}
            className="topListItem"
            onClick={handleLogout}
          >
            {user ? "Logout" : ""}
          </li>
        </ul>
      </div>
      <div className="topRight">
        {user ? (
          user.profilePic ? (
            <Link to="/settings" className="link settingLink">
              <img src={PF + user.profilePic} alt="sdf" className="topImg" />
              <p>{user.username.charAt(0).toUpperCase()+user.username.slice(1)}</p>
            </Link>
          ) : (
            <Link to="/settings" className="link">
              <AiOutlineUser className="topImg" />
            </Link>
          )
        ) : (
          <>
            <li className="topListItem">
              <Link className="link" to="/login">
                Login
              </Link>
            </li>
            <li className="topListItem">
              <Link className="link" to="/register">
                Register
              </Link>
            </li>
          </>
        )}
        {/* <FaSearch className="topSearchIcon" /> */}
      </div>
    </div>
  );
}
