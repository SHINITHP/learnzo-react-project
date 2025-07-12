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
        console.log("Modal open state:", open); // Debug log
        setDialogOpen(open); // Sync with dialogOpen state
      }}
    >
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are You Sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};