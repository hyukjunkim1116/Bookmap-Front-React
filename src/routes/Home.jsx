/* eslint-disable no-unused-vars */
import { Grid } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../services";
import Post from "../components/Post";
import PostSkeleton from "../components/PostSkeleton";

export default function Home() {
  const { isLoading, data } = useQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
  });
  return (
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
  );
}
