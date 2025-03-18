import AsyncStorage from '@react-native-async-storage/async-storage';
import { AudioFile, Playlist } from './types';

export const createPlaylist = async (playlistName: string, songs: AudioFile[]) => {
  try {
    const playlist: Playlist = { name: playlistName, songs };
    await AsyncStorage.setItem(playlistName, JSON.stringify(playlist));
  } catch (error) {
    console.error("Erreur lors de la création de la playlist :", error);
  }
};

export const addToPlaylist = async (playlistName: string, song: AudioFile) => {
  try {
    const playlistString = await AsyncStorage.getItem(playlistName);
    if (playlistString !== null) {
      const playlist: Playlist = JSON.parse(playlistString);
      playlist.songs.push(song);
      await AsyncStorage.setItem(playlistName, JSON.stringify(playlist));
    } else {
      console.warn(`La playlist "${playlistName}" n'existe pas.`);
    }
  } catch (error) {
    console.error("Erreur lors de l'ajout à la playlist :", error);
  }
};

export const removeFromPlaylist = async (playlistName: string, songPath: string) => {
  try {
    const playlistString = await AsyncStorage.getItem(playlistName);
    if (playlistString !== null) {
      const playlist: Playlist = JSON.parse(playlistString);
      playlist.songs = playlist.songs.filter((song) => song.path !== songPath);
      await AsyncStorage.setItem(playlistName, JSON.stringify(playlist));
    } else {
      console.warn(`La playlist "${playlistName}" n'existe pas.`);
    }
  } catch (error) {
    console.error("Erreur lors de la suppression de la playlist :", error);
  }
};

export const getPlaylists = async (): Promise<Playlist[]> => {
  try {
    const keys = await AsyncStorage.getAllKeys();
    const playlists = await AsyncStorage.multiGet(keys);
    return playlists
      .filter(([key, value]) => value !== null)
      .map(([key, value]) => JSON.parse(value as string));
  } catch (error) {
    console.error("Erreur lors de la récupération des playlists :", error);
    return [];
  }
};