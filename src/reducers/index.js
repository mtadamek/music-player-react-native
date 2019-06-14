import { combineReducers } from "redux";
//import { reducer as form } from 'redux-form'
import player from "./player";
import tracks from "./tracks";
import playlists from "./playlists";

const rootReducer = combineReducers({ player, tracks, playlists });

export default rootReducer;
