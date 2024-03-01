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
import PaymentHome from "./routes/PaymentHome";
import Payment from "./routes/Payment";
import Certification from "./routes/Certification";
import PaymentResult from "./routes/PaymentResult";
import CertificationResult from "./routes/CertificationResult";
import PaymentList from "./routes/PaymentList";
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
      {
        path: "mypage/pay",
        element: <PaymentList />,
      },
      {
        path: "payment",
        element: <PaymentHome />,
      },
      {
        path: "payment/pay",
        element: <Payment />,
      },
      {
        path: "payment/pay/result",
        element: <PaymentResult />,
      },
      {
        path: "payment/certification",
        element: <Certification />,
      },
      {
        path: "payment/certification/result",
        element: <CertificationResult />,
      },
    ],
  },
]);
export default router;
