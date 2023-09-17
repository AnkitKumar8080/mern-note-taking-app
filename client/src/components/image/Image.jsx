import React from "react";
import "./Image.css";

export default function Image({ file }) {
  return (
    <>
      <img
        src={URL.createObjectURL(file)}
        className="writeImg"
        alt={file.name}
      />
    </>
  );
}
