import React, { Component } from 'react';
import {
  StyleSheet
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
    ListItem,
    Card, 
    CardItem, 
    Body,
    Left,
    Right,
    Switch,
    Button ,
    Thumbnail
} from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { MAIN_THEME_COLOR } from '../constants';


class RateCard extends Component {
    render() {
      const { title, habitName, personName } = this.props;
      return(
        <Card>
          <CardItem >
            <Body>
            <Text>{title}</Text>
              <Text>
                {habitName}
              </Text>
              <Text>
                {personName}
              </Text>
            </Body>
          </CardItem>
        </Card>
      )
    }
  }

class TasksReport extends Component {
    render() {
        return (
          <Container>
            <Content >
              <List>
                <ListItem itemHeader first>
                  <Text style={styles.textHeaderLeft}>COMPLETED</Text>
                  <Text style={styles.textHeaderRight}>100</Text>
                </ListItem>
                <ListItem >
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
                </ListItem>
                <ListItem last>
                  <Text style={styles.listItemLeft}>After due date</Text>
                  <Text style={styles.textItemRight}>20</Text>
                </ListItem>
                <ListItem itemHeader>
                  <Text style={styles.textHeaderLeft}>DELAYED</Text>
                  <Text style={styles.textHeaderRight}>30</Text>
                </ListItem>
                <ListItem itemHeader>
                  <Text style={styles.textHeaderLeft}>AVAILABLE</Text>
                  <Text style={styles.textHeaderRight}>450</Text>
                </ListItem>
                <ListItem>
                  <Text style={styles.listItemLeft}>To be done today</Text>
                  <Text style={styles.textItemRight}>50</Text>
                </ListItem>
                <ListItem>
                  <Text style={styles.listItemLeft}>Remaining tasks</Text>
                  <Text style={styles.textItemRight}>400</Text>
                </ListItem>
              </List>
            </Content>
          </Container>
        );
    }
}

  class HabitsReport extends Component {
    render() {
        return (
          <Container>
            <Content padder>
              {/* <Grid>
                <Col>
                      <RateCard 
                    title="BEST"
                    habitName="Eat healthy"
                    personName="Luis Pérez"
                  />
                </Col>
                <Col>
                    <RateCard 
                  title="WORST"
                  habitName="Smoke"
                  personName="Jaime Gómez"
                />
                </Col>
              </Grid>
          */}
          <List>
            <ListItem itemHeader first>
              <Text>BEST</Text>
            </ListItem>
            <ListItem >
            <Button style={{ backgroundColor: "#00C7D7", width: 5 }}>
              </Button>
              <Body>
                <Text style={{ fontSize: 14, fontWeight:'400' }}>Eat healthy</Text>
                <Text note style={{ fontSize: 14, fontWeight:'300' }}>Luis Godinez</Text>
              </Body>
            </ListItem>
            <ListItem itemHeader first>
              <Text>WORST</Text>
            </ListItem>
            <ListItem last>
            <Button style={{ backgroundColor: "#EC5D62", width: 5 }}>
              </Button>
              <Body>
                <Text style={{ fontSize: 14, fontWeight:'400' }}>Smoke</Text>
                <Text note style={{ fontSize: 14, fontWeight:'300' }}>Scarlett Pérez</Text>
              </Body>
            </ListItem>
          </List>
      
            
            </Content>
          </Container>
        );
      }
  }

export default class Reports extends Component {
  static get options() {
    return {
      topBar: {
        title: {
          text: 'Reports'
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
    )
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
    fontSize: 16
  },
  listItemLeft:{
    flex: 1,
    justifyContent: 'flex-start',
    flexDirection: 'row'
  },
  textItemRight:{
    color: '#8F8E94'
  },
  subListContainer: {
      marginTop: 5,
      padding: 10,
      backgroundColor: '#F4F4F4'
  },
  subListRow: {
      marginBottom: 10
  }
})