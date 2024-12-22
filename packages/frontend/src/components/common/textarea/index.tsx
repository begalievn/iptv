import clsx from "clsx";
import React, { forwardRef } from "react";
import s from "./styles.module.scss";

interface CustomTextAreaFieldProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

const TextAreaField = forwardRef<HTMLTextAreaElement, CustomTextAreaFieldProps>(
  (props, forwardedRef) => {
    const { label, error, value, onChange, className, ...rest } = props;
    const classNames = clsx(
      s["textarea"],
      {
        [s["error"]]: error,
      },
      className
    );

    return (
      <div className={s["wrapper"]}>
        {label && <label className={s["label"]}>{label}</label>}
        <textarea
          value={value}
          onChange={onChange}
          className={classNames}
          ref={forwardedRef}
          {...rest}
        />
        {error && <span className={s["error-msg"]}>{error}</span>}
      </div>
    );
  }
);

TextAreaField.displayName = 'TextAreaField';

export default TextAreaField;
