export async function uploadFile(file: File) {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch("/api/storage", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Failed to upload file");
  }

  return await response.json();
}

export async function deleteFile(imagePath: string) {
  const response = await fetch("/api/storage", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ imagePath }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Failed to delete file");
  }

  return await response.json();
}
