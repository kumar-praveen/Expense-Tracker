
import { Link } from "react-router-dom";

function Logo() {
  return (
    <Link to="/">
      <img
        src="./images/expense logo.jpg"
        alt="logo"
        className="w-24 rounded-full"
      />
    </Link>
  );
}

export default Logo;
