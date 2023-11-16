import { useState, memo, useMemo, useEffect } from "react";
import { useForm, FormProvider, useFormContext } from "react-hook-form";
import {
  FormControl,
  FormLabel,
  Input,
  Tag,
  TagLabel,
  TagCloseButton,
  Stack,
  Box,
  FormHelperText,
  Button,
  Textarea,
  Text,
  Container,
} from "@chakra-ui/react";

import useSWRMutation from "swr/mutation";
import { save } from "../../api";
import Error from "../Error";
import useSWR from "swr";
import { getAll } from "../../api";

const validationRules = {
  title: {
    required: "Movie title is required",
    minLength: { value: 1, message: "Min length is 1" },
  },
  poster: {
    required: "Poster url is required",
    min: { value: 5, message: "min 1" },
    max: { value: 5000, message: "max 5000" },
  },
  synopsis: {
    required: "Synopsis is required",
    min: { value: 10, message: "min 10" },
    max: { value: 5000, message: "max 5000" },
  },
  genre: {
    required: "Genre is required",
    min: { value: 7, message: "min 10" },
  },
};

//for poster url link and movie title
function LabelInput({ label, name, type, validationRules }) {
  const { register, errors } = useFormContext(); // 👈 2
  const hasError = name in errors;

  return (
    <FormControl>
      <FormLabel>{label}</FormLabel>
      <Input
        {...register(name, validationRules)}
        id={name}
        type={type}
        placeholder={label}
      />
      {hasError ? <Text color="red">{errors[name].message}</Text> : null}
    </FormControl>
  );
}

//For genre
const InputGenre = ({
  selectedGenres,
  setSelectedGenres,
  inputValue,
  setInputValue,
}) => {
  const { register, errors, setError, setValue, getValues, genres } =
    useFormContext();

  const hasError = "genre" in errors;

  const handelGenreEnter = (event) => {
    console.log("genre: &&&");
    const rawGenre = getValues("genre");

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

  const removeGenre = (genre) => {
    setSelectedGenres(selectedGenres.filter((g) => g !== genre));
  };

  return (
    <FormControl>
      <FormLabel>Genres</FormLabel>
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
      <Input
        {...register("genre", validationRules.genre)}
        type="text"
        placeholder="Action"
        onKeyDown={handelGenreEnter}
      />
      {hasError ? <Text color="red">{errors["genre"].message}</Text> : null}
    </FormControl>
  );
};
export default function MovieForm({}) {
  const { data: GENRES_DATA = [], isLoading, error } = useSWR("genres", getAll);
  console.log("test");
  console.log(GENRES_DATA);
  //const genres = ["Action", "Comedy"];

  const genres = GENRES_DATA.map((item) => item.genre);
  console.log(genres);
  const { trigger: saveMovie, error: saveError } = useSWRMutation(
    "movies",
    save
  );

  const {
    register,
    reset,
    handleSubmit,
    setValue,
    getValues,
    setError,
    formState: { errors },
  } = useForm();

  // we will keep it at one higher level than where we need it, because
  // we need to access the genres when the enter button is clicked
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [genreValue, setGenreValue] = useState("");

  const setGenres = (genres) => {
    setValue("genre", genres);
  };

  const hasError = "synopsis" in errors;

  console.log("rendering movie form...");
  const onSubmit = async (data) => {
    const { title, synopsis, poster } = data;
    console.log(data);
    await saveMovie({
      title,
      synopsis,
      user: 1,
      poster,
      genres: selectedGenres,
    });

    setSelectedGenres([]);
    reset();
  };

  return (
    <FormProvider
      handleSubmit={handleSubmit}
      errors={errors}
      register={register}
      setError={setError}
      genres={genres}
      getValues={getValues}
      setValue={setValue}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Container
          margin={5}
          maxWidth="70%"
          bg="gray.50"
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

          <Box marginTop={5} marginBottom={5}>
            <FormControl>
              <FormLabel>Synopsis</FormLabel>
              <Textarea
                {...register("synopsis", validationRules["synopsis"])}
                placeholder="The movie is about a..."
              ></Textarea>
              {hasError ? (
                <Text color="red">{errors["synopsis"].message}</Text>
              ) : null}
            </FormControl>
          </Box>

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
