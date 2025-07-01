import { useState } from "react";
import toast from "react-hot-toast";
import { Button } from "./ui/button";
import { Trash } from "lucide-react";
import { ConfirmModal } from "./confirm-modal";
import { useTogglePublishMutation } from "@/services/chapterApi";

interface ChapterActionsProps {
  disabled: boolean;
  courseId: string;
  chapterId: string;
  isPublished: boolean;
}

export const ChapterActions = ({
  disabled,
  courseId,
  chapterId,
  isPublished,
}: ChapterActionsProps) => {
  const [tooglePublish] = useTogglePublishMutation();

  const [isLoading, setIsLoading] = useState(false);
  console.log(courseId);
  const onClick = async () => {
    try {
      const response = await tooglePublish({
        courseId,
        chapterId,
        publish: isPublished ? false : true,
      }).unwrap();

      setIsLoading(true);
      toast.success(response.message);
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setIsLoading(true);
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-x-2">
      <Button
        onClick={onClick}
        disabled={disabled || isLoading}
        variant="outline"
        size={"sm"}
      >
        {isPublished ? "Unpublish" : "Publish"}
      </Button>
      <ConfirmModal onConfirm={onDelete}>
        <Button size={"sm"} disabled={isLoading}>
          <Trash className="h-4 w-4" />
        </Button>
      </ConfirmModal>
    </div>
  );
};
