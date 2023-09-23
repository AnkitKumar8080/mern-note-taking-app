import "./singlePost.css";
import { TbEdit } from "react-icons/tb";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { useContext } from "react";
import { Context } from "../../context/Context";
import SingleImg from "../singleImg/SingleImg";
import { ImCross } from "react-icons/im";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
// import required modules
import { Pagination } from "swiper";
import { Editor } from "@tinymce/tinymce-react";
export default function SinglePost() {
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [post, setPost] = useState({});
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [updateMode, setUpdateMode] = useState(false);
  const [isViewImg, setIsViewImg] = useState(false);
  const [viewImgUrl, setViewImgUrl] = useState(false);
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/api/posts/` + path
        );
        setPost(res.data);
        setTitle(res.data.title);
        setDesc(res.data.desc);
      } catch (err) {
        console.log(err);
      }
    };
    fetchPost();
  }, [path]);
  const PF = process.env.REACT_APP_PF;
  const { user } = useContext(Context);
  const handleDelete = async () => {
    try {
      if (user.isAdmin) {
        await axios.delete(
          `${process.env.REACT_APP_BASE_URL}/api/posts/${path}?us=${user._id}`,
          {
            data: { username: user.username },
          }
        );
      } else {
        await axios.delete(
          `${process.env.REACT_APP_BASE_URL}/api/posts/${path}`,
          {
            data: { username: user.username },
          }
        );
      }
      window.location.replace("/");
    } catch (err) {}
  };
  const handleUpdate = async () => {
    try {
      await axios.put(
        `${process.env.REACT_APP_BASE_URL}/api/posts/${path}?us=${user._id}`,
        {
          username: user.username,
          title,
          desc,
        }
      );

      // window.location.reload();
      setUpdateMode(false);
    } catch (err) {}
  };
  const handleViewImg = (post) => {
    setIsViewImg(true);
    setViewImgUrl(post);
  };

  const handleCloseImg = () => {
    setIsViewImg(false);
  };
  const [slidesPerView, setSlidesPerView] = useState(3);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1528) setSlidesPerView(3);
      else if (window.innerWidth >= 1000) setSlidesPerView(2);
      else setSlidesPerView(1);
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
        <div className="singlePostImgCont">
          <Swiper
            slidesPerView={slidesPerView}
            spaceBetween={30}
            pagination={{
              clickable: true,
            }}
            modules={[Pagination]}
            className="mySwiper"
          >
            {post.photo?.map((post, index) => (
              <SwiperSlide>
                <div
                  className="singlePostWrapperChild"
                  onClick={() => handleViewImg(post)}
                >
                  <SingleImg key={index} imageUrl={post} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        {updateMode ? (
          <>
            <button className="cancelBtn" onClick={() => setUpdateMode(false)}>
              cancel
            </button>
            <input
              type="text"
              value={title}
              className="singlePostTitleInput "
              autoFocus
              onChange={(e) => setTitle(e.target.value)}
            />
          </>
        ) : (
          <h1 className="singlePostTitle">
            {title}
            {(post.username === user?.username || user?.isAdmin) && (
              <div className="singlePostEdit">
                <TbEdit
                  className="singlePostIcon"
                  onClick={() => setUpdateMode(true)}
                />
                <RiDeleteBin6Line
                  className="singlePostIcon"
                  onClick={handleDelete}
                />
              </div>
            )}
          </h1>
        )}
        <div className="singlePostInfo">
          <span className="singlePostAuthor">
            Author:
            <Link className="link" to={`/?user=${post.username}`}>
              <b>{post.username}</b>
            </Link>
          </span>
          <span className="singlePostDate">
            {new Date(post.createdAt).toDateString()}
          </span>
        </div>
        {updateMode ? (
          // <textarea
          //   className="singlePostDescInput"
          //   value={desc}
          //   onChange={(e) => setDesc(e.target.value)}
          // />
          <Editor
            className="singlePostDescInput"
            value={desc}
            apiKey="dgqqx79uf4o19y15a5ooz82lt8orrnwq3f8yn9hsexxplmd3"
            handleResize="none"
            init={{
              height: 500,
              menubar: false,
              directionality: "ltr",
              max_height: "50vh",
              resize: false,
              plugins:
                "mentions anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed permanentpen footnotes advtemplate advtable advcode editimage tableofcontents mergetags powerpaste tinymcespellchecker autocorrect a11ychecker typography inlinecss",
              toolbar:
                "undo redo | formatselect | " +
                "bold italic backcolor " +
                "fontsize | fontsizeinput" +
                "alignleft aligncenter " +
                "alignright alignjustify | bullist numlist outdent indent | " +
                "removeformat",
              content_style:
                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
            }}
            onEditorChange={(newText) => setDesc(newText)}
          />
        ) : (
          // < readOnly className="singlePostDesc" value={desc}></>
          <div
            className="singlePostDesc"
            dangerouslySetInnerHTML={{ __html: desc }}
          />
        )}
        {updateMode && (
          <button className="singlePostButton" onClick={handleUpdate}>
            Update
          </button>
        )}
      </div>
      <div className={`singleImgViewer ${isViewImg ? "" : "hide"}`}>
        <ImCross className="imgClose" onClick={handleCloseImg} />
        <img src={PF + viewImgUrl} alt="" />
      </div>
    </div>
  );
}
