import "./topbar.css";
import {
  FaFacebookSquare,
  FaInstagramSquare,
  FaPinterest,
  FaSearch,
  FaTwitterSquare,
} from "react-icons/fa";
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
  const logo = "http://localhost:5000/images/sdfsdf.png";
  return (
    <div className="top">
      <div className="topLeft">
        {/* <FaFacebookSquare className="topIcon" />
        <FaInstagramSquare className="topIcon" />
        <FaPinterest className="topIcon" />
        <FaTwitterSquare className="topIcon" /> */}
        <img className="logo" src={logo} alt="" />
      </div>
      <div className="topCenter">
        <ul className="topList">
          <li className="topListItem">
            <Link className="link" to="/">
              Home
            </Link>
          </li>
          {/* <li className="topListItem">
            <Link className="link" to="/about">
              About
            </Link>
          </li> */}
          {/* <li className="topListItem">
            <Link className="link" to="/contact">
              Contact
            </Link>
          </li> */}
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
            <Link to="/settings" className="link">
              <img
                src={"http://localhost:5000/images/" + user.profilePic}
                alt="sdf"
                className="topImg"
              />
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
