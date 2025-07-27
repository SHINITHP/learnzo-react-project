import { VideoIcon, Pencil, PlusCircle } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { AspectRatio } from "./ui/aspect-ratio";
// import { VideoUpload } from "./handle-video-upload";
import type { IMuxData } from "@/types";
import { VideoUpload } from "./mux-video-upload";
import { MuxVideoPlayer } from "./mux-video-player";

export interface ChapterVideoFormProps {
  initialData: {
    videoUrl?: string;
    muxData?: IMuxData | null;
  };
}

const ChapterVideoForm = ({ initialData }: ChapterVideoFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const toggleEdit = () => setIsEditing((current) => !current);

  return (
    <div className="mt-6 border bg-slate-100 dark:bg-slate-900 rounded-lg p-4">
      <div className="font-medium flex items-center justify-between">
        Course video
        <Button
          className="text-xs sm:text-sm"
          onClick={toggleEdit}
          variant="ghost"
        >
          {isEditing && <>Cancel</>}

          {!isEditing && !initialData.videoUrl && (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add a video
            </>
          )}

          {!isEditing && initialData.videoUrl && (
            <>
              <Pencil />
              Edit video
            </>
          )}
        </Button>
      </div>

      {!isEditing &&
        (!initialData.videoUrl ? (
          <div className="flex items-center justify-center h-80 mt-6 bg-slate-200 rounded-md">
            <VideoIcon className="h-10 w-10 text-slate-500" />
          </div>
        ) : (
          <div className="relative aspect-video mt-2">
            <AspectRatio ratio={16 / 9} className="bg-muted rounded-lg">
              <MuxVideoPlayer
                playbackId={initialData.videoUrl}
                className="absolute inset-0 h-full w-full object-cover rounded-lg"
              />
            </AspectRatio>
          </div>
        ))}

      {isEditing && (
        <div className="mt-6 h-96">
          <VideoUpload
            initialData={{
              videoUrl: initialData.videoUrl || "",
              muxData: initialData.muxData ?? null,
            }}
            isEditing={isEditing}
          />
        </div>
      )}
    </div>
  );
};

export default ChapterVideoForm;
