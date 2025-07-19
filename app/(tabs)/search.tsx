import MovieCard from "@/components/MovieCard";
import SearchBar from "@/components/SearchBar";
import { Colors } from "@/constants/colors";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { fetchMovies } from "@/services/api";
import useFetch from "@/services/useFetch";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function search() {
  const [searchQuery, setSearchQuery] = useState("");

  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError,
    refetch: loadMovies,
    reset,
  } = useFetch(() => fetchMovies({ query: searchQuery }), false);

  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      if (searchQuery.trim()) {
        await loadMovies();
      } else {
        reset();
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  return (
    <View style={styles.container}>
      <Image source={images.bg} style={styles.bgImage} resizeMode="cover" />

      <FlatList
        data={movies}
        renderItem={({ item }) => <MovieCard {...item} />}
        keyExtractor={(item) => item.id.toString()}
        style={styles.listWrapper}
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: "center",
          gap: 16,
          marginVertical: 16,
        }}
        contentContainerStyle={{
          paddingBottom: 100,
        }}
        ListHeaderComponent={
          <>
            <View style={styles.listWrapperHeader}>
              <Image source={icons.logo} style={styles.logo} />
            </View>
            <View style={styles.searchBox}>
              <SearchBar
                placeholder="Search movies ..."
                onChangeText={(text: string) => setSearchQuery(text)}
                value={searchQuery}
              />
            </View>

            {/* Loading */}
            {moviesLoading && (
              <ActivityIndicator
                size={"large"}
                color={"#0000ff"}
                style={styles.activityIndicator}
              />
            )}

            {/* Error Handling */}
            {moviesError && (
              <Text style={styles.moviesError}>
                Error: {moviesError.message}
              </Text>
            )}

            {!moviesLoading &&
              !moviesError &&
              searchQuery.trim() &&
              movies?.length > 0 && (
                <Text style={styles.resultsStyle}>
                  Search Results for{" "}
                  <Text style={{ color: Colors.accent }}>{searchQuery}</Text>
                </Text>
              )}
          </>
        }
        ListEmptyComponent={
          !moviesLoading && !moviesError ? (
            <View style={styles.emptyListComponent}>
              <Text style={styles.emptyListText}>
                {searchQuery.trim() ? "No movies found" : "Search for a movie"}
              </Text>
            </View>
          ) : null
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  bgImage: {
    flex: 1,
    position: "absolute",
    width: "100%",
    zIndex: 0,
  },
  listWrapper: {
    paddingHorizontal: 20,
  },
  listWrapperHeader: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 80,
  },
  logo: {
    width: 48,
    height: 40,
  },
  searchBox: {
    marginVertical: 20,
  },
  activityIndicator: {
    marginVertical: 12,
  },
  moviesError: {
    paddingHorizontal: 20,
    marginVertical: 12,
    color: "#EF4444",
  },
  resultsStyle: {
    fontSize: 20,
    lineHeight: 28,
    color: "#ffffff",
    fontWeight: 700,
  },
  emptyListComponent: {
    marginTop: 40,
    paddingHorizontal: 20,
  },
  emptyListText: {
    textAlign: "center",
    color: "#6B7280",
  },
});
