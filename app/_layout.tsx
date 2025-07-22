import { Stack } from "expo-router";
import { StatusBar } from "react-native";

import Constants from "expo-constants";

const {
  EXPO_PUBLIC_MOVIE_API_KEY,
  EXPO_PUBLIC_APPWRITE_ENDPOINT,
  EXPO_PUBLIC_APPWRITE_PROJECT_ID,
  EXPO_PUBLIC_APPWRITE_DATABASE_ID,
  EXPO_PUBLIC_APPWRITE_COLLECTION_ID,
} = Constants.expoConfig?.extra ?? {};

if (
  !EXPO_PUBLIC_MOVIE_API_KEY ||
  !EXPO_PUBLIC_APPWRITE_ENDPOINT ||
  !EXPO_PUBLIC_APPWRITE_PROJECT_ID ||
  !EXPO_PUBLIC_APPWRITE_DATABASE_ID ||
  !EXPO_PUBLIC_APPWRITE_COLLECTION_ID
) {
  throw new Error("🚨 Missing required environment variables!");
}

export default function RootLayout() {
  return (
    <>
      <StatusBar hidden={true} />

      <Stack screenOptions={{}}>
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="movie/[id]"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen />
      </Stack>
    </>
  );
}
