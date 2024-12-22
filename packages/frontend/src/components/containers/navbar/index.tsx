import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../infrastructure/contexts/auth-context";
import { doSignOut } from "../../../infrastructure/firebase/auth";
import { routes } from "../../../infrastructure/consts/routes";
import InnerContainer from "../inner-container";
import s from "./styles.module.scss";

const Navbar = () => {
  const { userLoggedIn, loading } = useAuth();
  const nav = useNavigate();

  async function handleLogout() {
    await doSignOut();
    nav(routes.login);
  }

  return (
    <div className={s["nav"]}>
      <InnerContainer className={s["box"]}>
        <Link className={s["logo"]} to={routes.home}>
          <span>IPTV</span>
        </Link>
        {loading ? null : (
          <div className={s["links"]}>
            {userLoggedIn ? (
              <>
                <Link to={routes.playlists} className={s["link"]}>
                  Playlists
                </Link>
                <span onClick={handleLogout} className={s["link"]}>
                  Logout
                </span>
              </>
            ) : (
              <>
                <Link to={routes.signup} className={s["link"]}>
                  Signup
                </Link>
                <Link to={routes.login} className={s["link"]}>
                  Login
                </Link>
              </>
            )}
          </div>
        )}
      </InnerContainer>
    </div>
  );
};

export default Navbar;
