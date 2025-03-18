import React from "react";
import { View, Text, FlatList, Image, StyleSheet } from "react-native";

interface Song {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: number;
  artwork?: string;
}

interface HomeScreenProps {
  songs: Song[];
}

const HomeScreen: React.FC<HomeScreenProps> = ({ songs }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mes chansons</Text>
      <FlatList
        data={songs}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.songItem}>
            {item.artwork && <Image source={{ uri: item.artwork }} style={styles.artwork} />}
            <View>
              <Text style={styles.songTitle}>{item.title}</Text>
              <Text style={styles.songArtist}>{item.artist}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
  songItem: { flexDirection: "row", alignItems: "center", marginBottom: 10 },
  artwork: { width: 50, height: 50, borderRadius: 8, marginRight: 10 },
  songTitle: { fontSize: 18, fontWeight: "bold" },
  songArtist: { fontSize: 16, color: "gray" },
});

export default HomeScreen;
