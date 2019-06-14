import {
  GET_TRACKS_REQUEST,
  GET_TRACKS_SUCCESS,
  GET_TRACKS_ERROR,
  GET_TRACK_REQUEST,
  GET_TRACK_SUCCESS,
  GET_TRACK_ERROR
} from "../constants";

const initialState = {
  list: [],
  currentTrack: {},
  loadingList: false,
  loadingTrack: false,
  error: false
};

const tracksReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_TRACKS_REQUEST:
      return { ...state, loadingList: true, error: false };
    case GET_TRACKS_SUCCESS:
      return { ...state, loadingList: false, list: payload };
    case GET_TRACKS_ERROR:
      return { ...state, loadingList: false, error: payload };
    case GET_TRACK_REQUEST:
      return { ...state, loadingTrack: true, error: false };
    case GET_TRACK_SUCCESS:
      return { ...state, loadingTrack: false, currentTrack: payload };
    case GET_TRACK_ERROR:
      return { ...state, loadingTrack: false, error: payload };

    default:
      return state;
  }
};

export default tracksReducer;
