/* eslint-disable no-unused-vars */
import { useState } from "react";
import {
  Box,
  Button,
  Text,
  VStack,
  Input,
  StackDivider,
  IconButton,
  Flex,
  Spacer,
  Divider,
  Container,
  Heading,
  FormControl,
  FormLabel,
  InputGroup,
  Textarea,
  useToast,
  HStack,
  ButtonGroup,
} from "@chakra-ui/react";
import { FaTrash, FaEdit } from "react-icons/fa";
import {
  getComments,
  addComment,
  editComment,
  deleteComment,
} from "../services";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useAuthStore } from "../stores/auth";
import { useQueryClient } from "@tanstack/react-query";
export default function Comment({ postId }) {
  const queryClient = useQueryClient();
  const { token, getUid } = useAuthStore();
  const uid = getUid();
  const [page, setPage] = useState(1);
  const { isLoading: isCommentLoading, data: commentData } = useQuery({
    queryKey: ["comments", postId, page],
    queryFn: () => getComments({ postId, page }),
    refetchOnWindowFocus: false,
  });
  const { register, handleSubmit, reset } = useForm();
  const {
    register: editRegister,
    handleSubmit: handleEditSubmit,
    reset: editReset,
  } = useForm();

  const toast = useToast();
  const mutation = useMutation({
    mutationFn: addComment,
    onSuccess: (response) => {
      console.log(response);
      toast({
        status: "success",
        title: "Comment created",
        position: "bottom-right",
      });
      reset();
      queryClient.refetchQueries(["comments"]);
    },
  });
  const editMutation = useMutation({
    mutationFn: editComment,
    onSuccess: (response) => {
      console.log(response);
      editReset();
      setEditedCommentId(null);
      setEditedComment("");
      queryClient.refetchQueries(["comments"]);
    },
  });
  const deleteMutation = useMutation({
    mutationFn: deleteComment,
    onSuccess: (response) => {
      console.log(response);
      toast({
        status: "success",
        title: "Comment deleted",
        position: "bottom-right",
      });
      queryClient.refetchQueries(["comments"]);
    },
  });
  const onDelete = (commentId) => {
    deleteMutation.mutate(commentId);
  };
  const onEdit = (commentId, comment) => {
    if (editedCommentId === commentId) {
      setEditedCommentId(null);
    } else {
      setEditedComment(comment);
      setEditedCommentId(commentId);
    }
  };
  const onSubmit = ({ comment }) => {
    console.log(comment, "asdasda");
    mutation.mutate({ comment, postId });
  };
  const [editedCommentId, setEditedCommentId] = useState(null);
  const onEditSubmit = ({ editedComment }) => {
    console.log(editedComment);
    editMutation.mutate({ editedComment, editedCommentId });
  };
  const [editedComment, setEditedComment] = useState("");
  const handleCommentChange = (e) => {
    setEditedComment(e.target.value);
  };

  return (
    <Box>
      {token?.access ? (
        <Container>
          <Heading textAlign={"center"}>Add Comment</Heading>
          <HStack
            spacing={10}
            as="form"
            onSubmit={handleSubmit(onSubmit)}
            mt={5}
          >
            <FormControl>
              <FormLabel>Content</FormLabel>
              <InputGroup>
                <Textarea
                  {...register("comment", { required: true })}
                  type="text-area"
                  min={0}
                />
              </InputGroup>
            </FormControl>
            <Button
              type="submit"
              isLoading={mutation.isLoading}
              colorScheme={"red"}
              size="lg"
              w="100%"
            >
              Add Comment
            </Button>
            {mutation.isError ? (
              <Text color="red.500">Something went wrong</Text>
            ) : null}
          </HStack>
        </Container>
      ) : null}

      <VStack>
        <Heading mt={4} textAlign={"center"}>
          Comment List
        </Heading>
        {commentData?.results?.map((comment) => (
          <HStack key={comment.id} mt={1}>
            <Text>{comment.username}</Text>
            {editedCommentId === comment.id ? (
              <Container>
                <HStack
                  spacing={10}
                  as="form"
                  onSubmit={handleEditSubmit(onEditSubmit)}
                  mt={5}
                >
                  <FormControl>
                    <FormLabel>Content</FormLabel>
                    <InputGroup>
                      <Textarea
                        {...editRegister("editedComment", { required: true })}
                        value={editedComment}
                        onChange={handleCommentChange}
                        type="text-area"
                        min={0}
                      />
                    </InputGroup>
                  </FormControl>

                  <Button
                    type="submit"
                    isLoading={mutation.isLoading}
                    colorScheme={"red"}
                    size="md"
                    w="100%"
                  >
                    Edit Comment
                  </Button>
                  {mutation.isError ? (
                    <Text color="red.500">Something went wrong</Text>
                  ) : null}
                </HStack>
              </Container>
            ) : (
              <>
                <Text>{comment.comment}</Text>
              </>
            )}
            <Spacer />
            {comment.author == uid ? (
              <ButtonGroup>
                <IconButton
                  icon={<FaTrash />}
                  onClick={() => onDelete(comment.id)}
                />
                <IconButton
                  icon={<FaEdit />}
                  onClick={() => onEdit(comment.id, comment.comment)}
                />
              </ButtonGroup>
            ) : null}
          </HStack>
        ))}
      </VStack>
    </Box>
  );
}
