/* eslint-disable no-unused-vars */
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputLeftAddon,
  Text,
  Textarea,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { createPost } from "../services";
import { FaPen } from "react-icons/fa";
import ProtectedPage from "../components/ProtectedPage";
import { useNavigate } from "react-router-dom";
export default function UploadPost() {
  const { register, handleSubmit } = useForm();
  const toast = useToast();
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: createPost,
    onSuccess: (response) => {
      toast({
        status: "success",
        title: "Room created",
        position: "bottom-right",
      });
      navigate(`/post/${response.id}`);
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
    mutation.mutate(data);
  };
  return (
    <ProtectedPage>
      <Box
        pb={40}
        mt={10}
        px={{
          base: 10,
          lg: 40,
        }}
      >
        <Container>
          <Heading textAlign={"center"}>Upload Post</Heading>
          <VStack
            spacing={10}
            as="form"
            onSubmit={handleSubmit(onSubmit)}
            mt={5}
          >
            <FormControl>
              <FormLabel>Title</FormLabel>
              <InputGroup>
                <InputLeftAddon children={<FaPen />} />
                <Input
                  {...register("title", { required: true })}
                  type="text"
                  min={0}
                />
              </InputGroup>
            </FormControl>
            <FormControl>
              <FormLabel>Content</FormLabel>
              <InputGroup>
                <Textarea
                  {...register("content", { required: true })}
                  type="text-area"
                  min={0}
                />
              </InputGroup>
            </FormControl>
            {mutation.isError ? (
              <Text color="red.500">{mutation.error.message}</Text>
            ) : null}
            <Button
              type="submit"
              isLoading={mutation.isLoading}
              colorScheme={"red"}
              size="lg"
              w="100%"
            >
              Upload Post
            </Button>
          </VStack>
        </Container>
      </Box>
    </ProtectedPage>
  );
}
