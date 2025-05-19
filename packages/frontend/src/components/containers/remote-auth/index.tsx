import { FC } from "react";
import Button from "../../common/button";
import s from "./styles.module.scss";
import { useNavigate, useSearchParams } from "react-router-dom";
import { routes } from "../../../infrastructure/consts/routes";

const RemoteAuth: FC = () => {
  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");
  const navigate = useNavigate();

  const handleCancel = () => {
    navigate(routes.home);
  }

  return (
    <div className={s["remote-auth-container"]}>
      {code ? (
        <>
          <h2 className={s["title"]}>Do you want to login to AppleTV?</h2>
          <div className={s["actions"]}>
            <Button className={s["btn"]}>Yes</Button>
            <Button onClick={handleCancel} variant="danger" className={s["btn"]}>
              No
            </Button>
          </div>
        </>
      ) : (
        <p className={s["no-code"]}>No code was provided</p>
      )}
    </div>
  );
};

export default RemoteAuth;
