import { Box, Container, Text, Flex, Spacer, Heading } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
export default function SmallNavBar({
  id,
  activeMovie = false,
  activeReview = false,
}) {
  return (
    <Flex m={5} minWidth="max-content" alignItems="center" gap="2">
      <Box p="2" bg={activeMovie ? "blue.200" : ""} rounded="full" mr={2}>
        <NavLink to={`/movies/${id}`}>Movie Info</NavLink>
      </Box>
      <Box p="2" bg={activeReview ? "blue.200" : ""} rounded="full" mr={2}>
        <NavLink to={`/movies/${id}/review`}>Review</NavLink>
      </Box>
    </Flex>
  );
}
