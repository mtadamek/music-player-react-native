import React, { Component } from "react";
import { connect } from "react-redux";
import { Alert, Modal } from "react-native";
import TrackPlayer from "react-native-track-player";
import TrackProgressBar from "./TrackProgressBar";
import { Col, Row, Grid } from "react-native-easy-grid";
import { addTrackToQueue, playTrack } from "../actions/tracks";
import { setPlaying, setCurrentTrack } from "../actions/player";
import * as TPlayer from "../modules/player";
import {
  Icon,
  Body,
  Button,
  Container,
  Header,
  Content,
  Item,
  Left,
  Input,
  Title,
  Right,
  Footer,
  FooterTab,
  Spinner,
  View,
  Text,
  List,
  ListItem
} from "native-base";

const {
  STATE_NONE,
  STATE_STOPPED,
  STATE_PAUSED,
  STATE_PLAYING,
  STATE_BUFFERING
} = TrackPlayer;

// STATE_NONE - 0
// STATE_STOPPED - 1
// STATE_PAUSED - 2
// STATE_PLAYING - 3
// STATE_READY - ?
// STATE_BUFFERING - 6

class Player extends Component {
  state = {
    query: "",
    modalVisible: false
  };

  onPlaybackError = error => console.log("PLAYER ERROR!", error);

  onPlaybackQueueEnded = data => console.log("KONIEC KOLEJKI!", data);

  onPlaybackTrackChanged = async data => {
    console.log("ZMIANA UTWORU!", data);
    const { currentPlaylist } = this.props;
    const { nextTrack } = data;
    if (currentPlaylist && nextTrack) {
      const { tracks } = currentPlaylist;
      const index = tracks.map(t => t.id).indexOf(nextTrack);
      const current = tracks[index];
      const next = tracks[index + 1];
      const prev = tracks[index - 1];
      if (index > -1 && current) this.props.setCurrentTrack(current);
      if (index > -1 && next) this.props.addTrackToQueue(next.id, null);
      if (index > -1 && prev) this.props.addTrackToQueue(prev.id, nextTrack);
    }
  };

  onPlaybackState = data => {
    console.log("ZMIANA STANU!", data);
    const { state } = data;
    switch (state) {
      case STATE_NONE:
      case STATE_STOPPED:
      case STATE_PAUSED:
      case STATE_BUFFERING:
        this.props.setPlaying(false);
        break;
      case STATE_PLAYING:
        this.props.setPlaying(true);
        break;
      default:
        break;
    }
  };

  async componentDidMount() {
    console.log("player mount");
    try {
      await Promise.all([
        TPlayer.addEvent("playback-error", this.onPlaybackError),
        TPlayer.addEvent("playback-queue-ended", this.onPlaybackQueueEnded),
        TPlayer.addEvent("playback-track-changed", this.onPlaybackTrackChanged),
        TPlayer.addEvent("playback-state", this.onPlaybackState)
      ]);
    } catch (error) {
      console.log("add event error: ", error);
    }
  }

  onPlay = async e => {
    const state = await TrackPlayer.getState();
    const queue = await TrackPlayer.getQueue();
    console.log("queue", queue);
    console.log("state", state);
    switch (state) {
      case STATE_PLAYING:
        await TrackPlayer.pause();
        break;
      case STATE_STOPPED:
        await TrackPlayer.seekTo(0);
        await TrackPlayer.play();
      case STATE_PAUSED:
        await TrackPlayer.play();
        break;
      default:
        break;
    }
  };

  onStop = e => {
    TrackPlayer.stop();
  };

  onNext = async e => {
    try {
      await TrackPlayer.skipToNext();
    } catch (error) {}
  };

  onPrevious = async e => {
    try {
      const position = await TrackPlayer.getPosition();
      if (position > 5) {
        await TrackPlayer.seekTo(0);
      } else {
        await TrackPlayer.skipToPrevious();
      }
    } catch (error) {}
  };

  onClearQuery = () => {
    this.setState({ query: "" });
  };

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  onTest = async e => {
    console.log("show playlist");
  };

