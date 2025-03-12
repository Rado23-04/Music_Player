import React, { useState } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import Sound from "react-native-sound";
import useLocalMusic from "../services/getMusic";

const MusicList = () => {
  const musicFiles = useLocalMusic();
  const [sound, setSound] = useState<Sound | null>(null);

  const playMusic = (filePath: string) => {
    if (sound) {
      sound.stop(() => sound.release()); // Arrêter et libérer l'ancienne musique
    }

    const newSound = new Sound(filePath, "", (error) => {
      if (error) {
        console.error("Erreur lors du chargement du son :", error);
        return;
      }
      newSound.play((success) => {
        if (!success) console.error("Erreur lors de la lecture du son");
        newSound.release();
      });
    });

    setSound(newSound);
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
          <TouchableOpacity onPress={() => playMusic(item.path)}>
            <Text style={{ marginVertical: 5, color: "blue" }}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default MusicList;
