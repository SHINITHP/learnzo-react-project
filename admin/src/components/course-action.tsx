import { useState } from "react";
import toast from "react-hot-toast";
import { Button } from "./ui/button";
import { Trash } from "lucide-react";
import { ConfirmModal } from "./confirm-modal";
import { useDeleteCourseMutation, useTogglePublishMutation } from "@/services/courseApi";
import { useNavigate } from "react-router-dom";

interface CourseActionsProps {
  disabled: boolean;
  courseId: string;
  isPublished: boolean;
}

export const CourseActions = ({
  disabled,
  courseId,
  isPublished,
}: CourseActionsProps) => {
  const [tooglePublish] = useTogglePublishMutation();
  const [deleteCourse] = useDeleteCourseMutation();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const onClick = async () => {
    try {
      const response = await tooglePublish({
        id: courseId!,
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
      await deleteCourse(courseId!).unwrap();
      navigate('/courses')
      toast.success("Course Deleted Successful");
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
