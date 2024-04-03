import { useForm } from "react-hook-form";
import {
  Button,
  Input,
  InputGroup,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  Textarea,
  useToast,
  VStack,
} from "@chakra-ui/react";

import { useMutation } from "@tanstack/react-query";
import { reportPost } from "../services";

import { useEffect } from "react";

export default function ReportModal({ isOpen, onClose, postId }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const toast = useToast();

  const reportMutation = useMutation({
    mutationFn: reportPost,
    onSuccess: () => {
      toast({
        title: "Reported!",
        status: "success",
      });
      onClose();
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
  useEffect(() => {
    reportMutation.reset(); // Mutation을 초기 상태로 되돌림
  });
  const onSubmit = ({ title, content }) => {
    reportMutation.mutate({ title, content, postId });
  };

  return (
    <Modal onClose={onClose} isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Report</ModalHeader>
        <ModalCloseButton />
        <ModalBody as="form" onSubmit={handleSubmit(onSubmit)}>
          <VStack>
            <InputGroup size={"md"}>
              <Input
                isInvalid={Boolean(errors.title?.message)}
                {...register("title", {
                  required: "Please write a title",
                })}
                variant={"filled"}
                placeholder="title"
              />
            </InputGroup>

            <Textarea
              isInvalid={Boolean(errors.content?.message)}
              {...register("content", {
                required: "Please write a content",
              })}
              type="content"
              variant={"filled"}
              placeholder="content"
            />
          </VStack>
          {reportMutation.isError ? (
            <Text color="red.500" textAlign={"center"} fontSize="sm">
              {console.log(reportMutation.error)}
            </Text>
          ) : null}
          <Button
            isLoading={reportMutation.isLoading}
            type="submit"
            mt={4}
            colorScheme={"red"}
            w="100%"
          >
            Submit
          </Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
