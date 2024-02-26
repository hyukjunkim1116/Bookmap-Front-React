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
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "../stores/auth";
import ProtectedPage from "../components/ProtectedPage";
import { updateUserProfile } from "../services/auth";
import { useState } from "react";
import ChangePassword from "../components/ChangePassword";
export default function Mypage() {
  const { updateuser, user, getUid } = useAuthStore();
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
  });

  const onSubmit = (data) => {
    mutation.mutate({ data, uid });
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
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
        <Heading mb="20px">My Profile</Heading>
        <VStack spacing="20px" align="stretch">
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
    </ProtectedPage>
  );
}
