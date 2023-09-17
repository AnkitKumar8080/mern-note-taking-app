import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import Posts from "../../components/posts/Posts";
import "./home.css";
import { useLocation } from "react-router-dom";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const { search } = useLocation();
  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/posts` + search
      );
      setPosts(res.data);
    };
    fetchPosts();
  }, [search]);
  return (
    <>
      <div className="home">
        <Posts posts={posts} />
      </div>
    </>
  );
}
