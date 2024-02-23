import { jwtInstance, formInstance } from "./utils/jwtInterceptor";
import { readAndCompressImage } from "browser-image-resizer";

export function uploadPostImage(data) {
  return formInstance.post(`posts/image`, data);
}
export function deletePostImage(url) {
  return jwtInstance.delete(`posts/image?url=${url}`);
}
export function compressImage(file) {
  return readAndCompressImage(file, {
    quality: 0.8,
  });
}
