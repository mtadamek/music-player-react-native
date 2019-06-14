import { SET_PLAYING, SET_CURRENT_TRACK } from "../constants";

export const setPlaying = playing => ({
  type: SET_PLAYING,
  payload: playing
});

export const setCurrentTrack = track => ({
  type: SET_CURRENT_TRACK,
  payload: track
});
