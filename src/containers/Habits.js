import React, { Component } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  ScrollView,
  Platform
} from 'react-native'
import { Text, Icon } from 'native-base';
import { MAIN_THEME_COLOR } from '../constants';
import { Navigation } from 'react-native-navigation';

class HabitItem extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            habit : props.habit
        };
      }

    getCategoryColor = (score) => {
        if (score < 0) {
            return '#EC5D62' //RED
        }
        else if (score >= 50 ) {
            return '#00C7D7' //BLUE
        }
        else if (score >= 40) {
            return '#69BD68' //GREEN
        }
        else if (score >= 10) {
            return '#FFDB00' //YELLOW
        }
        else {
            return '#FF9800' //ORANGE
        }
    };

    editHabit = () => {
        Navigation.showModal({
            stack: {
              children: [{
                component: {
                  name: 'HabitForm',
                  passProps: {
                    habit: this.state.habit
                  }
                }
              }]
            }
        });
    }

    renderButtons = () => {
        const { type, score } = this.props;
        if(type == "GOOD") {
            return(
                <TouchableOpacity style={{...styles.oneButton, 
                    ...{backgroundColor: this.getCategoryColor(score)}}}>
                    <Icon name='add' style={styles.iconButton}/>
                </TouchableOpacity>
            )
        }
        else if(type == "BAD") {
            return(
                <TouchableOpacity style={{...styles.oneButton, 
                    ...{backgroundColor: this.getCategoryColor(score)}}}>
                    <Icon name='remove' style={styles.iconButton}/>
                </TouchableOpacity>
            )
        }
        else{
            return(
                <View>
                    <TouchableOpacity style={{...styles.topButton, 
                    ...{backgroundColor: this.getCategoryColor(score)}}}>
                    <Icon name='add' style={styles.iconButton}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={{...styles.bottomButton, 
                        ...{backgroundColor: this.getCategoryColor(score)}}}>
                        <Icon name='remove' style={styles.iconButton}/>
                    </TouchableOpacity>
                </View>
                
            )
        }
    }

    render() {
        const { title, score } = this.props;
        return (
            <View style={styles.habitContainer}>
                <TouchableOpacity style={styles.habitTouchable} onPress={this.editHabit} >
                    <View style={styles.habitInfo}>
                        <Text style={styles.habitTitle}>{title}</Text>
                        <View style={{...styles.habitBadge, 
                            ...{backgroundColor: this.getCategoryColor(score)}}}>
                            <Text style={styles.badgeText}>{score}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
                <View style={styles.buttonsContainer}>
                    { this.renderButtons() }
                </View>
            </View>
        );
    }
}

export default class Habits extends Component {
  static get options() {
    let iconByPlatform = Platform.OS === 'ios' ? {systemItem: 'add'} : {icon: require('../assets/icons/add.png')};
      
    return {
      topBar: {
        title: {
          text: 'Habits'
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

  constructor(props) {
    super(props);
    Navigation.events().bindComponent(this);
  }

  navigationButtonPressed({ buttonId }) {
    if(buttonId == 'addHabitButton'){
        Navigation.showModal({
          stack: {
            children: [{
              component: {
                name: 'HabitForm'
              }
            }]
          }
        });
        }
    }

  render() {
    return (
        <ScrollView contentContainerStyle={styles.contentContainer}>
            <HabitItem
                title="Smoke"
                score={-18}
                type="BAD"
            />
            <HabitItem
                title="Study"
                score={42}
                type="BOTH"
            />
            <HabitItem
                title="Do clean code"
                score={35}
                type="GOOD"
            />
            <HabitItem
                title="Distract you"
                score={4}
                type="BOTH"
            />
            <HabitItem
                title="Eat healthy"
                score={88}
                type="BOTH"
            />
        </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
    contentContainer: {
        paddingVertical: 25,
        paddingHorizontal: 20
      },
      habitContainer:{
          flexDirection: 'row',
          flex: 1,
          shadowColor: '#AAAAAA',
          height: 80,
          width: '100%',
          backgroundColor: 'white',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.8,
          shadowRadius: 2,  
          elevation: 5,
          marginBottom: 15,
          borderRadius: 3
      },
      habitInfo: {
          padding: 15,
          flexDirection: 'column',
          justifyContent: 'space-between',
          flex: 1
      },
      habitTitle: {
          fontSize: 14
      },
      badgeText:{
          color: 'white',
          fontSize: 11,
          fontWeight: '600'
      },
      habitBadge: {
          paddingVertical: 3,
          borderRadius: 6,
          width: 50,
          flexDirection: 'row',
          justifyContent: 'center'
      },
      buttonsContainer: {
        width: 80,
        backgroundColor: 'white',
        borderBottomRightRadius: 3,
        borderTopRightRadius: 3,
      },
      oneButton: {
        borderBottomRightRadius: 3,
        borderTopRightRadius: 3,
        height: '100%',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center'
      },
      iconButton: {
        color: 'white',
        textAlign: 'center', 
        fontWeight: 'bold',
        fontSize: 30
      },
      topButton: {
        borderTopRightRadius: 3,
        borderBottomColor: 'white',
        borderBottomWidth: 1,
        height: '50%',
        justifyContent: 'center',
        flexDirection: 'column'
      },
      bottomButton: {
        borderBottomRightRadius: 3,
        height: '50%',
        justifyContent: 'center',
        flexDirection: 'column',
      },
      habitTouchable:{
        flex: 1
    }
})