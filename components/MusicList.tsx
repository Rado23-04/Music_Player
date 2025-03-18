import React, { useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import useLocalMusic from "../services/getMusic";
import PlayMusic from "./PlayMusic";

const MusicList = () => {
  const musicFiles = useLocalMusic();
  const [currentMusicIndex, setCurrentMusicIndex] = useState<number | null>(null);
  const [currentMusicInfo, setCurrentMusicInfo] = useState<{ name: string; artist: string } | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]); // Liste des favoris

  const playMusic = (index: number) => {
    setCurrentMusicIndex(index);
    setCurrentMusicInfo({
      name: musicFiles[index].name,
      artist: "Artiste inconnu", // Remplacez par l'artiste réel si disponible
    });
  };

  const playNext = () => {
    if (currentMusicIndex !== null && currentMusicIndex < musicFiles.length - 1) {
      playMusic(currentMusicIndex + 1);
    }
  };

  const playPrevious = () => {
    if (currentMusicIndex !== null && currentMusicIndex > 0) {
      playMusic(currentMusicIndex - 1);
    }
  };

  const toggleFavorite = () => {
    if (currentMusicIndex !== null) {
      const currentMusicPath = musicFiles[currentMusicIndex].path;
      if (favorites.includes(currentMusicPath)) {
        // Supprimer des favoris
        setFavorites(favorites.filter((path) => path !== currentMusicPath));
      } else {
        // Ajouter aux favoris
        setFavorites([...favorites, currentMusicPath]);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Fichiers musicaux :</Text>
      <FlatList
        data={musicFiles}
        keyExtractor={(item) => item.path}
        renderItem={({ item, index }) => (
          <TouchableOpacity style={styles.itemContainer} onPress={() => playMusic(index)}>
            <View style={styles.textContainer}>
              <Text style={styles.songName}>{item.name}</Text>
              <Text style={styles.artistName}>{"Artiste inconnu"}</Text>
              {favorites.includes(item.path) && <Text style={styles.favoriteIcon}>❤️</Text>}
            </View>
          </TouchableOpacity>
        )}
      />

      {currentMusicIndex !== null && currentMusicInfo && (
        <PlayMusic
          currentMusicPath={musicFiles[currentMusicIndex].path}
          currentMusicInfo={currentMusicInfo}
          onNext={playNext}
          onPrevious={playPrevious}
          onToggleFavorite={toggleFavorite} // Passage de la fonction
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#1a1a1a',
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: '#bb86fc',
  },
  itemContainer: {
    padding: 15,
    marginBottom: 10,
    backgroundColor: '#2c2c2c',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  textContainer: {
    flex: 1,
  },
  songName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
  artistName: {
    fontSize: 14,
    color: '#bb86fc',
  },
  favoriteIcon: {
    fontSize: 16,
    color: '#ff4081',
  },
});

export default MusicList;