import "./singleImg.css";
export default function SingleImg({ imageUrl }) {
  const PF = process.env.REACT_APP_PF;
  return (
    <>
      <img className="singleImg" src={PF + imageUrl} alt={imageUrl} />
    </>
  );
}
