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
import { memo } from "react";
import calculateColor from "./CalculateColor";
import Movie from "./movies/Movie";
export const Detail = memo(({ title, poster, genres, rating, text }) => {
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
      <Box
        padding={4}
        m={3}
        rounded="md"
        p="2"
        maxHeight="100%" // Set maxHeight to 100% to allow it to adjust based on the content
      >
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
            <SliderFilledTrack bg={calculateColor(rating)} />
          </SliderTrack>
        </Slider>
      </Box>

      <Container
        data-cy="movie_detail_title"
        padding={4}
        //maxWidth={{ base: "100%", md: "100%", lg: "50%" }} // Set the maximum width
        borderWidth="1px"
        rounded="md"
        //boxShadow="xl"

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
