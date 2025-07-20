import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Link } from "expo-router";
import MaskedView from "@react-native-masked-view/masked-view";
import { images } from "@/constants/images";
import { Colors } from "@/constants/colors";

export default function TrendingCard({
  movie: { movie_id, title, poster_url },
  index,
}: TrendingCardProps) {
  return (
    <Link href={`/movie/${movie_id}`} asChild>
      <TouchableOpacity style={styles.container}>
        <Image
          source={{ uri: poster_url }}
          resizeMode="cover"
          style={styles.cardImage}
        />

        <View style={styles.countNumBox}>
          <MaskedView
            style={styles.maskedView}
            maskElement={
              <View style={styles.maskedView}>
                <Text style={styles.countNum}>{index + 1}</Text>
              </View>
            }
          >
            <Image
              source={images.rankingGradient}
              style={styles.gradientImage}
              resizeMode="cover"
            />
          </MaskedView>
        </View>
        <Text style={styles.title} numberOfLines={2}>
          {title}
        </Text>
      </TouchableOpacity>
    </Link>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 128,
    position: "relative",
    paddingLeft: 20,
  },
  cardImage: {
    width: 128,
    height: 192,
    borderRadius: 8,
  },
  countNumBox: {
    position: "absolute",
    bottom: 36,
    left: -14,
    width: 56,
    height: 56,
    justifyContent: "center",
    alignItems: "center",
  },
  countNum: {
    fontWeight: "700",
    color: "black",
    fontSize: 60,
    lineHeight: 72,
  },

  maskedView: {
    width: 56,
    height: 56,
    justifyContent: "center",
    alignItems: "center",
  },

  gradientImage: {
    width: 56,
    height: 56,
  },
  title: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: 700,
    marginTop: 8,
    color: Colors.light[200],
  },
});
