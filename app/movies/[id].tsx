import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React from "react";
import { router, useLocalSearchParams } from "expo-router";
import useFetch from "@/services/useFetch";
import { fetchMovieDetails } from "@/services/api";
import { icons } from "@/constants/icons";

interface MovieInfoProps {
  label: string;
  value?: string | number | null;
}

const MovieInfo = ({ label, value }: MovieInfoProps) => (
  <View className="flex-col items-start justify-center mt-5">
    <Text className="text-light-200 text-sm font-normal">{label}</Text>
    <Text className="text-light-100 text-sm font-bold mt-2">
      {value || "N/A"}
    </Text>
  </View>
);

const MovieDetails = () => {
  const { id } = useLocalSearchParams();

  const {
    data: movie,
    error,
    loading,
  } = useFetch(() => fetchMovieDetails(id as string));
  return (
    <View className="bg-primary flex-1">
      <ScrollView
        contentContainerStyle={{
          paddingBottom: 80,
        }}
      >
        <View className="flex-1 items-center justify-center">
          <Image
            className="w-full h-[500px]"
            resizeMode="stretch"
            source={{
              uri: `https://image.tmdb.org/t/p/w500${movie?.poster_path}`,
            }}
          />
        </View>
        <View className="flex-col items-start justify-center mt-5 px-5">
          <Text className="text-white text-xl font-bold">{movie?.title}</Text>
          <View className="flex-row items-center gap-x-1 mt-2">
            <Text className="text-light-200 text-sm">
              {" "}
              {movie?.release_date?.split("-")[0]}
            </Text>
            <Text className="text-light-200 text-sm"> {movie?.runtime}m</Text>
          </View>
          <View className="flex-row items-center bg-dark-100 px-2 py-1 rounded-md gap-x-1 mt-2">
            <Image className="size-4" source={icons.star} />
            <Text className="text-white text-sm font-bold">
              {Math.round(movie?.vote_average ?? 0)} / 10
            </Text>
            <Text className="text-light-200 text-sm font-bold">
              ({movie?.vote_count?.toLocaleString()} votes)
            </Text>
          </View>
          <MovieInfo label="Overview" value={movie?.overview} />
          <MovieInfo
            label="Genres"
            value={movie?.genres?.map((g) => g.name).join(" - ") || "N/A"}
          />
          <View className="flex flex-row justify-between w-1/2">
            <MovieInfo
              label="Budget"
              value={`$${movie?.budget?.toLocaleString()}`}
            />
            <MovieInfo
              label="Revenue"
              value={`$${movie?.revenue?.toLocaleString()}`}
            />
          </View>
          <MovieInfo
            label="Production Companies"
            value={
              movie?.production_companies.map((c) => c.name).join(" - ") ||
              "N/A"
            }
          />
        </View>
      </ScrollView>
      <TouchableOpacity
        className="absolute bottom-5 left-0 right-0 mx-5 bg-accent rounded-lg py-3.5 flex flex-row items-center justify-center z-50"
        onPress={router.back}
      >
        <Image
          className="size-5 mr-1 mt-0.5 rotate-180"
          tintColor="#fff"
          source={icons.arrow}
        />
        <Text className="text-white font-semibold text-base">Go Back</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MovieDetails;
