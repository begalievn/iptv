import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";
import { apiInstance } from "../../../lib/api";
import {
  ICreatePlaylist,
  IPlaylist,
  IUpdatePlaylist,
} from "../../../../../core/src/interfaces";
import {
  ICreatePresignedUrl,
  IPresignedUrl,
} from "../../interfaces/presigned-url.interface";

interface IPlaylistMutation {
  useCreatePlaylistMutation: () => UseMutationResult<
    IPlaylist,
    Error,
    ICreatePlaylist,
    unknown
  >;
  useCreatePresignedUrlMutation: () => UseMutationResult<
    IPresignedUrl,
    Error,
    ICreatePresignedUrl,
    unknown
  >;
  useUpdatePlaylistMutation: (id: string) => UseMutationResult<
    {
      status: true;
    },
    Error,
    {
      playlistId: string;
      updatePlaylist: IUpdatePlaylist;
    },
    unknown
  >;
  useDeletePlaylistMutation: () => UseMutationResult<
    {
      status: true;
    },
    Error,
    string,
    unknown
  >;
}

export const usePlaylistMutation = (): IPlaylistMutation => {
  const queryClient = useQueryClient();

  const useCreatePlaylistMutation = () =>
    useMutation({
      mutationFn: apiInstance.createPlaylist,
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["playlists"],
        });
      },
    });

  const useUpdatePlaylistMutation = (id: string) =>
    useMutation({
      mutationFn: apiInstance.updatePlaylist,
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [`playlist ${id}`],
        });
      },
    });

  const useDeletePlaylistMutation = () =>
    useMutation({
      mutationFn: apiInstance.deletePlaylist,
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["playlists"],
        });
      },
    });

  const useCreatePresignedUrlMutation = () =>
    useMutation({
      mutationFn: apiInstance.createPresignedUrl,
    });

  return {
    useCreatePlaylistMutation,
    useCreatePresignedUrlMutation,
    useUpdatePlaylistMutation,
    useDeletePlaylistMutation,
  };
};
