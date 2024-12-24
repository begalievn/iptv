import { Link } from "react-router-dom";
import { useAuth } from "../../../infrastructure/contexts/auth-context";
import { routes } from "../../../infrastructure/consts/routes";
import InnerContainer from "../inner-container";
import s from "./styles.module.scss";

const Navbar = () => {
  const { userLoggedIn, loading } = useAuth();

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
                <Link to={routes.profile} className={s['link']}>
                  Profile
                </Link>
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
