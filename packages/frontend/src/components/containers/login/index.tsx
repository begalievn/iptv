import React, { useState } from "react";
import { Navigate } from "react-router-dom";

import InputField from "../../elements/input";
import Button from "../../elements/button";
import { useAuth } from "../../../infrastructure/contexts/auth-context";
import {
  doSignInWithEmailAndPassword,
  doSignInWithGoogle,
} from "../../../infrastructure/firebase/auth";
import { routes } from "../../../infrastructure/consts/routes";
import s from "./styles.module.scss";
import { onError } from "../../../lib/error-lib";
import { useFormFields } from "../../../infrastructure/hooks/use-form-fields";

export default function Login() {
  const [fields, handleFieldChange] = useFormFields({
    email: "",
    password: "",
  });
  const [isSigningIn, setIsSigningIn] = useState(false);
  const { userLoggedIn } = useAuth();

  function validateForm() {
    return fields.email.length > 0 && fields.password.length > 0;
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log(fields);
    // try {
    //   if (!isSigningIn) {
    //     setIsSigningIn(true);
    //     await doSignInWithEmailAndPassword(fields.email, fields.password);
    //   }
    // } catch (err) {
    //   onError(err);
    // } finally {
    //   setIsSigningIn(false);
    // }
  }

  const onGoogleSignIn = () => {
    try {
      if (!isSigningIn) {
        setIsSigningIn(true);
        doSignInWithGoogle().catch(() => {
          setIsSigningIn(false);
        });
      }
    } catch(err) {
      onError(err);
    }
  };

  if (userLoggedIn) {
    return <Navigate to={routes.home} replace={true} />;
  }

  return (
    <div className={s["login"]}>
      <form className={s["form"]} onSubmit={handleSubmit}>
        <div className={s["form-box"]}>
          <InputField
            label="Email"
            id="email"
            type="email"
            autoFocus
            onChange={handleFieldChange}
          />
          <InputField
            label="Password"
            id="password"
            type="password"
            onChange={handleFieldChange}
          />
          <Button type="submit" disabled={!validateForm()}>
            Login
          </Button>
          <Button onClick={onGoogleSignIn} type="button">
            Sign in with Google
          </Button>
        </div>
      </form>
    </div>
  );
}
