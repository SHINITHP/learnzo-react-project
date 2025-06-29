import type { ImageFormProps } from "@/types";
import { ImageIcon, Pencil, PlusCircle } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { AspectRatio } from "./ui/aspect-ratio";
import { FileUpload } from "./upload-file";


const ImageForm = ({ initialData }: ImageFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const toggleEdit = () => setIsEditing((current) => !current);

  return (
    <div className="mt-6 border bg-slate-100 dark:bg-slate-900 rounded-lg p-4">
      <div className="font-medium flex items-center justify-between">
        Course image
        <Button className="text-xs sm:text-sm" onClick={toggleEdit} variant="ghost">
          {isEditing && <>Cancel</>}

          {!isEditing && !initialData.imageUrl && (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add an image
            </>
          )}

          {!isEditing && initialData.imageUrl && (
            <>
              <Pencil />
              Edit image
            </>
          )}
        </Button>
      </div>

      {!isEditing &&
        (!initialData.imageUrl ? (
          <div className="flex items-center justify-center h-80 mt-6 bg-slate-200 rounded-md">
            <ImageIcon className="h-10 w-10 text-slate-500" />
          </div>
        ) : (
          <div className="relative aspect-video mt-2">
            <AspectRatio ratio={16 / 9} className="bg-muted rounded-lg">
              <img
                alt="Upload"
                className="h-full w-full rounded-lg object-cover"
                src={initialData.imageUrl}
              />
            </AspectRatio>
          </div>
        ))}
      
      {isEditing && (
        <div className="mt-6 h-96">
          <FileUpload initialData={{ imageUrl: initialData.imageUrl || "" }}  isEditing={isEditing} />
        </div>
      )}
    </div>
  );
};

export default ImageForm;
