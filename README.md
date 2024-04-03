# FoodMap

- [백엔드 바로가기](https://github.com/hyukjunkim1116/foodmap-backend)
- [프론트엔드(Vue3) 바로가기](https://github.com/hyukjunkim1116/foodmap-Vue3)

## 배포 주소

## 팀 소개

- 프론트엔드(김혁준)

## 프로젝트 소개

- BookMap 프로젝트의 React 버전입니다.

### Requirements

- [Node.js 20.10.0](https://nodejs.org/en/download)
- [Npm 10.2.3](https://www.npmjs.com/package/npm/v/10.2.3)

### Installation

```bash
$ git clone https://github.com/hyukjunkim1116/foodmap-react.git
$ cd foodmap-react
$ npm install
$ npm run dev
```

---

## Stacks 🐈

#### React, chakra-ui

- React

  - 컴포넌트화를 통해 추후 유지보수와 재사용성을 고려했습니다.
  - 유저 배너, 상단과 하단 배너 등 중복되어 사용되는 부분이 많아 컴포넌트화를 통해 리소스 절약이 가능했습니다.

- chakra-ui
  - 적은 코드로 사용자 인터페이스를 구현하기 위해 도입했습니다.
  - props를 전달하는 방식으로 쉽게 재정의가 가능했습니다.

#### Zustand

- 최상위 컴포넌트를 만들어 props로 유저 정보를 내려주는 방식의 경우 불필요한 props 전달이 발생합니다. 따라서, 필요한 컴포넌트 내부에서만 상태 값을 가져다 사용하기 위해 상태 관리 라이브러리를 사용하기로 했습니다.
- 기존 프로젝트의 프론트엔드에서 사용한 Pinia와 비슷하여 학습시간을 절약하였습니다.

#### tanstack/react-query

- React Component 내부에서 간단하고 직관적으로 API를 사용할 수 있기 때문에 도입했습니다.
- 캐싱, Window Focus Refetching 등 다양한 기능을 활용하여 API 요청과 관련된 번잡한 작업 없이 “핵심 로직”에 집중할 수 있었습니다.

#### react-hook-form

- 백엔드로 보내는 폼을 효과적으로 관리하기 위해 도입했습니다.
- 비제어 컴포넌트 방식으로 구현되어 있기에 불필요한 렌더링을 줄일 수 있었습니다.

### Environment

![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-007ACC?style=for-the-badge&logo=Visual%20Studio%20Code&logoColor=white)
![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=Git&logoColor=white)
![Github](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=GitHub&logoColor=white)

### Config

![npm](https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white)

### Development

![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=Javascript&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=black)
![chakra-ui](https://shields.io/badge/chakra--ui-black?logo=chakraui&style=for-the-badge)
![Tanstack/react-query](https://img.shields.io/badge/-React%20Query-FF4154?style=for-the-badge&logo=react%20query&logoColor=white)
![React Hook Form](https://img.shields.io/badge/React%20Hook%20Form-%23EC5990.svg?style=for-the-badge&logo=reacthookform&logoColor=white)

### Communication

<img src="https://img.shields.io/badge/Notion-000000?style=for-the-badge&logo=Notion&logoColor=white">

---

## 화면 구성 📺

### [초기화면]

### [회원가입]

### [프로필]

### [게시글]

### [채팅]

### [결제]

### [댓글]

---

## 주요 기능 📦

### 회원가입,로그인

### 게시글 작성, 댓글 작성

### 좋아요,싫어요,구독,검색

### 결제

### 채팅,알림

### 신고

---

## 아키텍쳐

### 디렉토리 구조

```
foodmap-react
├─ public
├─ src
│  ├─ assets
│  ├─ components
│  │  ├─ ChangePassword.jsx
│  │  ├─ ChatModal.jsx
│  │  ├─ Comment.jsx
│  │  ├─ FindPasswordModal.jsx
│  │  ├─ Header.jsx
│  │  ├─ LoginModal.jsx
│  │  ├─ Notification.jsx
│  │  ├─ Post.jsx
│  │  ├─ PostSkeleton.jsx
│  │  ├─ ProtectedPage.jsx
│  │  ├─ ReportModal.jsx
│  │  ├─ Root.jsx
│  │  ├─ SignUpModal.jsx
│  │  ├─ SocialLogin.jsx
│  │  ├─ UploadPostPhotoModal.jsx
│  │  └─ UploadUserPhotoModal.jsx
│  ├─ main.jsx
│  ├─ router.jsx
│  ├─ routes
│  │  ├─ Certification.jsx
│  │  ├─ CertificationResult.jsx
│  │  ├─ EmailConfirm.jsx
│  │  ├─ Home.jsx
│  │  ├─ KakaoConfirm.jsx
│  │  ├─ Mypage.jsx
│  │  ├─ NotFound.jsx
│  │  ├─ Payment.jsx
│  │  ├─ PaymentHome.jsx
│  │  ├─ PaymentList.jsx
│  │  ├─ PaymentResult.jsx
│  │  ├─ PostDetail.jsx
│  │  ├─ PostEdit.jsx
│  │  └─ UploadPost.jsx
│  ├─ services
│  │  ├─ auth.js
│  │  ├─ chat.js
│  │  ├─ comment.js
│  │  ├─ index.js
│  │  ├─ notification.js
│  │  ├─ payment.js
│  │  └─ post.js
│  ├─ stores
│  │  └─ auth.js
│  └─ utils
│     ├─ formInterceptor.js
│     ├─ instance.js
│     ├─ jsonInterceptor.js
│     ├─ payments
│     │  ├─ constants.js
│     │  └─ utils.js
└─    └─ theme.js
```

---

## API 명세

### [API 명세](https://denim-knot-470.notion.site/055b7ca4a10142f8a5a049d941b84455?v=dd168a4580ad4328afa9d36a5da7c49c&pvs=4)
