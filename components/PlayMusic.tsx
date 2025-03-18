import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Sound from "react-native-sound";

interface PlayMusicProps {
  currentMusicPath: string;
  currentMusicInfo: { name: string; artist: string };
  onNext: () => void;
  onPrevious: () => void;
  onToggleFavorite: () => void;
}

const PlayMusic: React.FC<PlayMusicProps> = ({
  currentMusicPath,
  currentMusicInfo,
  onNext,
  onPrevious,
  onToggleFavorite,
}) => {
  const [sound, setSound] = useState<Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  useEffect(() => {
    if (currentMusicPath) {
      if (sound) {
        sound.stop(() => sound.release());
      }

      const newSound = new Sound(currentMusicPath, "", (error) => {
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
      setIsPlaying(true);

      return () => {
        if (newSound) {
          newSound.stop(() => newSound.release());
        }
      };
    }
  }, [currentMusicPath]);

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

  return (
    <View style={styles.controlsContainer}>
      <View style={styles.musicInfoContainer}>
        <Text style={styles.currentSongName}>{currentMusicInfo.name}</Text>
        <Text style={styles.currentArtistName}>{currentMusicInfo.artist}</Text>
      </View>

      <View style={styles.controlsButtonsContainer}>
        <TouchableOpacity onPress={onPrevious}>
          <Text style={styles.controlText}>⏮</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={togglePlayPause}>
          <Text style={styles.controlText}>{isPlaying ? "⏸" : "▶️"}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={onNext}>
          <Text style={styles.controlText}>⏭</Text>
        </TouchableOpacity>

        {/* Bouton pour ajouter/supprimer des favoris */}
        <TouchableOpacity onPress={onToggleFavorite}>
          <Text style={styles.controlText}>❤️</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  controlsContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#2c2c2c',
    padding: 20,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },

  musicInfoContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },

  currentSongName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
  },

  currentArtistName: {
    fontSize: 14,
    color: '#bb86fc',
  },

  controlsButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },

  controlText: {
    fontSize: 24,
    color: '#bb86fc',
  },
});

export default PlayMusic;
