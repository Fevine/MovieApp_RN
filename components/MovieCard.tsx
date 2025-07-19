import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Link } from "expo-router";
import { icons } from "@/constants/icons";
import { Colors } from "@/constants/colors";

const MovieCard = ({
  id,
  poster_path,
  title,
  vote_average,
  release_date,
}: Movie) => {
  return (
    <Link href={`/movie/${id}`} asChild>
      <TouchableOpacity style={styles.cardContainer}>
        <Image
          source={{
            uri: poster_path
              ? `https://image.tmdb.org/t/p/w500${poster_path}`
              : "https://placehold.co/600x400/1a1a1a/ffffff.png",
          }}
          style={styles.cardImage}
          resizeMode="cover"
        />
        <Text style={styles.cardTitle} numberOfLines={1}>
          {title}
        </Text>

        <View style={styles.ratingContainer}>
          <Image source={icons.star} style={styles.ratingStar} />
          <Text style={styles.ratingText}>{Math.round(vote_average / 2)}</Text>
        </View>
        <View style={styles.dateContainer}>
          <Text style={styles.dateText}>{release_date?.split("-")[0]}</Text>
          <Text style={styles.movieText}>Movie</Text>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

export default MovieCard;

const styles = StyleSheet.create({
  cardTitle: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: 700,
    color: "#ffffff",
    marginTop: 8,
  },
  cardContainer: {
    width: "30%",
  },
  cardImage: {
    width: "100%",
    height: 208,
    borderRadius: 8,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    columnGap: 4,
  },
  ratingStar: {
    width: 16,
  },
  ratingText: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: 700,
    color: "#ffffff",
    textTransform: "uppercase",
  },
  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  dateText: {
    fontSize: 12,
    lineHeight: 16,
    color: Colors.light[300],
    fontWeight: 500,
    marginTop: 4,
  },
  movieText: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: 500,
    color: Colors.light[300],
    textTransform: "uppercase",
  },
});
