import type { AttachementUploadsProps } from "@/types";
import { Pencil, PlusCircle } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { getFileIcon, getMimeTypeFromName } from "./file-icon-resolver";
import { MultiFileUpload } from "./multi-file-upload";

const AttachmentForm = ({ initialData }: AttachementUploadsProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const toggleEdit = () => setIsEditing((current) => !current);

  return (
    <div className="mt-6 border bg-slate-100 dark:bg-slate-900 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Course attachments
        <Button
          className="text-xs sm:text-sm"
          onClick={toggleEdit}
          variant="ghost"
        >
          {isEditing && <>Cancel</>}

          {!isEditing && !initialData.attachments && (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add attachments
            </>
          )}

          {!isEditing && initialData.attachments && (
            <>
              <Pencil />
              Edit attachments
            </>
          )}
        </Button>
      </div>

      {!isEditing &&
        (initialData.attachments.length ? (
          <div className="flex flex-col gap-2 items-center justify-center mt-5 rounded-md w-full">
            {initialData.attachments.map((attachment) => (
              <div
                key={attachment._id}
                className="dark:bg-white/[0.03] w-full flex items-center justify-between gap-2 rounded-lg border p-2 pe-3"
              >
                <div className="flex items-center gap-3 overflow-hidden">
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
              </div>
            ))}
          </div>
        ) : (
          <div className="relative text-slate-500 aspect-video mt-2 h-6 w-full">
            No attachments
          </div>
        ))}

      {isEditing && (
        <MultiFileUpload
          initialData={{ attachments: initialData.attachments || [] }}
        />
      )}
    </div>
  );
};

export default AttachmentForm;
