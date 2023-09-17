import "./write.css";
import { useEffect, useState } from "react";
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
import { useNavigate } from "react-router-dom";

import { dataUrlToFile, fileToDataUrl } from "../../utils/fileUrlConversion";

export default function Write() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const { user } = useContext(Context);
  const navigate = useNavigate();

  // the main raw fileList will be stored in this file list state
  const [fileList, setfileList] = useState([]);
  // loading the data from local storage on page load
  useEffect(() => {
    const savedTitle = localStorage.getItem("savedTitle");
    const savedDesc = localStorage.getItem("savedDesc");
    const dataUrls = JSON.parse(localStorage.getItem("dataURLs"));
    if (savedTitle) setTitle(savedTitle);
    if (savedDesc) setDesc(savedDesc);

    if (dataUrls) {
      const filePromises = dataUrls?.map((dataUrl) => {
        return dataUrlToFile(dataUrl.url, dataUrl.fileName)
          .then((file) => {
            return file;
          })
          .catch((error) => {
            console.error("Error in converting file to DataUrl");
            return null;
          });
      });
      Promise.all(filePromises).then((files) => {
        const filteredFiles = files.filter((file) => file !== null);
        setfileList(filteredFiles);
      });
    }
  }, []);

  // saving the data in local storage
  useEffect(() => {
    localStorage.setItem("savedTitle", title);
  }, [title]);

  useEffect(() => {
    localStorage.setItem("savedDesc", desc);
  }, [desc]);

  useEffect(() => {
    const dataUrlsPromises = fileList.map((file) => {
      return fileToDataUrl(file)
        .then((dataURL) => {
          return { url: dataURL, fileName: file.name };
        })
        .catch((error) => {
          console.error("Error converting file to Data URL:", error);
          return null;
        });
    });
    Promise.all(dataUrlsPromises).then((dataUrls) => {
      // Filter out any null values (files with errors)
      const filteredDataUrls = dataUrls.filter((dataUrl) => dataUrl !== null);

      // Store the filteredDataUrls array in local storage
      const dataUrlsJson = JSON.stringify(filteredDataUrls);
      localStorage.setItem("dataURLs", dataUrlsJson);
    });
  }, [fileList]);

  // handling the submit
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
        uploadImgArray.push(fileList[i].name.replace(/\s+/g, "_"));
      }
      newPost.photo = uploadImgArray;
      try {
        await axios.post(`${process.env.REACT_APP_BASE_URL}/api/upload`, data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      } catch (err) {}
    }
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/posts`,
        newPost
      );

      // clear the local storage
      localStorage.removeItem("savedTitle");
      localStorage.removeItem("savedDesc");
      localStorage.removeItem("dataURLs");
      // window.location.replace("/post/" + res.data._id);
      navigate("/post/" + res.data._id);
    } catch (err) {}
  };
  const handleFileInputChange = (e) => {
    const newFile = e.target.files[0];
    setfileList([...fileList, newFile]);
  };
  const handleRemoveImg = (index) => {
    setfileList(fileList.filter((item, i) => i !== index));
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
    <div className="write">
      <form
        encType="multipart/form-data"
        className="writeForm"
        onSubmit={handleSubmit}
      >
        <div className="insImg">
          <Swiper
            slidesPerView={slidesPerView}
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
                  {<Image key={file.name} file={file} />}
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
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="writeFormGroup">
          <textarea
            className="writeText writeInput"
            placeholder="Tell your story ..."
            value={desc}
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
