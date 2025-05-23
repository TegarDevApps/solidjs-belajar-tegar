import { createSignal, createResource, onMount } from "solid-js";
import { For, Show, Suspense } from "solid-js";
import { 
  Box, 
  Button, 
  Input, 
  InputGroup,
  InputLeftElement,
  Text,
  Heading,
  Badge,
  Flex,
  Grid,
  Container,
  VStack,
  HStack,
  Skeleton,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription
} from "@hope-ui/solid";
import { IconSearch, IconFilter, IconSettings, IconChevronLeft, IconChevronRight } from "@tabler/icons-solidjs";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import PostChart from "../components/PostChart";

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

interface PostWithUser extends Post {
  user?: User;
  readTime: string;
  postedOn: string;
}

const Blog = () => {
  const [currentPage, setCurrentPage] = createSignal(1);
  const [searchTerm, setSearchTerm] = createSignal("");
  const [sortBy, setSortBy] = createSignal("latest");
  const postsPerPage = 6;

  const fetchPosts = async (): Promise<Post[]> => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts');
      if (!response.ok) throw new Error('Failed to fetch posts');
      return await response.json();
    } catch (error) {
      console.error('Error fetching posts:', error);
      throw error;
    }
  };

  const fetchUsers = async (): Promise<User[]> => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      if (!response.ok) throw new Error('Failed to fetch users');
      return await response.json();
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  };

  const [posts] = createResource(fetchPosts);
  const [users] = createResource(fetchUsers);

  const generateReadTime = () => {
    const times = ['3 min read', '5 min read', '8 min read', '10 min read', '12 min read', '15 min read'];
    return times[Math.floor(Math.random() * times.length)];
  };

  const generatePostedDate = () => {
    const dates = ['Dec 15, 2024', 'Dec 10, 2024', 'Dec 5, 2024', 'Nov 28, 2024', 'Nov 20, 2024', 'Nov 15, 2024'];
    return dates[Math.floor(Math.random() * dates.length)];
  };

  const enrichedPosts = () => {
    const postsData = posts();
    const usersData = users();
    if (!postsData || !usersData) return [];

    return postsData.map((post: Post): PostWithUser => {
      const user = usersData.find((u: User) => u.id === post.userId);
      return {
        ...post,
        user,
        readTime: generateReadTime(),
        postedOn: generatePostedDate()
      };
    });
  };

  const filteredPosts = () => {
    let filtered = enrichedPosts();
    if (searchTerm()) {
      filtered = filtered.filter(post => 
        post.title.toLowerCase().includes(searchTerm().toLowerCase()) ||
        post.body.toLowerCase().includes(searchTerm().toLowerCase())
      );
    }
    if (sortBy() === 'title') {
      filtered.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy() === 'author') {
      filtered.sort((a, b) => (a.user?.name || '').localeCompare(b.user?.name || ''));
    }
    return filtered;
  };

  const paginatedPosts = () => {
    const filtered = filteredPosts();
    const startIndex = (currentPage() - 1) * postsPerPage;
    return filtered.slice(startIndex, startIndex + postsPerPage);
  };

  const totalPages = () => Math.ceil(filteredPosts().length / postsPerPage);

  const userPostStats = () => {
    const postsData = posts();
    const usersData = users();
    if (!postsData || !usersData) return [];

    const stats = usersData.map((user: User) => ({
      id: user.id,
      name: user.name,
      username: user.username,
      postCount: postsData.filter((post: Post) => post.userId === user.id).length
    }));

    return stats.sort((a, b) => b.postCount - a.postCount);
  };

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handleSortChange = () => {
    setSortBy(sortBy() === 'latest' ? 'title' : sortBy() === 'title' ? 'author' : 'latest');
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const getPaginationRange = () => {
    const total = totalPages();
    const current = currentPage();
    const range = [];
    
    let start = Math.max(1, current - 2);
    let end = Math.min(total, start + 4);
    
    if (end - start < 4) {
      start = Math.max(1, end - 4);
    }
    
    for (let i = start; i <= end; i++) {
      range.push(i);
    }
    
    return range;
  };

  return (
    <Box class="flex h-screen bg-gray-50">
      <Sidebar />
      <Box class="flex-1 flex flex-col overflow-hidden">
        <Header />
        <Box as="main" class="flex-1 overflow-y-auto p-5">
          <Container maxW="7xl">
            <VStack spacing="$6" align="stretch">
              <Box mb="$8">
                <Heading size="2xl" color="$gray800" mb="$2">
                  Blog Posts
                </Heading>
                <Text color="$gray600" fontSize="$lg">
                  Discover amazing articles from our community. Find insights, tutorials, and stories from various authors.
                </Text>
              </Box>

              <Box 
                bg="$white" 
                p="$4" 
                borderRadius="$md" 
                shadow="$sm"
                mb="$6"
              >
                <Flex gap="$4" align="center" wrap="wrap">
                  <Box flex="1" minW="250px">
                    <InputGroup>
                      <InputLeftElement pointerEvents="none">
                        <IconSearch size="16" />
                      </InputLeftElement>
                      <Input
                        placeholder="Search posts..."
                        value={searchTerm()}
                        onInput={(e: InputEvent & { currentTarget: HTMLInputElement }) => 
                          handleSearchChange(e.currentTarget.value)
                        }
                      />
                    </InputGroup>
                  </Box>
                  <Button
                    variant="outline"
                    leftIcon={<IconFilter size="16" />}
                    onClick={handleSortChange}
                  >
                    Sort by: {sortBy() === 'latest' ? 'Latest' : sortBy() === 'title' ? 'Title' : 'Author'}
                  </Button>
                  <Button variant="ghost" size="sm">
                    <IconSettings size="16" />
                  </Button>
                </Flex>
              </Box>

              <Flex justify="space-between" align="center">
                <HStack>
                  <Heading size="xl" color="$gray800">
                    Articles
                  </Heading>
                  <Badge colorScheme="gray" variant="subtle">
                    {filteredPosts().length}
                  </Badge>
                </HStack>
              </Flex>

              <Suspense 
                fallback={
                  <Grid templateColumns="repeat(auto-fit, minmax(300px, 1fr))" gap="$6">
                    <For each={Array(6).fill(0)}>
                      {() => (
                        <Box
                          bg="$white"
                          p="$4"
                          borderRadius="$md"
                          shadow="$sm"
                          _hover={{ transform: "translateY(-2px)", shadow: "$lg" }}
                          transition="all 0.2s"
                        >
                          <VStack align="stretch" spacing="$4">
                            <Skeleton height="20px" />
                            <Skeleton height="60px" />
                            <Skeleton height="16px" />
                          </VStack>
                        </Box>
                      )}
                    </For>
                  </Grid>
                }
              >
                <Show 
                  when={!posts.error && !users.error}
                  fallback={
                    <Alert status="danger">
                      <AlertIcon />
                      <AlertTitle>Error!</AlertTitle>
                      <AlertDescription>
                        Failed to load posts. Please try again later.
                      </AlertDescription>
                    </Alert>
                  }
                >
                  <Grid templateColumns="repeat(auto-fit, minmax(350px, 1fr))" gap="$6">
                    <For each={paginatedPosts()}>
                      {(post) => (
                        <Box
                          bg="$white"
                          p="$4"
                          borderRadius="$md"
                          shadow="$sm"
                          _hover={{ transform: "translateY(-2px)", shadow: "$lg" }}
                          transition="all 0.2s"
                        >
                          <VStack align="stretch" spacing="$3">
                            <Badge colorScheme="blue" alignSelf="flex-start" size="sm">
                              User {post.userId}
                            </Badge>
                            <Heading size="md" noOfLines={2}>
                              {post.title}
                            </Heading>
                            <Text noOfLines={4} color="$gray700" fontSize="$sm">
                              {post.body}
                            </Text>
                            <Text fontSize="$xs" color="$gray500">
                              By <strong>{post.user?.name || "Unknown"}</strong> &bull; {post.postedOn} &bull; {post.readTime}
                            </Text>
                          </VStack>
                        </Box>
                      )}
                    </For>
                  </Grid>
                </Show>
              </Suspense>

              <Show when={totalPages() > 1}>
                <Box
                  bg="$white"
                  p="$4"
                  borderRadius="$md"
                  shadow="$sm"
                >
                  <Flex justify="center" align="center" gap="$2">
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={currentPage() === 1}
                      onClick={() => handlePageChange(currentPage() - 1)}
                      leftIcon={<IconChevronLeft size="16" />}
                    >
                      Previous
                    </Button>
                    
                    <HStack spacing="$1">
                      <For each={getPaginationRange()}>
                        {(page) => (
                          <Button
                            variant={currentPage() === page ? "solid" : "ghost"}
                            colorScheme={currentPage() === page ? "blue" : "gray"}
                            size="sm"
                            onClick={() => handlePageChange(page)}
                          >
                            {page}
                          </Button>
                        )}
                      </For>
                    </HStack>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={currentPage() === totalPages()}
                      onClick={() => handlePageChange(currentPage() + 1)}
                      rightIcon={<IconChevronRight size="16" />}
                    >
                      Next
                    </Button>
                  </Flex>
                  
                  <Text textAlign="center" fontSize="$sm" color="$gray600" mt="$2">
                    Page {currentPage()} of {totalPages()} ({filteredPosts().length} total posts)
                  </Text>
                </Box>
              </Show>

              <Suspense fallback={<Skeleton height="300px" />}>
                <Show when={posts() && users()}>
                  <PostChart data={userPostStats()} />
                </Show>
              </Suspense>
            </VStack>
          </Container>
        </Box>
        <Footer />
      </Box>
    </Box>
  );
};

export default Blog;