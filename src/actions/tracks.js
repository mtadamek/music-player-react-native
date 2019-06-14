import AsyncStorage from "@react-native-community/async-storage";
import {
  GET_TRACKS_REQUEST,
  GET_TRACKS_SUCCESS,
  GET_TRACKS_ERROR,
  PLAY_TRACK_REQUEST,
  PLAY_TRACK_SUCCESS,
  PLAY_TRACK_ERROR,
  ADD_TRACK_REQUEST,
  ADD_TRACK_SUCCESS,
  ADD_TRACK_ERROR,
  SERVER_URL,
  TRACK_REGX
} from "../constants";
import axios from "../modules/axios";
import * as TPlayer from "../modules/player";

const getTrack = async id => {
  const reqUrl = `${SERVER_URL}${id}`;
  const date = Date.now();
  try {
    let tracks = JSON.parse(await AsyncStorage.getItem("@tracks"));
    console.log("TRACKS:", tracks);
    let track = tracks.find(t => t.id === id);
    if (!track || date - track.date > 20000000) {
      const data = await axios()
        .get(reqUrl)
        .then(result => result.data);

      const { id, title, streams = [], status } = data;

      if (!status) throw new Error("Nie udało się pobrać streamu");

      const stream = streams.find(
        e => e.format === "audio only" && e.extension === "m4a"
      );

      track = { id, title, url: stream.url, date };
      tracks = tracks.filter(t => t.id !== id);
      tracks.push(track);
      await AsyncStorage.setItem("@tracks", JSON.stringify(tracks));
    }
    return track;
  } catch (error) {
    return null;
  }
};

export const playTrack = id => async dispatch => {
  dispatch(playTrackRequest());
  try {
    const track = await getTrack(id);
    await TPlayer.playSingleTrack(track);
    dispatch(playTrackSuccess(track));
  } catch (error) {
    dispatch(playTrackError(error));
  }
};

const playTrackRequest = () => ({
  type: PLAY_TRACK_REQUEST,
  payload: null
});

const playTrackSuccess = response => ({
  type: PLAY_TRACK_SUCCESS,
  payload: response
});

const playTrackError = error => ({
  type: PLAY_TRACK_ERROR,
  payload: error
});

export const addTrackToQueue = (id, before) => async dispatch => {
  dispatch(addTrackRequest());
  try {
    const track = await getTrack(id);
    await TPlayer.addToQueue(track, before);
    dispatch(addTrackSuccess(track));
  } catch (error) {
    dispatch(addTrackError(error));
  }
};

const addTrackRequest = () => ({
  type: ADD_TRACK_REQUEST,
  payload: null
});

const addTrackSuccess = response => ({
  type: ADD_TRACK_SUCCESS,
  payload: response
});

const addTrackError = error => ({
  type: ADD_TRACK_ERROR,
  payload: error
});

export const getTracksByQuery = query => async dispatch => {
  try {
    dispatch(getTracksByQueryRequest());
    const data = await axios()
      .get(`https://www.youtube.com/results?search_query=${query}`)
      .then(result => result.data);

    const re = new RegExp(TRACK_REGX, "g");
    const tracks = new Array();
    while ((match = re.exec(data)) !== null) {
      if (!match[1].includes("list"))
        tracks.push({ id: match[1], title: match[3] });
    }
    dispatch(getTracksByQuerySuccess(tracks));
  } catch (error) {
    dispatch(getTracksByQueryError(error));
  }
};

const getTracksByQueryRequest = () => ({
  type: GET_TRACKS_REQUEST,
  payload: null
});

const getTracksByQuerySuccess = response => ({
  type: GET_TRACKS_SUCCESS,
  payload: response
});

const getTracksByQueryError = error => ({
  type: GET_TRACKS_ERROR,
  payload: error
});
