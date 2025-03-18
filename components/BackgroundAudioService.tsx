import TrackPlayer, { Capability } from 'react-native-track-player';

const setupPlayer = async () => {
  await TrackPlayer.setupPlayer();
  await TrackPlayer.updateOptions({
    capabilities: [
      Capability.Play,
      Capability.Pause,
      Capability.SkipToNext,
      Capability.SkipToPrevious,
    ],
    notificationCapabilities: [
      Capability.Play,
      Capability.Pause,
      Capability.SkipToNext,
      Capability.SkipToPrevious,
    ],
    compactCapabilities: [Capability.Play, Capability.Pause],
  });
};

const addTracks = async (tracks: any[]) => {
  await TrackPlayer.add(tracks);
};

const playTrack = async (index: number) => {
  await TrackPlayer.skip(index);
  await TrackPlayer.play();
};

const pauseTrack = async () => {
  await TrackPlayer.pause();
};

const skipToNext = async () => {
  await TrackPlayer.skipToNext();
};

const skipToPrevious = async () => {
  await TrackPlayer.skipToPrevious();
};

export { setupPlayer, addTracks, playTrack, pauseTrack, skipToNext, skipToPrevious };