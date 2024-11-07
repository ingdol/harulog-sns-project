"use client";

import { FeedSubMenu } from "@/components/Menus";
import SubMenu from "@/components/Menus/SubMenu";
import { COMMENT_PAGE_SIZE } from "@/constants";
import {
  useCreateComment,
  useDeleteComment,
  useFetchComments,
  useUpdateComment,
} from "@/lib/comment/hooks";
import { NewCommentDTO } from "@/lib/comment/types";
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
  const [commentContent, setCommentContent] = useState("");
  const [isCommentEdit, setCommentEdit] = useState("");
  const [contentEdit, setContentEdit] = useState("");

  const { data } = useFetchFeedDetail(feedId);
  const { mutateAsync: deleteCommentMutate } = useDeleteComment();
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

  const { mutateAsync: createCommentMutate } = useCreateComment();
  const { mutateAsync: updateCommentMutate } = useUpdateComment();

  const handleCreateComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (commentContent.trim() === "") return;
    try {
      if (user) {
        const newCommentData: NewCommentDTO = {
          feed_id: feedId,
          user_id: user.id,
          comment_content: commentContent,
        };
        await createCommentMutate(newCommentData);
      }
    } catch (error) {
      console.error("Error creating comment:", (error as Error).message);
    }
    setCommentContent("");
  };

  const handleUpdateComment = async (comment_id: number) => {
    if (contentEdit.trim() === "") return;
    try {
      if (user) {
        await updateCommentMutate({
          commentId: comment_id,
          commentContent: contentEdit,
        });
        setCommentEdit("");
        setContentEdit("");
      }
    } catch (error) {
      console.error("Error creating comment:", (error as Error).message);
    }
    setCommentContent("");
  };
  const handleDeleteComment = async (commentId: number) => {
    try {
      await deleteCommentMutate({ commentId });
      console.log("삭제되었습니다.");
    } catch (error) {
      console.error("삭제 중 오류 발생:", error);
    }
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
                    <div className="group relative" key={comment.id}>
                      <div key={comment.id} className="flex items-start mb-4">
                        <Image
                          src={`/images/default-profile.jpg`}
                          alt="User profile"
                          width={30}
                          height={30}
                          className="rounded-full mr-3"
                        />
                        {isCommentEdit === String(comment.id) ? (
                          <div>
                            <div>
                              <div className="flex gap-2">
                                <span className="text-sm font-semibold">
                                  {comment.user_nickname}
                                </span>
                              </div>
                              <div className="flex items-center">
                                <input
                                  type="text"
                                  value={contentEdit}
                                  onChange={(e) =>
                                    setContentEdit(e.target.value)
                                  }
                                  placeholder="댓글을 입력하세요..."
                                  className="flex-1 p-2 border border-gray-300 rounded-md mr-2 text-sm focus:outline-none focus:border-cyan-600"
                                />
                                <button
                                  onClick={() =>
                                    handleUpdateComment(comment.id)
                                  }
                                  className="px-4 py-2 text-sm text-white bg-cyan-600 rounded-md hover:bg-cyan-700"
                                >
                                  수정
                                </button>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div>
                            <div>
                              <div className="flex gap-2">
                                <span className="text-sm font-semibold">
                                  {comment.user_nickname}
                                </span>
                                <span className="text-gray-600 text-sm">
                                  {comment.comment_content}
                                </span>
                              </div>
                              <p className="text-gray-400 text-xs">
                                {getTimeDisplay(comment.created_at)}
                              </p>

                              {comment.user_id === user?.id && (
                                <SubMenu
                                  isComment
                                  onClickEditButton={() => {
                                    setContentEdit(comment.comment_content);
                                    setCommentEdit(String(comment.id));
                                  }}
                                  onClickDeleteButton={() =>
                                    handleDeleteComment(comment.id)
                                  }
                                />
                              )}
                            </div>
                          </div>
                        )}
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
                value={commentContent}
                onChange={(e) => setCommentContent(e.target.value)}
                placeholder="댓글을 입력하세요..."
                className="flex-1 p-2 border border-gray-300 rounded-md mr-2 text-sm focus:outline-none focus:border-cyan-600"
              />
              <button
                onClick={handleCreateComment}
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
                  isTopMenu
                  feedId={data.id}
                  imagePath={data.feed_image}
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
