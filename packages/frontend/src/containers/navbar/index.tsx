import { Link } from "react-router-dom";
import s from "./styles.module.scss";

const Navbar = () => {
  return (
    <div className={s["nav"]}>
      <Link className={s["logo"]} to="/">
        <span>IPTV</span>
      </Link>

      <div className={s["links"]}>
        <Link to="/signup">Signup</Link>
        <Link to="/login">Login</Link>
      </div>
    </div>
  );
};

export default Navbar;
