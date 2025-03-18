import MusicMetadata from 'react-native-music-metadata';

export const getMusicMetadata = async (path: string) => {
  try {
    const metadata = await MusicMetadata.fetch(path);
    return {
      title: metadata.title || 'Titre inconnu',
      artist: metadata.artist || 'Artiste inconnu',
      album: metadata.album || 'Album inconnu',
      artwork: metadata.artwork || null,
    };
  } catch (error) {
    console.error('Erreur lors de l\'extraction des métadonnées :', error);
    return null;
  }
};