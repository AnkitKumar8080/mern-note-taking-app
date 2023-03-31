import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import Header from "../../components/header/Header";
import Posts from "../../components/posts/Posts";
import Sidebar from "../../components/sidebar/Sidebar";
import "./home.css";
import { useLocation } from "react-router-dom";
import { BiCategory } from "react-icons/bi";
import { RxCross2 } from "react-icons/rx";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const { search } = useLocation();
  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get("/api/posts" + search);
      setPosts(res.data);
    };
    fetchPosts();
  }, [search]);
  const [isSidebar, setIsSidebar] = useState(false);
  const handleMenu = () => {
    setIsSidebar(!isSidebar);
  };
  return (
    <>
      <Header />
      <div className="home">
        {isSidebar ? (
          <RxCross2 className="catMenu" onClick={handleMenu} />
        ) : (
          <BiCategory className="catMenu" onClick={handleMenu} />
        )}
        <Posts posts={posts} />
        {isSidebar && <Sidebar />}
      </div>
    </>
  );
}
