import {
  Box,
  Flex,
  Image,
  Text,
  Badge,
  Slider,
  SliderFilledTrack,
  SliderTrack,
  Container,
  Heading,
} from "@chakra-ui/react";
import { memo, useMemo } from "react";

import calculateColor from "./CalculateColor";

export const Detail = memo(({ title, poster, genres, rating, text }) => {
  const color = useMemo(() => calculateColor(rating), [rating]);

  return (
    <Box
      data-cy="movie_detail"
      display={{ base: "block", md: "grid" }}
      gridTemplateColumns={{ md: "2fr 2fr", lg: "1fr 2fr" }}
      borderWidth="1px"
      rounded="md"
      padding={4}
      margin={5}
    >
      <Box padding={4} m={3} rounded="md" p="2" maxHeight="100%">
        <Image src={poster} alt="Movie Poster" />
        <Heading align="center">{title}</Heading>
        <Box>
          {genres.length === 0 ? "" : "Genres"}
          {genres.map((genre) => (
            <Badge key={genre} ml={2} colorScheme="blue" variant="solid">
              {genre}
            </Badge>
          ))}
        </Box>
        Rating:
        <Badge data-cy="movie_rating" ml={2}>
          {rating === -1 ? "n/a" : rating}
        </Badge>{" "}
        <Slider
          aria-label="slider-ex-1"
          value={rating === 0 || rating ? rating : null}
          isDisabled
          width="100%"
        >
          <SliderTrack>
            <SliderFilledTrack bg={color} />
          </SliderTrack>
        </Slider>
      </Box>

      <Container
        data-cy="movie_detail_title"
        padding={4}
        borderWidth="1px"
        rounded="md"
        maxWidth="100%"
      >
        <Box maxHeight="100%">
          {" "}
          {/* Add maxHeight and overflowY to enable vertical scrolling */}
          <Text>{text}</Text>
        </Box>
      </Container>
    </Box>
  );
});
