import { jwtInstance } from "./utils/jwtInterceptor";

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

  return jwtInstance.get(url);
}
export function createPost(data) {
  return jwtInstance.post("posts/", data);
}
export function getPostDetails(postId) {
  return jwtInstance.get(`posts/${postId}`);
}
export function updatePost(postId, data) {
  return jwtInstance.put(`posts/${postId}`, data);
}
export function deletePost(postId) {
  return jwtInstance.delete(`posts/${postId}`);
}

export function handleLike(postId) {
  return jwtInstance.post(`posts/${postId}/like`);
}
export function handleDislike(postId) {
  return jwtInstance.post(`posts/${postId}/dislike`);
}
export function handleBookmark(postId) {
  return jwtInstance.post(`posts/${postId}/bookmark`);
}
