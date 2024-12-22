import React, { FC } from "react";
import s from './styles.module.scss';
import clsx from "clsx";

interface IInnerContainerProps {
  children: React.ReactNode;
  className?: string;
}

const InnerContainer: FC<IInnerContainerProps> = (props) => {
  const { children, className } = props;
  const classNames = clsx(s['inner-container'], className);

  return <div className={classNames}>{children}</div>;
};

export default InnerContainer;
