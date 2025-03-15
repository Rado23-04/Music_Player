import React, { useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity, Button } from "react-native";
import TrackPlayer, { State, usePlaybackState } from "react-native-track-player";
import useLocalMusic from "../services/getMusic";
import { setupPlayer } from "../services/trackPlayerSetup";

const MusicList = () => {
  const musicFiles = useLocalMusic();
  const playbackState = usePlaybackState() as { state: State | undefined };


  useEffect(() => {
    setupPlayer();
  }, []);

  const playMusic = async (filePath: string, title: string) => {
    await TrackPlayer.reset();
    await TrackPlayer.add({
      id: filePath,
      url: filePath,
      title: title,
      artist: "Inconnu",
    });
    await TrackPlayer.play();
  };

  return (
    <View>
      <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>
        Fichiers musicaux :
      </Text>
      <FlatList
        data={musicFiles}
        keyExtractor={(item) => item.path}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => playMusic(item.path, item.name)}>
            <Text style={{ marginVertical: 5, color: "blue" }}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />

      {/* Contrôles */}
      <View style={{ flexDirection: "row", marginTop: 20, justifyContent: "space-around" }}>
        <Button title="Précédent" onPress={() => TrackPlayer.skipToPrevious()} />
        <Button
          title={playbackState.state === State.Playing ? "Pause" : "Lecture"}
          onPress={() =>
          playbackState.state === State.Playing ? TrackPlayer.pause() : TrackPlayer.play()
  }
/>

        <Button title="Suivant" onPress={() => TrackPlayer.skipToNext()} />
      </View>
    </View>
  );
};

export default MusicList;
