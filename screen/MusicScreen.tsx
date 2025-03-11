import React from "react";
import { View, Text, FlatList } from "react-native";
import useLocalMusic from "../services/getMusic"

const MusicList = () => {
  const musicFiles = useLocalMusic();

  return (
    <View>
      <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>
        Fichiers musicaux :
      </Text>
      <FlatList
        data={musicFiles}
        keyExtractor={(item) => item.path}
        renderItem={({ item }) => (
          <Text style={{ marginVertical: 5 }}>{item.name}</Text>
        )}
      />
    </View>
  );
};

export default MusicList;
