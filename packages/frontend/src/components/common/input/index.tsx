import clsx from "clsx";
import React, { forwardRef } from "react";
import s from "./styles.module.scss";

interface CustomInputFieldProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const InputField = forwardRef<HTMLInputElement, CustomInputFieldProps>(
  (props, forwardedRef) => {
    const { label, error, className, type, ...rest } = props;
    const classNames = clsx(
      s["input"],
      {
        [s["error"]]: error,
      },
      {
        [s["file"]]: type == "file",
      },
      className
    );
    return (
      <div className={s["wrapper"]}>
        {label && <label className={s["label"]}>{label}</label>}
        <input
          className={classNames}
          type={type}
          ref={forwardedRef}
          {...rest}
        />
        {error && <span className={s["error-msg"]}>{error}</span>}
      </div>
    );
  }
);

InputField.displayName = 'InputField';

export default InputField;
