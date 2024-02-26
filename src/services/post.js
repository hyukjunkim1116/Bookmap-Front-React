import axiosInstance from "../utils/axiosUtils";

export function getPosts(params) {
  let url = `posts/?`;
  if (params.page) {
    url += `page=${params.page}&`;
  }
  if (params.sort) {
    url += `sort=${params.sort}&`;
  }
  if (params.search) {
    url += `search=${params.search}`;
  }

  return axiosInstance.get(url);
}
export function createPost(data) {
  return axiosInstance.post("posts/", data);
}
export function getPostDetails(postId) {
  return axiosInstance.get(`posts/${postId}`);
}
export function updatePost(postId, data) {
  return axiosInstance.put(`posts/${postId}`, data);
}
export function deletePost(postId) {
  return axiosInstance.delete(`posts/${postId}`);
}

export function handleLike(postId) {
  return axiosInstance.post(`posts/${postId}/like`);
}
export function handleDislike(postId) {
  return axiosInstance.post(`posts/${postId}/dislike`);
}
export function handleBookmark(postId) {
  return axiosInstance.post(`posts/${postId}/bookmark`);
}
