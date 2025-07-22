import 'dotenv/config';

export default {
  expo: {
    owner: "albinoni",
    name: "MovieFlix",
    slug: "MovieFlix",
    version: "1.0.0",
    orientation: "portrait",
    scheme: "rnprotfolio",
    userInterfaceStyle: "automatic",
    icon: "./assets/images/logo.png",
    newArchEnabled: true,
    ios: {
      supportsTablet: true
    },
    android: {
      package: "com.albinoni.MovieFlix", // ✅ THIS is what the error was about
      edgeToEdgeEnabled: true,
      adaptiveIcon: {
        foregroundImage: "./assets/images/logo.png",
        backgroundColor: "#ffffff"
      }
    },
    web: {
      bundler: "metro",
      output: "static",
      favicon: "./assets/images/logo.png"
    },
    plugins: [
      "expo-router",
      [
        "expo-splash-screen",
        {
          image: "./assets/images/logo.png",
          imageWidth: 200,
          resizeMode: "contain",
          backgroundColor: "#ffffff"
        }
      ]
    ],
    experiments: {
      typedRoutes: true
    },
    extra: {
      "eas": {
        "projectId": "681196be-cff8-486d-ae83-6512292348d6"
      },
      EXPO_PUBLIC_MOVIE_API_KEY: process.env.EXPO_PUBLIC_MOVIE_API_KEY,
      EXPO_PUBLIC_APPWRITE_ENDPOINT: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
      EXPO_PUBLIC_APPWRITE_PROJECT_ID: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
      EXPO_PUBLIC_APPWRITE_DATABASE_ID: process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID,
      EXPO_PUBLIC_APPWRITE_COLLECTION_ID: process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID,
    }
  }
};
