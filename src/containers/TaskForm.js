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
  DatePicker,
  ListItem
 } from 'native-base';
import { Navigation } from 'react-native-navigation';
import { MAIN_THEME_COLOR } from '../constants';
import moment from 'moment';


export default class TaskForm extends Component {
  static options(passProps) {
    return {
      topBar: {
        title: {
          text: passProps.task ? 'Edit task' : 'New task'
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
      task: this.props.task ? this.props.task : {}
    };
  }

  renderDeleteButton = () => {
    if(this.props.task ){
      return (
        <View>
          <ListItem itemHeader style={styles.divider}/>
          <Button iconLeft transparent block danger onPress={this.showDeleteAlert}>
            <Icon name='trash' style={{marginRight: 5}}/>
            <Text>Delete task</Text>
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
        task: {
            ...prevState.task,
            [key]: val
        }
    }))
  }

  saveTask = async () => {
    try {
      console.log("TASK HDJS");
      // await AsyncStorage.setItem('USER', JSON.stringify(user));
    } catch (error) {
      console.log(error);
    }
  }

  deleteTask = async () => {
    try {
      console.log("DELETE TASK CONFIRMED");
      Navigation.dismissModal(this.props.componentId);
    } catch (error) {
      console.log(error);
    }
  }

  showDeleteAlert = () => {
    Alert.alert(
      'Delete task?',
      'If you continue you won\'t be able to reverse this action.',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'Delete', onPress: () => this.deleteTask() },
      ],
      {cancelable: false},
    );
  } 

  navigationButtonPressed({ buttonId }) {
    Navigation.dismissModal(this.props.componentId);
    if(buttonId == "buttonSave"){
      return this.saveTask();
    }else{
      return;
    }
  }

async componentDidMount() {
  try {
    // const { dueDate, reminder } = this.props.task;
    // if(dueDate && reminder){
    //   this.setState({
    //     dueDate: new Date
    //   })
    // }
  } catch (err) {
    console.log('Error: ', err)
  }
}

  render() {
    const {
      title,
      description, 
      dueDate,
      reminder
    } = this.state.task;
    return(
      <Container style={{backgroundColor:'#F8F8F8'}}>
        <Content>
          <Form style={{backgroundColor:'white'}}>
            <ListItem itemHeader style={styles.divider}>
              <Text style={styles.dividerText}>GENERAL</Text>
            </ListItem>
            <Item stackedLabel>
              <Label style={styles.label}>Title*</Label>
              <Input 
                style={styles.inputText}
                placeholder="Ej. Final individual activity" 
                onChangeText={val => this.onValueChange('title', val)}
                value={ title }
                />
            </Item>
            <Item stackedLabel last>
              <Label style={styles.label}>Description</Label>
              <Input 
                style={styles.inputText}
                placeholder="Citizenship class"
                multiline={true}
                numberOfLines={2}
                textAlignVertical="top"
                onChangeText={ val => this.onValueChange('description', val)}
                value={ description }
                />
            </Item>
            <ListItem itemHeader style={styles.divider}>
              <Text style={styles.dividerText}>SCHEDULING</Text>
            </ListItem>
            <Item style={styles.itemList} last>
              <View style={styles.sameLineInput}>
              <Text style={styles.textItemLeft}>Due date</Text>
                  <DatePicker
                    defaultDate={new Date()}
                    minimumDate={new Date()}
                    locale={"es"}
                    timeZoneOffsetInMinutes={undefined}
                    modalTransparent={false}
                    animationType={"fade"}
                    androidMode={"default"}
                    placeHolderText="Select date"
                    textStyle={styles.textItemRight}
                    placeHolderTextStyle={styles.placeHolderItemRight}
                    onDateChange={val => this.onValueChange('dueDate', val)}
                    />
              </View>
            </Item>
            <ListItem itemHeader style={styles.divider}>
              <Text style={styles.dividerText}>REMINDER</Text>
            </ListItem>
            <Item style={styles.itemList} last>
              <View style={styles.sameLineInput}>
              <Text style={styles.textItemLeft}>Remind me</Text>
                  <DatePicker
                    defaultDate={new Date()}
                    minimumDate={new Date()}
                    locale={"es"}
                    modalTransparent={false}
                    animationType={"fade"}
                    androidMode={"default"}
                    placeHolderText="Select date"
                    textStyle={styles.textItemRight}
                    placeHolderTextStyle={styles.placeHolderItemRight}
                    onDateChange={val => this.onValueChange('reminder', val)}
                    />
              </View>
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
