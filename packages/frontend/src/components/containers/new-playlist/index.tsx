import { useState } from "react";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";

import Button from "../../common/button";
import InputField from "../../common/input";
import TextAreaField from "../../common/textarea";
import { usePlaylistMutation } from "../../../infrastructure/hooks/mutations/use-playlist-mutation";
import {
  CreatePlaylistSchema,
  CreatePlaylistSchemaType,
} from "../../../infrastructure/schemas/playlist-schema";
import { ICreatePlaylist } from "../../../../../core/src/interfaces";
import s from "./styles.module.scss";
import { useNavigate } from "react-router-dom";
import { routes } from "../../../infrastructure/consts/routes";


export default function NewNote() {
  const [isLoading, setIsLoading] = useState(false);
  const { useCreatePlaylistMutation, useCreatePresignedUrlMutation } = usePlaylistMutation();
  const { mutateAsync } = useCreatePlaylistMutation();
  const { mutateAsync: createPresignedUrl } = useCreatePresignedUrlMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreatePlaylistSchemaType>({
    resolver: zodResolver(CreatePlaylistSchema),
  });
  const nav = useNavigate();

  const onSubmit: SubmitHandler<CreatePlaylistSchemaType> = async (data) => {
    try {
      console.log("data", data);
      const { title, description, files, playlistUrl } = data;

      setIsLoading(true);

      const contentData: ICreatePlaylist = {
        title,
        description,
        playlistUrl,
      };

      if (files && files.length) {
        const fileData = files[0];
        const fileType = fileData.type;
        const filename = fileData.name;

        const presignedUrlResponse = await createPresignedUrl({filename});

        console.log("presignedUrl", presignedUrlResponse);

        const { uploadUrl, fileKey } = presignedUrlResponse;

        await axios.put(uploadUrl, fileData, {
          headers: {
            "Content-Type": fileType,
          },
        });

        contentData.fileKey = fileKey;
        contentData.filename = filename;
      }

      const response = await mutateAsync(contentData);

      console.log("resonse data", response);
      setIsLoading(false);
      nav(routes.playlists);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={s["new-note"]}>
      <h1 className={s['title']}>Create a new Playlist</h1>
      <form onSubmit={handleSubmit(onSubmit)} className={s['form']}>
        <div className="form-group">
          <InputField
            id="title"
            placeholder="Title"
            className={s["text-field"]}
            label={"Title"}
            {...register("title")}
            error={errors.title && errors.title.message}
          />
        </div>
        <div className={s["form-group"]}>
          <TextAreaField
            id="description"
            label="Description"
            className={s["text-field"]}
            rows={4}
            placeholder="Description"
            {...register("description")}
            error={errors.description && errors.description.message}
          />
        </div>
        <div>
          <InputField
            id="playlistUrl"
            label="Playlist url"
            className={s["text-field"]}
            placeholder={"example.m3u8"}
            {...register("playlistUrl")}
            error={errors.playlistUrl && errors.playlistUrl.message}
          />
        </div>
        <div className="form-group">
          <InputField
            id="files"
            type="file"
            accept=".m3u,.m3u8"
            label={"Attachment"}
            className="file-input"
            {...register("files")}
            error={errors.files && errors.files.message}
          />
        </div>
        <div className={s["button-container"]}>
          <Button type="submit" isLoading={isLoading} className={s["btn"]}>
            Create
          </Button>
        </div>
      </form>
    </div>
  );
}
