import { useState } from "react";
import toast from "react-hot-toast";
import { Button } from "../ui/button";
import { Trash } from "lucide-react";
import { ConfirmModal } from "../confirm-modal";
import { useDeleteModuleMutation, useTogglePublishMutation } from "@/services/modulesApi";
import { useNavigate } from "react-router-dom";

interface ModuleActionsProps {
  disabled: boolean;
  courseId: string;
  moduleId: string;
  isPublished: boolean;
}

export const ModuleActions = ({
  disabled,
  courseId,
  moduleId,
  isPublished,
}: ModuleActionsProps) => {
  const [tooglePublish] = useTogglePublishMutation();
  const [deleteModule] = useDeleteModuleMutation();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  console.log(courseId);
  const onClick = async () => {
    try {
      const response = await tooglePublish({
        courseId,
        moduleId,
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
      await deleteModule({ courseId, moduleId }).unwrap();
      navigate(`/courses/${courseId}`);
      toast.success("Module Deleted Successful");
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
