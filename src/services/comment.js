import jwtInstance from "../utils/jsonInterceptor";

import axiosInstance from "../utils/instance";
//완료
export const getComments = async (data) => {
  const { postId, page } = data;
  return await axiosInstance
    .get(`/posts/${postId}/comment?page=${page}`)
    .then((response) => response.data);
};
//완료
export const addComment = async (data) => {
  const { comment, postId } = data;

  return await jwtInstance.post(`/posts/${postId}/comment/`, { comment });
};
//완료
export const editComment = async (data) => {
  const { editedComment, editedCommentId } = data;

  return await jwtInstance.put(`/posts/comment/${editedCommentId}/`, {
    comment: editedComment,
  });
};
//완료
export const deleteComment = async (commentId) => {
  return await jwtInstance.delete(`/posts/comment/${commentId}/`);
};
