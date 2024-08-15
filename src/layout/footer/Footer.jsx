import google from "../../assets/google.jpeg";
import miracleLogoDark from "../../assets/miracle-logo-dark.png";

function Footer() {
  return (
    <div className="w-full h-16 bg-gray-100 shadow-md">
      <div className="flex items-center justify-between h-full">
        {/* Left-aligned text */}
        <div className="flex justify-start flex-1 ml-5">
          <img src={google} alt="Logo" className="w-24 h-13" />
        </div>

        {/* Right-aligned logo */}
        <div className="flex justify-end flex-1 mr-3">
          <img src={miracleLogoDark} alt="Logo" className="h-8 w-28" />
        </div>
      </div>
    </div>
  );
}

export default Footer;
