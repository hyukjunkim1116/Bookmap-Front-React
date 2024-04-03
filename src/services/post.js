import jwtInstance from "../utils/jsonInterceptor";
import formInstance from "../utils/formInterceptor";
import axiosInstance from "../utils/instance";
export const getPosts = async (params) => {
  let url = `/posts?`;
  if (params?.page) {
    url += `page=${params.page}&`;
  }
  if (params?.sort) {
    url += `sort=${params.sort}&`;
  }
  if (params?.search) {
    url += `search=${params.search}`;
  }
  return await axiosInstance.get(url).then((response) => response.data);
};
export const getPostDetails = async (postId) => {
  return await axiosInstance
    .get(`/posts/${postId}/`)
    .then((response) => response.data);
};
export const createPost = async (data) => {
  return await jwtInstance
    .post("/posts/", data)
    .then((response) => response.data);
};
export const deletePostImage = async (data) => {
  const { image, postId } = data;

  return await jwtInstance
    .delete(`/posts/image/${postId}?url=${image}/`)
    .then((response) => response.data);
};

export async function uploadPostImage(data) {
  return await formInstance.post(`/posts/image/${data.postId}/`, {
    image: data.image[0],
  });
}

export function updatePost(data) {
  const { title, content, postId } = data;

  return jwtInstance.put(`/posts/${postId}/`, { title, content });
}

export async function deletePost(data) {
  const { postId } = data;

  return await jwtInstance.delete(`/posts/${postId}/`);
}

export async function handleLike(data) {
  const { postId } = data;

  return await jwtInstance.post(`/posts/${postId}/like/`);
}

export async function handleDislike(data) {
  const { postId } = data;

  return await jwtInstance.post(`/posts/${postId}/dislike/`);
}

export async function handleBookmark(data) {
  const { postId } = data;

  return await jwtInstance.post(`/posts/${postId}/bookmark/`);
}

export async function reportPost(data) {
  const { postId, ...postData } = data;

  return await jwtInstance.post(`/reports/${postId}/`, postData);
}
