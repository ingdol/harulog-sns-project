import { PhotoIcon } from "@heroicons/react/24/solid";

interface FileUploadButtonProps {
  onClick: () => void;
}

export default function FileUploadButton({ onClick }: FileUploadButtonProps) {
  return (
    <button type="button" onClick={onClick}>
      <PhotoIcon className="w-6 h-6 text-gray-300 hover:text-gray-400" />
    </button>
  );
}
