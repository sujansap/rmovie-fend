import {
  Box,
  Flex,
  Image,
  Text,
  Badge,
  Slider,
  SliderFilledTrack,
  SliderTrack,
  Heading,
} from "@chakra-ui/react";

export const Detail = ({ title, poster, genres, rating, text }) => {
  return (
    <Box
      display={{ base: "block", md: "grid" }}
      gridTemplateColumns={{ md: "2fr 2fr", lg: "1fr 2fr" }}
      borderWidth="1px"
      rounded="md"
      padding={4}
      margin={5}
      color="black"
      bg="white"
    >
      <Box padding={4} m={3} rounded="md" boxShadow="xl" p="2">
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
        <Badge ml={2}>{rating}</Badge>{" "}
        <Slider aria-label="slider-ex-1" value={rating} isDisabled width="100%">
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
        </Slider>
      </Box>

      <Flex
        direction="column"
        align="left"
        padding={4}
        borderWidth="1px"
        rounded="md"
        boxShadow="xl"
        bg="white"
        color="black"
      >
        <Text
          fontSize={{ base: "md", md: "md" }}
          maxHeight={{ base: "500", md: "500", lg: "600" }}
          overflow="auto"
        >
          {text}
        </Text>
      </Flex>
    </Box>
  );
};