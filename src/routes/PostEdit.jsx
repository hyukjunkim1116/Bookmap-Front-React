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
import { useMutation, useQuery } from "@tanstack/react-query";
import { getPostDetails, updatePost } from "../services";
import { FaPen } from "react-icons/fa";
import ProtectedPage from "../components/ProtectedPage";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
export default function PostEdit() {
  const params = useParams();
  const { isLoading, data } = useQuery({
    queryKey: ["postDetail", params.postId],
    queryFn: () => getPostDetails(params.postId),
  });
  const { register, handleSubmit } = useForm();
  const toast = useToast();
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: updatePost,
    onSuccess: (response) => {
      console.log(response);
      toast({
        status: "success",
        title: "Post Editeed!",
        position: "bottom-right",
      });
      navigate(`/post/${params.postId}`);
    },
  });
  const [title, setTitle] = useState(data?.title);
  const [content, setContent] = useState(data?.content);
  const onSubmit = ({ title, content }) => {
    const postId = params.postId;
    mutation.mutate({ title, content, postId });
  };
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };
  const handleContentChange = (e) => {
    setContent(e.target.value);
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
          <Heading textAlign={"center"}>Edit Post</Heading>
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
                  value={title}
                  {...register("title", { required: true })}
                  type="text"
                  min={0}
                  onChange={handleTitleChange}
                />
              </InputGroup>
            </FormControl>
            <FormControl>
              <FormLabel>Content</FormLabel>
              <InputGroup>
                <Textarea
                  value={content}
                  {...register("content", { required: true })}
                  type="text-area"
                  min={0}
                  onChange={handleContentChange}
                />
              </InputGroup>
            </FormControl>
            {mutation.isError ? (
              <Text color="red.500">Something went wrong</Text>
            ) : null}
            <Button
              type="submit"
              isLoading={mutation.isLoading}
              colorScheme={"red"}
              size="lg"
              w="100%"
            >
              Edit Post
            </Button>
          </VStack>
        </Container>
      </Box>
    </ProtectedPage>
  );
}
