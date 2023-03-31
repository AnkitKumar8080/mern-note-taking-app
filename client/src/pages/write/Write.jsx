import "./write.css";
import { useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { Context } from "../../context/Context";
import FormData from "form-data";
import { BiImageAdd } from "react-icons/bi";
import { RxCross2 } from "react-icons/rx";
import Image from "../../components/image/Image";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
// import required modules
import { Pagination } from "swiper";

export default function Write() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const { user } = useContext(Context);
  const [postImgs, setPostImgs] = useState([]);
  // the main raw fileList will be stored in this file list state
  const [fileList, setfileList] = useState([]);
  const handleImgPost = async () => {};
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      username: user.username,
      title,
      desc,
    };
    if (fileList) {
      const data = new FormData();
      for (let i = 0; i < fileList.length; i++) {
        data.append("file", fileList[i]);
      }
      let uploadImgArray = [];
      for (let i = 0; i < fileList.length; i++) {
        uploadImgArray.push(fileList[i].name);
      }
      setPostImgs(uploadImgArray);
      newPost.photo = uploadImgArray;
      try {
        await axios.post("/api/upload", data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      } catch (err) {}
    }
    try {
      const res = await axios.post("/api/posts", newPost);
      window.location.replace("/post/" + res.data._id);
    } catch (err) {}
  };
  const handleFileInputChange = (e) => {
    setfileList([...fileList, e.target.files[0]]);
  };
  // console.log(fileList);
  const handleRemoveImg = (index) => {
    setfileList(fileList.filter((item, i) => i !== index));
  };

  return (
    <div className="write">
      <form
        encType="multipart/form-data"
        className="writeForm"
        onSubmit={handleSubmit}
      >
        <div className="insImg">
          <Swiper
            slidesPerView={3}
            spaceBetween={30}
            pagination={{
              clickable: true,
            }}
            modules={[Pagination]}
            className="mySwiper"
          >
            {fileList?.map((file, index) => (
              <SwiperSlide>
                <div className="insImgChild">
                  {<Image key={index} file={file} />}
                  <RxCross2
                    className="removeImg"
                    onClick={() => handleRemoveImg(index)}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="addImg">
            <label htmlFor="fileInput">
              <BiImageAdd style={{ fontSize: "30px", cursor: "pointer" }} />
            </label>
          </div>
        </div>
        <div className="writeFormGroup">
          <input
            type="file"
            id="fileInput"
            style={{ display: "none" }}
            onChange={handleFileInputChange}
          />
          <input
            type="text"
            placeholder="Title"
            className="writeInput"
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="writeFormGroup">
          <textarea
            className="writeText writeInput"
            placeholder="Tell your story ..."
            onChange={(e) => setDesc(e.target.value)}
          ></textarea>
        </div>
        <button className="writeSubmit" type="submit">
          Publish
        </button>
      </form>
    </div>
  );
}
