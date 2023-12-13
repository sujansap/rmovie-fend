import { useState, memo, useMemo, useEffect } from "react";
import { useForm, FormProvider, useFormContext } from "react-hook-form";
import {
  FormControl,
  Tag,
  TagLabel,
  TagCloseButton,
  Stack,
  FormHelperText,
  Button,
  Container,
} from "@chakra-ui/react";

import useSWRMutation from "swr/mutation";
import { save } from "../../api";

import useSWR from "swr";
import { getAll } from "../../api";
import LabelInput from "../LabelInput";

import { useCallback } from "react";
import LabelTextarea from "../LabelTextarea";

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
const InputGenre = ({ selectedGenres, setSelectedGenres }) => {
  const {
    setError,
    setValue,
    getValues,
    genres,
    formState: { errors, isSubmitting },
  } = useFormContext();

  console.log(genres);
  const handelGenreEnter = (event) => {
    const rawGenre = getValues("genre");
    console.log("genre: &&&" + rawGenre);
    const genre = rawGenre.trim().toLowerCase();

    console.log(`genre ain't doing nothing: ${rawGenre}`);
    if (event.key === "Enter" && genre !== "") {
      // blokeer submit bij enter
      event.preventDefault();
      if (genre.length < 2) {
        setError("genre", {
          type: "manual",
          message: "Genre must have a minimum length of 1 character",
        });
      } else if (!genres.includes(genre)) {
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
  };

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
export default function MovieForm({}) {
  const {
    data: GENRES_DATA = [],
    isLoading,
    error,
  } = useSWR("movies/genres", getAll);
  console.log("test");
  console.log(GENRES_DATA);

  const genres = GENRES_DATA.map((item) => item.genre);
  console.log(genres);
  const { trigger: saveMovie, error: saveError } = useSWRMutation(
    "movies",
    save
  );

  const methods = useForm();
  const {
    reset,
    handleSubmit,
    setValue,
    formState: { errors },
  } = methods;

  const [selectedGenres, setSelectedGenres] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [genreValue, setGenreValue] = useState("");

  const setGenres = (genres) => {
    setValue("genre", genres);
  };

  //const hasError = "synopsis" in errors;

  console.log("rendering movie form...");
  const onSubmit = async (data) => {
    const { title, synopsis, poster } = data;
    console.log(data);
    await saveMovie({
      title,
      synopsis,
      poster,
      genres: selectedGenres,
    });

    setSelectedGenres([]);
    reset();
  };

  return (
    <FormProvider {...methods} genres={genres}>
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
            validationRules={validationRules.title}
          />

          <LabelTextarea
            name="synopsis"
            placeholder="The movie is about a..."
            label="synopsis"
            validationRules={validationRules.synopsis}
          />

          <InputGenre
            selectedGenres={selectedGenres}
            setSelectedGenres={setSelectedGenres}
            inputValue={inputValue}
            setInputValue={setInputValue}
            genreValue={genreValue}
            setGenreValue={setGenreValue}
          />

          <LabelInput
            label="Poster"
            name="poster"
            type="url"
            validationRules={validationRules.poster}
          />

          <Button
            type="submit"
            colorScheme="blue"
            marginTop={5}
            onClick={() => setGenres(selectedGenres)}
          >
            Add
          </Button>
        </Container>
      </form>
    </FormProvider>
  );
}
