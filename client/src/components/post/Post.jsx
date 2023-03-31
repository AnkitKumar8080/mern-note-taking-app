import "./post.css";
import { Link } from "react-router-dom";
export default function Post({ post }) {
  const PF = "http://localhost:5000/images/";
  return (
    <div className="post">
      {post.photo && (
        <Link className="link" to={`/post/${post._id}`}>
          <img src={PF + post.photo[0]} alt="post img" className="postImg" />
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
