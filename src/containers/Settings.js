import React, { Component } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Platform
} from 'react-native'
import { Container, Content, ListItem, Text, Separator } from 'native-base';

export default class Settings extends Component {
  static get options() {
    return {
      topBar: {
        title: {
          text: 'Settings'
        },
        largeTitle: {
          visible: true,
          fontSize: 30,
          fontWeight: 'bold',
          color: 'black',
          fontFamily: 'Helvetica'
        }
      }
    };
  }

  render() {
    return (
        <Container>
           <View/> 
            <Content
            scrollEnabled={false}
            >
          <Separator bordered>
            <Text>Account info</Text>
          </Separator>
          <ListItem>
            <Text style={styles.textItemLeft}>Name</Text>
            <Text>Meeper</Text>
          </ListItem>
          <ListItem last>
            <Text style={styles.textItemLeft}>Email</Text>
            <Text>meeper@meep.com</Text>
          </ListItem>
          <Separator >
            <Text>Other</Text>
          </Separator>
          <ListItem>
            <TouchableOpacity
              style={styles.touchableButton}
              onPress={console.log("hdsuaj")}
            >
              <Text>Logout </Text>
            </TouchableOpacity>
          </ListItem>
          <ListItem last>
            <TouchableOpacity
              style={styles.touchableButton}
              onPress={console.log("hdsuaj")}
            >
              <Text>Delete account </Text>
            </TouchableOpacity>
          </ListItem>
        </Content>
        < View style={styles.finalSeparator} /> 
       </Container>
    )
  }
}

const styles = StyleSheet.create({
  textItemLeft:{
    flex: 1,
    justifyContent: 'flex-start',
    flexDirection: 'row',
    color: '#101010',
    fontWeight: '300'
  },
  finalSeparator: {
    height: '100%',
    flex: 1,
    backgroundColor: '#F0EFF5',
    zIndex: -10,
    ...Platform.select({
      ios: {
        marginTop: -75
      }
    })
  },
  touchableButton: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    textAlign: 'left'
  }
})