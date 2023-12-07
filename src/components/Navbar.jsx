import { Box, Container, Text, Flex, Spacer, Heading } from "@chakra-ui/react";
import { Link } from "react-router-dom";

import { useAuth } from "../contexts/Auth.context";

export default function Navbar() {
  const { isAuthed } = useAuth();

  return (
    <Flex m={5} minWidth="max-content" alignItems="center" gap="1">
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
        <Link to="/movies">Movies</Link>
      </Box>

      <Box p="2">
        <Link to="/reviews">Reviews</Link>
      </Box>
      <Box p="2">
        <Link to="/movies/add">Add Movie</Link>
      </Box>
      {isAuthed ? (
        <Box p="2">
          <Link className="nav-link" to="/logout">
            Logout
          </Link>
        </Box>
      ) : (
        <Box p="2">
          <Link className="nav-link" to="/login">
            Login
          </Link>
        </Box>
      )}
    </Flex>
  );
}
