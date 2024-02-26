import { createBrowserRouter } from "react-router-dom";
import Root from "./components/Root";
import Home from "./routes/Home";
import NotFound from "./routes/NotFound";
import KakaoConfirm from "./routes/KakaoConfirm";
import EmailConfirm from "./routes/EmailConfirm";
import Mypage from "./routes/Mypage";
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
