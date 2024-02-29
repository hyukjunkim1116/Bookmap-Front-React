/* eslint-disable no-unused-vars */
import { FaCamera, FaRegHeart, FaStar } from "react-icons/fa";
import {
  Box,
  Button,
  Grid,
  HStack,
  Image,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";

export default function Post({
  id,
  author,
  image,
  title,
  read_count,
  updated_at,
}) {
  const gray = useColorModeValue("gray.600", "gray.300");
  const navigate = useNavigate();
  const onCameraClick = (event) => {
    event.preventDefault();
    navigate(`/posts/${id}/photos`);
  };
  return (
    <Link to={`/post/${id}`}>
      <VStack alignItems={"flex-start"}>
        <Box
          w="100%"
          position="relative"
          overflow={"hidden"}
          mb={3}
          rounded="2xl"
        >
          <Text>{title}</Text>
          {image ? (
            <Image objectFit={"cover"} minH="280" src={image} />
          ) : (
            <Box minH="280px" h="100%" w="100%" p={10} bg="green.400" />
          )}
          <Button
            variant={"unstyled"}
            position="absolute"
            top={0}
            right={0}
            onClick={onCameraClick}
            color="white"
          ></Button>
        </Box>
        <Box>
          <Grid gap={2} templateColumns={"6fr 1fr"}>
            <Text display={"block"} as="b" noOfLines={1} fontSize="md">
              {author.username}
            </Text>
          </Grid>
          <Text fontSize={"sm"} color={gray}>
            조회수 : {read_count}
          </Text>
        </Box>
        <Text fontSize={"sm"} color={gray}>
          {new Intl.DateTimeFormat("ko-KR", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          }).format(new Date(updated_at))}
        </Text>
      </VStack>
    </Link>
  );
}
