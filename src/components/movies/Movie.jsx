import { Box, Text, Image } from "@chakra-ui/react";
import { Link } from "react-router-dom";

import { memo } from "react";

const Movie = ({ title, link, movieID, linkToReview }) => {
  return (
    <Box data-cy="movie" borderWidth="1px" rounded="md" boxShadow="xl" p="3">
      <Box>
        <Box style={{ objectFit: "cover", width: "100%", height: "100%" }}>
          <Link to={`/movies/${movieID}${linkToReview ? "/review" : ""}`}>
            <Image
              loading="lazy"
              data-cy="movie_image"
              src={link}
              alt={`poster of the movie ${title}`}
              style={{ objectFit: "cover", width: "100%", height: "100%" }}
              // style={{ maxWidth: "100%", maxHeight: "100%" }}
            />
          </Link>
          <Box mt={2} textAlign="center">
            <Text data-cy="movie_title" fontSize="lg">
              {title}
            </Text>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default memo(Movie);
