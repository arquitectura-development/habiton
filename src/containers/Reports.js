import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  ActivityIndicator
} from 'react-native'
import { 
    Container, 
    Content, 
    Tab, 
    Tabs, 
    TabHeading, 
    Icon, 
    Text, 
    List,
    ListItem
} from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { MAIN_THEME_COLOR, DEFAULT_GRAY } from '../constants';
import { VictoryBar, VictoryChart } from "victory-native";
import AppUser from "../models/AppUser";
import ReportStore from "../models/ReportStore";
import { observer } from 'mobx-react/native';

class UserReportItem extends Component {
  constructor(props) {
      super(props);
    }

  render() {
      return (
        <ListItem>
          <Text style={styles.listItemLeft}>{this.props.title}</Text>
        </ListItem>
      );
  }
}

@observer
class UsersReport extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      isLoading: true
    };
  }

  async componentDidMount() {
    try {
      await ReportStore.getUserReport(AppUser.id);
      this.setState({
        isLoading : false
      })
    } catch (err) {
      this.setState({
        isLoading : false
      })
      console.log('Error: ', err)
    }
  }

  renderList = (list, emptyMessage) => {
    if(list.length){
      return(
        <FlatList 
            data={list}
            renderItem={({item}) => <UserReportItem title={item.name || item.title}/>}
            keyExtractor={item => item.id.toString()}
        />
      )
    }else {
      return(
        <Text style={styles.emptyListText}>{ emptyMessage }</Text>
      )
    }
  }
 
  render() {
    if(this.state.isLoading){
      return(
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={MAIN_THEME_COLOR} />
        </View>
      )
    }else{
      return (
        <Container>
          <Content padder>
            <List>
              <ListItem itemHeader>
                <Text style={styles.textHeaderLeft}>TASKS DUE TODAY</Text>
              </ListItem>
              {this.renderList(ReportStore.userReport.todayTasks, "No tasks for today ")}
              <ListItem itemHeader >
                <Text style={styles.textHeaderLeft}>DELAYED TASKS</Text>
              </ListItem>
              {this.renderList(ReportStore.userReport.delayedTasks, "No delayed tasks ")}
              <ListItem itemHeader>
                <Text style={styles.textHeaderLeft}>GOOD HABITS</Text>
              </ListItem>
              {this.renderList(ReportStore.userReport.goodHabits, "No good habits ")}
              <ListItem itemHeader>
                <Text style={styles.textHeaderLeft}>BAD HABITS</Text>
              </ListItem>
              {this.renderList(ReportStore.userReport.badHabits, "No bad habits ")}
            </List>
          </Content>
        </Container>
      );
    }
  }
}

@observer
class TasksReport extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      isLoading: true
    };
  }

  async componentDidMount() {
    try {
      await ReportStore.getTasksReport(AppUser.id);
      this.setState({
        isLoading : false
      })
    } catch (err) {
      this.setState({
        isLoading : false
      })
      console.log('Error: ', err)
    }
  }

  render(){
    {
      if(this.state.isLoading){
        return(
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={MAIN_THEME_COLOR} />
          </View>
        )
      }else{
        return (
          <Container>
          <Content >
            <List>
              <ListItem itemHeader first>
                <Text style={styles.textHeaderLeft}>COMPLETED</Text>
                <Text style={styles.textHeaderRight}>{ReportStore.tasksReport.completed.total}</Text>
              </ListItem>
              {/* <ListItem >
                  <Grid>
                      <Row>
                          <Text style={styles.listItemLeft}>On time</Text>
                          <Text style={styles.textItemRight}>80</Text>
                      </Row>
                      <Row style={styles.subListContainer}>
                          <Col>
                              <Row style={styles.subListRow}>
                                  <Text style={styles.listItemLeft}>On due date</Text>
                                  <Text style={styles.textItemRight}>65</Text>
                              </Row>
                              <Row>
                                  <Text style={styles.listItemLeft}>Before due date</Text>
                                  <Text style={styles.textItemRight}>15</Text>
                              </Row>
                          </Col>
                      </Row>
                  </Grid>
              </ListItem> */}
              <ListItem >
                <Text style={styles.listItemLeft}>On time</Text>
                <Text style={styles.textItemRight}>{ReportStore.tasksReport.completed.before}</Text>
              </ListItem>
              <ListItem last>
                <Text style={styles.listItemLeft}>After due date</Text>
                <Text style={styles.textItemRight}>{ReportStore.tasksReport.completed.after}</Text>
              </ListItem>
              <ListItem itemHeader>
                <Text style={styles.textHeaderLeft}>DELAYED</Text>
                <Text style={styles.textHeaderRight}>{ReportStore.tasksReport.delayed}</Text>
              </ListItem>
              <ListItem itemHeader>
                <Text style={styles.textHeaderLeft}>AVAILABLE</Text>
                <Text style={styles.textHeaderRight}>{ReportStore.tasksReport.available.total}</Text>
              </ListItem>
              <ListItem>
                <Text style={styles.listItemLeft}>To be done today</Text>
                <Text style={styles.textItemRight}>{ReportStore.tasksReport.available.forToday}</Text>
              </ListItem>
              <ListItem>
                <Text style={styles.listItemLeft}>Remaining tasks</Text>
                <Text style={styles.textItemRight}>{ReportStore.tasksReport.available.remaining}</Text>
              </ListItem>
            </List>
          </Content>
        </Container>
        );
      }
    }
  }
}

