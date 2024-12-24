import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import InputField from "../../common/input";
import TextAreaField from "../../common/textarea";
import Button from "../../common/button";
import {
  UpdatePlaylistSchema,
  UpdatePlaylistSchemaType,
} from "../../../infrastructure/schemas/playlist-schema";
import s from "./styles.module.scss";
import { Playlist } from "../../../infrastructure/class/playlist";
import { FC, useState } from "react";
import clsx from "clsx";
import { usePlaylistMutation } from "../../../infrastructure/hooks/mutations/use-playlist-mutation";
import { useNavigate } from "react-router-dom";
import { routes } from "../../../infrastructure/consts/routes";

interface IUpdatePlaylistFormProps {
  data: Playlist;
  id: string;
}

const UpdatePlaylistForm: FC<IUpdatePlaylistFormProps> = (props) => {
  const { data, id } = props;
  const deleteBtnClassNames = clsx(s["btn"], s["delete"]);
  const [loading, setLoading] = useState(false);
  const { useUpdatePlaylistMutation, useDeletePlaylistMutation } =
    usePlaylistMutation();
  const { mutateAsync, isPending } = useUpdatePlaylistMutation();
  const { mutateAsync: deletePlaylist, isPending: deletePending } =
    useDeletePlaylistMutation();
  const nav = useNavigate();

  const defaultValues = {
    title: data.title,
    description: data.description,
    playlistUrl: data.playlistUrl || "",
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdatePlaylistSchemaType>({
    resolver: zodResolver(UpdatePlaylistSchema),
    defaultValues,
  });

  const onSubmit: SubmitHandler<UpdatePlaylistSchemaType> = async (data) => {
    console.log(data);
    setLoading(true);
    await mutateAsync({ playlistId: id, updatePlaylist: data }).then(() => {
      nav(routes.playlists);
    });
    setLoading(false);
  };

  const handleDelete = async () => {
    await deletePlaylist(id).then(() => {
      nav(routes.playlists);
    });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={s["form-group"]}>
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
          placeholder={"https://stream.com/example.m3u8"}
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
        <Button type="submit" className={s["btn"]} isLoading={isPending}>
          Update
        </Button>
        <Button onClick={handleDelete} isLoading={deletePending} type="button" className={deleteBtnClassNames}>
          Delete
        </Button>
      </div>
    </form>
  );
};

export default UpdatePlaylistForm;
