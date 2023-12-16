import { Box, Container, Text, Flex, Spacer, Heading } from "@chakra-ui/react";
import { Link } from "react-router-dom";
export default function SmallNavBar({
  id,
  activeMovie = false,
  activeReview = false,
}) {
  return (
    <Flex m={5} minWidth="max-content" alignItems="center" gap="2">
      <Box p="2" bg={activeMovie ? "blue.200" : ""} rounded="full" mr={2}>
        <Link to={`/movies/${id}`}>Movie Info</Link>
      </Box>
      <Box p="2" bg={activeReview ? "blue.200" : ""} rounded="full" mr={2}>
        <Link data-cy="review_link" to={`/movies/${id}/review`}>
          Review
        </Link>
      </Box>
    </Flex>
  );
}
