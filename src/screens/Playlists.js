import React, { Component } from "react";
import { ScrollView, Modal, TouchableHighlight, Alert } from "react-native";
import { connect } from "react-redux";
import Player from "../components/Player";
import { getPlaylists, setPlaylist } from "../actions/playlists";
import { playTrack } from "../actions/tracks";
import {
  Button,
  Text,
  Form,
  Item,
  Input,
  Label,
  Icon,
  Body,
  Right,
  List,
  ListItem,
  Spinner,
  View
} from "native-base";

class Playlists extends Component {

  componentDidMount() {
    const { list } = this.props;
    if (!list) this.props.getPlaylists();
  }

  playPlaylist = playlist => {
    const { tracks } = playlist;
    if (tracks.length > 0 && !this.props.loadingTrack) {
      this.props.setPlaylist(playlist);
      this.props.playTrack(tracks[0].id);
    }
  };

  render() {
    let { loading, list } = this.props;

    if (list.length > 0) {
      list = list.map((playlist, index) => (
        <ListItem key={index} onPress={() => this.playPlaylist(playlist)}>
          <Body>
            <Text style={{ color: "#ececec" }}>{`${playlist.name} (${playlist.tracks.length} tracks)`}</Text>
          </Body>
        </ListItem>
      ));
    }

    const Content = loading ? (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#373737"
        }}
      >
        <Spinner color="#ececec" />
      </View>
    ) : (
      <ScrollView style={{ backgroundColor: "#373737" }}>
        <List>
          {list}
        </List>
      </ScrollView>
    );
    return <Player content={Content} />;
  }
}

const mapStateToProps = state => ({
  list: state.playlists.list,
  loading: state.playlists.loading,
  loadingTrack: state.player.loading,
  error: state.playlists.error
});

const mapDispatchToProps = dispatch => ({
  getPlaylists: () => dispatch(getPlaylists()),
  playTrack: id => dispatch(playTrack(id)),
  setPlaylist: playlist => dispatch(setPlaylist(playlist))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Playlists);
