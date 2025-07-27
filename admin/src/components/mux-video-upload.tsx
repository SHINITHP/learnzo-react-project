import { AlertCircleIcon, VideoIcon, XIcon } from "lucide-react";
import { useRef, useState, type DragEvent, type ChangeEvent } from "react";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { useMuxUpload } from "@/hooks/mux-upload";
import { useParams } from "react-router-dom";
import { useUpdateChapterMutation } from "@/services/chapterApi";
import { MuxVideoPlayer } from "./mux-video-player";
import type { IMuxData } from "@/types";

interface VideoUploadProps {
  initialData: {
    videoUrl?: string;
    muxData: IMuxData | null;
  };
  isEditing: boolean;
}

export const VideoUpload = ({ initialData, isEditing }: VideoUploadProps) => {
  const maxSizeMB = 500; // Increased for videos
  const maxSize = maxSizeMB * 1024 * 1024;
  const { id: courseId, chapterId } = useParams<{
    id: string;
    chapterId: string;
  }>();
  const [updateChapter, { isLoading }] = useUpdateChapterMutation();

  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState(initialData.videoUrl || "");
  const [playbackId, setPlaybackId] = useState(
    initialData.muxData?.playbackId || ""
  );
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isUploaded, setIsUploaded] = useState(
    !!initialData.muxData?.playbackId
  );
  const [uploadProgress, setUploadProgress] = useState(0);
  const { uploadToMux } = useMuxUpload();

  const handleUpload = async () => {
    if (!file) {
      toast.error("Please select a file first.");
      return;
    }

    try {
      setIsUploading(true);
      setUploadProgress(0);

      // Simulate progress updates during upload
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + Math.random() * 10;
        });
      }, 500);

      const muxPlaybackId = await uploadToMux(file);

      clearInterval(progressInterval);
      setUploadProgress(100);

      setPlaybackId(muxPlaybackId);
      setIsUploaded(true);

      await updateChapter({
        id: chapterId!,
        courseId: courseId!,
        updates: {
          videoUrl: muxPlaybackId,
        },
      });

      toast.success("Video upload successful!");
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Upload failed. Please try again.");
      setUploadProgress(0);
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

    if (!selectedFile.type.startsWith("video/")) {
      setError("Please upload a video file.");
      return;
    }

    setError("");
    setFile(selectedFile);
    setPreviewUrl(URL.createObjectURL(selectedFile));
    setIsUploaded(false);
    setPlaybackId("");
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

    if (!droppedFile.type.startsWith("video/")) {
      setError("Please upload a video file.");
      return;
    }

    setError("");
    setFile(droppedFile);
    setPreviewUrl(URL.createObjectURL(droppedFile));
    setIsUploaded(false);
    setPlaybackId("");
  };

  const removeFile = () => {
    setFile(null);
    setPreviewUrl(initialData.videoUrl || "");
    setPlaybackId(initialData.muxData?.playbackId || "");
    setError("");
    setIsUploaded(!!initialData.muxData?.playbackId);
    setUploadProgress(0);
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
          className="border-input hover:bg-accent/50 data-[dragging=true]:bg-accent/50 has-[input:focus]:border-ring has-[input:focus]:ring-ring/50 relative flex min-h-52 flex-col items-center justify-center overflow-hidden rounded-lg border border-dashed p-4 transition-colors has-disabled:pointer-events-none has-disabled:opacity-50 has-[video]:border-none has-[input:focus]:ring-[3px] h-full"
        >
          <input
            ref={inputRef}
            onChange={handleFileChange}
            accept="video/*"
            type="file"
            className="sr-only"
            aria-label="Upload video"
          />

          {playbackId && isUploaded ? (
            // Final uploaded state with Mux player
            <div className="absolute inset-0 h-full">
              <MuxVideoPlayer
                playbackId={playbackId}
                className="absolute inset-0 h-full w-full object-cover rounded-lg"
              />
            </div>
          ) : previewUrl && file && !isUploaded ? (
            // Preview with overlay and upload button
            <div className="absolute inset-0 h-full">
              <video
                className="size-full object-cover opacity-20"
                src={previewUrl}
              />
              <div className="absolute flex flex-col inset-0 items-center justify-center">
                <p className="mb-1.5 text-xs md:text-sm font-medium">
                  {isUploading
                    ? `Uploading... ${Math.round(uploadProgress)}%`
                    : "Your video is ready — click Upload to save it"}
                </p>
                {isUploading && (
                  <div className="w-48 bg-gray-200 rounded-full h-2 mb-3">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                )}
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
          ) : previewUrl && !file && isUploaded ? (
            // Existing uploaded video (from initial data)
            <div className="absolute inset-0 h-full">
              {playbackId ? (
                <MuxVideoPlayer
                  playbackId={playbackId}
                  className="absolute inset-0 h-full w-full object-cover rounded-lg"
                />
              ) : (
                <MuxVideoPlayer
                  playbackId={previewUrl}
                  className="absolute inset-0 h-full w-full object-cover rounded-lg"
                />
              )}
            </div>
          ) : (
            // No video state
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <div
                className="bg-background mb-2 flex size-11 shrink-0 items-center justify-center rounded-full border"
                aria-hidden="true"
              >
                <VideoIcon className="size-4 opacity-60" />
              </div>
              <p className="mb-1.5 text-sm font-medium">
                Drop your video here or click to browse
              </p>
              <p className="text-muted-foreground text-xs">
                Max size: {maxSizeMB}MB
              </p>
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  if (file) {
                    handleUpload();
                  } else {
                    openFileDialog();
                  }
                }}
                className="mt-2 min-w-28"
                disabled={isUploading}
              >
                {isUploading
                  ? "Uploading…"
                  : file
                  ? "Upload (1)"
                  : "Select video"}
              </Button>
            </div>
          )}
        </div>
        {(previewUrl || playbackId) && (
          <div className="absolute top-4 right-4">
            <button
              type="button"
              className="focus-visible:border-ring focus-visible:ring-ring/50 z-50 flex size-8 cursor-pointer items-center justify-center rounded-full bg-black/60 text-white transition-[color,box-shadow] outline-none hover:bg-black/80 focus-visible:ring-[3px]"
              onClick={(e) => {
                e.stopPropagation();
                removeFile();
              }}
              aria-label="Remove video"
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
        16:9 aspect ratio recommended for optimal viewing
      </p>
    </div>
  );
};
