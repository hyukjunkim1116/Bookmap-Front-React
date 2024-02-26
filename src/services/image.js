import axiosInstance from "../utils/axiosUtils";

export function uploadPostImage(data) {
  return axiosInstance.post(`posts/image`, data);
}
export function deletePostImage(url) {
  return axiosInstance.delete(`posts/image?url=${url}`);
}
