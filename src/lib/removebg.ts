// Remove.bg background removal — connect after setting up .env.local
// export async function removeBackground(imageFile: File): Promise<Blob> {
//   const formData = new FormData();
//   formData.append("image_file", imageFile);
//   formData.append("size", "auto");
//
//   const response = await fetch("https://api.remove.bg/v1.0/removebg", {
//     method: "POST",
//     headers: { "X-Api-Key": process.env.REMOVE_BG_API_KEY! },
//     body: formData,
//   });
//
//   if (!response.ok) throw new Error("Background removal failed");
//   return response.blob();
// }

export {};
