import React, { useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from "react-native";
import Sound from "react-native-sound";
import useLocalMusic from "../services/getMusic";

const MusicList = () => {
  const musicFiles = useLocalMusic();
  const [sound, setSound] = useState<Sound | null>(null);
  const [currentMusicIndex, setCurrentMusicIndex] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const playMusic = (filePath: string, index: number) => {
    if (sound) {
      sound.stop(() => sound.release());
    }

    const newSound = new Sound(filePath, "", (error) => {
      if (error) {
        console.error("Erreur lors du chargement du son :", error);
        return;
      }
      newSound.play((success) => {
        if (!success) console.error("Erreur lors de la lecture du son");
        newSound.release();
        setIsPlaying(false);
      });
    });

    setSound(newSound);
    setCurrentMusicIndex(index);
    setIsPlaying(true);
  };

  const togglePlayPause = () => {
    if (sound) {
      if (isPlaying) {
        sound.pause();
      } else {
        sound.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const playNext = () => {
    if (currentMusicIndex !== null && currentMusicIndex < musicFiles.length - 1) {
      playMusic(musicFiles[currentMusicIndex + 1].path, currentMusicIndex + 1);
    }
  };

  const playPrevious = () => {
    if (currentMusicIndex !== null && currentMusicIndex > 0) {
      playMusic(musicFiles[currentMusicIndex - 1].path, currentMusicIndex - 1);
    }
  };

  const toggleFavorite = () => {
    // Implémentez la logique pour ajouter/supprimer la musique des favoris
    console.log("Toggle favorite");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Fichiers musicaux :</Text>
      <FlatList
        data={musicFiles}
        keyExtractor={(item) => item.path}
        renderItem={({ item, index }) => (
          <TouchableOpacity style={styles.itemContainer} onPress={() => playMusic(item.path, index)}>
            <View style={styles.textContainer}>
              <Text style={styles.songName}>{item.name}</Text>
              <Text style={styles.artistName}>{"Artiste inconnu"}</Text>
            </View>
          </TouchableOpacity>
        )}
      />

      {currentMusicIndex !== null && (
        <View style={styles.controlsContainer}>
          <TouchableOpacity onPress={playPrevious}>
            <Text style={styles.controlText}>⏮</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={togglePlayPause}>
            <Text style={styles.controlText}>{isPlaying ? "⏸" : "▶️"}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={playNext}>
            <Text style={styles.controlText}>⏭</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleFavorite}>
            <Text style={styles.controlText}>❤️</Text>
          </TouchableOpacity>
        </View>
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
  controlsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#2c2c2c',
    borderRadius: 8,
    marginTop: 20,
  },
  controlText: {
    fontSize: 24,
    color: '#bb86fc',
  },
});

export default MusicList;