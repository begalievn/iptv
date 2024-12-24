import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { apiInstance } from "../../../lib/api";
import { IPlaylist } from "../../../../../core/src/interfaces";

interface IContentQuery {
  useUserPlaylistsQuery: () => UseQueryResult<IPlaylist[], Error>,
  useUserPlaylistById: (id: string) => UseQueryResult<IPlaylist, Error>
}

export const usePlaylistQuery = (): IContentQuery => {
  const useUserPlaylistsQuery = () => useQuery({
    queryKey: ['playlists'],
    queryFn: () => apiInstance.getPlaylists(),
  });

  const useUserPlaylistById = (id: string) => useQuery({
    queryKey: ['playlist', id],
    queryFn: () => apiInstance.getPlaylistById(id),
  });

  return {
    useUserPlaylistsQuery,
    useUserPlaylistById
  };
}
