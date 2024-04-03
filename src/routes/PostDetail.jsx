/* eslint-disable no-unused-vars */
import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  GridItem,
  Heading,
  HStack,
  Image,
  Skeleton,
  Text,
  VStack,
  useDisclosure,
  ButtonGroup,
  useToast,
  IconButton,
} from "@chakra-ui/react";
import {
  FaHeart,
  FaAngry,
  FaRegHeart,
  FaRegBookmark,
  FaBookmark,
  FaRegAngry,
  FaSadCry,
} from "react-icons/fa";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { useAuthStore } from "../stores/auth";
import { Helmet } from "react-helmet";
import { useParams, useNavigate } from "react-router-dom";
import UploadPostPhotoModal from "../components/UploadPostPhotoModal";
import {
  deletePostImage,
  getPostDetails,
  deletePost,
  handleLike,
  handleDislike,
  handleBookmark,
} from "../services";
import ReportModal from "../components/ReportModal";
import Comment from "../components/Comment";

export default function PostDetail() {
  const {
    isOpen: isReportOpen,
    onClose: onReportClose,
    onOpen: onReportOpen,
  } = useDisclosure();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { getUid } = useAuthStore();
  const uid = getUid();
  const params = useParams();
  const { isLoading, data } = useQuery({
    queryKey: ["postDetail", params.id],
    queryFn: () => getPostDetails(params.id),
    refetchOnMount: true,
  });
  const updatePhotoMutation = useMutation({
    mutationFn: deletePostImage,
    onSuccess: (response) => {
      toast({
        status: "success",
        title: "Image Deleted!",
        isClosable: true,
        description: "Feel free to upload more images.",
      });
      queryClient.refetchQueries(["postDetail"]);
    },
    onError: (error) => {
      console.log(error);
      toast({
        title: error.response.data.detail,
        status: "error",
      });
    },
  });
  const handleDeletePhoto = () => {
    const image = data.image;
    const postId = data.id;
    updatePhotoMutation.mutate({ image, postId });
  };
  const deletePostMutation = useMutation({
    mutationFn: deletePost,
    onSuccess: (response) => {
      toast({
        status: "success",
        title: "Post Deleted!",
        isClosable: true,
        description: "You can write another Post!",
      });
      navigate("/");
    },
    onError: (error) => {
      console.log(error);
      toast({
        title: error.response.data.detail,
        status: "error",
      });
    },
  });
  const handleDeletePost = () => {
    const postId = data.id;
    deletePostMutation.mutate({ postId });
  };

  const moveToEditPost = () => {
    const postId = data.id;
    navigate(`/post/edit/${postId}`);
  };
  const likeMutation = useMutation({
    mutationFn: handleLike,
    onSuccess: (response) => {
      queryClient.refetchQueries(["postDetail"]);
    },
    onError: (error) => {
      console.log(error);
      toast({
        title: error.response.data.detail,
        status: "error",
      });
    },
  });
  const dislikeMutation = useMutation({
    mutationFn: handleDislike,
    onSuccess: (response) => {
      queryClient.refetchQueries(["postDetail"]);
    },
    onError: (error) => {
      console.log(error);
      toast({
        title: error.response.data.detail,
        status: "error",
      });
    },
  });
  const bookmarkMutation = useMutation({
    mutationFn: handleBookmark,
    onSuccess: (response) => {
      queryClient.refetchQueries(["postDetail"]);
    },
    onError: (error) => {
      console.log(error);
      toast({
        title: error.response.data.detail,
        status: "error",
      });
    },
  });

  const toggleLike = () => {
    const postId = data.id;
    likeMutation.mutate({ postId });
  };
  const toggleDislike = () => {
    const postId = data.id;
    dislikeMutation.mutate({ postId });
  };
  const toggleBookmark = () => {
    const postId = data.id;
    bookmarkMutation.mutate({ postId });
  };
  const [likeIcon, setLikeIcon] = useState(
    data?.is_liked ? <FaHeart /> : <FaRegHeart />
  );
  const [dislikeIcon, setDislikeIcon] = useState(
    data?.is_disliked ? <FaAngry /> : <FaRegAngry />
  );
  const [bookmarkIcon, setBookmarkIcon] = useState(
    data?.is_ ? <FaBookmark /> : <FaRegBookmark />
  );
  useEffect(() => {
    setLikeIcon(data?.like?.includes(uid) ? <FaHeart /> : <FaRegHeart />);
  }, [data?.like, uid]);
  useEffect(() => {
    setDislikeIcon(data?.dislike?.includes(uid) ? <FaAngry /> : <FaRegAngry />);
  }, [data?.dislike, uid]);
  useEffect(() => {
    setBookmarkIcon(
      data?.bookmark?.includes(uid) ? <FaBookmark /> : <FaRegBookmark />
    );
  }, [data?.bookmark, uid]);
  return (
    <Box
      pb={40}
      mt={10}
      px={{
        base: 10,
        lg: 40,
      }}
    >
      <Helmet>
        <title>{data ? data.title : "Loading..."}</title>
      </Helmet>
      <Skeleton height={"43px"} width="100%" isLoaded={!isLoading}>
        <Heading>{data?.title}</Heading>
      </Skeleton>
      <Grid
        mt={10}
        rounded="xl"
        overflow={"hidden"}
        gap={2}
        height="60vh"
        templateRows={"1fr 1fr"}
        templateColumns={"repeat(4, 1fr)"}
      >
        {[0, 1, 2, 3, 4].map((index) => (
          <GridItem
            colSpan={index === 0 ? 2 : 1}
            rowSpan={index === 0 ? 2 : 1}
            overflow={"hidden"}
            key={index}
          >
            <Skeleton isLoaded={!isLoading} h="100%" w="100%">
              {data?.image && data.image.length > 4 ? (
                <Image
                  objectFit={"cover"}
                  w="100%"
                  h="100%"
                  src={data?.image || null}
                />
              ) : null}
            </Skeleton>
          </GridItem>
        ))}
        <Text>{data?.content}</Text>
      </Grid>
      <Grid gap={60} templateColumns={"2fr 1fr"}>
        <Box>
          <HStack justifyContent={"space-between"} mt={10}>
            <VStack alignItems={"flex-start"}>
              <VStack alignItems={"flex-start"}>
                <Skeleton isLoaded={!isLoading} height={"30px"}>
                  <Heading fontSize={"2xl"}>
                    Posted by {data?.author.username}
                  </Heading>
                </Skeleton>
              </VStack>
              <VStack alignItems={"flex-start"} mt={6}>
                <Skeleton isLoaded={!isLoading} height={"30px"}>
                  <HStack justifyContent={"flex-start"} w="100%">
                    <Text>조회수 : {data?.read_count}</Text>
                  </HStack>
                  <HStack justifyContent={"flex-start"} w="100%">
                    <Text>작성시간 : {data?.updated_at}</Text>
                  </HStack>
                </Skeleton>
              </VStack>
            </VStack>
            <Avatar
              name={data?.author.username}
              size={"xl"}
              src={data?.author.image}
            />
            <VStack>
              {uid ? (
                <ButtonGroup>
                  <IconButton
                    onClick={toggleLike}
                    icon={likeIcon}
                    size={"lg"}
                  ></IconButton>
                  <IconButton
                    onClick={toggleDislike}
                    icon={dislikeIcon}
                    size={"lg"}
                  ></IconButton>
                  <IconButton
                    onClick={toggleBookmark}
                    icon={bookmarkIcon}
                    size={"lg"}
                  ></IconButton>
                  {uid == data?.author.uid ? null : (
                    <IconButton
                      onClick={onReportOpen}
                      icon={<FaSadCry />}
                      size={"lg"}
                    ></IconButton>
                  )}
                </ButtonGroup>
              ) : null}
              {uid == data?.author.uid ? (
                <ButtonGroup>
                  <Button onClick={onOpen}>사진 올리기</Button>
                  <Button onClick={handleDeletePhoto}>사진 삭제하기</Button>
                  <Button onClick={handleDeletePost}>글 삭제</Button>
                  <Button onClick={moveToEditPost}>글 수정</Button>
                </ButtonGroup>
              ) : null}
            </VStack>
          </HStack>
          <Box mt={10}>
            <Heading mb={5} fontSize={"2xl"}>
              <HStack>
                <Text>댓글수 : {data?.comments_count}</Text>
              </HStack>
            </Heading>
            <Container mt={16} maxW="container.lg" marginX="none">
              <Comment postId={params.id} />
            </Container>
          </Box>
        </Box>
      </Grid>
      <UploadPostPhotoModal
        isOpen={isOpen}
        onClose={onClose}
        postId={data?.id}
      />
      <ReportModal
        isOpen={isReportOpen}
        onClose={onReportClose}
        postId={data?.id}
      />
    </Box>
  );
}
