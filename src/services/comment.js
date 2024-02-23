import { jwtInstance } from "./utils/jwtInterceptor";

export function getComments(postId, page) {
  return jwtInstance.get(`posts/${postId}/comment?page=${page}`);
}
export function addComment(postId, data) {
  return jwtInstance.post(`posts/${postId}/comment`, data);
}
export function editComment(commentId, data) {
  return jwtInstance.put(`posts/comment/${commentId}`, data);
}
export function deleteComment(commentId) {
  return jwtInstance.delete(`posts/comment/${commentId}`);
}
