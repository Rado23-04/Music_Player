/**
 * @format
 */

import {AppRegistry} from 'react-native';
import TrackPlayer from "react-native-track-player";
import App from './App';
import {name as appName} from './app.json';

TrackPlayer.registerPlaybackService(() => require("./service.ts"));

AppRegistry.registerComponent(appName, () => App);
