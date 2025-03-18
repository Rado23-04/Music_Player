export interface AudioFile {
  name: string;
  path: string;
}

export interface Playlist {
  name: string;
  songs: AudioFile[];
}