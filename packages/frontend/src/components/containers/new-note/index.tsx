import React, { useRef, useState } from "react";
import axios from "axios";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import config from "../../../config";
import Button from "../../common/button";
import InputField from "../../common/input";
import TextAreaField from "../../common/textarea";
import { useFormFields } from "../../../infrastructure/hooks/use-form-fields";
import { usePlaylistMutation } from "../../../infrastructure/hooks/mutations/use-playlist-mutation";
import s from "./styles.module.scss";
import {
  CreatePlaylistSchema,
  CreatePlaylistSchemaType,
} from "../../../infrastructure/schemas/playlist-schema";

const API_URL = import.meta.env.VITE_API_URL;

export default function NewNote() {
  const file = useRef<null | File>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [fields, handleFieldChange] = useFormFields({
    title: "",
    description: "",
  });
  const { useCreatePlaylistMutation } = usePlaylistMutation();
  const { mutateAsync, isPending, error } = useCreatePlaylistMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreatePlaylistSchemaType>({
    resolver: zodResolver(CreatePlaylistSchema),
  });

  console.log("errors", errors);

  function validateForm() {
    return fields.title.length > 0;
  }

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.currentTarget.files === null) return;
    file.current = event.currentTarget.files[0];
  }

  const onSubmit: SubmitHandler<CreatePlaylistSchemaType> = async (data) => {
    try {
      console.log("data", data);
      const { title, description, file: [file] } = data;

      if (file && file.size > config.MAX_ATTACHMENT_SIZE) {
        alert(
          `Please pick a file smaller than ${
            config.MAX_ATTACHMENT_SIZE / 1000000
          } MB.`
        );
        return;
      }

      setIsLoading(true);

      const fileData = file;
      const fileType = file?.type;
      const filename = file.name || "";

      const presignUrlEndpoint = `${API_URL}/upload`;
      const token = localStorage.getItem("token");

      const presignUrlResponse = await axios.post(
        presignUrlEndpoint,
        {
          filename,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log('presignedUrl', presignUrlResponse);

      const { uploadUrl, fileKey } = presignUrlResponse.data;

      await axios.put(uploadUrl, fileData, {
        headers: {
          "Content-Type": fileType,
        },
      });

      const contentData = {
        title,
        description,
        fileKey,
        filename,
      };

      const response = await mutateAsync(contentData);

      console.log("resonse data", response);

      setIsLoading(false);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={s["new-note"]}>
      <form onSubmit={handleSubmit(onSubmit)} className="form">
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
        <div className="form-group">
          <InputField
            id="file"
            type="file"
            label={"Attachment"}
            className="file-input"
            {...register("file")}
            error={errors.file && errors.file.message}
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
