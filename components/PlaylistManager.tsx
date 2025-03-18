import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

const PlaylistManager = ({ musicFiles, onAddToPlaylist }) => {
  const [playlist, setPlaylist] = useState<string[]>([]);

  const addToPlaylist = (path: string) => {
    setPlaylist([...playlist, path]);
    onAddToPlaylist(path);
  };

  return (
    <View>
      <Text style={styles.playlistTitle}>Gérer les Playlists</Text>
      <FlatList
        data={musicFiles}
        keyExtractor={(item) => item.path}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => addToPlaylist(item.path)}>
            <Text style={styles.songName}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  playlistTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#bb86fc',
    marginVertical: 10,
  },
  songName: {
    fontSize: 16,
    color: '#ffffff',
    padding: 10,
    backgroundColor: '#2c2c2c',
    borderRadius: 5,
    marginBottom: 5,
  },
});

export default PlaylistManager;