import { IPresignedUrl } from './../infrastructure/interfaces/presigned-url.interface';
import { ICreatePlaylist, IPlaylist } from "../../../core/src/interfaces";
import { ICreatePresignedUrl } from "../infrastructure/interfaces/presigned-url.interface";
import axiosInstance from "./axios";

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
    const endpoint = '/playlist';
    const respose = await axiosInstance.get<IPlaylist[]>(endpoint);

    return respose.data;
  }

  async createPlaylist(createPlaylist: ICreatePlaylist): Promise<IPlaylist> {
    const endpoint = '/playlist';
    const response = await axiosInstance.post<IPlaylist>(endpoint, createPlaylist);

    return response.data;
  }

  async createPresignedUrl(createPresignedUrl: ICreatePresignedUrl) {
    const endopint = '/upload';
    const response = await axiosInstance.post<IPresignedUrl>(endopint, createPresignedUrl);

    return response.data;
  }
}

const apiInstance = Api.getInstance();

export { apiInstance };
