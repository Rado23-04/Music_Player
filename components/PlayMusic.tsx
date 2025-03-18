import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import TrackPlayer, { Capability, State, Event } from "react-native-track-player";

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
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const setupPlayer = async () => {
      await TrackPlayer.setupPlayer();
      await TrackPlayer.updateOptions({
        capabilities: [
          Capability.Play,
          Capability.Pause,
          Capability.SkipToNext,
          Capability.SkipToPrevious,
        ],
        compactCapabilities: [
          Capability.Play,
          Capability.Pause,
        ],
        notificationCapabilities: [
          Capability.Play,
          Capability.Pause,
          Capability.SkipToNext,
          Capability.SkipToPrevious,
        ],
      });
      await TrackPlayer.add({
        id: currentMusicPath,
        url: currentMusicPath,
        title: currentMusicInfo.name,
        artist: currentMusicInfo.artist,
      });
      await TrackPlayer.play();
      setIsPlaying(true);
    };

    setupPlayer();

    return () => {
      TrackPlayer.reset();
    };
  }, [currentMusicPath]);

  const togglePlayPause = async () => {
    const state = await TrackPlayer.getState();
    if (state === State.Playing) {
      await TrackPlayer.pause();
      setIsPlaying(false);
    } else {
      await TrackPlayer.play();
      setIsPlaying(true);
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
    color: '#fff',
  },
  currentArtistName: {
    fontSize: 16,
    color: '#bbb',
  },
  controlsButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  controlText: {
    fontSize: 32,
    color: '#fff',
  },
});

export default PlayMusic;
