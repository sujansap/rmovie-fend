import { Box, Flex } from "@chakra-ui/react";
import { Link } from "react-router-dom";

import { useLanguage } from "../contexts/Language.context";

import translations from "../translation/translation";

export default function SmallNavBar({
  id,
  activeMovie = false,
  activeReview = false,
}) {
  const { language } = useLanguage();

  return (
    <Flex minWidth="max-content" alignItems="center" gap="2">
      <Box p="2" bg={activeMovie ? "blue.200" : ""} rounded="full" mr={2}>
        <Link to={`/movies/${id}`}>{translations[language].movieInfo}</Link>
      </Box>
      <Box p="2" bg={activeReview ? "blue.200" : ""} rounded="full" mr={2}>
        <Link data-cy="review_link" to={`/movies/${id}/review`}>
          {translations[language].review}
        </Link>
      </Box>
    </Flex>
  );
}
