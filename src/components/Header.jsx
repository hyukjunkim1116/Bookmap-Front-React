import { FaMoon, FaSun, FaBell, FaRegBell } from "react-icons/fa";
import { BsFillPinMapFill } from "react-icons/bs";
import {
  Avatar,
  Box,
  Button,
  HStack,
  IconButton,
  LightMode,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  useColorMode,
  useColorModeValue,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import LoginModal from "./LoginModal";
import SignUpModal from "./SignUpModal";
import FindPasswordModal from "./FindPasswordModal";
import { useMutation } from "@tanstack/react-query";
import { useRef, useState, useEffect } from "react";
import { useAuthStore } from "../stores/auth";
import { sendVerificationEmail } from "../services/auth";
import ChatModal from "./ChatModal";
import Notification from "./Notification";

export default function Header() {
  const { user, token, clearUser } = useAuthStore();
  const [loggedIn, setLoggedIn] = useState();
  useEffect(() => {
    if (token) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, [token]);

  const {
    isOpen: isFindPasswordOpen,
    onClose: onFindPasswordClose,
    onOpen: onFindPasswordOpen,
  } = useDisclosure();
  const {
    isOpen: isChatOpen,
    onClose: onChatClose,
    onOpen: onChatOpen,
  } = useDisclosure();
  const {
    isOpen: isLoginOpen,
    onClose: onLoginClose,
    onOpen: onLoginOpen,
  } = useDisclosure();
  const {
    isOpen: isSignUpOpen,
    onClose: onSignUpClose,
    onOpen: onSignUpOpen,
  } = useDisclosure();
  const { toggleColorMode } = useColorMode();

  const logoColor = useColorModeValue("red.500", "red.200");
  const Icon = useColorModeValue(FaMoon, FaSun);
  const toast = useToast();
  const toastId = useRef();
  const verifyEmail = useMutation({
    mutationFn: sendVerificationEmail,
    onSuccess: () => {
      toast({
        title: "이메일 전송 완료!",
        status: "success",
      });
    },
    onError: (err) => {
      console.log(err);
      toast({
        title: "Something went wrong",
        status: "error",
      });
    },
  });

  const mutation = useMutation({
    mutationFn: clearUser,
    onMutate: () => {
      toastId.current = toast({
        title: "Login out...",
        description: "Sad to see you go...",
        status: "loading",
        duration: 10000,
        position: "bottom-right",
      });
    },
    onSuccess: () => {
      if (toastId.current) {
        toast.update(toastId.current, {
          status: "success",
          title: "Done!",
          description: "See you later!",
        });
      }
    },
  });
  const onLogOut = async () => {
    mutation.mutate();
  };
  const sendEmail = () => {
    verifyEmail.mutate(user?.user_id);
  };
  return (
    <Stack
      justifyContent={"space-between"}
      alignItems="center"
      py={5}
      px={40}
      direction={{
        sm: "column",
        md: "row",
      }}
      spacing={{
        sm: 4,
        md: 0,
      }}
      borderBottomWidth={1}
    >
      <Box color={logoColor}>
        <Link to={"/"}>
          <BsFillPinMapFill size={"48"} />
        </Link>
      </Box>
      <HStack spacing={2}>
        <IconButton
          onClick={toggleColorMode}
          variant={"ghost"}
          aria-label="Toggle dark mode"
          icon={<Icon />}
        />
        {!loggedIn ? (
          <>
            <Button onClick={onLoginOpen}>Log in</Button>
            <LightMode>
              <Button onClick={onSignUpOpen} colorScheme={"red"}>
                Sign up
              </Button>
            </LightMode>
            <Button
              color="red.500"
              textAlign={"center"}
              fontSize="sm"
              onClick={onFindPasswordOpen}
            >
              Forgot Password?
            </Button>
          </>
        ) : (
          <Menu>
            {user?.username}
            <MenuButton>
              <Avatar name={user?.username} src={user?.image} size={"md"} />
            </MenuButton>
            <MenuList>
              <Link to="/post/upload">
                <MenuItem>글쓰기</MenuItem>
              </Link>
              {user?.is_verified ? (
                <Link to="/mypage">
                  <MenuItem>나의 프로필</MenuItem>
                </Link>
              ) : (
                <MenuItem onClick={sendEmail}>
                  이메일 인증을 진행하세요!
                </MenuItem>
              )}
              <MenuItem onClick={onLogOut}>Log out</MenuItem>
            </MenuList>
            <Button
              color="red.500"
              textAlign={"center"}
              fontSize="sm"
              onClick={onChatOpen}
            >
              Chat
            </Button>
            <Notification />
          </Menu>
        )}
      </HStack>
      <LoginModal isOpen={isLoginOpen} onClose={onLoginClose} />
      <SignUpModal isOpen={isSignUpOpen} onClose={onSignUpClose} />
      <FindPasswordModal
        isOpen={isFindPasswordOpen}
        onClose={onFindPasswordClose}
      />
      <ChatModal isOpen={isChatOpen} onClose={onChatClose} />
    </Stack>
  );
}
