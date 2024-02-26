/* eslint-disable no-unused-vars */
import {
  Box,
  Button,
  Input,
  Text,
  useToast,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "../stores/auth";
import { updateUserPassword } from "../services/auth";
import { useNavigate } from "react-router-dom";
export default function ChangePassword() {
  const navigate = useNavigate();
  const { user, getUid, clearUser } = useAuthStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const toast = useToast();
  const passwordMutation = useMutation({
    mutationFn: updateUserPassword,
    onSuccess: async (response) => {
      reset();
      toast({
        title: "Password Changed!!",
        status: "success",
      });
      //   navigate("/");
      clearUser();
    },
    onError: (err) => {
      console.log(err);
    },
  });
  const onPasswordSubmit = (data) => {
    console.log(data, "dasdas");
    const { oldPassword, newPassword, newPasswordConfirm } = data;
    passwordMutation.mutate({ oldPassword, newPassword, newPasswordConfirm });
  };

  return (
    <>
      {!user?.social ? (
        <FormControl as="form" onSubmit={handleSubmit(onPasswordSubmit)}>
          <FormLabel>Password</FormLabel>
          <Input
            id="oldPassword"
            type="password"
            variant={"filled"}
            placeholder="oldPassword"
            isInvalid={Boolean(errors.oldPassword?.message)}
            {...register("oldPassword")}
          />
          <Input
            mt={4}
            id="newPassword"
            type="password"
            variant={"filled"}
            placeholder="newPassword"
            isInvalid={Boolean(errors.newPassword?.message)}
            {...register("newPassword")}
          />
          <Input
            mt={4}
            type="password"
            variant={"filled"}
            placeholder="newPasswordConfirm"
            isInvalid={Boolean(errors.newPasswordConfirm?.message)}
            {...register("newPasswordConfirm")}
          />
          {passwordMutation.isError ? (
            <Text color="red.500" textAlign={"center"} fontSize="sm">
              {console.log(passwordMutation.error.message)}
            </Text>
          ) : null}
          <Button
            colorScheme="blue"
            isLoading={passwordMutation.isLoading}
            type="submit"
            mt={4}
            w="100%"
          >
            Change Password
          </Button>
        </FormControl>
      ) : null}
    </>
  );
}
