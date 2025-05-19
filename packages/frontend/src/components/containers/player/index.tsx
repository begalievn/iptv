import { FC, useMemo, useRef } from "react";
import videojs from "video.js";
import { useParams } from "react-router-dom";
import type Player from "video.js/dist/types/player";
import VideoPlayer from "../../elements/video-player";
import { Playlist } from "../../../infrastructure/class/playlist";
import { usePlaylistQuery } from "../../../infrastructure/hooks/queries/use-playlist-query";
import s from "./styles.module.scss";

const PlayerContainer: FC = () => {
  const { id } = useParams();
  const playerRef = useRef<Player | null>(null);
  const { useUserPlaylistById } = usePlaylistQuery();
  const { data, isPending, error } = useUserPlaylistById(id || '');

  const handlePlayerReady = (player: Player) => {
    playerRef.current = player;

    player.on("waiting", () => {
      videojs.log("player is waiting");
    });

    player.on("dispose", () => {
      videojs.log("player will dispose");
    });
  };

  const playlistData = useMemo(() => {
    if (isPending) {
      return "Loading...";
    }
    if (error) {
      return "Something went wrong";
    }

    const playlist = new Playlist(data);

    const videoJsOptions = {
      autoplay: true,
      controls: true,
      responsive: true,
      fluid: true,
      sources: [
        {
          src: playlist.getSourceUrl(),
          type: "application/x-mpegURL",
        },
      ],
    };

    return <VideoPlayer options={videoJsOptions} onReady={handlePlayerReady} />;
  }, [data, isPending, error]);

  return (
    <div className={s["player"]}>
      <h1 className={s["title"]}>Player</h1>
      <div className={s['box']}>
        {playlistData}
      </div>
    </div>
  );
};

export default PlayerContainer;
