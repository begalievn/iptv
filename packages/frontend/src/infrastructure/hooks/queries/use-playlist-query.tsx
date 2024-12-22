import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { apiInstance } from "../../../lib/api";
import { IPlaylist } from "../../../../../core/src/interfaces";

interface IContentQuery {
  useUserPlaylistsQuery: () => UseQueryResult<IPlaylist[], Error>
}

export const usePlaylistQuery = (): IContentQuery => {
  const useUserPlaylistsQuery = () => useQuery({
    queryKey: ['playlists'],
    queryFn: () => apiInstance.getPlaylists(),
  });

  return {
    useUserPlaylistsQuery,
  };
}
