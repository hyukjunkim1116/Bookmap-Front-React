/* eslint-disable no-unused-vars */
import { useInfiniteQuery } from "@tanstack/react-query";
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
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { SearchIcon, ChevronDownIcon } from "@chakra-ui/icons";

export default function Home() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState(null);
  const [dataList, setDataList] = useState([]);
  const [params, setParams] = useState({
    page: 1,
    search: "",
    sort: null,
  });
  const { isLoading, data, hasNextPage, isFetchingNextPage } = useInfiniteQuery(
    {
      queryKey: ["posts", params],
      queryFn: () => getPosts(params),
      getNextPageParam: (lastPage) => lastPage.next,
    }
  );
  const handleChange = (e) => {
    setSearch(e.target.value);
  };
  const handleMenuItemClick = (keyword) => {
    setDataList([]);
    setSort(keyword);
    setPage(1);
    setParams((prevParams) => ({
      ...prevParams,
      sort: keyword,
      page: 1,
    }));
  };
  const handleSearch = () => {
    setDataList([]);
    setPage(1);
    setParams((prevParams) => ({
      ...prevParams,
      search: search,
      page: 1,
    }));
  };
  const handleObserver = (entries) => {
    const target = entries[0];

    if (target.isIntersecting && hasNextPage) {
      setPage((prevPage) => prevPage + 1);
      setParams((prevParams) => ({
        ...prevParams,
        page: prevParams.page + 1,
      }));
    }
  };

  useEffect(() => {
    const allPages = data?.pages[0]?.results;

    if (allPages) {
      setDataList((prev) => [...prev, ...allPages]);
    }
    console.log(dataList, "datal");
  }, [data]);
  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      threshold: 0.1,
    });
    const observerTarget = document.getElementById("observer");
    if (observerTarget) {
      observer.observe(observerTarget);
    }
    return () => observer.disconnect();
  }, [hasNextPage]);
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
          value={search}
          onChange={handleChange}
        />
        <ButtonGroup size="lg" variant="outline" colorScheme="blue">
          <Button leftIcon={<SearchIcon />} onClick={handleSearch}>
            검색
          </Button>

          <Menu autoSelect={false}>
            <MenuButton
              as={IconButton}
              aria-label="Sort Ascending"
              icon={<ChevronDownIcon />}
            />
            <MenuList>
              <MenuItem onClick={() => handleMenuItemClick(null)}>
                최신 순
              </MenuItem>
              <MenuItem onClick={() => handleMenuItemClick("likeCount")}>
                좋아요 순
              </MenuItem>
              <MenuItem onClick={() => handleMenuItemClick("readCount")}>
                조회수 순
              </MenuItem>
              <MenuItem onClick={() => handleMenuItemClick("bookMark")}>
                내가 북마크한 글
              </MenuItem>
            </MenuList>
          </Menu>
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
        {(isLoading && page === 1) || isFetchingNextPage ? (
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
        ) : (
          dataList?.map((post) => (
            <Post
              key={post.id}
              id={post.id}
              author={post.author}
              image={post.image}
              title={post.title}
              read_count={post.read_count}
              updated_at={post.updated_at}
            />
          ))
        )}
      </Grid>
      <div id="observer" style={{ height: "10px" }}></div>
    </>
  );
}
