import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../infrastructure/contexts/auth-context";
import { doSignOut } from "../../../infrastructure/firebase/auth";
import { routes } from "../../../infrastructure/consts/routes";
import s from "./styles.module.scss";

const Navbar = () => {
  const { userLoggedIn } = useAuth();
  const nav = useNavigate();

  async function handleLogout() {
    await doSignOut();
    nav(routes.login);
  }

  return (
    <div className={s["nav"]}>
      <Link className={s["logo"]} to={routes.home}>
        <span>IPTV</span>
      </Link>

      <div className={s["links"]}>
        {userLoggedIn ? (
          <span onClick={handleLogout}>Logout</span>
        ) : (
          <>
            <Link to={routes.signup}>Signup</Link>
            <Link to={routes.login}>Login</Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
