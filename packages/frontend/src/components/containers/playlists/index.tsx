import PlaylistItem from "../../elements/playlist-item";
import { usePlaylistQuery } from "../../../infrastructure/hooks/queries/use-playlist-query";
import s from "./styles.module.scss";
import { useMemo } from "react";
import { Playlist } from "../../../infrastructure/class/playlist";
import PlusIcon from "../../elements/icons/plus";
import { Link } from "react-router-dom";
import { routes } from "../../../infrastructure/consts/routes";

const Playlists = () => {
  const { useUserPlaylistsQuery } = usePlaylistQuery();
  const { data, isPending, error } = useUserPlaylistsQuery();

  const playlistsData = useMemo(() => {
    if (isPending) {
      return <div>Loading...</div>;
    }
    if (error) {
      return <div>Something went wrong</div>;
    }

    const playlists = data ? data.map((item) => new Playlist(item)) : [];

    console.log("playlists", playlists);

    return (
      <div className={s["contents"]}>
        {playlists.map((data) => (
          <PlaylistItem key={data.id} playlist={data} />
        ))}
      </div>
    );
  }, [data, isPending, error]);

  return (
    <div className={s["notes"]}>
      <div className={s['heading']}>
        <h1 className={s["title"]}>Playlists</h1>
        <Link to={routes.newPlaylist} className={s['create-link']}>
          <PlusIcon className={s['create-icon']} />
        </Link>
      </div>
      {playlistsData}
    </div>
  );
};

export default Playlists;
