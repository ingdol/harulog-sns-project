import PostCreateCard from "@/components/feed/PostCreateCard";
import ModalPage from "@/components/modal/ModalPage";
// import usePreviousUrl from "@/hooks/usePreviousUrl";

export default function PostCreatePage() {
  // const previousUrl = usePreviousUrl();
  return (
    <>
      {/* <p>이전 URL: {previousUrl}</p> */}
      <ModalPage>
        <PostCreateCard />
      </ModalPage>
    </>
  );
}
