import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from "react-native";
import { goHome } from '../navigation'

export default class Home extends Component {
  render() {
    return (
        <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to Habit App
        </Text>
        <Text style={styles.instructions}>To get started, edit App.js</Text>
        <TouchableOpacity
          // onPress={async () => {
          //  goHome();
          // }}
        >
          <Text>firebase</Text>
        </TouchableOpacity>
      </View>
    )
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