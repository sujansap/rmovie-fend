import { Box, Flex, Spacer, Heading, Button, Link } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import { useColorMode } from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

import { useAuth } from "../contexts/Auth.context";

const ThemeToggle = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Link>
      {colorMode === "light" ? (
        <MoonIcon onClick={toggleColorMode} />
      ) : (
        <SunIcon onClick={toggleColorMode} />
      )}
    </Link>
  );
};
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

      <Box p="2" ml="5">
        <NavLink to="/movies">Movies</NavLink>
      </Box>

      <Box p="2">
        <NavLink to="/reviews">Reviews</NavLink>
      </Box>
      <Box p="2">
        <NavLink to="/movies/add">Add Movie</NavLink>
      </Box>

      <Spacer />

      <ThemeToggle />
      {isAuthed ? (
        <Box p="2" display="flex" alignItems="center">
          <NavLink className="nav-link" to="/logout">
            Logout
          </NavLink>
        </Box>
      ) : (
        <>
          <Box p="2" display="flex" alignItems="center">
            <NavLink className="nav-link" to="/login">
              Login
            </NavLink>
          </Box>
          <Box p="2">
            <NavLink className="nav-link" to="/register">
              Register
            </NavLink>
          </Box>
        </>
      )}
    </Flex>
  );
}
