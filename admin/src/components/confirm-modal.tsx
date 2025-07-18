 "use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useOutletContext } from "react-router-dom";

interface ConfirmModelProps {
  children: React.ReactNode;
  onConfirm: () => void;
}

type LayoutContext = { setDialogOpen: (open: boolean) => void };

export const ConfirmModal = ({ children, onConfirm }: ConfirmModelProps) => {
  const { setDialogOpen } = useOutletContext<LayoutContext>();

  return (
    <AlertDialog
      onOpenChange={(open) => {
        setDialogOpen(open);
      }}
    >
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent className="z-[9999] fixed top-1/2 left-1/2 py-7 bg-slate-900 shadow-none -translate-x-1/2 -translate-y-1/2">
        <AlertDialogHeader className="flex justify-center items-center gap-3">
          <AlertDialogTitle className="font-bold">Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription className="flex justify-center items-center text-center w-[95%]">
            This action cannot be undone. This will permanently delete the course and remove all associated data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex justify-center items-center mt-4">
          <AlertDialogCancel className="dark:bg-white/[0.03]">Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>Delete Course</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
