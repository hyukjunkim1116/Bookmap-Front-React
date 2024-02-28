import { axiosInstance } from "../utils/axiosUtils";
//완료
export const getComments = async (data) => {
  const { postId, page } = data;
  return await axiosInstance
    .get(`posts/${postId}/comment?page=${page}`)
    .then((response) => response.data);
};
//완료
export const addComment = async (data) => {
  console.log(data);
  const { comment, postId } = data;
  console.log(comment, "asdasd");
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
  return await axiosInstance.post(`posts/${postId}/comment`, { comment });
};
//완료
export const editComment = async (data) => {
  const { editedComment, editedCommentId } = data;
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
  return await axiosInstance.put(`posts/comment/${editedCommentId}`, {
    comment: editedComment,
  });
};
//완료
export const deleteComment = async (commentId) => {
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
  return await axiosInstance.delete(`posts/comment/${commentId}`);
};
