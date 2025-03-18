import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, TextInput } from 'react-native'; // Ajout de TextInput ici
import usePlaylistManager from './PlaylistManager';

const PlaylistScreen = () => {
  const { playlists, createPlaylist, addToPlaylist, removeFromPlaylist } = usePlaylistManager();
  const [newPlaylistName, setNewPlaylistName] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gérer les playlists</Text>
      {/* Utilisation de TextInput */}
      <TextInput
        style={styles.input}
        placeholder="Nom de la playlist"
        placeholderTextColor="#888" // Couleur du texte de l'espace réservé
        value={newPlaylistName}
        onChangeText={setNewPlaylistName}
      />
      <TouchableOpacity style={styles.button} onPress={() => createPlaylist(newPlaylistName)}>
        <Text style={styles.buttonText}>Créer une playlist</Text>
      </TouchableOpacity>

      <FlatList
        data={Object.keys(playlists)}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <View style={styles.playlistContainer}>
            <Text style={styles.playlistName}>{item}</Text>
            <FlatList
              data={playlists[item]}
              keyExtractor={(track) => track}
              renderItem={({ item: track }) => (
                <View style={styles.trackContainer}>
                  <Text style={styles.trackName}>{track}</Text>
                  <TouchableOpacity onPress={() => removeFromPlaylist(item, track)}>
                    <Text style={styles.removeText}>🗑️</Text>
                  </TouchableOpacity>
                </View>
              )}
            />
          </View>
        )}
      />
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
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#bb86fc',
  },
  input: {
    backgroundColor: '#2c2c2c',
    color: '#ffffff',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#bb86fc',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: '600',
  },
  playlistContainer: {
    marginBottom: 20,
  },
  playlistName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 10,
  },
  trackContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#2c2c2c',
    borderRadius: 8,
    marginBottom: 5,
  },
  trackName: {
    color: '#ffffff',
  },
  removeText: {
    color: '#ff4081',
  },
});

export default PlaylistScreen;