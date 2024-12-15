import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import config from "../../../config";
import Button from "../../elements/button";
import InputField from "../../elements/input";
import s from './styles.module.scss';

export default function NewNote() {
  const file = useRef<null | File>(null);
  const nav = useNavigate();
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function validateForm() {
    return content.length > 0;
  }

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.currentTarget.files === null) return;
    file.current = event.currentTarget.files[0];
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (file.current && file.current.size > config.MAX_ATTACHMENT_SIZE) {
      alert(
        `Please pick a file smaller than ${
          config.MAX_ATTACHMENT_SIZE / 1000000
        } MB.`
      );
      return;
    }

    setIsLoading(true);

    // Perform your submission logic here
    setTimeout(() => {
      setIsLoading(false);
      nav("/"); // Redirect after successful submission
    }, 2000); // Simulate a delay
  }

  return (
    <div className="NewNote">
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label htmlFor="content">Content</label>
          <InputField
            id="title"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Title"
          />
        </div>
        <div className="form-group">
          <label htmlFor="file">Attachment</label>
          <input
            id="file"
            type="file"
            onChange={handleFileChange}
            className="file-input"
          />
        </div>
        <div className="button-container">
          <Button
            type="submit"
            isLoading={isLoading}
            disabled={!validateForm()}
          >
            Create
          </Button>
        </div>
      </form>
    </div>
  );
}
