"use client";

import FeedSubMenu from "@/components/Menus/FeedSubMenu";
import { COMMENT_PAGE_SIZE } from "@/constants";
import { useCreateComment, useFetchComments } from "@/lib/comment/hooks";
import { IComment, NewCommentDTO } from "@/lib/comment/types";
import { useFetchFeedDetail } from "@/lib/feed/hooks";
import { useAuthStore } from "@/stores/auth/useAuthStore";
import { getImageUrl } from "@/utils/supabase/storage";
import { getTimeDisplay } from "@/utils/time";
import { HeartIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

export default function FeedDetailCard() {
  const { user } = useAuthStore();
  const params = useParams() as { id: string };
  const feedId = params?.id;
  const [comment, setComment] = useState("");

  const { data } = useFetchFeedDetail(feedId);
  const {
    data: commentsFetchData,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useFetchComments({
    feedId,
    pageSize: COMMENT_PAGE_SIZE,
  });

  const { ref, inView } = useInView({
    threshold: 0,
  });

  const commentData =
    commentsFetchData?.pages?.flatMap((page) => page.data) || [];

  const { mutateAsync: createCommentMutate, isPending: isCreating } =
    useCreateComment();

  const onSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("onSubmitComment");
    if (comment.trim() === "") return;
    try {
      if (user) {
        const newCommentData: NewCommentDTO = {
          feed_id: feedId,
          user_id: user.id,
          comment_content: comment,
        };
        await createCommentMutate(newCommentData);
      }
    } catch (error) {
      console.error("Error creating comment:", (error as Error).message);
    }
    setComment("");
  };

  useEffect(() => {
    if (inView && hasNextPage && !isFetching && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage]);

  return (
    <div className="flex items-center justify-center w-full h-full overflow-y-auto ">
      {data ? (
        <div className="flex gap-6 w-full h-full flex-col md:flex-row ">
          <div className="md:w-3/5 relative aspect-square">
            <Image
              src={getImageUrl(data.feed_image)}
              alt="Feed image"
              priority
              fill
              className="object-contain"
            />
          </div>
          <div className="md:w-2/5 flex flex-col ">
            <div className="border-b">
              <div className="flex items-center pb-3">
                <Image
                  src={`/images/default-profile.jpg`}
                  alt="User profile"
                  width={40}
                  height={40}
                  className="rounded-full mr-3"
                />
                <div className="flex flex-col">
                  <p className="font-semibold text-sm">{data.user_nickname}</p>
                  <p className="text-gray-500 text-xs">
                    {getTimeDisplay(data.created_at)}
                  </p>
                </div>
              </div>
              <p className="text-gray-800 mb-4 text-sm">{data.feed_content}</p>
            </div>
            <div className="flex-1 overflow-y-auto py-3">
              <div className="flex-1 overflow-y-auto py-3">
                {commentData.length > 0 ? (
                  commentData.map((comment) => (
                    <div key={comment.id} className="flex items-start mb-4">
                      <Image
                        src={`/images/default-profile.jpg`}
                        alt="User profile"
                        width={30}
                        height={30}
                        className="rounded-full mr-3"
                      />
                      <div>
                        <p className="text-sm font-semibold">
                          {comment.user_nickname}
                        </p>
                        <p className="text-gray-600 text-sm">
                          {comment.comment_content}
                        </p>
                        <p className="text-gray-400 text-xs">
                          {getTimeDisplay(comment.created_at)}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-xs">댓글이 없습니다.</p>
                )}
                <div ref={ref}></div>
              </div>
            </div>
            <div className="flex items-center mb-3">
              <input
                type="text"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="댓글을 입력하세요..."
                className="flex-1 p-2 border border-gray-300 rounded-md mr-2 text-sm focus:outline-none focus:border-cyan-600"
              />
              <button
                onClick={onSubmitComment}
                className="px-4 py-2 text-sm text-white bg-cyan-600 rounded-md hover:bg-cyan-700"
              >
                게시
              </button>
            </div>
            <div className="flex w-full items-center justify-between border-t pt-2 text-gray-500 md:mb-0 mb-6">
              <div className="flex items-center gap-1">
                <HeartIcon className="w-6 h-6" />
                <p>{data.like_count || ""}</p>
              </div>

              {data.user_id === user?.id && (
                <FeedSubMenu
                  feedId={Number(feedId)}
                  imagePath={data.feed_image}
                  isTopMenu
                />
              )}
            </div>
          </div>
        </div>
      ) : (
        <p className="text-center text-white">게시글을 찾을 수 없습니다.</p>
      )}
    </div>
  );
}
