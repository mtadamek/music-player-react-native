import TrackPlayer from "react-native-track-player";

const events = new Array();

export const play = async () => await TrackPlayer.play();
export const pause = async () => await TrackPlayer.pause();
export const stop = async () => await TrackPlayer.stop();
export const next = async () => await TrackPlayer.skipToNext();
export const prev = async () => await TrackPlayer.skipToPrevious();

export const addEvent = async (name, callback) => {
  if (events.find(e => e.eventType === name)) return;
  const event = await TrackPlayer.addEventListener(name, callback);
  events.push(event);
};

export const removeEvent = async name => {
  const event = events.find(e => e.eventType === name);
  if (!event) return;
  events = events.filter(e => e.eventType !== name);
  event.remove();
  console.log(events);
};

export const addToQueue = async (track, before) => {
  const queue = await TrackPlayer.getQueue();
  if (!queue.find(t => t.id === track.id)) await TrackPlayer.add(track, before);
  else throw "This track already exist in queue!";
  console.log("addToQueue ", await TrackPlayer.getQueue());
};

export const playSingleTrack = async track => {
  await TrackPlayer.stop();
  await TrackPlayer.reset();
  await TrackPlayer.add(track);
  await TrackPlayer.play();
};

export const playPlaylist = async track => {
  try {
    console.log(track);
    await TrackPlayer.stop();
    await TrackPlayer.reset();
    await TrackPlayer.add(track);
    await TrackPlayer.play();
  } catch (error) {}
};

export const init = async () => {
  await TrackPlayer.setupPlayer();
  await TrackPlayer.updateOptions({
    capabilities: [
      TrackPlayer.CAPABILITY_PLAY,
      TrackPlayer.CAPABILITY_PAUSE,
      //TrackPlayer.CAPABILITY_STOP,
      TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
      TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS
    ],
    compactCapabilities: [
      TrackPlayer.CAPABILITY_PLAY,
      TrackPlayer.CAPABILITY_PAUSE,
      //TrackPlayer.CAPABILITY_STOP,
      TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
      TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS
    ]
  });

  await Promise.all([
    addEvent("remote-play", () => TrackPlayer.play()),
    addEvent("remote-pause", () => TrackPlayer.pause()),
    addEvent("remote-stop", () => TrackPlayer.stop()),
    addEvent("remote-next", async () => {
      try {
        await TrackPlayer.skipToNext();
      } catch (error) {}
    }),
    addEvent("remote-previous", async () => {
      try {
        await TrackPlayer.skipToPrevious();
      } catch (error) {}
    })
  ]);
  return true;
};

export const destroy = async () => {
  await TrackPlayer.stop();
  events.forEach(e => e.remove());
  TrackPlayer.destroy();
};
