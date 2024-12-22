import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { apiInstance } from "../../../lib/api";
import { ICreatePlaylist, IPlaylist } from "../../../../../core/src/interfaces";

interface IPlaylistMutation {
  useCreatePlaylistMutation: () => UseMutationResult<IPlaylist, Error, ICreatePlaylist, unknown>
}

export const usePlaylistMutation = (): IPlaylistMutation => {
  const useCreatePlaylistMutation = () => useMutation({
    mutationFn: apiInstance.createPlaylist,
  })

  return {
    useCreatePlaylistMutation,
  };
}
