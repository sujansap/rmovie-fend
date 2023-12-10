import { Box, Flex, Spacer, Heading } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

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
          <NavLink to="/">Movie App</NavLink>
        </Heading>
      </Box>
      <Spacer />
      <Box p="2">
        <NavLink to="/movies">Movies</NavLink>
      </Box>

      <Box p="2">
        <NavLink to="/reviews">Reviews</NavLink>
      </Box>
      <Box p="2">
        <NavLink to="/movies/add">Add Movie</NavLink>
      </Box>
      {isAuthed ? (
        <Box p="2">
          <NavLink className="nav-link" to="/logout">
            Logout
          </NavLink>
        </Box>
      ) : (
        <Box p="2">
          <NavLink className="nav-link" to="/login">
            Login
          </NavLink>
        </Box>
      )}
    </Flex>
  );
}
