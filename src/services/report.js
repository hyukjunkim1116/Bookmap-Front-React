import axiosInstance from "../utils/axiosUtils";
export function reportPost(postId, data) {
  return axiosInstance.post(`reports/${postId}`, data);
}
