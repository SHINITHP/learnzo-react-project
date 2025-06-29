import { AlertCircleIcon, ImageUpIcon, XIcon } from "lucide-react";
import { useRef, useState, type DragEvent, type ChangeEvent } from "react";
import toast from "react-hot-toast";
import { Button } from "./ui/button";
import { uploadToCloudinary } from "@/utils/cloudinary";
import type { FileUploadProps } from "@/types";
import { useParams } from "react-router-dom";
import { useUpdateCourseMutation } from "@/services/courseApi";

export const FileUpload = ({ initialData, isEditing }: FileUploadProps) => {
  const maxSizeMB = 5;
  const maxSize = maxSizeMB * 1024 * 1024;
  const { id } = useParams<{ id: string }>();
  const [updateCourse, { isLoading }] = useUpdateCourseMutation();

  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState(initialData.imageUrl);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);

  const handleUpload = async () => {
    if (!file) {
      toast.error("Please select a file first.");
      return;
    }

    try {
      setIsUploading(true);
      const uploadedUrl = await uploadToCloudinary(file, "image");
      setPreviewUrl(uploadedUrl);
      setIsUploaded(true);

      await updateCourse({
        id: id!,
        updates: { imageUrl: uploadedUrl },
      }).unwrap();

      toast.success(`Image upload successful!`);
    } catch (error) {
      console.error(error);
      toast.error("Upload failed");
    } finally {
      setIsUploading(false);
    }
  };

  const openFileDialog = () => {
    inputRef.current?.click();
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    if (selectedFile.size > maxSize) {
      setError(`File exceeds the maximum size of ${maxSizeMB}MB.`);
      return;
    }

    setError("");
    setFile(selectedFile);
    setPreviewUrl(URL.createObjectURL(selectedFile));
    setIsUploaded(false);
  };

  const handleDragEnter = (e: DragEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.currentTarget.contains(e.relatedTarget as Node)) return;
    setIsDragging(false);
  };

  const handleDragOver = (e: DragEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: DragEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const droppedFile = e.dataTransfer.files?.[0];
    if (!droppedFile) return;

    if (droppedFile.size > maxSize) {
      setError(`File exceeds the maximum size of ${maxSizeMB}MB.`);
      return;
    }

    setError("");
    setFile(droppedFile);
    setPreviewUrl(URL.createObjectURL(droppedFile));
    setIsUploaded(false);
  };

  const removeFile = () => {
    setFile(null);
    setPreviewUrl(initialData.imageUrl || "");
    setError("");
    setIsUploaded(false);
  };

  return (
    <div className="flex flex-col gap-2 h-full">
      <div className="relative h-full">
        <div
          role="button"
          onClick={openFileDialog}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          data-dragging={isDragging || undefined}
          className="border-input hover:bg-accent/50 data-[dragging=true]:bg-accent/50 has-[input:focus]:border-ring has-[input:focus]:ring-ring/50 relative flex min-h-52 flex-col items-center justify-center overflow-hidden rounded-lg border border-dashed p-4 transition-colors has-disabled:pointer-events-none has-disabled:opacity-50 has-[img]:border-none has-[input:focus]:ring-[3px] h-full"
        >
          <input
            ref={inputRef}
            onChange={handleFileChange}
            accept="image/*"
            type="file"
            className="sr-only"
            aria-label="Upload file"
          />

          {previewUrl && isUploaded ? (
            // Final uploaded state
            <img
              src={previewUrl}
              alt={file?.name || "Uploaded image"}
              className="absolute inset-0 h-full object-cover size-full"
            />
          ) : previewUrl && file && !isUploaded ? (
            // if Preview with overlay and upload button
            <div className="absolute inset-0 h-full">
              <img
                src={previewUrl}
                alt={file?.name || "Uploaded image"}
                className="size-full object-cover opacity-20"
              />
              <div className="absolute flex flex-col inset-0 items-center justify-center">
                <p className="mb-1.5 text-xs md:text-sm font-medium">
                  Your image is ready — click Upload to save it
                </p>
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleUpload();
                  }}
                  className="min-w-28 bg-blue-600"
                  disabled={isUploading}
                >
                  {isUploading ? "Uploading…" : `Upload ${file ? "(1)" : ""}`}
                </Button>
              </div>
            </div>
          ) : (
            // If No image state
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              {previewUrl && (
                <img
                  src={previewUrl}
                  alt={file?.name || "Uploaded image"}
                  className="size-full object-cover opacity-20"
                />
              )}
              <div className="absolute flex flex-col inset-0 items-center justify-center">
                <div
                  className="bg-background mb-2 flex size-11 shrink-0 items-center justify-center rounded-full border"
                  aria-hidden="true"
                >
                  <ImageUpIcon className="size-4 opacity-60" />
                </div>
                <p className="mb-1.5 text-sm font-medium">
                  Drop your image here or click to browse
                </p>
                <p className="text-muted-foreground text-xs">
                  Max size: {maxSizeMB}MB
                </p>
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleUpload();
                  }}
                  className="mt-2 min-w-28 "
                  disabled={isUploading}
                >
                  {isUploading ? "Uploading…" : file ? "Upload (1)" : "Select file" }
                </Button>
              </div>
            </div>
          )}
        </div>
        {previewUrl && (
          <div className="absolute top-4 right-4">
            <button
              type="button"
              className="focus-visible:border-ring focus-visible:ring-ring/50 z-50 flex size-8 cursor-pointer items-center justify-center rounded-full bg-black/60 text-white transition-[color,box-shadow] outline-none hover:bg-black/80 focus-visible:ring-[3px]"
              onClick={(e) => {
                e.stopPropagation();
                removeFile();
              }}
              aria-label="Remove image"
            >
              <XIcon className="size-4" aria-hidden="true" />
            </button>
          </div>
        )}
      </div>

      {error && (
        <div
          className="text-destructive flex items-center gap-1 text-xs"
          role="alert"
        >
          <AlertCircleIcon className="size-3 shrink-0" />
          <span>{error}</span>
        </div>
      )}
      <p
        aria-live="polite"
        role="region"
        className="text-muted-foreground mt-2 text-center text-xs"
      >
        16:9 aspect ratio recommended
      </p>
    </div>
  );
};
