import { jwtInstance } from "./utils/jwtInterceptor";
export function reportPost(postId, data) {
  return jwtInstance.post(`reports/${postId}`, data);
}
