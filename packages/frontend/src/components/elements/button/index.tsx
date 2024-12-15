import React from "react";
import s from "./styles.module.scss";
import clsx from "clsx";
import LoadingIcon from "../../icons/loading";

interface CustomButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger";
  isLoading?: boolean;
}

const Button: React.FC<CustomButtonProps> = ({
  variant = "primary",
  isLoading = false,
  disabled,
  className,
  children,
  ...rest
}) => {
  const classNames = clsx(
    s["button"],
    s[variant],
    {
      [s["disabled"]]: isLoading || disabled,
    },
    className
  );

  return (
    <button className={classNames} disabled={disabled || isLoading} {...rest}>
      { children }
      { isLoading && <LoadingIcon className={s['spinning']} /> }
    </button>
  );
};

export default Button;
