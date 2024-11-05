import { uploadFile } from "@/actions/storage-action";

export async function handleImageUpload(file: File): Promise<string> {
  const uniqueFileName = `${crypto.randomUUID()}_${file.name}`;
  const renamedFile = new File([file], uniqueFileName, {
    type: file.type,
  });
  const formData = new FormData();
  formData.append("file", renamedFile);

  const result = await uploadFile(formData);
  return result?.path || "";
}