  async componentDidUpdate(prevProps) {
    // const { currentTrack } = this.props;
    // try {
    //   if (
    //     (!prevProps.currentTrack.id && currentTrack.id) ||
    //     (currentTrack.id &&
    //       prevProps.currentTrack.id &&
    //       currentTrack.id !== prevProps.currentTrack.id)
    //   ) {
    //     await TrackPlayer.add(currentTrack);
    //     !prevProps.currentTrack.id ? this.onPlay() : this.onNext();
    //     console.log("Zmiana utworu!: ", currentTrack);
    //   }
    // } catch (error) {}
  }
  render() {
    const { query } = this.state;
    const { loading, playing, currentPlaylist, track } = this.props;
    let list = currentPlaylist ? currentPlaylist.tracks : [];

    if (list.length > 0) {
      list = list.map((t, index) => (
        <ListItem key={index} onPress={() => this.props.playTrack(t.id)}>
          <Body>
            <Text
              style={{
                color: "#ececec",
                fontWeight:
                  playing && track && track.id === t.id ? "bold" : "normal"
              }}
            >{`${t.title}`}</Text>
          </Body>
        </ListItem>
      ));
    }

    return (
      <Container>
        <Header searchBar rounded style={{ backgroundColor: "#181818" }}>
          <Item>
            <Icon name="search" />
            <Input
              placeholder="Search"
              onChangeText={text => this.setState({ query: text })}
              value={this.state.query}
              onSubmitEditing={() => this.props.onSearch(query)}
            />
            {query === "" || <Icon name="close" onPress={this.onClearQuery} />}
          </Item>
        </Header>
        <Content style={{ backgroundColor: "#373737" }}>
          {this.props.content}
        </Content>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          presentationStyle="pageSheet"
          onRequestClose={() => {
            console.log("Modal has been closed.");
          }}
          style={{ backgroundColor: "#373737" }}
        >
          <Container>
            <Header rounded style={{ backgroundColor: "#181818" }}>
              <Left>
                <Button transparent>
                  <Icon name="musical-notes" />
                </Button>
              </Left>
              <Body>
                <Title>{currentPlaylist ? currentPlaylist.name : ""}</Title>
              </Body>
            </Header>
            <Content style={{ backgroundColor: "#373737" }}>
              <View>
                <List>{list}</List>
              </View>
            </Content>
            <Footer>
              <FooterTab
                style={{ backgroundColor: "#181818", justifyContent: "center" }}
              >
                <Button onPress={() => this.setModalVisible(false)}>
                  <Icon
                    type="AntDesign"
                    name="down"
                    style={{ color: "#ececec" }}
                  />
                </Button>
              </FooterTab>
            </Footer>
          </Container>
        </Modal>
        <Footer>
          <Grid>
            <Col>
              <Row style={{ backgroundColor: "#22327a", height: 4 }}>
                <TrackProgressBar />
              </Row>
              {/* <Row style={{ backgroundColor: "#252525", height: 15 }}>
                <View style={{ justifyContent: "center" }}>
                  <Text style={{ color: "#ececec" }}>
                    {track ? track.title : ""}
                  </Text>
                </View>
              </Row> */}
              <Row>
                <FooterTab style={{ backgroundColor: "#181818" }}>
                  <Col>
                    {currentPlaylist && (
                      <Button onPress={() => this.setModalVisible(true)}>
                        <Icon
                          type="AntDesign"
                          name="up"
                          style={{ color: "#ececec" }}
                        />
                      </Button>
                    )}
                  </Col>
                  <Col>
                    <Button onPress={this.onPrevious}>
                      <Icon name="skip-backward" style={{ color: "#ececec" }} />
                    </Button>
                  </Col>
                  <Col>
                    <Button onPress={this.onPlay}>
                      {loading ? (
                        <Spinner color="#ececec" />
                      ) : (
                        <Icon
                          name={playing ? "pause" : "play"}
                          style={{ color: "#ececec" }}
                        />
                      )}
                    </Button>
                  </Col>
                  <Col>
                    <Button onPress={this.onNext}>
                      <Icon name="skip-forward" style={{ color: "#ececec" }} />
                    </Button>
                  </Col>
                  <Col />
                </FooterTab>
              </Row>
            </Col>
          </Grid>
        </Footer>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  track: state.player.track,
  loading: state.player.loading,
  error: state.player.error,
  playing: state.player.playing,
  currentPlaylist: state.playlists.currentPlaylist
});

const mapDispatchToProps = dispatch => ({
  addTrackToQueue: (track, before) => dispatch(addTrackToQueue(track, before)),
  setPlaying: playing => dispatch(setPlaying(playing)),
  setCurrentTrack: track => dispatch(setCurrentTrack(track)),
  playTrack: id => dispatch(playTrack(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Player);
