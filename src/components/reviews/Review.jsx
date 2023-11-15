import {
  Box,
  Flex,
  Image,
  Text,
  Spacer,
  Badge,
  Container,
} from "@chakra-ui/react";

export const Review = ({ uid, mid }) => {
  const poster =
    "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTE9gJuijgZksjdoMTae9lCweLhzMJy0fDwko0sFImtPmidgNjq";
  const rating = 5;
  //const review =
  //"Coma is one of the most gorgeous movies ever made,and this is coming from someone who finds CGI-studded Hollywood sci-fi action movies hard to resist. The film has some of the most picturesque visuals I've personally ever seen. I'm glad I rented this, and although the Hindi dub was pretty average, the story itself was so immersive that one thing didn't bother me after a point of time. Performance wise, this film has some great work done by the actors due to which the characters end up memorable. While the real story remains shrouded in mystery during the first half, the second reveals a fantastic twist without getting derailed. Plus, it's action-packed to the brim, and from the very beginning itself. Again, the visual effects make this film what it truly is and I hardly remember a single shot where I didn't exclaim 'wow'. One could easily mistake this as a mere CGI spectacle, but the whole universe and conceptualization of Coma are the reasons that doesn't happen. Not in my case at least. If you enjoy sci-fi action films, Coma deserves a chance as well. Something tells me I might want to collect and watch the film once again in the future, albeit in the original language now.Coma is one of the most gorgeous movies ever made,and this is coming from someone who finds CGI-studded Hollywood sci-fi action movies hard to resist. The film has some of the most picturesque visuals I've personally ever seen. I'm glad I rented this, and although the Hindi dub was pretty average, the story itself was so immersive that one thing didn't bother me after a point of time. Performance wise, this film has some great work done by the actors due to which the characters end up memorable. While the real story remains shrouded in mystery during the first half, the second reveals a fantastic twist without getting derailed. Plus, it's action-packed to the brim, and from the very beginning itself. Again, the visual effects make this film what it truly is and I hardly remember a single shot where I didn't exclaim 'wow'. One could easily mistake this as a mere CGI spectacle, but the whole universe and conceptualization of Coma are the reasons that doesn't happen. Not in my case at least. If you enjoy sci-fi action films, Coma deserves a chance as well. Something tells me I might want to collect and watch the film once again in the future, albeit in the original language now.";
  const review =
    "This is such a great movie, i think everyone should watch it!";
  return (
    <Box
      display={{ base: "block", md: "grid" }}
      gridTemplateColumns={{ md: "2fr 2fr", lg: "1fr 2fr" }}
      borderWidth="1px"
      rounded="md"
      padding={4}
      margin={5}
      bg="gray.50"
    >
      <Box padding={4} m={3} rounded="md" boxShadow="xl" p="2">
        <Image src={poster} alt="Movie Poster" />
        <Text>
          Rating:
          <Badge colorScheme="blue" ml={2}>
            {rating}
          </Badge>
        </Text>
      </Box>

      <Flex
        direction="column"
        align="left"
        padding={4}
        borderWidth="1px"
        rounded="md"
        boxShadow="xl"
      >
        <Text
          fontSize={{ base: "md", md: "md" }}
          maxHeight={{ base: "500", md: "500", lg: "600" }}
          overflow="auto"
        >
          {review}
        </Text>
      </Flex>
    </Box>

    /*
    <Box
      display={{ base: "block", md: "grid" }}
      gridTemplateColumns={{ md: "1fr 2fr", lg: "1fr 2fr" }}
      borderWidth="1px"
      rounded="md"
      padding={4}
      margin={5}
      maxWidth="100%"
      bg="gray.50"
    >
      <Box padding={4} m={3} rounded="md" boxShadow="xl" p="2">
        <Image src={poster} alt="Movie Poster" />
        <Text>
          Rating:
          <Badge colorScheme="blue" ml={2}>
            {rating}
          </Badge>
        </Text>
      </Box>

      <Flex
        direction="column"
        align="left"
        padding={4}
        borderWidth="1px"
        rounded="md"
        boxShadow="xl"
      >
        <Text
          fontSize={{ base: "md", md: "md" }} // Adjust font size based on screen size
        >
          {review}
        </Text>
        <Spacer />
      </Flex>
    </Box>
    */
    /*<Box
      display={{ base: "block", md: "grid" }}
      gridTemplateColumns={{ md: "1fr 2fr", lg: "1fr 2fr" }}
      borderWidth="1px"
      rounded="md"
      padding={4}
      margin={5}
      maxWidth="100%"
      bg="gray.50"
    >
      <Box
        padding={4}
        m={3}
        borderWidth="1px"
        minWidth="70%"
        maxHeight="auto"
        rounded="md"
        boxShadow="xl"
        p="2"
        bg="white"
      >
        <Image src={poster} alt="Movie Poster" height="auto" />

        <Text>
          Rating:
          <Badge colorScheme="blue" ml={2}>
            {rating}
          </Badge>
        </Text>
      </Box>

      <Flex
        direction="column"
        align="left"
        padding={4}
        borderWidth="1px"
        rounded="md"
        boxShadow="xl"
      >
        <Text fontSize="lg">{review}</Text>
        <Spacer />
      </Flex>
    </Box>*/
  );
};
