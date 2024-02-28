import { axiosInstance, axiosFormInstance } from "../utils/axiosUtils";

export const getPosts = async (params) => {
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
  axiosInstance.interceptors.request.use((config) => {
    if (!config.headers) return config;
    const accessToken = JSON.parse(localStorage.getItem("user")).state.token
      .access;
    if (accessToken && config.headers) {
      config.headers.Authorization = `Bearer ${accessToken}`;
      config.headers["Content-Type"] = "application/json";
    }
    return config;
  });
  return await axiosInstance
    .post("posts/", data)
    .then((response) => response.data);
};
//완료
export const deletePostImage = async (data) => {
  const { image, postId } = data;
  axiosInstance.interceptors.request.use((config) => {
    if (!config.headers) return config;
    const accessToken = JSON.parse(localStorage.getItem("user")).state.token
      .access;
    if (accessToken && config.headers) {
      config.headers.Authorization = `Bearer ${accessToken}`;
      config.headers["Content-Type"] = "application/json";
    }
    return config;
  });
  return await axiosInstance
    .delete(`posts/image/${postId}?url=${image}`)
    .then((response) => response.data);
};
//완료
export async function uploadPostImage(data) {
  axiosFormInstance.interceptors.request.use((config) => {
    if (!config.headers) return config;
    const accessToken = JSON.parse(localStorage.getItem("user")).state?.token
      ?.access;
    if (accessToken && config.headers) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  });
  return await axiosFormInstance.post(`posts/image/${data.postId}`, {
    image: data.image[0],
  });
}

//완료
export function updatePost(data) {
  const { title, content, postId } = data;
  axiosInstance.interceptors.request.use((config) => {
    if (!config.headers) return config;
    const accessToken = JSON.parse(localStorage.getItem("user")).state.token
      .access;
    if (accessToken && config.headers) {
      config.headers.Authorization = `Bearer ${accessToken}`;
      config.headers["Content-Type"] = "application/json";
    }
    return config;
  });
  return axiosInstance.put(`posts/${postId}`, { title, content });
}
//완료
export async function deletePost(data) {
  const { postId } = data;
  axiosInstance.interceptors.request.use((config) => {
    if (!config.headers) return config;
    const accessToken = JSON.parse(localStorage.getItem("user")).state.token
      .access;
    if (accessToken && config.headers) {
      config.headers.Authorization = `Bearer ${accessToken}`;
      config.headers["Content-Type"] = "application/json";
    }
    return config;
  });
  return await axiosInstance.delete(`posts/${postId}`);
}
//완료
export async function handleLike(data) {
  const { postId } = data;
  axiosInstance.interceptors.request.use((config) => {
    if (!config.headers) return config;
    const accessToken = JSON.parse(localStorage.getItem("user")).state.token
      .access;
    if (accessToken && config.headers) {
      config.headers.Authorization = `Bearer ${accessToken}`;
      config.headers["Content-Type"] = "application/json";
    }
    return config;
  });
  return await axiosInstance.post(`posts/${postId}/like`);
}
//완료
export async function handleDislike(data) {
  const { postId } = data;
  axiosInstance.interceptors.request.use((config) => {
    if (!config.headers) return config;
    const accessToken = JSON.parse(localStorage.getItem("user")).state.token
      .access;
    if (accessToken && config.headers) {
      config.headers.Authorization = `Bearer ${accessToken}`;
      config.headers["Content-Type"] = "application/json";
    }
    return config;
  });
  return await axiosInstance.post(`posts/${postId}/dislike`);
}
//완료
export async function handleBookmark(data) {
  const { postId } = data;
  axiosInstance.interceptors.request.use((config) => {
    if (!config.headers) return config;
    const accessToken = JSON.parse(localStorage.getItem("user")).state.token
      .access;
    if (accessToken && config.headers) {
      config.headers.Authorization = `Bearer ${accessToken}`;
      config.headers["Content-Type"] = "application/json";
    }
    return config;
  });
  return await axiosInstance.post(`posts/${postId}/bookmark`);
}
//완료
export async function reportPost(data) {
  const { postId, ...postData } = data;
  console.log(postData);
  axiosInstance.interceptors.request.use((config) => {
    if (!config.headers) return config;
    const accessToken = JSON.parse(localStorage.getItem("user")).state.token
      .access;
    if (accessToken && config.headers) {
      config.headers.Authorization = `Bearer ${accessToken}`;
      config.headers["Content-Type"] = "application/json";
    }
    return config;
  });
  return await axiosInstance.post(`reports/${postId}`, postData);
}
