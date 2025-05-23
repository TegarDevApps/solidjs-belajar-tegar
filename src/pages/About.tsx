import { Box, Container, Heading, Text, Flex } from "@hope-ui/solid";
import { A } from "@solidjs/router";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";

const About = () => {
  return (
    <Flex h="100vh" bg="gray.50">
      <Sidebar />
      <Flex direction="column" flex="1" overflow="hidden">
        <Header />
        <Box flex="1" overflowY="auto" p="5">
          <Container maxW="4xl">
            <Box mb="8">
              <Heading size="2xl" color="gray.800" mb="4">
                About Our Blog
              </Heading>
              <Text color="gray.600" fontSize="lg">
                Welcome to our blog platform powered by JSONPlaceholder API
              </Text>
            </Box>

            <Box mb="6" p="4" bg="white" borderRadius="md" shadow="md">
              <Heading size="lg" mb="3" color="gray.800">
                Our Mission
              </Heading>
              <Text color="gray.600" mb="4">
                We aim to create a modern, interactive blog platform that showcases 
                the power of SolidJS, Hope UI, and data visualization with amCharts.
              </Text>
              <Text color="gray.600">
                This application demonstrates multi-page routing, API integration, 
                and beautiful data visualizations to provide insights into our content.
              </Text>
            </Box>


            <Box p="4" bg="white" borderRadius="md" shadow="md">
              <Heading size="lg" mb="3" color="gray.800">
                Technologies Used
              </Heading>
              <Text color="gray.600" mb="2">• SolidJS - Reactive UI framework</Text>
              <Text color="gray.600" mb="2">• Hope UI - Component library</Text>
              <Text color="gray.600" mb="2">• amCharts 5 - Data visualization</Text>
              <Text color="gray.600" mb="2">• Solid Router - Client-side routing</Text>
              <Text color="gray.600">• JSONPlaceholder API - Mock data source</Text>
            </Box>


            <Flex justify="center" mt="8">
              <A href="/posts">
                <Text as="button" color="blue.500" _hover={{ textDecoration: "underline" }}>
                  ← Back to Posts
                </Text>
              </A>
            </Flex>
          </Container>
        </Box>
        <Footer />
      </Flex>
    </Flex>
  );
};

export default About;