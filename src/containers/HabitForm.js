import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Alert
} from 'react-native'
import {
  Container,
  Button,
  Content,
  Form,
  Item,
  Input,
  Label,
  Icon,
  Picker,
  ListItem,
  Header,
  Left, 
  Right,
  Body
 } from 'native-base';
import { Navigation } from 'react-native-navigation';
import { MAIN_THEME_COLOR } from '../constants';


export default class HabitForm extends Component {
  static options(passProps) {
    return {
      topBar: {
        title: {
          text: passProps.habit ? 'Edit habit' : 'New habit'
        },
        leftButtons: [
          {
            id: 'buttonCancel',
            text: 'Back',
            color: MAIN_THEME_COLOR
          }
        ],
        rightButtons: [
          {
            id: 'buttonSave',
            text: 'Done',
            color: MAIN_THEME_COLOR
          }
        ]
      }
    }
  }
  constructor(props) {
    super(props);
    this.onValueChange = this.onValueChange.bind(this);
    Navigation.events().bindComponent(this);
    this.state = {
      habit: this.props.habit? this.props.habit : {}
    };
  }

  renderDeleteButton = () => {
    if(this.props.habit){
      return (
        <View>
          <ListItem itemHeader style={styles.divider}/>
          <Button iconLeft transparent block danger onPress={this.showDeleteAlert}>
            <Icon name='trash' style={{marginRight: 5}}/>
            <Text>Delete habit</Text>
          </Button>
        </View>
      )
    }else{
      return null;
    }
  }

  onValueChange = (key, val) => {
    this.setState({ [key]: val })
    this.setState(prevState => ({
        habit: {
            ...prevState.habit,
            [key]: val
        }
    }))
  }

  saveHabit = async () => {
    try {
      console.log("SAVE HABIT");
    } catch (error) {
      console.log(error);
    }
  }

  deleteHabit = async () => {
    try {
      console.log("DELETE HABIT CONFIRMED");
      Navigation.dismissModal(this.props.componentId);
    } catch (error) {
      console.log(error);
    }
  }

  showDeleteAlert = () => {
    Alert.alert(
      'Delete habit?',
      'If you continue you won\'t be able to reverse this action.',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'Delete', onPress: () => this.deleteHabit() },
      ],
      {cancelable: false},
    );
  } 

  navigationButtonPressed({ buttonId }) {
    Navigation.dismissModal(this.props.componentId);
    if(buttonId == "buttonSave"){
      return this.saveHabit();
    }else{
      return;
    }
  }

  retrieveData = async () => {
    try {
      console.log("mju")
    } catch (error) {
      console.log(error);
    }
  }

async componentDidMount() {
  try {
    await this.retrieveData();
  } catch (err) {
    console.log('Error: ', err)
  }
}

  render() {
    const {
      name,
      type,
      difficulty
    } = this.state.habit;
    return(
      <Container style={{backgroundColor:'#F8F8F8'}}>
        <Content>
          <Form style={{backgroundColor:'white'}}>
            <ListItem itemHeader style={styles.divider}>
              <Text style={styles.dividerText}>GENERAL</Text>
            </ListItem>
            <Item stackedLabel last>
              <Label style={styles.label}>Name*</Label>
              <Input 
                style={styles.inputText}
                placeholder="Ej. Do clean code" 
                onChangeText={val => this.onValueChange('name', val)}
                value={ name }
                />
            </Item>
            <ListItem itemHeader style={styles.divider}>
              <Text style={styles.dividerText}>TYPE</Text>
            </ListItem>
            <Item style={styles.itemList} last>
              <Picker
                    mode="dropdown"
                    renderHeader={backAction =>
                    <Header>
                      <Left>
                        <Button transparent onPress={backAction}>
                          <Icon name="arrow-back" style={{ color: MAIN_THEME_COLOR }} />
                        </Button>
                      </Left>
                      <Body style={{ flex: 3 }}>
                        <Text style={{ fontSize: 16 }}>Select type</Text>
                      </Body>
                      <Right />
                    </Header>}
                    placeholder="Select"
                    placeholderStyle={{ color: "#d3d3d3" }}
                    placeholderIconColor="#007aff"
                    selectedValue={ type }
                    onValueChange={val => this.onValueChange('type',val)}
                  >
                    <Picker.Item label="Positive" value="Positive"/>
                    <Picker.Item label="Negative" value="Negative" />
                    <Picker.Item label="Both" value="Both" />
                  </Picker>
            </Item>
            <ListItem itemHeader style={styles.divider}>
              <Text style={styles.dividerText}>DIFFICULTY</Text>
            </ListItem>
            <Item style={styles.itemList} last>
              <Picker
                    mode="dropdown"
                    renderHeader={backAction =>
                    <Header>
                      <Left>
                        <Button transparent onPress={backAction}>
                          <Icon name="arrow-back" style={{ color: MAIN_THEME_COLOR }} />
                        </Button>
                      </Left>
                      <Body style={{ flex: 3 }}>
                        <Text style={{ fontSize: 16 }}>Select difficulty</Text>
                      </Body>
                      <Right />
                    </Header>}
                    placeholder="Select"
                    placeholderStyle={{ color: "#d3d3d3" }}
                    placeholderIconColor="#007aff"
                    selectedValue={ difficulty }
                    onValueChange={val => this.onValueChange('difficulty',val)}
                  >
                    <Picker.Item label="Medium" value="Medium"/>
                    <Picker.Item label="Hard" value="Hard" />
                    <Picker.Item label="Easy" value="Easy" />
                  </Picker>
            </Item>
            { this.renderDeleteButton() }
          </Form>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  label: {
    color: MAIN_THEME_COLOR,
    fontWeight: '500'
  },
  divider: {
    backgroundColor: '#F8F8F8'
  },
  dividerText: {
    color:'#798d99'
  },
  inputText: {
    fontWeight: '300',
    fontSize: 14
  },
  sameLineInput: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  textItemLeft:{
    flex: 1,
    justifyContent: 'flex-start',
    flexDirection: 'row',
    color: '#101010',
    fontWeight: '400'
  },
  textItemRight:{
    color:  MAIN_THEME_COLOR,
    fontWeight: '400'
  },
  placeHolderItemRight: {
    color: "#d3d3d3", 
    fontWeight: '400'
  }
})
