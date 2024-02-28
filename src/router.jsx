import { createBrowserRouter } from "react-router-dom";
import Root from "./components/Root";
import Home from "./routes/Home";
import NotFound from "./routes/NotFound";
import KakaoConfirm from "./routes/KakaoConfirm";
import EmailConfirm from "./routes/EmailConfirm";
import Mypage from "./routes/Mypage";
import UploadPost from "./routes/UploadPost";
import PostDetail from "./routes/PostDetail";
import PostEdit from "./routes/PostEdit";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <NotFound />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "post",

        children: [
          {
            path: "upload",
            element: <UploadPost />,
          },
          {
            path: ":id",
            element: <PostDetail />,
          },
          {
            path: "edit/:postId",
            element: <PostEdit />,
          },
        ],
      },
      {
        path: "verify",
        children: [
          {
            path: ":token",
            element: <EmailConfirm />,
          },
        ],
      },
      {
        path: "social",
        children: [
          {
            path: "kakao",
            element: <KakaoConfirm />,
          },
        ],
      },
      {
        path: "mypage",
        element: <Mypage />,
      },
    ],
  },
]);
export default router;
