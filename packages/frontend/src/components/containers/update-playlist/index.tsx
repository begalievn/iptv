import { useMemo } from "react";
import UpdatePlaylistForm from "./form";
import { useParams } from "react-router-dom";
import { Playlist } from "../../../infrastructure/class/playlist";
import { usePlaylistQuery } from "../../../infrastructure/hooks/queries/use-playlist-query";
import s from "./styles.module.scss";

const UpdatePlaylist = () => {
  const { id = '' } = useParams();

  const { useUserPlaylistById } = usePlaylistQuery();
  const { data, isPending, error } = useUserPlaylistById(id || "");

  const renderForm = useMemo(() => {
    if (isPending) {
      return 'Loading...';
    }
    if (error) {
      return 'Something went wrong';
    }
    const playlist = new Playlist(data);

    return <UpdatePlaylistForm id={id} data={playlist} />
  }, [data, isPending, error, id]);

  return (
    <div className={s["update-playlist"]}>
      <h1 className={s["title"]}>Update playlist</h1>
      {renderForm}
    </div>
  );
};

export default UpdatePlaylist;
