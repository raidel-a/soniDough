"use client";

import useUploadModal from "@/hooks/useUploadModal";
import { useUser } from "@/hooks/useUser";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import uniqid from "uniqid";
import Button from "./Button";
import Input from "./Input";
import Modal from "./Modal";

const UploadModal = () => {
  const [isLoading, setIsLoading] = useState(false);
  const uploadModal = useUploadModal();
  const { user } = useUser();
  const supabaseClient = useSupabaseClient();
  const router = useRouter();

  const { register, handleSubmit, reset, watch } = useForm<FieldValues>({
    defaultValues: {
      author: "",
      title: "",
      song: null,
      image: null,
    },
  });

  const values = watch();

  const onChange = (open: boolean) => {
    if (!open) {
      reset();
      uploadModal.onClose();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.size > 50 * 1024 * 1024) {
      toast.error("File size must be less than 50MB");
    }
  };

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    try {
      setIsLoading(true);

      const imageFile = values.image?.[0];
      const songFile = values.song?.[0];
      if (!imageFile || !songFile || !user) {
        toast.error("Somethings gone wrong");
        return;
      }

      const uniqueID = uniqid();

      const { data: songData, error: songError } = await supabaseClient.storage
        .from("songs")
        .upload(`song-${values.title}-${uniqueID}`, songFile, {
          cacheControl: "3600",
          upsert: false,
        });
      if (songError) {
        setIsLoading(false);
        return toast.error("Failed to upload song");
      }

      const { data: imageData, error: imageError } =
        await supabaseClient.storage
          .from("images")
          .upload(`image-${values.title}-${uniqueID}`, imageFile, {
            cacheControl: "3600",
            upsert: false,
          });
      if (imageError) {
        setIsLoading(false);
        return toast.error("Failed to upload image");
      }

      const { error: supabaseError } = await supabaseClient
        .from("songs")
        .insert({
          user_id: user.id,
          title: values.title,
          author: values.author,
          image_path: imageData.path,
          song_path: songData.path,
        });
      if (supabaseError) {
        setIsLoading(false);
        return toast.error(supabaseError.message);
      }
      router.refresh();
      setIsLoading(false);
      toast.success("Song uploaded successfully");
      reset();
      uploadModal.onClose();
    } catch (error) {
      toast.error("oopsie woopsie, something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      title="Add a Song"
      description="Upload an audio file"
      isOpen={uploadModal.isOpen}
      onChange={onChange}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-4">
        <Input
          id="title"
          disabled={isLoading}
          {...register("title", { required: true })}
          placeholder="Song Title"
        />
        <Input
          id="author"
          disabled={isLoading}
          {...register("author", { required: true })}
          placeholder="Song author"
        />
        <div>
          <div className="pb-1">Select Song File</div>
          <Input
            id="song"
            type="file"
            disabled={isLoading}
            accept=".mp3, .flac, .wav"
            {...register("song", { required: true })}
            onChange={handleFileChange}
          />
          {/* TODO: add more file types */}
        </div>
        <div>
          <div className="pb-1">Select Cover Image</div>
          <Input
            id="image"
            type="file"
            disabled={isLoading}
            accept="image/*"
            {...register("image", { required: true })}
          />
        </div>
        <Button
          disabled={!values.song || values.song[0].size > 50 * 1024 * 1024}
          type="submit"
        >
          Create
        </Button>
      </form>
    </Modal>
  );
};

export default UploadModal;
