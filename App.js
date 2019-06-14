/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import AsyncStorage from "@react-native-community/async-storage";
import { Platform, StyleSheet, Text, View, Button } from "react-native";
import TrackPlayer from "react-native-track-player";
import axios from "./src/modules/axios";
import { SERVER_URL } from "./src/constants";
import { Root } from "native-base";
import { Provider } from "react-redux";
import store from "./src/store";
import Router from "./src/router";
import * as TPlayer from "./src/modules/player";

// const instructions = Platform.select({
//   ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
//   android:
//     'Double tap R on your keyboard to reload,\n' +
//     'Shake or press menu button for dev menu',
// });

// type Props = {};
export default class App extends Component {
  componentWillUnmount() {
    console.log("unmount");
    TPlayer.destroy();
  }

  async componentDidMount() {
    try {
      const init = await TPlayer.init();
      console.log('INIT: ',init)
      const playlists = await AsyncStorage.getItem("@playlists");
      if (!playlists)
        await AsyncStorage.setItem(
          "@playlists",
          JSON.stringify([{ name: "Favorite", tracks: [] }])
        );
      const tracks = await AsyncStorage.getItem("@tracks");
      if (!tracks) await AsyncStorage.setItem("@tracks", JSON.stringify([]));
    } catch (error) {
      console.log("App: ", error);
    }

    // const query = "luxtorpeda";
    // const data = await axios()
    //   .get(`https://www.youtube.com/results?search_query=${query}`)
    //   .then(result => result.data);
    //var myRe = new RegExp('<a href="/watch?v=(.*?)" class="yt-uix-tile-link yt-ui-ellipsis yt-ui-ellipsis-2 yt-uix-sessionlink      spf-link " data-sessionlink="(.*?)"  title="(.*?)"', "g");
    //var myRe = /ab*/g;
    //var myRe2 = new RegExp("yt-uix-tile-link yt-ui-ellipsis yt-ui-ellipsis-2 yt-uix-sessionlink      spf-link ", "g");
    // var myRe3 = new RegExp('<a href="/watch\\?v=(.*?)" class="yt-uix-tile-link yt-ui-ellipsis yt-ui-ellipsis-2 yt-uix-sessionlink      spf-link " data-sessionlink="(.*?)"  title="(.*?)"',"g")
    // var myRe = new RegExp('<a href="/watch\\?v=(.*?)"(.*?)title="(.*?)"',"g")
    // var str = '<a href="/watch?v=.*';
    // var str2 =
    //   '</div><div class="yt-lockup-content"><h3 class="yt-lockup-title "><a href="/watch?v=txvPsGvw7aI" class="yt-uix-tile-link yt-ui-ellipsis yt-ui-ellipsis-2 yt-uix-sessionlink      spf-link " data-sessionlink="itct=CFkQ3DAYACITCNXzuaugwOICFYQ_4Aody_AIOij0JDIGc2VhcmNoUhRsdXh0b3JwZWRhIGp1enV0bnVrdQ"  title="Luxtorpeda - JUZUTNUKU" rel="spf-prefetch" aria-describedby="description-id-134617" dir="ltr"><span aria-label="Luxtorpeda - JUZUTNUKU Autor: OFFICIALLUXTORPEDA 5 lat temu 3 minuty, 26 sekund 459 029 wyświetleń">Luxtorpeda - JUZUTNUKU</span></a><span class="accessible-description" id="description-id-134617"> - Czas trwania: 3:26.</span></h3><div class="yt-lockup-byline "><a href="/channel/UCAgSZBefyQhCsNmhxuCWEYg" class="yt-uix-sessionlink       spf-link " data-sessionlink="itct=CFkQ3DAYACITCNXzuaugwOICFYQ_4Aody_AIOij0JA" >OFFICIALLUXTORPEDA</a></div><div class="yt-lockup-meta "><ul class="yt-lockup-meta-info"><li>5 lat temu</li><li>459 029 wyświetleń</li></ul></div><div class="yt-lockup-description yt-ui-ellipsis yt-ui-ellipsis-2" dir="ltr">Utwór nr 2 z płyty pt. &quot;A MORAŁ Z TEJ HISTORII MÓGŁBY BYĆ TAKI MIMO ŻE CUKROWE TO JEDNAK ŁAJDAKI&quot;.</div></div></div></div></li>';
    // var myArray = [];
    // while ((match = myRe.exec(data)) !== null) {
    //   if(!match[1].includes("list"))
    //     myArray.push({id:match[1],title:match[3]})
    // }
    // console.log(myArray);

    //   data.streams.forEach(async stream => {
    //     const { format, extension } = stream;
    //     if (format === "audio only" && extension === "m4a") {
    //       const { id, title } = data;
    //       const { url } = stream;
    //       console.log(id, url, title);
    //       await TrackPlayer.add({
    //         id,
    //         url,
    //         title
    //       });
    //     }
    //   });
  }

  render() {
    return (
      // <View style={styles.container}>
      //   <Text style={styles.welcome}>Welcome to Music Streamer!</Text>
      //   <Button onPress={this.onPlay} title="Play" color="#841584" />
      //   <Button onPress={this.onPause} title="Pause" />
      //   <Button onPress={this.onStop} title="Stop" />
      // </View>
      <Provider store={store}>
        <Root>
          <Router />
        </Root>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  }
});
