import { FC } from "react";
import s from "./styles.module.scss";
import PlayIcon from "../icons/play";
import InfoIcon from "../icons/info";
import { Playlist } from "../../../infrastructure/class/playlist";
import { Link } from "react-router-dom";
import { routes } from "../../../infrastructure/consts/routes";

interface IPlaylistItem {
  playlist: Playlist;
}

const PlaylistItem: FC<IPlaylistItem> = (props) => {
  const { playlist } = props;

  return (
    <div className={s["item"]}>
      <Link to={routes.player(playlist.id)} className={s["play-btn"]}>
        <PlayIcon />
      </Link>
      <div className={s["content"]}>
        <p className={s['title']}>{playlist.title}</p>
        <p>{playlist.description}</p>
      </div>
      <Link to={routes.playlistUpdate(playlist.id)} className={s["info"]}>
        <InfoIcon className={s["info-icon"]} />
      </Link>
    </div>
  );
};

export default PlaylistItem;
