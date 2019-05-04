import React, { Component } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  ScrollView,
  Platform
} from 'react-native'
import { Text, Icon, CheckBox } from 'native-base';
import { MAIN_THEME_COLOR } from '../constants';

let tasks = [
    {
        title: 'Complete final project',
        description: 'Smart cities',
        done: false,
        dueDate: new Date(),
        reminder: new Date()
    }
]

class TaskItem extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            task : props.task
        };
      }

    renderDueDate = () => {
        const { dueDate } = this.state.task;
        if(dueDate){
            return ( 
                <View style={styles.dueDateContainer} >
                    <Icon name='calendar' style={{...styles.calendarIcon, ...{color: '#cc0000'}}}/>
                    <Text style={{...styles.dueDateText, ...{color: '#cc0000'}}}>Due today</Text>
                </View>
            )
        }else{
            <View style={styles.dueDateContainer} >
                        <Icon name='calendar' style={styles.calendarIcon}/>
                        <Text style={styles.dueDateText}>{"10/05/29"}</Text>
             </View>
        }
    }

    render() {
        const { task } = this.state;
        if(!task) return null;
        return (
            <View style={styles.taskContainer}>
                <View style={styles.taskInfo}>
                    <View>
                        <Text style={styles.taskTitle}>{task.title}</Text>
                        <Text style={styles.taskDescription}>{task.description}</Text>
                        <Icon name='alarm' style={styles.alarmIcon}/>
                    </View>
                    { this.renderDueDate() }
                </View>
                <View style={styles.checkBoxContainer}>
                    <CheckBox
                        style={{backgroundColor: (!task.done) ? 'white' : 'blue'}}
                        color="blue" 
                        checked={task.done}
                        onPress={() => {this.setState({
                            task: {
                                    ...task,
                                    done: !task.done
                                }
                            }
                        )}} 
                    />
                </View>
            </View>
        );
    }
}

export default class Reports extends Component {
  static get options() {
    let iconByPlatform = Platform.OS === 'ios' ? {systemItem: 'add'} : {icon: require('../assets/icons/add.png')};
    return {
      topBar: {
        title: {
          text: 'Tasks'
        },
        largeTitle: {
          visible: true,
          fontSize: 30,
          fontWeight: 'bold',
          color: 'black',
          fontFamily: 'Helvetica'
        },
        rightButtons: [
            {
              id: 'addHabitButton',
              color: MAIN_THEME_COLOR,
              fontSize: 40,
              ...iconByPlatform
            }
        ]
      }
    };
  }

  render() {
    return (
        <ScrollView style={styles.contentContainer}>
            <TaskItem
                task={tasks[0]}
            ></TaskItem>
        
         
        </ScrollView>
    )
  }
}


const styles = StyleSheet.create({
    contentContainer: {
        paddingVertical: 25,
        paddingHorizontal: 20
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
      }
})