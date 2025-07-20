import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { router, useLocalSearchParams } from "expo-router";
import { Colors } from "@/constants/colors";
import useFetch from "@/services/useFetch";
import { fetchMovieDetails } from "@/services/api";
import { icons } from "@/constants/icons";

interface MovieInfoProps {
  label: string;
  value?: string | number | null;
}

const MovieInfo = ({ label, value }: MovieInfoProps) => (
  <View style={styles.infoBox}>
    <Text style={styles.infoLabel}>{label}</Text>
    <Text style={styles.infoValue}>{value || "N/A"}</Text>
  </View>
);

export default function MovieDetails() {
  const { id } = useLocalSearchParams();

  const { data: movie, loading } = useFetch(() =>
    fetchMovieDetails(id as string)
  );

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
        <View>
          <Image
            source={{
              uri: `https://image.tmdb.org/t/p/w500${movie?.poster_path}`,
            }}
            style={styles.movieImage}
            resizeMode="stretch"
          />
        </View>

        <View style={styles.textBox}>
          <Text style={styles.movieTitle}>{movie?.title}</Text>

          <View style={styles.movieDateBox}>
            <Text style={styles.movieDate}>
              {movie?.release_date?.split("-")[0]}
            </Text>
            <Text style={styles.movieDate}>{movie?.runtime}</Text>
          </View>

          <View style={styles.ratingBox}>
            <Image source={icons.star} style={styles.starIcon} />
            <Text style={styles.ratingNum}>
              {Math.round(movie?.vote_average ?? 0)}/10
            </Text>
            <Text style={styles.voteCount}>({movie?.vote_count} votes)</Text>
          </View>

          <MovieInfo label="Overview" value={movie?.overview} />
          <MovieInfo
            label="Genres"
            value={movie?.genres?.map((g) => g.name).join(" - ") || "N/A"}
          />

          <View style={styles.budgetBox}>
            <MovieInfo
              label="Budget"
              value={`$${movie?.budget / 1_000_000} milloin`}
            />
            <MovieInfo
              label="Revenue"
              value={`$${Math.round(movie?.revenue) / 1_000_000}`}
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

      <TouchableOpacity style={styles.goBackBox} onPress={router.back}>
        <Image
          source={icons.arrow}
          style={styles.goBackIcon}
          tintColor={"#ffffff"}
        />
        <Text style={styles.goBackText}>Go back</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary,
    flex: 1,
  },
  movieImage: {
    width: "100%",
    height: 550,
  },
  textBox: {
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
    marginTop: 20,
    paddingHorizontal: 20,
  },
  movieTitle: {
    color: "#ffffff",
    fontWeight: 700,
    fontSize: 20,
    lineHeight: 28,
  },
  movieDateBox: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
    columnGap: 4,
  },
  movieDate: {
    color: Colors.light[200],
    fontSize: 14,
    lineHeight: 20,
  },
  ratingBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.dark[100],
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    columnGap: 4,
    marginTop: 8,
  },
  starIcon: {
    width: 16,
    height: 16,
  },
  ratingNum: {
    color: "#ffffff",
    fontWeight: 700,
    fontSize: 14,
    lineHeight: 20,
  },
  voteCount: {
    fontSize: 14,
    lineHeight: 20,
    color: Colors.light[200],
  },
  infoBox: {
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
    marginTop: 20,
  },
  infoLabel: {
    color: Colors.light[200],
    fontSize: 14,
    lineHeight: 20,
    fontWeight: 400,
  },
  infoValue: {
    color: Colors.light[100],
    fontWeight: 700,
    fontSize: 14,
    lineHeight: 20,
    marginTop: 8,
  },
  budgetBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "50%",
  },
  goBackBox: {
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
    marginHorizontal: 20,
    backgroundColor: Colors.accent,
    borderRadius: 8,
    paddingVertical: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 50,
  },
  goBackIcon: {
    width: 20,
    height: 20,
    marginRight: 4,
    marginTop: 2,
    transform: [{ rotate: "180deg" }],
  },
  goBackText: {
    color: "#ffffff",
    fontWeight: 600,
    fontSize: 16,
    lineHeight: 24,
  },
});
