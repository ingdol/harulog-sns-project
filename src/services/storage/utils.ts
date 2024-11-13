import { uploadFile } from "./api";

export async function handleImageUpload(file: File): Promise<string> {
  const uniqueFileName = `${crypto.randomUUID()}_${file.name}`;
  const renamedFile = new File([file], uniqueFileName, {
    type: file.type,
  });

  const result = await uploadFile(renamedFile);
  return result?.path || "";
}
