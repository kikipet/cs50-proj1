import React from "react";
import {View, Button, Text, ScrollView, StyleSheet, Switch} from 'react-native';
import Constants from 'expo-constants';
import {Timer} from './Timer.js'

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    // backgroundColor: '#eee'
  },
})

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    };
  }

  render() {
    return (
      <View style={styles.appContainer}>
        <Timer />
      </View>
    );
  }
}
