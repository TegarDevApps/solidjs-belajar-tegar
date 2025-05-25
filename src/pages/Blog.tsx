import { 
  Box, 
  Text,
  Heading,
  Container,
  VStack
} from "@hope-ui/solid";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import PostsList from "../components/PostList";
import PostStats from "../components/PostStats";
import UsersTable from "../components/UsersTable";

const Blog = () => {
  return (
    <Box class="flex h-screen overflow-hidden bg-gray-50">
      <Sidebar />
      <Box class="flex-1 flex flex-col overflow-hidden">
        <Header />
        <Box as="main" class="flex-1 overflow-y-auto p-5">
          <Container maxW="7xl">
            <VStack spacing="$6" align="stretch">
              {/* Header Section */}
              <Box mb="$8">
                <Heading size="2xl" color="$gray800" mb="$2">
                  Blog Posts
                </Heading>
                <Text color="$gray600" fontSize="$lg">
                  Discover amazing articles from our community. Find insights, tutorials, and stories from various authors.
                </Text>
              </Box>

              <PostsList />

              <PostStats />

              <UsersTable />
            </VStack>
          </Container>
        </Box>
        <Footer />
      </Box>
    </Box>
  );
};

export default Blog;