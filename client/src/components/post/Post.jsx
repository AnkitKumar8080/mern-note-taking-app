import "./post.css";
import { Link } from "react-router-dom";
export default function Post({ post }) {
  // fetching images url from .env file
  const PF = process.env.REACT_APP_PF;
  return (
    <div className="post">
      {post.photo && (
        <Link className="link" to={`/post/${post._id}`}>
          {post.photo[0] ? (
            <img src={PF + post.photo[0]} alt="post img" className="postImg" />
          ) : (
            <img src={PF + "noImg.png"} alt="post img" className="postImg" />
          )}
        </Link>
      )}

      <div className="postInfo">
        <div className="postCats">
          {post.categories.map((cat) => (
            <span className="postCat">{cat.name}</span>
          ))}
        </div>
        <Link className="link" to={`/post/${post._id}`}>
          <span className="postTitle">{post.title}</span>
        </Link>
        <hr />
        <span className="postDate">
          {new Date(post.createdAt).toDateString()}
        </span>
        {/* <p className="postDesc">{post.desc}</p> */}
      </div>
    </div>
  );
}
