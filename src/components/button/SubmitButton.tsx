interface SubmitButtonProps {
  isUploading: boolean;
  onClick: (e: React.FormEvent) => void;
}

export default function SubmitButton({
  isUploading,
  onClick,
}: SubmitButtonProps) {
  return (
    <button
      type="submit"
      onClick={onClick}
      disabled={isUploading}
      className={`bg-cyan-600 text-white px-8 py-1.5 rounded hover:bg-cyan-700 ${
        isUploading ? "opacity-50" : ""
      }`}
    >
      {isUploading ? "Posting..." : "Post"}
    </button>
  );
}
