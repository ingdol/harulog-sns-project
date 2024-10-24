import Link from "next/link";
import Post from "./Post";
import { CloudIcon } from "@heroicons/react/24/solid";

interface PostType {
  id: string;
  user_id: string;
  post_contents: string;
  post_image: string;
  comment_count: number;
  like_count: number;
  created_at: string;
  updated_at: string;
  deleted_at: string;
}

const Feed = async () => {
  const posts: PostType[] = [
    {
      id: "1",
      user_id: "1",
      post_contents: "내용입니다.",
      post_image: "/test_image",
      comment_count: 0,
      like_count: 0,
      created_at: "1일",
      updated_at: "",
      deleted_at: "",
    },
  ];

  return (
    <div className="bg-white flex flex-col justify-center gap-12 pb-10">
      {posts.length ? (
        posts.map((post: PostType) => <Post key={post.id} post={post} />)
      ) : (
        <div className="p-4 max-w-xl mx-auto flex flex-col justify-center items-center text-center gap-4">
          <p className="text-2xl text-gray-500">게시글이 없습니다.</p>{" "}
          <CloudIcon className="w-10 h-10 text-slate-200" />
          <p className="text-xl text-gray-700">
            오늘{" "}
            <Link href="/" className="text-2xl text-cyan-700">
              하루 기록
            </Link>
            하러 가기
          </p>{" "}
        </div>
      )}
    </div>
  );
};

export default Feed;
