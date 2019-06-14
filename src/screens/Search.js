import React, { Component } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
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
  Spinner
} from "native-base";
import Player from "../components/Player";
import { connect } from "react-redux";
import { getTracksByQuery, playTrack } from "../actions/tracks";
import { getPlaylists, setPlaylist } from "../actions/playlists";
import {
  addTrackToPlaylist,
  removeTrackFromPlaylist
} from "../actions/playlists";

class Search extends Component {
  componentDidMount() {
    this.props.getPlaylists();
  }
  searchHandle = query => {
    const q = query.replace(/ /g, "+");
    console.log("query: " + q);
    this.props.getTracksByQuery(q);
  };
  playSingleTrack = id => {
    if(!this.props.loadingTrack){
      this.props.setPlaylist(null);
      this.props.playTrack(id);
    }
  };
  render() {
    let { loading, error, list, playlists } = this.props;

    const favorite = playlists.find(p => p.name === "Favorite");
    console.log(favorite);
    list = list.map((track, index) => (
      <ListItem key={index} onPress={() => this.playSingleTrack(track.id)}>
        <Body>
          <Text style={{ color: "#ececec" }}>{`${track.title}`}</Text>
        </Body>
        <Right>
          {favorite && favorite.tracks.find(t => t.id === track.id) ? (
            <Icon
              name="star"
              style={{ color: "#ffca18", fontSize: 30 }}
              onPress={e =>
                this.props.removeTrackFromPlaylist({
                  name: "Favorite",
                  id: track.id
                })
              }
            />
          ) : (
            <Icon
              name="star-outline"
              style={{ color: "#ececec", fontSize: 30 }}
              onPress={e =>
                this.props.addTrackToPlaylist({
                  name: "Favorite",
                  track: { id: track.id, title: track.title }
                })
              }
            />
          )}
          {/* <Icon
              name={tracks.include() ? "star" : "star-outline"}
              style={{ color: "#ececec", fontSize: 40 }}
              onPress={e =>
                this.props.addTrackToPlaylist({
                  name: "Favorite",
                  track: { id: track.id, title: track.title }
                })
              }
            /> */}
        </Right>
      </ListItem>
    ));

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
        <List>{list}</List>
      </ScrollView>
    );

    return <Player content={Content} onSearch={this.searchHandle} />;
  }
}

const styles = StyleSheet.create({
  bottom: {
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: 0,
    backgroundColor: "blue"
  },
  button: {
    position: "absolute",
    bottom: 0
  }
});

const mapStateToProps = state => ({
  list: state.tracks.list,
  playlists: state.playlists.list,
  loadingTrack: state.player.loading,
  loading: state.tracks.loadingList,
  error: state.tracks.error
});

const mapDispatchToProps = dispatch => ({
  getTracksByQuery: query => dispatch(getTracksByQuery(query)),
  playTrack: id => dispatch(playTrack(id)),
  getPlaylists: () => dispatch(getPlaylists()),
  addTrackToPlaylist: data => dispatch(addTrackToPlaylist(data)),
  removeTrackFromPlaylist: data => dispatch(removeTrackFromPlaylist(data)),
  setPlaylist: playlist => dispatch(setPlaylist(playlist))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search);
