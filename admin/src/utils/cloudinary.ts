import axios from "axios";
import toast from "react-hot-toast";

interface UploadOptions {
  file: File;
  resourceType: string;
  onProgress?: (percentage: number) => void;
}

export const uploadToCloudinary = async ({
  file,
  resourceType,
  onProgress,
}: UploadOptions): Promise<string> => {
  const cloudName = "dwpxyvb3c";
  const uploadPreset = "LearnEase_Preset";

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);
  formData.append("folder", "LearnEase-Images");

  try {
    const res = await axios.post(
      `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total) {
            const percentage = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            if (onProgress) onProgress(percentage);
          }
        },
      }
    );

    if (res.data.secure_url) {
      return res.data.secure_url;
    } else {
      throw new Error("No secure_url returned");
    }
  } catch (err) {
    console.error("Cloudinary upload failed:", err);
    toast.error("Upload failed");
    throw err;
  }
};
