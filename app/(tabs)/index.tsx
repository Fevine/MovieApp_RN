import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Colors } from "@/constants/colors";
import { images } from "@/constants/images";
import { icons } from "@/constants/icons";
import SearchBar from "@/components/SearchBar";
import { useRouter } from "expo-router";

export default function index() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Image source={images.bg} style={styles.bgImage} />
      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 10 }}
      >
        <Image source={icons.logo} style={styles.logo} />
        <View style={{ marginTop: 20 }}>
          <SearchBar 
          onPress={() => router.push("/search")}
          placeholder="Search for a movie"
          />
        </View>
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
});
