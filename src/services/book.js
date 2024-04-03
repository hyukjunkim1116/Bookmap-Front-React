import { json } from "react-router-dom";
import axiosInstance from "../utils/instance";
export const getBooks = async () => {
  //body
  // {
  //     "start": 0,
  //     "query": "string"
  //     }
  const res = await axiosInstance.get("/books/");
  console.log(res);
  return res;
};
export const getBookDetail = async (isbn) => {
  return await axiosInstance.get(`/books/detail?isbn=${isbn}`);
};
// export const getBookCrawling = async (data) => {
//     /api/books/crawling,
// parameter
// {
// "isbn": "string",
// "currentLatitude": 0,
// "currentLongitude": 0
// }
//   return await axiosInstance.get(`/books/crawling?isbn=${isbn}`);
// };
