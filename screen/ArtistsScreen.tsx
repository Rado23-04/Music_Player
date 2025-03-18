import React from "react";
import { View, Text, FlatList, Image, StyleSheet } from "react-native";

interface Artist {
  id: string;
  name: string;
  avatar?: string;
}

interface ArtistsScreenProps {
  artists: Artist[];
}

const ArtistsScreen: React.FC<ArtistsScreenProps> = ({ artists }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Artistes</Text>
      <FlatList
        data={artists}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.artistItem}>
            {item.avatar && <Image source={{ uri: item.avatar }} style={styles.avatar} />}
            <Text style={styles.artistName}>{item.name}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
  artistItem: { flexDirection: "row", alignItems: "center", marginBottom: 10 },
  avatar: { width: 50, height: 50, borderRadius: 25, marginRight: 10 },
  artistName: { fontSize: 18, fontWeight: "bold" },
});

export default ArtistsScreen;
