import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, TextInput, Modal } from "react-native";
import useLocalMusic from "../services/getMusic";
import PlayMusic from "./PlayMusic";
import { getPlaylists, createPlaylist, addToPlaylist, removeFromPlaylist } from "../services/playlistService";

// Ajouter un type pour gérer les chansons dans la playlist
interface Song {
  name: string;
  path: string;
}

interface Playlist {
  name: string;
  songs: Song[];
}

const MusicList = () => {
  const musicFiles = useLocalMusic();
  const [currentMusicIndex, setCurrentMusicIndex] = useState<number>(0);
  const [currentMusicInfo, setCurrentMusicInfo] = useState<{ name: string; artist: string } | null>(null);
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [newPlaylistName, setNewPlaylistName] = useState('');
  const [selectedPlaylist, setSelectedPlaylist] = useState<Playlist | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]); // Ajout de l'état pour les favoris

  useEffect(() => {
    const loadPlaylists = async () => {
      const loadedPlaylists = await getPlaylists();
      setPlaylists(loadedPlaylists);
    };
    loadPlaylists();
  }, []);

  const playMusic = (index: number) => {
    setCurrentMusicIndex(index);
    setCurrentMusicInfo({
      name: musicFiles[index]?.name || "Titre inconnu",
      artist: "Artiste inconnu",
    });
  };

  const handleCreatePlaylist = async () => {
    if (newPlaylistName.trim()) {
      await createPlaylist(newPlaylistName, []);
      setNewPlaylistName('');
      setPlaylists(await getPlaylists());
    }
  };

  const openPlaylistModal = (playlist: Playlist) => {
    setSelectedPlaylist(playlist);
  };

  const closePlaylistModal = () => {
    setSelectedPlaylist(null);
  };

  const addSongToPlaylist = async (playlistName: string, song: Song) => {
    await addToPlaylist(playlistName, song);
    const loadedPlaylists = await getPlaylists();
    setPlaylists(loadedPlaylists);
  };

  const removeSongFromPlaylist = async (playlistName: string, songPath: string) => {
    await removeFromPlaylist(playlistName, songPath);
    const loadedPlaylists = await getPlaylists();
    setPlaylists(loadedPlaylists);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Playlists :</Text>
      <TextInput
        style={styles.input}
        placeholder="Nom de la playlist"
        value={newPlaylistName}
        onChangeText={setNewPlaylistName}
      />
      <TouchableOpacity onPress={handleCreatePlaylist}>
        <Text style={styles.button}>Créer une playlist</Text>
      </TouchableOpacity>
      <FlatList
        data={playlists}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => openPlaylistModal(item)}>
            <Text style={styles.playlistName}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
      {selectedPlaylist && (
        <Modal visible={true} onRequestClose={closePlaylistModal}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>{selectedPlaylist.name}</Text>
            <FlatList
              data={selectedPlaylist.songs}
              keyExtractor={(song) => song.path}
              renderItem={({ item }) => (
                <View style={styles.songItem}>
                  <Text>{item.name}</Text>
                  <TouchableOpacity onPress={() => removeSongFromPlaylist(selectedPlaylist.name, item.path)}>
                    <Text style={styles.removeButton}>Supprimer</Text>
                  </TouchableOpacity>
                </View>
              )}
            />
            <TouchableOpacity onPress={closePlaylistModal}>
              <Text style={styles.closeButton}>Fermer</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      )}
      {currentMusicInfo && (
        <PlayMusic
          currentMusicPath={musicFiles[currentMusicIndex].path}
          currentMusicInfo={currentMusicInfo}
          onNext={() => setCurrentMusicIndex((prev) => (prev + 1) % musicFiles.length)}
          onPrevious={() => setCurrentMusicIndex((prev) => (prev - 1 + musicFiles.length) % musicFiles.length)}
          onToggleFavorite={() => {
            const path = musicFiles[currentMusicIndex].path;
            setFavorites((prevFavorites) =>
              prevFavorites.includes(path) ? prevFavorites.filter((p) => p !== path) : [...prevFavorites, path]
            );
          }}
        />
      )}
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
    fontWeight: "bold",
    marginBottom: 20,
    color: '#bb86fc',
  },
  input: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#bb86fc',
    padding: 10,
    borderRadius: 5,
    textAlign: 'center',
    color: '#fff',
  },
  playlistName: {
    fontSize: 18,
    color: '#fff',
    marginVertical: 10,
  },
  modalContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: '#2c2c2c',
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#bb86fc',
    marginBottom: 20,
  },
  songItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  removeButton: {
    color: 'red',
  },
  closeButton: {
    color: '#bb86fc',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default MusicList;
