import Constants from 'expo-constants';
import { Client, Databases, ID, Query } from 'react-native-appwrite';

const {
  EXPO_PUBLIC_APPWRITE_PROJECT_ID,
  EXPO_PUBLIC_APPWRITE_DATABASE_ID,
  EXPO_PUBLIC_APPWRITE_COLLECTION_ID,
  EXPO_PUBLIC_APPWRITE_ENDPOINT
} = Constants.expoConfig?.extra as {
  EXPO_PUBLIC_APPWRITE_PROJECT_ID: string;
  EXPO_PUBLIC_APPWRITE_DATABASE_ID: string;
  EXPO_PUBLIC_APPWRITE_COLLECTION_ID: string;
  EXPO_PUBLIC_APPWRITE_ENDPOINT: string;
};

const client = new Client()
  .setEndpoint(EXPO_PUBLIC_APPWRITE_ENDPOINT)
  .setProject(EXPO_PUBLIC_APPWRITE_PROJECT_ID);

const database = new Databases(client);

export const updateSearchCount = async (query: string, movie: Movie) => {
  try {
    const result = await database.listDocuments(EXPO_PUBLIC_APPWRITE_DATABASE_ID, EXPO_PUBLIC_APPWRITE_COLLECTION_ID, [
      Query.equal('searchTerm', query)
    ]);

    if (result.documents.length > 0) {
      const existingMovie = result.documents[0];

      await database.updateDocument(
        EXPO_PUBLIC_APPWRITE_DATABASE_ID,
        EXPO_PUBLIC_APPWRITE_COLLECTION_ID,
        existingMovie.$id,
        {
          count: existingMovie.count + 1
        }
      );
    } else {
      await database.createDocument(
        EXPO_PUBLIC_APPWRITE_DATABASE_ID,
        EXPO_PUBLIC_APPWRITE_COLLECTION_ID,
        ID.unique(),
        {
          searchTerm: query,
          movie_id: movie.id,
          count: 1,
          title: movie.title,
          poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        },
        ['*'] // Optional: set read/write permissions on new doc
      );
    }
  } catch (error) {
    console.log('Appwrite error in updateSearchCount:', error);
    throw error;
  }
};

export const getTrendingMovies = async (): Promise<TrendingMovie[] | undefined> => {
  try {
    const result = await database.listDocuments(EXPO_PUBLIC_APPWRITE_DATABASE_ID, EXPO_PUBLIC_APPWRITE_COLLECTION_ID, [
      Query.limit(5),
      Query.orderDesc('count')
    ]);

    return result.documents as unknown as TrendingMovie[];
  } catch (error) {
    console.log('Appwrite error in getTrendingMovies:', error);
    return undefined;
  }
};
