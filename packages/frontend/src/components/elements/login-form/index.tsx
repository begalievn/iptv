import React, { FC, useState } from "react";
import { useFormFields } from "../../../infrastructure/hooks/use-form-fields";
import { useAuth } from "../../../infrastructure/contexts/auth-context";
import {
  doSendLinkToEmail,
  doSignInWithGoogle,
} from "../../../infrastructure/firebase/auth";
import { onError } from "../../../lib/error-lib";
import { Navigate } from "react-router-dom";
import InputField from "../../common/input";
import Button from "../../common/button";
import { routes } from "../../../infrastructure/consts/routes";
import s from "./styles.module.scss";

interface ILoginFormProps {
  mode: "signup" | "login";
}

const LoginForm: FC<ILoginFormProps> = (props) => {
  const { mode } = props;

  const [fields, handleFieldChange] = useFormFields({
    email: "",
  });
  const [emailSent, setEmailSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const { userLoggedIn } = useAuth();
  const isLogin = mode === "login";

  function validateForm() {
    return fields.email.length > 0;
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log(fields);
    if (loading) {
      return;
    }

    try {
      setLoading(true);
      await doSendLinkToEmail(fields.email);
      setEmailSent(true);
    } catch (err) {
      onError(err);
    } finally {
      setLoading(false);
    }
  }

  const onGoogleSignIn = async () => {
    try {
      if (!loading) {
        await doSignInWithGoogle();
      }
    } catch (err) {
      onError(err);
    }
  };

  if (userLoggedIn) {
    return <Navigate to={routes.home} replace={true} />;
  }

  return (
    <div className={s["login"]}>
      <h1 className={s["title"]}>{isLogin ? "Sign in" : "Sign up"}</h1>
      <form className={s["form"]} onSubmit={handleSubmit}>
        {emailSent ? (
          <div className={s["email-sent"]}>
            {
              "An email has been sent to your email address containing an activation link. Please click on the link to activate your account."
            }
          </div>
        ) : (
          <div className={s["form-box"]}>
            <InputField
              label="Email"
              id="email"
              type="email"
              autoFocus
              onChange={handleFieldChange}
            />
            <div className={s["btns-container"]}>
              <Button
                type="submit"
                disabled={!validateForm()}
                className={s["btn"]}
                isLoading={loading}
              >
                {isLogin ? "Sing in with email" : "Sign up with email"}
              </Button>
              <div className={s["or"]}>
                <div className={s["or-line"]}></div>
                or
                <div className={s["or-line"]}></div>
              </div>
              <Button
                onClick={onGoogleSignIn}
                type="button"
                className={s["btn"]}
              >
                {isLogin ? "Sign in with Google" : "Sign up with Google"}
              </Button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default LoginForm;
