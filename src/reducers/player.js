import {
  PLAY_TRACK_REQUEST,
  PLAY_TRACK_SUCCESS,
  PLAY_TRACK_ERROR,
  ADD_TRACK_REQUEST,
  ADD_TRACK_SUCCESS,
  ADD_TRACK_ERROR,
  PLAY_PLAYLIST,
  SET_PLAYING,
  SET_CURRENT_TRACK
} from "../constants";

const initialState = {
  prev: null,
  track: null,
  next: null,
  playing: false,
  loading: false,
  error: null
};

const playerReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case PLAY_TRACK_REQUEST:
      return { ...state, loading: true, error: null };
    case PLAY_TRACK_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        track: payload
      };
    case PLAY_TRACK_ERROR:
      return { ...state, loading: false, error: payload };
    case PLAY_PLAYLIST:
      return { ...state, loading: false, error: false };
    case ADD_TRACK_REQUEST:
      return { ...state, loading: true, error: false };
    case ADD_TRACK_SUCCESS:
      return { ...state, loading: false, next: payload };
    case ADD_TRACK_ERROR:
      return { ...state, loading: false, error: payload };
    case SET_PLAYING:
      return { ...state, playing: payload };
    case SET_CURRENT_TRACK:
      return { ...state, track: payload };
    default:
      return state;
  }
};

export default playerReducer;
