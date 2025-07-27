// useMuxUpload.ts
import { useUploadDataToMuxMutation, useFinalizeMuxUploadMutation } from "@/services/chapterApi";

interface MuxUploadResponse {
  url: string;
  upload_id: string;
}

interface MuxUploadCompleteResponse {
  asset_id: string;
  playback_id: string;
}

export const useMuxUpload = () => {
  const [uploadDataToMux] = useUploadDataToMuxMutation();
  const [finalizeMuxUpload] = useFinalizeMuxUploadMutation();

  const uploadToMux = async (file: File): Promise<string> => {
    try {
      // Step 1: Get direct upload URL
      const response = await uploadDataToMux().unwrap();
      if (!response.success) {
        throw new Error("Failed to get upload URL");
      }

      const { url, upload_id }: MuxUploadResponse = response.data;

      // Step 2: Upload to Mux
      const uploadToMuxResponse = await fetch(url, {
        method: "PUT",
        body: file,
        headers: {
          "Content-Type": file.type,
        },
      });

      if (!uploadToMuxResponse.ok) {
        throw new Error("Failed to upload to Mux");
      }

      // Step 3: Notify backend of completion
      const completeResponse = await finalizeMuxUpload({ upload_id }).unwrap();
      if (!completeResponse.success) {
        throw new Error("Failed to complete upload");
      }

      const { playback_id }: MuxUploadCompleteResponse = completeResponse.data;
      return playback_id;
    } catch (error) {
      console.error("Mux upload error:", error);
      throw error;
    }
  };

  return {
    uploadToMux,
  };
};
