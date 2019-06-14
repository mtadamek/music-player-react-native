import AsyncStorage from "@react-native-community/async-storage";
import {
  GET_PLAYLISTS_REQUEST,
  GET_PLAYLISTS_SUCCESS,
  GET_PLAYLISTS_ERROR,
  ADD_TRACK_TO_PLAYLIST_REQUEST,
  ADD_TRACK_TO_PLAYLIST_SUCCESS,
  ADD_TRACK_TO_PLAYLIST_ERROR,
  REMOVE_TRACK_FROM_PLAYLIST_REQUEST,
  REMOVE_TRACK_FROM_PLAYLIST_SUCCESS,
  REMOVE_TRACK_FROM_PLAYLIST_ERROR,
  PLAY_PLAYLIST_REQUEST,
  PLAY_PLAYLIST_SUCCESS,
  PLAY_PLAYLIST_ERROR,
  SET_PLAYLIST,
  SERVER_URL
} from "../constants";
import axios from "../modules/axios";
import * as TPlayer from "../modules/player";

export const getPlaylists = () => async dispatch => {
  try {
    dispatch(getPlaylistsRequest());
    const data = await AsyncStorage.getItem("@playlists");
    const playlists = JSON.parse(data);
    dispatch(getPlaylistsSuccess(playlists || []));
  } catch (error) {
    dispatch(getPlaylistsError(error));
  }
};

const getPlaylistsRequest = () => ({
  type: GET_PLAYLISTS_REQUEST,
  payload: null
});

const getPlaylistsSuccess = data => ({
  type: GET_PLAYLISTS_SUCCESS,
  payload: data
});

const getPlaylistsError = error => ({
  type: GET_PLAYLISTS_ERROR,
  payload: error
});

// onPlayPlaylist = name => {
//   const { playlists } = this.props;
//   const playlist = playlists.find(p => p.name === name);
//   if (playlist) TrackPlayer.stop();
// };

export const setPlaylist = playlist => ({
  type: SET_PLAYLIST,
  payload: playlist
});

export const addTrackToPlaylist = ({ name, track }) => async dispatch => {
  try {
    dispatch(addTrackToPlaylistRequest());

    const data = await AsyncStorage.getItem("@playlists");
    const playlists = JSON.parse(data);
    const playlist = playlists.find(p => p.name === name);
    if (!playlist.tracks.find(t => t.id === track.id)) {
      playlist.tracks.push(track);
      await AsyncStorage.setItem("@playlists", JSON.stringify(playlists));
    }
    dispatch(addTrackToPlaylistSuccess(playlists));
  } catch (error) {
    console.log(error);
    dispatch(addTrackToPlaylistError(error));
  }
};

const addTrackToPlaylistRequest = () => ({
  type: ADD_TRACK_TO_PLAYLIST_REQUEST,
  payload: null
});

const addTrackToPlaylistSuccess = data => ({
  type: ADD_TRACK_TO_PLAYLIST_SUCCESS,
  payload: data
});

const addTrackToPlaylistError = error => ({
  type: ADD_TRACK_TO_PLAYLIST_ERROR,
  payload: error
});

export const removeTrackFromPlaylist = ({ name, id }) => async dispatch => {
  try {
    dispatch(removeTrackFromPlaylistRequest());

    const data = await AsyncStorage.getItem("@playlists");
    const playlists = JSON.parse(data);
    const playlist = playlists.find(p => p.name === name);
    if (playlist.tracks.find(t => t.id === id)) {
      playlist.tracks = playlist.tracks.filter(t => t.id !== id);
      await AsyncStorage.setItem("@playlists", JSON.stringify(playlists));
    }
    dispatch(removeTrackFromPlaylistSuccess(playlists));
  } catch (error) {
    console.log(error);
    dispatch(removeTrackFromPlaylistError(error));
  }
};

const removeTrackFromPlaylistRequest = () => ({
  type: REMOVE_TRACK_FROM_PLAYLIST_REQUEST,
  payload: null
});

const removeTrackFromPlaylistSuccess = data => ({
  type: REMOVE_TRACK_FROM_PLAYLIST_SUCCESS,
  payload: data
});

const removeTrackFromPlaylistError = error => ({
  type: REMOVE_TRACK_FROM_PLAYLIST_ERROR,
  payload: error
});
