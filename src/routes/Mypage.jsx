/* eslint-disable no-unused-vars */
import {
  Box,
  Button,
  Input,
  Text,
  useToast,
  VStack,
  Heading,
  FormControl,
  FormLabel,
  HStack,
  useDisclosure,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "../stores/auth";
import ProtectedPage from "../components/ProtectedPage";
import { updateUserProfile, deleteUser } from "../services/auth";
import { useState, useRef } from "react";
import UploadUserPhotoModal from "../components/UploadUserPhotoModal";
import ChangePassword from "../components/ChangePassword";
import { useNavigate } from "react-router-dom";
export default function Mypage() {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: photoIsOpen = false,
    onOpen: photoOnOpen,
    onClose: photoOnClose,
  } = useDisclosure();
  const cancelRef = useRef();
  const { updateuser, user, getUid, clearUser } = useAuthStore();
  const uid = getUid();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const toast = useToast();
  const [username, setUsername] = useState(user?.username);
  const mutation = useMutation({
    mutationFn: updateUserProfile,
    onSuccess: (response) => {
      updateuser({ username: response.data.username });
      toast({
        title: "Success!",
        status: "success",
      });
      reset();
    },
    onError: (error) => {
      console.log(error);
      toast({
        title: error.response.data.detail,
        status: "error",
      });
    },
  });

  const onSubmit = (data) => {
    mutation.mutate({ data, uid });
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };
  const deleteUserMutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: (response) => {
      toast({
        title: "I'm so sad",
        description: "bye...",
        position: "bottom-right",
      });
      reset();
      clearUser();
    },
    onError: (error) => {
      console.log(error);
      toast({
        title: error.response.data.detail,
        status: "error",
      });
    },
  });
  const handleDeleteUser = () => {
    deleteUserMutation.mutate(uid);
  };
  return (
    <ProtectedPage>
      <Box
        maxW="600px"
        mx="auto"
        mt="50px"
        p="20px"
        borderWidth="1px"
        borderRadius="lg"
        boxShadow="lg"
      >
        <HStack
          alignItems={"center"}
          display={"flex"}
          justifyContent={"space-between"}
        >
          <Heading>My Profile</Heading>
          <Button colorScheme="blue" onClick={onOpen}>
            Delete My Account
          </Button>
          <Button colorScheme="blue" onClick={photoOnOpen}>
            Upload My Image
          </Button>
          <Button colorScheme="blue" onClick={() => navigate("/mypage/pay")}>
            결제 목록 보기
          </Button>
        </HStack>
        <VStack spacing="20px" align="stretch" mt={4}>
          <FormControl as="form" onSubmit={handleSubmit(onSubmit)}>
            <FormLabel>Username</FormLabel>
            <Input
              id="username"
              type="text"
              value={username || ""}
              isInvalid={Boolean(errors.username?.message)}
              {...register("username")}
              onChange={handleUsernameChange}
            />
            <FormLabel mt={4}>Email</FormLabel>
            <Input isDisabled type="email" value={user?.email || ""} />
            {mutation.isError ? (
              <Text color="red.500" textAlign={"center"} fontSize="sm">
                {console.log(mutation.error)}
              </Text>
            ) : null}
            <Button
              colorScheme="blue"
              isLoading={mutation.isLoading}
              type="submit"
              mt={4}
              w="100%"
            >
              Save Changes
            </Button>
          </FormControl>
          <ChangePassword />
        </VStack>
      </Box>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Account
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can&apos;t undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={handleDeleteUser} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
      <UploadUserPhotoModal isOpen={photoIsOpen} onClose={photoOnClose} />
    </ProtectedPage>
  );
}
