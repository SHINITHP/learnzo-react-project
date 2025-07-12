"use client";

import {
  AlertCircleIcon,
  FileIcon,
  Loader2,
  Trash2Icon,
  UploadIcon,
  XIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState, type DragEvent } from "react";
import type { AttachementUploadsProps, IAttachment } from "@/types";
import { uploadToCloudinary } from "@/utils/cloudinary";
import {
  useCreateAttachmentsMutation,
  useUpdateCourseMutation,
} from "@/services/courseApi";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import {
  getFileIcon,
  getMimeTypeFromName,
} from "@/components/file-icon-resolver";

export const MultiFileUpload = ({ initialData }: AttachementUploadsProps) => {
  const maxSize = 10 * 1024 * 1024; // 10MB default
  const maxFiles = 10;
  const { id } = useParams<{ id: string }>();
  const [updateCourse, { isLoading }] = useUpdateCourseMutation();
  const [attachments, setAttachments] = useState<IAttachment[]>(
    initialData.attachments || []
  );

  useEffect(() => {
    setAttachments(initialData.attachments || []);
  }, [initialData.attachments]);

  const openFileDialog = () => {
    inputRef.current?.click();
  };

  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [createAttachments] = useCreateAttachmentsMutation();

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

  const handleDrop = (e: DragEvent<HTMLElement>) => {};
  const removeAttachment = async (attachmentId: string) => {};
  const removeAllAttachments = async () => {};

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (!selectedFiles || selectedFiles.length === 0) return;

    const maxSize = 10 * 1024 * 1024;
    const validFiles: File[] = [];

    for (const file of Array.from(selectedFiles)) {
      if (file.size > maxSize) {
        setError(`File "${file.name}" exceeds the 10MB limit.`);
      } else {
        validFiles.push(file);
      }
    }

    if (validFiles.length === 0) return;

    setError("");
    setIsUploading(true);

    try {
      const uploadMetadata: { name: string; url: string; courseId: string }[] =
        [];

      for (const file of validFiles) {
        const uploadedUrl = await uploadToCloudinary(file, "raw");
        if (!uploadedUrl) return toast.error("Upload failed! Retry");

        uploadMetadata.push({
          name: file.name,
          url: uploadedUrl,
          courseId: id!,
        });
      }

      const { data, error } = await createAttachments({
        attachments: uploadMetadata,
      });

      const createdAttachmentIds = data?.ids;

      if (!createdAttachmentIds || createdAttachmentIds.length === 0) {
        toast.error("No attachments were created.");
        return;
      }

      await updateCourse({
        id: id!,
        updates: {
          attachments: [
            ...attachments.map((att) => att._id),
            ...createdAttachmentIds,
          ],
        },
      }).unwrap();

      toast.success("Files uploaded and saved!");
    } catch (error) {
      console.error(error);
      toast.error("Upload failed");
    } finally {
      setIsUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  return (
    <div className="flex flex-col gap-2 dark:bg-slate-900 mt-5 ">
      {/* Drop area */}
      <div
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        data-dragging={isDragging || undefined}
        data-files={attachments.length > 0 || undefined}
        className="border-input data-[dragging=true]:bg-accent/50 has-[input:focus]:border-ring has-[input:focus]:ring-ring/50 flex flex-col items-center rounded-xl border border-dashed p-4 transition-colors not-data-[files]:justify-center has-[input:focus]:ring-[3px]"
      >
        <input
          ref={inputRef}
          onChange={handleFileChange}
          type="file"
          multiple
          className="sr-only"
          aria-label="Upload files"
        />

        {attachments.length > 0 ? (
          <div className="relative flex w-full flex-col gap-3">
            {isUploading && (
              <div className="absolute h-full w-full bg-slate-500.20 top-0 right-0 rounded-m flex items-center justify-center">
                <Loader2 className="animate-spin h-6 w-6 text-sky-700" />
              </div>
            )}
            <div className="flex items-center justify-between gap-2 ">
              <h3 className="truncate text-sm font-medium">
                Uploaded Attachments ({attachments.length})
              </h3>
              <Button
                variant="outline"
                size="sm"
                onClick={removeAllAttachments}
              >
                <Trash2Icon
                  className="-ms-0.5 size-3.5 opacity-60"
                  aria-hidden="true"
                />
                Remove all
              </Button>
            </div>
            <div className="w-full space-y-2">
              {attachments.map((attachment) => (
                <div
                  key={attachment._id}
                  className="dark:bg-white/[0.03] mt-3 flex items-center justify-between gap-2 rounded-lg border p-2 pe-3"
                >
                  <div className="flex items-center gap-3 ">
                    <div className="flex aspect-square size-10 shrink-0 items-center justify-center rounded border">
                      {getFileIcon({
                        file: {
                          name: attachment.name,
                          type: getMimeTypeFromName(attachment.name),
                        },
                      })}
                    </div>
                    <div className="flex min-w-0 flex-col gap-0.5">
                      <p className="truncate text-[13px] font-medium">
                        {attachment.name}
                      </p>
                      <p className="text-muted-foreground text-xs">Uploaded</p>
                    </div>
                  </div>

                  <Button
                    size="icon"
                    variant="ghost"
                    className="text-muted-foreground/80 hover:text-foreground -me-2 size-8 hover:bg-transparent"
                    onClick={() => removeAttachment(attachment._id)}
                    aria-label="Remove file"
                  >
                    <XIcon className="size-4" aria-hidden="true" />
                  </Button>
                </div>
              ))}

              {!isUploading && attachments.length < maxFiles && (
                <Button
                  variant="outline"
                  className="mt-2 w-full h-10"
                  onClick={openFileDialog}
                >
                  <UploadIcon className="-ms-1 opacity-60" aria-hidden="true" />
                  Add more
                </Button>
              )}

              {isUploading && (
                <Button disabled variant="outline" className="mt-2 w-full">
                  Uploading...
                </Button>
              )}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-center">
            <div
              className="bg-background mb-2 flex size-11 shrink-0 items-center justify-center rounded-full border"
              aria-hidden="true"
            >
              <FileIcon className="size-4 opacity-60" />
            </div>
            <p className="mb-1.5 text-sm font-medium">Upload attachments</p>
            <p className="text-muted-foreground text-xs">
              Max {maxFiles} files ∙ Up to {maxSize}MB
            </p>
            <Button variant="outline" className="mt-4" onClick={openFileDialog}>
              <UploadIcon className="-ms-1 opacity-60" aria-hidden="true" />
              Select files
            </Button>
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
    </div>
  );
};
