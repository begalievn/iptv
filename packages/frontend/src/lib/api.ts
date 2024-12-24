import { IPresignedUrl } from "./../infrastructure/interfaces/presigned-url.interface";
import { ICreatePlaylist, IPlaylist } from "../../../core/src/interfaces";
import { ICreatePresignedUrl } from "../infrastructure/interfaces/presigned-url.interface";
import axiosInstance from "./axios";
import { IUpdatePlaylist } from "../../../core/src/interfaces/playlist.interface";

export class Api {
  private static classInstance?: Api;

  private constructor() {}

  public static getInstance() {
    if (!this.classInstance) {
      this.classInstance = new Api();
    }

    return this.classInstance;
  }

  async getPlaylists(): Promise<IPlaylist[]> {
    const endpoint = "/playlist";
    const respose = await axiosInstance.get<IPlaylist[]>(endpoint);

    return respose.data;
  }

  async getPlaylistById(id: string) {
    const endpont = `/playlist/${id}`;
    const response = await axiosInstance.get<IPlaylist>(endpont);

    return response.data;
  }

  async createPlaylist(createPlaylist: ICreatePlaylist): Promise<IPlaylist> {
    const endpoint = "/playlist";
    const response = await axiosInstance.post<IPlaylist>(
      endpoint,
      createPlaylist
    );

    return response.data;
  }

  async updatePlaylist({
    playlistId,
    updatePlaylist,
  }: {
    playlistId: string;
    updatePlaylist: IUpdatePlaylist;
  }): Promise<{ status: true }> {
    const endpoint = `/playlist/${playlistId}`;
    console.log("endpoint", endpoint);
    const response = await axiosInstance.put<{ status: true }>(
      endpoint,
      updatePlaylist
    );

    return response.data;
  }

  async deletePlaylist(playlistId: string): Promise<{ status: true }> {
    const endpoint = `/playlist/${playlistId}`;
    const response = await axiosInstance.delete<{ status: true }>(endpoint);

    return response.data;
  }

  async createPresignedUrl(createPresignedUrl: ICreatePresignedUrl) {
    const endopint = "/upload";
    const response = await axiosInstance.post<IPresignedUrl>(
      endopint,
      createPresignedUrl
    );

    return response.data;
  }

  async deleteUser() {
    const endpoint = "/user";
    const response = await axiosInstance.delete<{ status: true }>(endpoint);

    return response.data;
  }
}

const apiInstance = Api.getInstance();

export { apiInstance };
