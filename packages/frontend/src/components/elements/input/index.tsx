import clsx from "clsx";
import React from "react";
import s from "./styles.module.scss";

interface CustomInputFieldProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const InputField: React.FC<CustomInputFieldProps> = ({
  label,
  error,
  value,
  onChange,
  className,
  ...rest
}) => {
  const classNames = clsx(
    s["input"],
    {
      [s["error"]]: error,
    },
    className
  );
  return (
    <div className={s['wrapper']}>
      {label && (
        <label className={s['label']}>
          {label}
        </label>
      )}
      <input
        value={value}
        onChange={onChange}
        className={classNames}
        {...rest}
      />
      {error && (
        <span className={s['error-msg']}>{error}</span>
      )}
    </div>
  );
};

export default InputField;
