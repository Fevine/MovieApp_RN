import { Image, StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import { Colors } from "@/constants/colors";
import { icons } from "@/constants/icons";

interface Props {
  placeholder: string;
  onPress?: () => void;
  onChangeText: (text: string) => void;
  value: string;
}

export default function SearchBar({
  placeholder,
  onPress,
  value,
  onChangeText,
}: Props) {
  return (
    <View style={styles.container}>
      <Image
        source={icons.search}
        style={styles.icon}
        resizeMode="contain"
        tintColor={"#ab8bff"}
      />
      <TextInput
        onPress={onPress}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor={"#a8b5db"}
        style={styles.searchInput}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.dark[200],
    borderRadius: 9999,
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  icon: {
    width: 20,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    color: "#ffffff",
  },
});
