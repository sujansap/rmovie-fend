import { useState, memo, useMemo, useEffect } from "react";
import { useForm, FormProvider, useFormContext } from "react-hook-form";
import {
  FormControl,
  Tag,
  TagLabel,
  TagCloseButton,
  CloseButton,
  Stack,
  FormHelperText,
  Button,
  Alert,
  AlertIcon,
  Container,
  Box,
} from "@chakra-ui/react";
import HasAccess from "../HasAcces";
import useSWRMutation from "swr/mutation";
import { save } from "../../api";

import { useLanguage } from "../../contexts/Language.context";

import translations from "../../translation/translation";

import LabelInput from "../LabelInput";

import { useCallback } from "react";
import LabelTextarea from "../LabelTextarea";
import Error from "../Error";

const validationRules = {
  title: {
    required: "Movie title is required",
    minLength: { value: 1, message: "Min length is 1" },
  },
  poster: {
    required: "Poster url is required",
  },
  synopsis: {
    required: "Synopsis is required",
    minLength: { value: 5, message: "Minimum 5 characters" },
    maxLength: { value: 5000, message: "max 5000" },
  },
  genre: {
    required: "Genre is required",
    minLength: { value: 1, message: "min 10" },
  },
};

//For genre
const InputGenre = ({ selectedGenres, setSelectedGenres, validGenres }) => {
  const {
    setError,
    setValue,
    getValues,
    formState: { errors, isSubmitting },
  } = useFormContext();

  const handelGenreEnter = useCallback(
    (event) => {
      const rawGenre = getValues("genre");

      console.log("genre: &&&" + rawGenre);

      const genre = !rawGenre || rawGenre.trim().toLowerCase();

      if (event.key === "Enter" && genre !== "") {
        // blokeer submit bij enter
        event.preventDefault();
        if (genre.length < 2) {
          setError("genre", {
            type: "manual",
            message: "Genre must have a minimum length of 1 character",
          });
        } else if (!validGenres.includes(genre)) {
          console.log(validGenres);
          setError("genre", {
            type: "manual",
            message: "This is not a valid genre!",
          });
        } else {
          if (!selectedGenres.includes(genre)) {
            //de latest input of the user is a valid one, thus remove the error
            setError("genre", {});
            setSelectedGenres([...selectedGenres, genre]);
            setValue("genre", "");
            //make the input field empty agian
          } else {
            setError("genre", {
              type: "manual",
              message: "You have already added this!",
            });
          }
        }
      }
    },
    [selectedGenres]
  );

  const removeGenre = useCallback(
    (genre) => {
      setSelectedGenres(selectedGenres.filter((g) => g !== genre));
    },
    [selectedGenres]
  );

  return (
    <FormControl>
      <LabelInput
        label="Genres"
        name="genre"
        type="text"
        data-cy="genres_input"
        validationRules={validationRules.genre}
        onKeyDown={handelGenreEnter}
      ></LabelInput>
      <Stack direction="row" flexWrap="wrap">
        {selectedGenres.map((genre) => (
          <Tag
            key={genre}
            size="md"
            variant="solid"
            colorScheme="blue"
            borderRadius="full"
            mb={2}
            mr={2}
          >
            <TagLabel>{genre}</TagLabel>
            <TagCloseButton onClick={() => removeGenre(genre)} />
          </Tag>
        ))}
      </Stack>
      <FormHelperText marginBottom="2">
        You can add multiple. Just type and press enter.
      </FormHelperText>
    </FormControl>
  );
};

export default function MovieForm({ GENRES_DATA }) {
  const { language } = useLanguage();

  const validGenres = GENRES_DATA.map((item) => item.genre);

  //console.log(genres);
  const { trigger: saveMovie, error: saveError } = useSWRMutation(
    "movies",
    save
  );

  const methods = useForm();
  const {
    reset,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitSuccessful },
  } = methods;

  const [selectedGenres, setSelectedGenres] = useState([]);

  const setGenres = () => {
    setValue("genre", selectedGenres);
  };

  const onSubmit = useCallback(
    async (data) => {
      const { title, synopsis, poster } = data;
      try {
        await saveMovie({
          title,
          synopsis,
          poster,
          genres: selectedGenres,
        });

        setSelectedGenres([]);
        reset();
      } catch (error) {
        console.log("error, while saving movie");
      }
    },
    [saveMovie, setSelectedGenres, selectedGenres]
  );

  const onClose = () => {
    methods.reset({ isSubmitSuccessful: false });
  };

  return (
    <HasAccess>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Container
            margin={5}
            maxWidth="70%"
            //bg="gray.50"
            padding={5}
            rounded="md"
            boxShadow="xl"
          >
            <LabelInput
              label="Movie Title"
              name="title"
              type="title"
              data-cy="title_input"
              validationRules={validationRules.title}
            />

            <LabelTextarea
              name="synopsis"
              placeholder="The movie is about a..."
              label="Synopsis"
              data-cy="synopsis_input"
              validationRules={validationRules.synopsis}
            />

            <InputGenre
              selectedGenres={selectedGenres}
              setSelectedGenres={setSelectedGenres}
              validGenres={validGenres}
            />

            <LabelInput
              label="Poster"
              placeholder="poster url"
              name="poster"
              type="url"
              data-cy="poster_input"
              validationRules={validationRules.poster}
            />

            <Button
              type="submit"
              colorScheme="blue"
              data-cy="submit_btn"
              marginTop={5}
              onClick={setGenres}
            >
              Add
            </Button>
          </Container>
        </form>
        {language === "nl" ? "*" + translations[language].notTranslated : ""}
        {isSubmitSuccessful && !saveError ? (
          <Alert status="success" data-cy="added_message">
            <AlertIcon />
            Movie added successfully!
            <CloseButton
              position="absolute"
              right="8px"
              top="8px"
              onClick={onClose}
            />
          </Alert>
        ) : null}
      </FormProvider>

      <Box>
        <Error error={saveError}></Error>
      </Box>
    </HasAccess>
  );
}
