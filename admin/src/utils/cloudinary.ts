import toast from "react-hot-toast";

export const uploadToCloudinary = async(file: File, resource_type: string): Promise<string> => {

  const cloudName = "dwpxyvb3c";
  const uploadPreset = "LearnEase_Preset";

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);
  formData.append("folder", "LearnEase-Images"); 

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/${resource_type}/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  if (!res.ok) {
    throw new Error("Upload to Cloudinary failed");
    toast.error("Something went wrong!")
  }

  const data = await res.json();
  if (!data.secure_url) {
    throw new Error("Upload failed: No secure_url returned from Cloudinary");
  }

  return data.secure_url;
}
