import jwtInstance from "../utils/jsonInterceptor";
import formInstance from "../utils/formInterceptor";
import axiosInstance from "../utils/instance";
//완료
export const getPosts = async (params) => {
  let url = `posts/?`;
  if (params?.page) {
    url += `page=${params.page}&`;
  }
  if (params?.sort) {
    url += `sort=${params.sort}&`;
  }
  if (params?.search) {
    url += `search=${params.search}`;
  }
  console.log(url);
  return await axiosInstance.get(url).then((response) => response.data);
};
//완료
export const getPostDetails = async (postId) => {
  return await axiosInstance
    .get(`posts/${postId}`)
    .then((response) => response.data);
};
//완료
export const createPost = async (data) => {
  return await jwtInstance
    .post("posts/", data)
    .then((response) => response.data);
};
//완료
export const deletePostImage = async (data) => {
  const { image, postId } = data;

  return await jwtInstance
    .delete(`posts/image/${postId}?url=${image}`)
    .then((response) => response.data);
};
//완료
export async function uploadPostImage(data) {
  return await formInstance.post(`posts/image/${data.postId}`, {
    image: data.image[0],
  });
}

//완료
export function updatePost(data) {
  const { title, content, postId } = data;

  return jwtInstance.put(`posts/${postId}`, { title, content });
}
//완료
export async function deletePost(data) {
  const { postId } = data;

  return await jwtInstance.delete(`posts/${postId}`);
}
//완료
export async function handleLike(data) {
  const { postId } = data;

  return await jwtInstance.post(`posts/${postId}/like`);
}
//완료
export async function handleDislike(data) {
  const { postId } = data;

  return await jwtInstance.post(`posts/${postId}/dislike`);
}
//완료
export async function handleBookmark(data) {
  const { postId } = data;

  return await jwtInstance.post(`posts/${postId}/bookmark`);
}
//완료
export async function reportPost(data) {
  const { postId, ...postData } = data;

  return await jwtInstance.post(`reports/${postId}`, postData);
}
