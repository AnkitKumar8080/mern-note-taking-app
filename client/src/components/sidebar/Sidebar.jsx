import "./sidebar.css";
import {
  FaFacebookSquare,
  FaInstagramSquare,
  FaPinterest,
  FaTwitterSquare,
} from "react-icons/fa";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
export default function Sidebar() {
  const [cat, setCat] = useState([]);
  useEffect(() => {
    const fetchCat = async () => {
      const res = await axios.get("/api/categories");
      setCat(res.data);
    };
    fetchCat();
  }, []);
  return (
    <div className="sidebar">
      <div className="sidebarCatItem">
        <span className="sidebarTitle">Categories</span>
        <ul className="sidebarList">
          {cat.map((c) => (
            <Link className="link" to={`/?cat=${c.name}`}>
              <li className="sidebarListItem">{c.name}</li>
            </Link>
          ))}
        </ul>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">Follow us</span>
        <div className="sidebarSocial">
          <FaFacebookSquare className="sidebarIcon" />
          <FaInstagramSquare className="sidebarIcon" />
          <FaPinterest className="sidebarIcon" />
          <FaTwitterSquare className="sidebarIcon" />
        </div>
      </div>
    </div>
  );
}
