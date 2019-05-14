import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Platform,
  FlatList,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native'
import { Text, Icon, CheckBox } from 'native-base';
import { MAIN_THEME_COLOR } from '../constants';
import { Navigation } from 'react-native-navigation';
import AppUser from "../models/AppUser";
import TaskStore from "../models/TaskStore";
import moment from 'moment';
import {observer} from 'mobx-react/native'

moment.locale("es");

class TaskItem extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            task : props.task,
            isLoading: false
        };
      }
    
    editTask = () => {
        Navigation.showModal({
            stack: {
              children: [{
                component: {
                  name: 'TaskForm',
                  id:"TaskForm",
                  passProps: {
                    task: this.props.task
                  }
                }
              }]
            }
        });
    }

    renderActivityIndicator = () => {
        if(this.state.isLoading){
            return(
                <ActivityIndicator style={styles.taskActivityIndicator} size="small" color={MAIN_THEME_COLOR} />
            )
        }
        else{
            return null;
        }
    }

    toogleCompleteTask = async () => {
        try {
          const { task } = this.state;
          this.setState({
              isLoading: true
          })
          let data = await TaskStore.updateTask(AppUser.id, task.id, {
            ...task,
            done: !task.done,
            completionDate: !task.done ? moment().format('DD/MM/YYYY') : null
          });
          this.setState(
              {
                  task: data,
                  isLoading: false
              }
          );
          await TaskStore.getTasks(AppUser.id);
          console.log("SUCCESS UPDATE");
        } catch (error) {
          console.log(error);
        }
    }

    renderDueDate = () => {
        const { dueDate } = this.props.task;
        if(moment().isSame(moment(dueDate,'DD/MM/YYYY'), 'day')){
            return ( 
                <View style={styles.dueDateContainer} >
                    <Icon name='calendar' style={{...styles.calendarIcon, ...{color: '#cc0000'}}}/>
                    <Text style={{...styles.dueDateText, ...{color: '#cc0000'}}}>Due today</Text>
                </View>
            )
        }else{
            return(
                <View style={styles.dueDateContainer} >
                        <Icon name='calendar' style={styles.calendarIcon}/>
                        <Text style={styles.dueDateText}>{moment(dueDate,'DD/MM/YYYY').format('DD/MM/YYYY')}</Text>
                </View>
            )
        }
    }

    renderReminder = () => {
        const { reminder } = this.props.task;
        if(reminder && moment(reminder, 'DD/MM/YYYY HH:mm').isBefore(moment().toDate())){
            return ( 
                <Icon name='alarm' style={styles.alarmIcon}/>
            )
        }else{
            return null;
        }
    }

    render() {
        const { task } = this.props;
        if(!task) return null;
        return (
            <View style={styles.taskContainer}>
                <TouchableOpacity style={styles.taskTouchable} onPress={this.editTask} >
                <View style={styles.taskInfo}>
                    <View>
                        <Text style={styles.taskTitle}>{task.title}</Text>
                        <Text style={styles.taskDescription}>{task.description}</Text>
                        { this.renderReminder() }
                    </View>
                    { this.renderDueDate() }
                    { this.renderActivityIndicator() }
                </View>
                </TouchableOpacity>
               
                <View style={styles.checkBoxContainer}>
                
                    <CheckBox
                        style={{backgroundColor: (!task.done) ? 'white' : 'blue'}}
                        color="blue" 
                        checked={task.done}
                        onPress={this.toogleCompleteTask} 
                    />
                </View>
            </View>
        );
    }
}
        
@observer
export default class Tasks extends Component {
  static get options() {
    let iconByPlatform = Platform.OS === 'ios' ? {systemItem: 'add'} : {icon: require('../assets/icons/add.png')};
    return {
      topBar: {
        title: {
          text: 'Tasks'
        },
        // largeTitle: {
        //   visible: true,
        //   fontSize: 30,
        //   fontWeight: 'bold',
        //   color: 'black',
        //   fontFamily: 'Helvetica'
        // },
        rightButtons: [
            {
              id: 'addTaskButton',
              color: MAIN_THEME_COLOR,
              fontSize: 40,
              ...iconByPlatform
            }
        ]
      }
    };
  }

  constructor(props) {
    super(props);
    Navigation.events().bindComponent(this);
    this.state = { 
        isLoading: true
    };
  }

  async componentDidMount() {
    this.getTasks();
  }

  getTasks = async() => {
    try {
        this.setState({
            isLoading : true
          })
          await TaskStore.getTasks(AppUser.id);
        this.setState({
          isLoading : false
        })
      } catch (err) {
        console.log('Error: ', err)
        this.setState({
          isLoading : false
        })
      }
  }


  navigationButtonPressed({ buttonId }) {
      if(buttonId == 'addTaskButton'){
        Navigation.showModal({
            stack: {
              children: [{
                component: {
                  name: 'TaskForm'
                }
              }]
            }
        });
      }
    }

  ListEmpty = () => {
    return (
      <View style={styles.MainContainer}>
        <Text style={{ textAlign: 'center' }}>No tasks found</Text>
      </View>
    );
  };


  render() {
    return (
        <View style={styles.contentContainer}>
            <View style={{flex:1}}>
                <FlatList 
                    data={TaskStore.tasks}
                    onRefresh={this.getTasks}
                    refreshing={this.state.isLoading}
                    renderItem={({item}) => <TaskItem task={item}/>}
                    keyExtractor={item => item.id.toString()}
                    ListEmptyComponent={this.ListEmpty}
                />
            </View>
        </View>
    )
  }
}


const styles = StyleSheet.create({
    contentContainer: {
        paddingVertical: 25,
        paddingHorizontal: 20,
        flex:1
      },
      taskContainer:{
          flexDirection: 'row',
          flex: 1,
          shadowColor: '#AAAAAA',
          height: 90,
          width: '100%',
          backgroundColor: 'white',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.8,
          shadowRadius: 2,  
          elevation: 5,
          marginBottom: 15,
          borderRadius: 3
      },
      taskInfo: {
          padding: 15,
          flexDirection: 'column',
          justifyContent: 'space-between',
          flex: 1
      },
      taskTouchable:{
          flex: 1
      },
      taskTitle: {
          fontSize: 14
      },
      taskDescription: {
        fontSize: 12,
        color: "#6A6A6A"
    },
    dueDateText:{
          color: '#6A6A6A',
          fontSize: 11,
          fontWeight: '500'
      },
      calendarIcon: {
        color: '#6A6A6A',
        textAlign: 'left', 
        fontSize: 14,
        marginRight: 5
      },
      taskBadge: {
          paddingVertical: 3,
          borderRadius: 6,
          width: 50,
          flexDirection: 'row',
          justifyContent: 'center'
      },
      checkBoxContainer: {
        width: 40,
        backgroundColor: MAIN_THEME_COLOR,
        borderBottomRightRadius: 3,
        borderTopRightRadius: 3,
        justifyContent: 'center'
      },
      dueDateContainer: {
          flexDirection: 'row'
      },
      alarmIcon: {
          color: '#FFB100',
          fontSize: 18,
          position: 'absolute',
          right: 0
      },
      taskActivityIndicator: {
        position: 'absolute',
        right: 10,
        bottom: 10
      },
      emptyListText:{
        backgroundColor:  '#F4F4F4',
        padding: 10,
        paddingLeft: 15
      },
      loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10
      }
})