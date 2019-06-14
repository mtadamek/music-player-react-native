import TrackPlayer from "react-native-track-player";

module.exports = async function() {
  TrackPlayer.addEventListener("remote-play", () => TrackPlayer.play());

  TrackPlayer.addEventListener("remote-pause", () => TrackPlayer.pause());

  TrackPlayer.addEventListener("remote-stop", () => TrackPlayer.stop());

  TrackPlayer.addEventListener("remote-next", async () => {
    try {
      await TrackPlayer.skipToNext();
    } catch (error) {}
  });

  TrackPlayer.addEventListener("remote-previous", async () => {
    try {
      await TrackPlayer.skipToPrevious();
    } catch (error) {}
  });
};
