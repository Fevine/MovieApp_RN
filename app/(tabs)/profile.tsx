import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Colors } from "@/constants/colors";
import { icons } from "@/constants/icons";

export default function Profile() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={icons.person}
          tintColor={"#ffffff"}
          style={styles.personIcon}
        />
        <Text style={styles.profileText}>Profile</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary,
    flex: 1,
    paddingHorizontal: 40,
  },
  header: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    flexDirection: "column",
    gap: 20,
  },
  personIcon: {
    width: 40,
    height: 40,
  },
  profileText: {
    color: "#6B7280",
    fontSize: 16,
    lineHeight: 24,
  },
});
