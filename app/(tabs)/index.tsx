import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { Colors } from "@/constants/colors";
import { images } from "@/constants/images";
import { icons } from "@/constants/icons";
import SearchBar from "@/components/SearchBar";
import { useRouter } from "expo-router";
import useFetch from "@/services/useFetch";
import { fetchMovies } from "@/services/api";
import MovieCard from "@/components/MovieCard";
import { getTrendingMovies } from "@/services/appwrite";
import TrendingCard from "@/components/TrendingCard";

export default function index() {
  const router = useRouter();

  const {
    data: trendingMovies,
    loading: trendingLoading,
    error: trendingError,
  } = useFetch(getTrendingMovies);

  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError,
  } = useFetch(() => fetchMovies({ query: "" }));

  return (
    <View style={styles.container}>
      <Image source={images.bg} style={styles.bgImage} />
      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 10 }}
      >
        <Image source={icons.logo} style={styles.logo} />

        {moviesLoading || trendingLoading ? (
          <ActivityIndicator
            size={"large"}
            color={"#0000ff"}
            style={styles.activityIndicator}
          />
        ) : moviesError || trendingError ? (
          <Text>Error: {moviesError?.message || trendingError?.message}</Text>
        ) : (
          <View style={{ marginTop: 20 }}>
            <SearchBar
              onPress={() => router.push("/search")}
              placeholder="Search for a movie"
              onChangeText={() => {}}
              value=""
            />

            {trendingMovies && (
              <View style={styles.trendingContainer}>
                <Text style={styles.trendingTitle}>Trending Movies</Text>

                <FlatList
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  ItemSeparatorComponent={() => <View style={{ width: 16 }} />}
                  data={trendingMovies}
                  renderItem={({ item, index }) => (
                    <TrendingCard movie={item} index={index} />
                  )}
                  keyExtractor={(item) => item.movie_id.toString()}
                  style={styles.trendingWrapper}
                />
              </View>
            )}

            <>
              <Text style={styles.latestTitle}>Latest Movies</Text>

              <FlatList
                data={movies}
                renderItem={({ item }) => <MovieCard {...item} />}
                keyExtractor={(item) => item.id.toString()}
                numColumns={3}
                columnWrapperStyle={{
                  justifyContent: "flex-start",
                  gap: 20,
                  paddingRight: 5,
                  marginBottom: 10,
                }}
                style={styles.listWrapper}
                scrollEnabled={false}
              />
            </>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  bgImage: {
    position: "absolute",
    zIndex: 0,
    width: "100%",
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  logo: {
    width: 48,
    height: 40,
    marginTop: 80,
    marginBottom: 20,
    alignSelf: "center",
  },
  scrollContentContainer: {
    minHeight: "100%",
    paddingBottom: 10,
  },
  activityIndicator: {
    marginTop: 40,
    alignSelf: "center",
  },
  trendingContainer: {
    marginTop: 40,
  },
  trendingTitle: {
    fontSize: 18,
    lineHeight: 22,
    color: "#ffffff",
    fontWeight: 700,
    marginBottom: 12,
  },
  trendingWrapper: {
    marginTop: 20,
    marginBottom: 12,
  },
  latestTitle: {
    fontSize: 18,
    lineHeight: 22,
    color: "#ffffff",
    fontWeight: 700,
    marginTop: 20,
    marginBottom: 12,
  },
  listWrapper: {
    marginTop: 8,
    paddingBottom: 128,
  },
});
