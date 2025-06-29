// components/file-upload/FileIconResolver.tsx
import {
  FileTextIcon,
  FileArchiveIcon,
  FileSpreadsheetIcon,
  VideoIcon,
  HeadphonesIcon,
  ImageIcon,
  FileIcon,
} from "lucide-react";

const mimeTypes: Record<string, string> = {
  pdf: "application/pdf",
  doc: "application/msword",
  docx: "application/msword",
  xls: "application/vnd.ms-excel",
  xlsx: "application/vnd.ms-excel",
  zip: "application/zip",
  rar: "application/x-rar-compressed",
  mp4: "video/mp4",
  mov: "video/quicktime",
  mp3: "audio/mpeg",
  png: "image/png",
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  gif: "image/gif",
};

export const getMimeTypeFromName = (name: string): string => {
  const ext = name.split(".").pop()?.toLowerCase();
  return ext && mimeTypes[ext] ? mimeTypes[ext] : "application/octet-stream";
};

export const getFileIcon = (file: { file: File | { type: string; name: string } }) => {
  const fileType = file.file instanceof File ? file.file.type : file.file.type;
  const fileName = file.file instanceof File ? file.file.name : file.file.name;

  if (
    fileType.includes("pdf") ||
    fileName.endsWith(".pdf") ||
    fileType.includes("word") ||
    fileName.endsWith(".doc") ||
    fileName.endsWith(".docx")
  ) {
    return <FileTextIcon className="size-4 opacity-60" />;
  } else if (
    fileType.includes("zip") ||
    fileType.includes("archive") ||
    fileName.endsWith(".zip") ||
    fileName.endsWith(".rar")
  ) {
    return <FileArchiveIcon className="size-4 opacity-60" />;
  } else if (
    fileType.includes("excel") ||
    fileName.endsWith(".xls") ||
    fileName.endsWith(".xlsx")
  ) {
    return <FileSpreadsheetIcon className="size-4 opacity-60" />;
  } else if (fileType.includes("video/")) {
    return <VideoIcon className="size-4 opacity-60" />;
  } else if (fileType.includes("audio/")) {
    return <HeadphonesIcon className="size-4 opacity-60" />;
  } else if (fileType.startsWith("image/")) {
    return <ImageIcon className="size-4 opacity-60" />;
  }
  return <FileIcon className="size-4 opacity-60" />;
};
