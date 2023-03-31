import "./singleImg.css";
export default function SingleImg({ imageUrl }) {
  const PF = "http://localhost:5000/images/";
  return (
    <>
      <img className="singleImg" src={PF + imageUrl} alt={imageUrl} />
    </>
  );
}
