import React from "react";
import { View, Text, FlatList, Image, StyleSheet } from "react-native";

interface Album {
  id: string;
  title: string;
  artist: string;
  cover?: string;
}

interface AlbumsScreenProps {
  albums: Album[];
}

const AlbumsScreen: React.FC<AlbumsScreenProps> = ({ albums }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Albums</Text>
      <FlatList
        data={albums}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.albumItem}>
            {item.cover && <Image source={{ uri: item.cover }} style={styles.albumCover} />}
            <View>
              <Text style={styles.albumTitle}>{item.title}</Text>
              <Text style={styles.albumArtist}>{item.artist}</Text>
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
  albumItem: { flexDirection: "row", alignItems: "center", marginBottom: 10 },
  albumCover: { width: 50, height: 50, borderRadius: 8, marginRight: 10 },
  albumTitle: { fontSize: 18, fontWeight: "bold" },
  albumArtist: { fontSize: 16, color: "gray" },
});

export default AlbumsScreen;
