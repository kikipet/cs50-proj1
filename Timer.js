import React from "react";
import {View, Button, Text, ScrollView, StyleSheet, Switch} from 'react-native';
import Constants from 'expo-constants';
import vibrate from './utils/vibrate.js';

const styles = StyleSheet.create({
    timerContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: Constants.statusBarHeight
    },
    buttonContainer: {
      flexDirection: 'row',
    },
    text: {
      fontSize: 24,
    },
    time: {
      fontSize: 48,
    },
  })

let refTimes = [[0, 30], [0, 30]]
let refText = ["WORK", "BREAK"]
let refPause = ["Start", "Pause"]
let ind = 0 // 0 if working, 1 if break

export class Timer extends React.Component {
  constructor() {
    super()
    this.state = {
      time: refTimes[0][0]*60 + refTimes[0][1],
      sec: this.formatSec(refTimes[0][1]),
      min: refTimes[0][0],
      state: refText[0],
      pause: 0,
      pauseText: refPause[1]
    }
  }

  formatSec = (t) => {
    if (t < 10) return "0" + t.toString()
    return t.toString()
  }

  toggle = () => {
    this.setState(prevState => ({
      pause: 1 - prevState.pause,
      pauseText: refPause[prevState.pause]
    }))
    if (this.state.pause) this.interval = setInterval(this.inc, 1000)
    else clearInterval(this.interval)
  }

  reset = () => {
    this.setState(prevState => ({
      time: refTimes[0][0]*60 + refTimes[0][1],
      sec: this.formatSec(refTimes[0][1]),
      min: refTimes[0][0],
      state: refText[0],
      pause: 1,
      pauseText: refPause[0]
    }))
    clearInterval(this.interval)
  }

  inc = () => {
    if (!this.state.pause) {
      if (this.state.time > 0) {
        this.setState(prevState => ({
          time: prevState.time - 1,
          sec: this.formatSec((prevState.time-1) % 60),
          min: Math.floor((prevState.time-1) / 60)
        }))
      }
      else {
        ind = 1 - ind
        vibrate()
        this.setState(() => ({
          time: refTimes[ind][0] * 60 + refTimes[ind][1],
          sec: refTimes[ind][1],
          min: refTimes[ind][0],
          state: refText[ind]
        }))
      }
    }
  }

  componentDidMount() {
    this.interval = setInterval(this.inc, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  render() {
    return (
      <View style={styles.timerContainer}>
        <Text style={styles.text}>{this.state.state} TIME</Text>
        <Text style={styles.time}>{this.state.min}:{this.state.sec}</Text>
        <View style={styles.buttonContainer}>
          <Button title={this.state.pauseText} onPress={this.toggle} />
          <Button title="Reset" onPress={this.reset} />
        </View>
      </View>
    )
  }
}