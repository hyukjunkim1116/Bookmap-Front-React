import axiosInstance from "../utils/axiosUtils";

export function getComments(postId, page) {
  return axiosInstance.get(`posts/${postId}/comment?page=${page}`);
}
export function addComment(postId, data) {
  return axiosInstance.post(`posts/${postId}/comment`, data);
}
export function editComment(commentId, data) {
  return axiosInstance.put(`posts/comment/${commentId}`, data);
}
export function deleteComment(commentId) {
  return axiosInstance.delete(`posts/comment/${commentId}`);
}
