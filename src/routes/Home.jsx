/* eslint-disable no-unused-vars */
import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../services";
import Post from "../components/Post";
import PostSkeleton from "../components/PostSkeleton";
import {
  Input,
  Stack,
  Button,
  ButtonGroup,
  IconButton,
  Grid,
} from "@chakra-ui/react";
import { SearchIcon, ChevronDownIcon } from "@chakra-ui/icons";

export default function Home() {
  const { isLoading, data } = useQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
  });
  return (
    <>
      <Stack
        direction={["column", "row"]}
        spacing={4}
        alignItems="center"
        px={{
          base: 10,
          lg: 40,
        }}
      >
        <Input
          placeholder="검색어를 입력하세요"
          size="lg"
          variant="filled"
          _focus={{ borderColor: "blue.400" }}
          _hover={{ borderColor: "blue.300" }}
        />
        <ButtonGroup size="lg" variant="outline" colorScheme="blue">
          <Button leftIcon={<SearchIcon />}>검색</Button>
          <IconButton aria-label="Sort Ascending" icon={<ChevronDownIcon />} />
        </ButtonGroup>
      </Stack>
      <Grid
        mt={10}
        px={{
          base: 10,
          lg: 40,
        }}
        columnGap={4}
        rowGap={8}
        templateColumns={{
          sm: "1fr",
          md: "1fr 1fr",
          lg: "repeat(3, 1fr)",
          xl: "repeat(4, 1fr)",
          "2xl": "repeat(5, 1fr)",
        }}
      >
        {isLoading ? (
          <>
            <PostSkeleton />
            <PostSkeleton />
            <PostSkeleton />
            <PostSkeleton />
            <PostSkeleton />
            <PostSkeleton />
            <PostSkeleton />
            <PostSkeleton />
            <PostSkeleton />
            <PostSkeleton />
          </>
        ) : null}
        {data?.results?.map((post) => (
          <Post
            key={post.id}
            id={post.id}
            author={post.author}
            image={post.image}
            title={post.title}
            read_count={post.read_count}
            updated_at={post.updated_at}
          />
        ))}
      </Grid>
    </>
  );
}
