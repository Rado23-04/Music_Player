import { useEffect, useState } from "react";
import { PermissionsAndroid, Platform } from "react-native";
import RNFS from "react-native-fs";

interface AudioFile {
  name: string;
  path: string;
}

const useLocalMusic = () => {
  const [musicFiles, setMusicFiles] = useState<AudioFile[]>([]);

  // Demander la permission d'accès aux fichiers audio
  const requestPermission = async () => {
    if (Platform.OS === "android") {
      const permission =
        Platform.Version >= 33
          ? PermissionsAndroid.PERMISSIONS.READ_MEDIA_AUDIO
          : PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE;

      try {
        const granted = await PermissionsAndroid.request(permission);
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (error) {
        console.error("Erreur lors de la demande de permission:", error);
        return false;
      }
    }
    return true; // iOS gère différemment, généralement pas besoin de permission explicite
  };

  // Récupérer les fichiers audio locaux
  const getMusicFiles = async () => {
    const hasPermission = await requestPermission();
    console.log("Permission accordée :", hasPermission);

    if (!hasPermission) {
      console.warn("Permission refusée.");
      return;
    }

    // Vérifier le chemin d'accès au répertoire musique
    const musicDir = `${RNFS.ExternalStorageDirectoryPath}/Music`;
    console.log("Chemin d'accès au répertoire :", musicDir);

    try {
      const files = await RNFS.readDir(musicDir);
      console.log("Fichiers trouvés :", files);

      // Filtrer les fichiers audio valides
      const audioFiles = files
        .filter((file) => file.isFile() && /\.(mp3|wav|aac|flac)$/i.test(file.name))
        .map((file) => ({
          name: file.name,
          path: file.path,
        }));

      // Mettre à jour le state avec la liste des fichiers audio
      setMusicFiles(audioFiles);
    } catch (error) {
      console.error("Erreur lors de la récupération des fichiers musicaux :", error);
    }
  };

  useEffect(() => {
    getMusicFiles();
  }, []);

  return musicFiles;
};

export default useLocalMusic;
