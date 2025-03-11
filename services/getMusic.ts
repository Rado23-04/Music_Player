import { useEffect, useState } from "react";
import { PermissionsAndroid, Platform } from "react-native";
import RNFS from "react-native-fs";

interface AudioFile {
  name: string;
  path: string;
}

const useLocalMusic = () => {
  const [musicFiles, setMusicFiles] = useState<AudioFile[]>([]);

  const requestPermission = async () => {
    if (Platform.OS === "android") {
      const permission =
        Platform.Version >= 33
          ? PermissionsAndroid.PERMISSIONS.READ_MEDIA_AUDIO
          : PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE;

      const granted = await PermissionsAndroid.request(permission);
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
    return false; // iOS gère différemment
  };

  const getMusicFiles = async () => {
    const hasPermission = await requestPermission();
    console.log("Permission accordée :", hasPermission);

    if (!hasPermission) {
      console.warn("Permission refusée.");
      return;
    }

    // Vérifier le chemin d'accès
    const musicDir = `${RNFS.ExternalStorageDirectoryPath}/Music`;
    console.log("Chemin d'accès au répertoire :", musicDir);

    try {
      const files = await RNFS.readDir(musicDir);
      console.log("Fichiers trouvés :", files);

      const audioFiles = files
        .filter((file) => file.isFile() && file.name.endsWith(".mp3"))
        .map((file) => ({
          name: file.name,
          path: file.path,
        }));

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
//react-native-get-music-files