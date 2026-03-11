import girl from "../../../assets/images/gilrphoto.webp"
import boy from "../../../assets/images/boy.webp"
import { useLocation } from "react-router-dom";

export default function Header({text1,text2,paragraph}:{text1:string,text2:string,paragraph:string}) {
  const {pathname}=useLocation()

  return (
    <div
      className="w-100 d-flex flex-column flex-md-row align-items-center justify-content-between rounded-4 mb-4 mt-4 p-3 p-md-5 gap-3"
      style={{
        backgroundImage:"linear-gradient(45deg, rgba(0,146,71,0.8), rgba(0,146,71,1)), url(/react.svg)",
        minHeight:"220px"
      }}
    >

      {/* text */}
      <div className="text-center text-md-start">
        <h1 className="text-light">
          {text1} <span className="fw-light">{text2}</span>
        </h1>

        <p className="text-white-50 m-0 mt-2">
          {paragraph}
        </p>
      </div>

      {/* image */}
      <div className="rounded-circle overflow-hidden" style={{width:"120px",height:"120px"}}>
        <img
          loading="lazy"
          src={pathname==="/dashboard"?girl:boy}
          alt="header_img"
          className="img-fluid w-100 h-100"
        />
      </div>

    </div>
  );
}