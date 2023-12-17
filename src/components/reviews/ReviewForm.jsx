import { useState, useEffect, memo } from "react";
import { useForm, FormProvider, useFormContext } from "react-hook-form";
import Error from "../Error";
import {
  Box,
  Text,
  Button,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  FormLabel,
  FormControl,
} from "@chakra-ui/react";
import { useCallback } from "react";

import useSWRMutation from "swr/mutation";
import { save } from "../../api";

import LabelTextarea from "../LabelTextarea";
import { useNavigate } from "react-router-dom";
import { mutate as globalMutate } from "swr";
import calculateColor from "../CalculateColor";

const validationRules = {
  reviewText: {
    required: "Review text is required",
    minLength: { value: 5, message: "Min length is 5" },
  },
  rating: {
    required: "Rating is required",
    min: { value: 0, message: "Rating cannot be lower than 0" },
    max: { value: 100, message: "Rating cannot be higher than 100" },
  },
};

const RatingSlider = memo(({ firstValue }) => {
  console.log("the value that the slider comp gets is: " + firstValue);

  const [sliderValue, setSliderValue] = useState(firstValue);

  const {
    setValue,
    register,
    formState: { errors },
  } = useFormContext();

  const hasError = "rating" in errors;

  return (
    <Box>
      <Slider
        {...register("rating", validationRules["rating"])}
        min={0}
        max={100}
        value={sliderValue}
        maxW="50%"
        name="rating"
        data-cy="ratingslider_input"
        onChange={(v) => {
          setValue("rating", v);
          setSliderValue(v);
        }}
      >
        <SliderTrack>
          <SliderFilledTrack bg={calculateColor(sliderValue)} />
        </SliderTrack>
        <SliderThumb />
      </Slider>
      <Text color={calculateColor(sliderValue)}>{sliderValue}/100</Text>
      <Box>
        {hasError ? <Text color="red">{errors["rating"].message}</Text> : null}
      </Box>
    </Box>
  );
});

export const ReviewForm = ({ mid, rid, reviewText, rating, mutate }) => {
  const navigate = useNavigate();

  const methods = useForm();
  const {
    reset,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = methods;

  const { trigger: saveReview, error: saveError } = useSWRMutation(
    `reviews/`,
    save
  );

  const onSubmit = useCallback(
    async (data) => {
      const { reviewText: review, rating } = data;

      await saveReview({
        id: rid ? rid : null,
        movieId: mid,
        review,
        rating,
      });

      reset();
      if (mutate) {
        mutate(""); //mid
      } else {
        globalMutate(`movies/${mid}/review`);
        navigate(`/movies/${mid}/review`);
      }
    },
    [saveReview, navigate, mutate, rid, globalMutate]
  );

  useEffect(() => {
    if (rid) {
      console.log("the movie already has a review show that" + reviewText);
      setValue("reviewText", reviewText);
      setValue("rating", rating);
    }
  });

  console.log("the first value after change is: ");
  return (
    <>
      <Error error={saveError} />
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box margin={5} padding={5} rounded="md" boxShadow="xl">
            <Text fontSize="xl" fontWeight="bold">
              Review
            </Text>

            <LabelTextarea
              placeholder="Write your review here"
              name="reviewText"
              label="Review Text"
              data-cy="review_input"
              validationRules={validationRules.reviewText}
            />

            <FormControl>
              <FormLabel>Rating</FormLabel>
              <RatingSlider firstValue={rating} />
            </FormControl>
            <Button
              data-cy="submit_review_btn"
              type="submit"
              colorScheme="blue"
              marginTop={5}
              disabled={isSubmitting}
            >
              Post
            </Button>
          </Box>
        </form>
      </FormProvider>
    </>
  );
};
