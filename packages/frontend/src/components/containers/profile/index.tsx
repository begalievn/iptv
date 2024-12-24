import clsx from "clsx";
import Button from "../../common/button";
import ThemeSwitch from "../../elements/theme-switch";
import { doSignOut } from "../../../infrastructure/firebase/auth";
import { useAuth } from "../../../infrastructure/contexts/auth-context";
import { useUserMutation } from "../../../infrastructure/hooks/mutations/use-user-mutation";
import s from "./styles.module.scss";

const Profile = () => {
  const { currentUser } = useAuth();
  const logoutBtnClassNames = clsx(s["btn"], s["logout"]);
  const deleteAccountBtnClassNames = clsx(s["btn"], s["delete"]);

  const { useDeleteUserMutation } = useUserMutation();
  const { mutateAsync, isPending, error } = useDeleteUserMutation();

  console.log("currentUser", currentUser);

  async function handleLogout() {
    await doSignOut();

  }

  async function handleDelete() {
    await mutateAsync();
    await doSignOut();
  }

  return (
    <div className={s["profile"]}>
      <h1 className={s["title"]}>Profile</h1>
      <div className={s["profile-content"]}>
        <div className={s["fields"]}>
          <div className={s["avatar-box"]}>
            <img src={currentUser?.photoURL || ""} className={s["avatar"]} />
          </div>
          <div className={s["field"]}>
            <label className={s["label"]}>Fullname</label>
            <p>{currentUser?.displayName}</p>
          </div>
          <div className={s["field"]}>
            <label className={s["label"]}>Email</label>
            <p>{currentUser?.email}</p>
          </div>
          <div className={s["field"]}>
            <label className={s["label"]}>Dark theme</label>
            <div>
              <ThemeSwitch />
            </div>
          </div>
        </div>

        <div className={s["actions"]}>
          <Button onClick={handleLogout} className={logoutBtnClassNames}>
            Logout
          </Button>
          <Button
            onClick={handleDelete}
            className={deleteAccountBtnClassNames}
            isLoading={isPending}
          >
            Delete Account
          </Button>
          { error && <p className={s['error']}>{error.message}</p> }
        </div>
      </div>
    </div>
  );
};

export default Profile;
