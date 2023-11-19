import { Box, Container, Text, Flex, Spacer, Heading } from "@chakra-ui/react";
import { Link } from "react-router-dom";
export default function Navbar() {
  return (
    <Flex m={5} minWidth="max-content" alignItems="center" gap="2">
      <Box>
        <Heading
          size="md"
          bgGradient="linear(to-r,  blue.500,pink.200,)"
          bgClip="text"
        >
          <Link to="/">Movie App</Link>
        </Heading>
      </Box>
      <Spacer />
      <Box p="2">
        <Link to="/">Home</Link>
      </Box>

      <Box p="2">
        <Link to="/movies/1">Movies</Link>
      </Box>
      <Box p="2">
        <Link to="/movies/add">Add Movie</Link>
      </Box>
    </Flex>
  );
}
