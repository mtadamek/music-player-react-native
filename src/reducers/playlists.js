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
  SET_PLAYLIST
} from "../constants";

const initialState = {
  list: [],
  currentPlaylist: null,
  loading: false,
  error: false
};

const playlistsReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_PLAYLISTS_REQUEST:
    case ADD_TRACK_TO_PLAYLIST_REQUEST:
    case REMOVE_TRACK_FROM_PLAYLIST_REQUEST:
      return { ...state, loading: true, error: false };
    case GET_PLAYLISTS_SUCCESS:
    case ADD_TRACK_TO_PLAYLIST_SUCCESS:
    case REMOVE_TRACK_FROM_PLAYLIST_SUCCESS:
      return { ...state, loading: false, list: payload };
    case GET_PLAYLISTS_ERROR:
    case ADD_TRACK_TO_PLAYLIST_ERROR:
    case REMOVE_TRACK_FROM_PLAYLIST_ERROR:
      return { ...state, loading: false, error: true };
    case SET_PLAYLIST:
      console.log("SET_PLAYLIST ", payload);
      return { ...state, currentPlaylist: payload };
    default:
      return state;
  }
};

export default playlistsReducer;
