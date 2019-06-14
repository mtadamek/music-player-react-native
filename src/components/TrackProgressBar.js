import React from "react";
import TrackPlayer from "react-native-track-player";
import { Text, View, ProgressBarAndroid, StyleSheet } from "react-native";

class TrackProgressBar extends TrackPlayer.ProgressComponent {
  render() {
    return (
      <View style={styles.container}>
        {/* <Text style={{ color: "#ececec" }}>{this.state.position}</Text>
        <Text style={{ color: "#ececec" }}>{this.getProgress()}</Text>
        <Text style={{ color: "#ececec" }}>{this.getBufferedProgress()}</Text> */}
        <ProgressBarAndroid
          styleAttr="Horizontal"
          progress={this.getProgress()}
          indeterminate={false}
          color="#ececec"
        />
        {/* <ProgressBarAndroid
          styleAttr="Horizontal"
          progress={this.getBufferedProgress()}
          indeterminate={false}
          color="green"
        /> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-evenly",
  }
});

export default TrackProgressBar;