@observer
class HabitsReport extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      isLoading: true
    };
  }

  async componentDidMount() {
    try {
      await ReportStore.getHabitsReport(AppUser.id);
      this.setState({
        isLoading : false,
        graphData: this.parsePerRangeValues(ReportStore.habitsReport.perRange)
      })
    } catch (err) {
      this.setState({
        isLoading : false
      })
      console.log('Error: ', err)
    }
  }

  parsePerRangeValues = (valuesObj) => {
    var graph = [];
    for (var [key, value] of Object.entries(valuesObj)) {
      graph.push({
        y: value,
        x: key
      });
    }
    return graph;
  }

    render() {
      const { isLoading, graphData } = this.state;
        if(isLoading){
          return(
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={MAIN_THEME_COLOR} />
            </View>
          )
        }else{
          return (
            <Container>
              <Content padder>
            <List>
              <ListItem itemHeader first>
                <Text>TOP HABITS</Text>
              </ListItem>
                <Grid>
                  <View style={{ fontSize: 12, fontWeight:'300', marginTop: 10 }}>
                    <Row>
                      <Text style={{ fontSize: 12, fontWeight:'300', marginBottom: 3 }}>BEST</Text>
                    </Row>
                    <Row>
                        <View style={{ backgroundColor: "#00C7D7", width: 4 }}/>
                      <Col style={{ width: '100%', marginLeft: 8 }}>
                        <Text style={{ fontSize: 14, fontWeight:'400' }}>{ReportStore.habitsReport.bestHabit.name}</Text>
                        <Text note style={{ fontSize: 14, fontWeight:'300' }}>{ReportStore.habitsReport.bestHabit.username}</Text>
                      </Col>
                    </Row>
                  </View>
                  </Grid>
                  <Grid>
                  <View style={{ fontSize: 12, fontWeight:'300', marginTop: 15, marginBottom: 20  }}>
                    <Row>
                      <Text style={{ fontSize: 12, fontWeight:'300', marginBottom: 3 }}>WORST</Text>
                    </Row>
                    <Row>
                        <View style={{ backgroundColor: "#EC5D62", width: 4 }}/>
                      <Col style={{ width: '100%', marginLeft: 8 }}>
                        <Text style={{ fontSize: 14, fontWeight:'400' }}>{ReportStore.habitsReport.worstHabit.name}</Text>
                        <Text note style={{ fontSize: 14, fontWeight:'300' }}>{ReportStore.habitsReport.bestHabit.username}</Text>
                      </Col>
                    </Row>
                  </View>
                </Grid>
            </List>
            <ListItem itemHeader first style={{ marginBottom: -30  }}>
                <Text>ALL HABITS</Text>
              </ListItem>
            <VictoryChart 
              domainPadding={30}
               >
            <VictoryBar 
              data={graphData} 
              x="x" 
              y="y" 
              style={{
                data: {
                  fill: MAIN_THEME_COLOR,
                  stroke: MAIN_THEME_COLOR,
                  fillOpacity: 0.7,
                  strokeWidth: 1
                }
              }}
            />
          </VictoryChart>
              </Content>
            </Container>
          );
        }
      }
  }

@observer
export default class Reports extends Component {
  static get options() {
    return {
      topBar: {
        title: {
          text: AppUser.isAdmin ? 'Reports' : 'Report'
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

  constructor(props) {
    super(props);
    this.state = {
      report: []
    }
  }

  async componentDidMount() {
    try {
      if(AppUser.isAdmin){
        console.log("ADMIN")
      }else{
        await ReportStore.getUserReport(AppUser.id);
        console.log("REPORTS USER")
        console.log(ReportStore.userReport)
      }
    } catch (err) {
      console.log('Error: ', err)
    }
  }

  render() {
    if(AppUser.isAdmin){
      return (
          <Container style={styles.container}>
            <Tabs 
                style={styles.tabs} 
                tabBarUnderlineStyle={styles.underlineTab}>
              <Tab 
                heading={ 
                <TabHeading style={styles.tabHeading}>
                    <Icon name="trophy" style={styles.tab}/>
                    <Text style={styles.tab}>Habits</Text>
                </TabHeading>}>
                <HabitsReport />
              </Tab>
              <Tab 
                heading={ 
                <TabHeading style={styles.tabHeading}>
                    <Icon name="star" style={styles.tab}/>
                    <Text style={styles.tab}>Tasks</Text>
                </TabHeading>}>
                <TasksReport />
              </Tab>
            </Tabs>  
        </Container>
      );
    }
    else {
      return (
        <Container style={styles.container}>
          <View/> 
          {}
          <UsersReport/>
        </Container>
      )
    }
  }
}

const styles = StyleSheet.create({
  tabs:{
    marginTop: 20
  },
  underlineTab:{
    backgroundColor: MAIN_THEME_COLOR
  },
  container:{
    backgroundColor: 'white'
  },
  tab: {
    color: MAIN_THEME_COLOR
  },
  tabHeading:{
    backgroundColor: 'white'
  },
  textHeaderLeft:{
    flex: 1,
    justifyContent: 'flex-start',
    flexDirection: 'row',
    color: '#101010',
    fontWeight: '600'
  },
  textHeaderRight:{
    color: '#101010',
    fontWeight: '600',
    fontSize: 16,
    marginRight: 10
  },
  listItemLeft:{
    flex: 1,
    justifyContent: 'flex-start',
    flexDirection: 'row'
  },
  textItemRight:{
    color: '#8F8E94',
    marginRight: 10
  },
  subListContainer: {
      marginTop: 5,
      padding: 10,
      paddingRight: 0,
      backgroundColor: '#F4F4F4'
  },
  subListRow: {
      marginBottom: 10
  },
  itemBodyText: { 
    fontSize: 14, 
    fontWeight:'400', 
    textAlign:'left', 
    alignSelf: 'stretch', 
    marginLeft: 10 
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