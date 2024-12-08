import React from "react";
import s from "./styles.module.scss";

const Home = () => {
  return (
    <div className={s["home"]}>
      <div className={s["lander"]}>
        <h1 className={s["title"]}>IPTV</h1>
        <p className={s["description"]}>Streaming service</p>
      </div>
    </div>
  );
};

export default Home;
