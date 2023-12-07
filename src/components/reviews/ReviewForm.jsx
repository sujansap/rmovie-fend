import { useState, useEffect } from "react";
import {
  useForm,
  FormProvider,
  useFormContext,
  useController,
} from "react-hook-form";

import {
  Box,
  Text,
  Textarea,
  Button,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  FormLabel,
  FormControl,
  Tooltip,
} from "@chakra-ui/react";

import useSWRMutation from "swr/mutation";
import { save } from "../../api";
import Error from "../Error";
import useSWR from "swr";
import { getAll } from "../../api";
import LabelTextarea from "../movies/LabelTextarea";
import { useParams, useNavigate } from "react-router-dom";

const validationRules = {
  reviewText: {
    required: "Review text is required",
    minLength: { value: 5, message: "Min length is 5" },
  },
  rating: {
    required: "Rating is required",
    min: { value: 1, message: "Rating cannot be lower than 0" },
    max: { value: 100, message: "Rating cannot be higher than 100" },
  },
};

const calculateColor = (value) => {
  const red = Math.min(255, Math.round((1 - value / 100) * 255));
  //230 for green, otherwise too light green
  const green = Math.min(230, Math.round((value / 100) * 255));
  return `rgb(${red},   ${green}, 0)`;
};

const RatingSlider = ({ firstValue }) => {
  console.log("the value that the slider comp gets is: " + firstValue);
  const [showTooltip, setShowTooltip] = useState(false);
  const [sliderValue, setSliderValue] = useState(firstValue);
  //const { register, errors, getValues, setValue } = useFormContext();
  const {
    getValues,
    setValue,
    register,
    formState: { errors, isSubmitting },
  } = useFormContext();

  const hasError = "rating" in errors;

  return (
    <Box>
      <Slider
        //why not working with register
        {...register("rating", validationRules["rating"])}
        min={0}
        max={100}
        // {...field}
        value={sliderValue}
        maxW="50%"
        name="rating"
        onChange={(v) => {
          setValue("rating", v);
          setSliderValue(v);
        }}
      >
        <SliderTrack>
          <SliderFilledTrack bg={calculateColor(sliderValue)} />
        </SliderTrack>
        <Tooltip
          hasArrow
          bg={calculateColor(sliderValue)}
          color="white"
          placement="top"
          isOpen={showTooltip}
          label={`${sliderValue}%`}
        >
          <SliderThumb />
        </Tooltip>
      </Slider>
      <Text color={calculateColor(sliderValue)}>{sliderValue}/100</Text>
      <Box>
        {hasError ? <Text color="red">{errors["rating"].message}</Text> : null}
      </Box>
    </Box>
  );
};

export const ReviewForm = ({ uid, mid, rid, reviewText, rating }) => {
  console.log("rerender movie form");
  const navigate = useNavigate();
  const methods = useForm();
  const {
    register,
    reset,
    handleSubmit,
    setValue,
    getValues,
    setError,
    formState: { errors },
  } = methods;

  const { trigger: saveReview, error: saveError } = useSWRMutation(
    `reviews/`,
    save
  );

  const onSubmit = async (data) => {
    console.log(getValues("rating"));
    console.log(data.reviewText);
    console.log(data.rating);
    const { reviewText: review, rating } = data;
    console.log(data);
    await saveReview({
      id: rid ? rid : null,
      movieId: mid,
      review,
      rating,
    });

    reset();
    navigate(`/movies/${mid}/review`);
  };

  //const [firstValue, setFirstValue] = useState(rdata.rating);

  useEffect(() => {
    if (reviewText) {
      console.log("the movie already has a review show that" + reviewText);
      setValue("reviewText", reviewText);
      setValue("rating", rating);

      //console.log("change firstValue " + rdata.rating);
      // setFirstValue(rdata.rating);
    }
  });

  console.log("the first value after change is: ");
  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box
          margin={5}
          //maxWidth="70%"
          bg="gray.50"
          padding={5}
          rounded="md"
          boxShadow="xl"
        >
          <Text fontSize="xl" fontWeight="bold">
            Review
          </Text>

          <LabelTextarea
            placeholder="Write your review here"
            name="reviewText"
            label="Review Text"
          />

          <FormControl>
            <FormLabel>Rating</FormLabel>
            <RatingSlider firstValue={rating} />
          </FormControl>
          <Button
            type="submit"
            colorScheme="blue"
            marginTop={5}
            //onClick={() => setValue("rating", sliderValue)}
          >
            Post
          </Button>
        </Box>
      </form>
    </FormProvider>
  );
};
