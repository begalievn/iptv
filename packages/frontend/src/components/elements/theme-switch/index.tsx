import React from "react";
import s from './styles.module.scss';
import { useTheme } from "../../../infrastructure/contexts/theme-context";

const ThemeSwitch: React.FC = () => {
  const { darkTheme, toggleTheme } = useTheme();

  return (
    <div className={s["theme-switch"]}>
      <label className={s['switch']}>
        <input
          type="checkbox"
          checked={darkTheme}
          onChange={toggleTheme}
        />
        <span className={s["slider"]}></span>
      </label>
    </div>
  );
};

export default ThemeSwitch;
