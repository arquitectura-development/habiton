import React, { Component } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Platform,
  Alert
} from 'react-native'
import { Container, Content, ListItem, Text, Separator } from 'native-base';
import AppUser from "../models/AppUser";
import { goLogin } from '../navigation';

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

  logout = () => {
    goLogin();
    AppUser.logout();
  }

  deleteAccount = () => {
    goLogin();
    AppUser.deleteAccount();
  }

  showDeleteAlert = () => {
    Alert.alert(
      'Delete account',
      'If you continue you won\'t be able to reverse this action.',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'Delete', onPress: () => this.deleteAccount() },
      ],
      {cancelable: false},
    );
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
            <Text>{AppUser.name}</Text>
          </ListItem>
          <ListItem last>
            <Text style={styles.textItemLeft}>Email</Text>
            <Text>{AppUser.email}</Text>
          </ListItem>
          <Separator >
            <Text>Other</Text>
          </Separator>
          <ListItem>
            <TouchableOpacity
              style={styles.touchableButton}
              onPress={async () => { this.logout() }}
            >
              <Text>Logout </Text>
            </TouchableOpacity>
          </ListItem>
          <ListItem last>
            <TouchableOpacity
              style={styles.touchableButton}
              onPress={this.showDeleteAlert}
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