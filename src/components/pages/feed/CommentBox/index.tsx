"use client";
import SubMenu from "@/components/Menus/SubMenu";
import { COMMENT_PAGE_SIZE } from "@/constants";
import {
  useCreateComment,
  useDeleteComment,
  useFetchComments,
  useUpdateComment,
} from "@/services/comment/hooks";
import { NewCommentDTO } from "@/services/comment/types";
import { IFeed } from "@/services/feed";
import { useAuthStore } from "@/stores/auth/useAuthStore";
import { getTimeDisplay } from "@/utils/time";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

export default function CommentBox({ feed }: { feed: IFeed }) {
  const { user } = useAuthStore();
  const [commentContent, setCommentContent] = useState("");
  const [isCommentEdit, setCommentEdit] = useState("");
  const [contentEdit, setContentEdit] = useState("");
  const { mutateAsync: deleteCommentMutate } = useDeleteComment();
  const {
    data: commentsFetchData,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useFetchComments({
    feedId: feed.id,
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
          feed_id: feed.id,
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
    <div className="flex-1 flex-col overflow-y-auto  justify-between">
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
                      <input
                        type="text"
                        value={contentEdit}
                        onChange={(e) => setContentEdit(e.target.value)}
                        placeholder="댓글을 입력하세요..."
                        className="flex-1 p-1 mt-1 border-b border-gray-300 text-sm focus:outline-none focus:border-cyan-600"
                      />
                      <div className="flex justify-end mt-1">
                        <button
                          onClick={() => setCommentEdit("")}
                          className="px-2 py-1 text-sm text-gray-400 rounded-xl hover:bg-gray-100"
                        >
                          취소
                        </button>
                        <button
                          onClick={() => handleUpdateComment(comment.id)}
                          className={`px-2 py-1 text-sm rounded-xl hover:bg-gray-100 ${
                            contentEdit.length > 0
                              ? "text-cyan-700"
                              : "text-gray-300"
                          } `}
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

                      {(comment.user_id === user?.id ||
                        feed.user_id === user?.id) && (
                        <SubMenu
                          isComment
                          isDeleteOnly={comment.user_id !== user?.id}
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

      <div className="flex items-center mb-3 rounded-md border border-gray-300 focus-within:border-cyan-600">
        <input
          type="text"
          value={commentContent}
          onChange={(e) => setCommentContent(e.target.value)}
          placeholder="댓글을 입력하세요..."
          className="flex-1 pl-3 pr-1 py-2 focus:outline-none text-sm bg-transparent"
        />
        <button
          onClick={handleCreateComment}
          className={`px-3 text-sm font-semibold ${
            commentContent.length > 0 ? "text-cyan-700" : "text-gray-300"
          } `}
        >
          게시
        </button>
      </div>
    </div>
  );
}
