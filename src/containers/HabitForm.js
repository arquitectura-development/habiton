import React, { Component } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Switch,
  Text
} from 'react-native'
import {
  Container,
  Button,
  Header,
  Content,
  Form,
  Item,
  Input,
  Label,
  Picker,
  Icon,
  Left,
  Subtitle,
  Right,
  Body,
  Textarea,
  Title,
  DatePicker,
  ListItem,
  Separator,
  Footer
 } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { goHome } from '../navigation';
import { Navigation } from 'react-native-navigation';
import { AsyncStorage } from "react-native";
import { MAIN_THEME_COLOR } from '../constants';


export default class HabitForm extends Component {
  static options(passProps) {
    return {
      topBar: {
        title: {
          text: 'New task'
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
      user: {}
    };
  }

  onValueChange = (key, val) => {
    this.setState({ [key]: val })
    this.setState(prevState => ({
        user: {
            ...prevState.user,
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

  navigationButtonPressed({ buttonId }) {
    Navigation.dismissModal({
      animationType: 'slide-down'
    })
    if(buttonId == "buttonSave"){
      return this.saveTask();
    }else{
      return;
    }
  }

  retrieveData = async () => {
  try {
    const value = await AsyncStorage.getItem('USER');
    if (value !== null) {
      let user = JSON.parse(value);
      this.setState({
        'user': user
      })
    }
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
      birthdate,
      gender,
      weight,
      height,
      shoeSize,
      laterality,
      glucose,
      amputationReason,
      amputationType,
      amputationSide,
      prevDisplacementTool,
      prevRehabilitation
    } = this.state.user;
    return (
      <Container>
        <Content>
          <Form>
            <ListItem itemHeader style={styles.divider}>
              <Text style={styles.dividerText}>GENERAL</Text>
            </ListItem>
            <Item picker>
              <Picker
                mode="dropdown"
                iosIcon={<Icon name="arrow-down" />}
                style={{ width: undefined }}
                placeholder="Select your SIM"
                placeholderStyle={{ color: "#bfc6ea" }}
                placeholderIconColor="#007aff"
                selectedValue={name}
                onValueChange={(name) => this.onValueChange('name', name)}
              >
                <Picker.Item label="Wallet" value="key0" />
                <Picker.Item label="ATM Card" value="key1" />
                <Picker.Item label="Debit Card" value="key2" />
                <Picker.Item label="Credit Card" value="key3" />
                <Picker.Item label="Net Banking" value="key4" />
              </Picker>
            </Item>
            <ListItem floatingLabel>
              <Label>Username</Label>
              <Input />
            </ListItem>
            <ListItem >
            <Left>
            <Text>Airplane Mode</Text>
            </Left>
            {/* <Body>
              <Text>Airplane Mode</Text>
            </Body> */}
            <Right>
              <Switch value={false} />
            </Right>
          </ListItem>
            <ListItem >
              <Grid>
                <Row>
                  <Text
                  style={styles.label}
                  >Title *</Text>
                </Row>
                <Row>
                  <Input
                    autoCapitalize="words"
                    textContentType="name"
                    onChangeText={(name) => this.onValueChange('name', name)}
                    value={ name }
                   />
                </Row>
              </Grid>
            </ListItem>
            <Item style={styles.itemList}>
              <Grid>
                <Row>
                  <Text style={styles.label}>Fecha de nacimiento</Text>
                </Row>
                <Row>
                  <DatePicker
                    defaultDate={new Date()}
                    minimumDate={new Date(1900, 1, 1)}
                    maximumDate={new Date()}
                    locale={"es"}
                    timeZoneOffsetInMinutes={undefined}
                    modalTransparent={false}
                    animationType={"fade"}
                    androidMode={"default"}
                    placeHolderText="Selecciona una fecha"
                    textStyle={{ color: "black" }}
                    placeHolderTextStyle={{ color: "#d3d3d3" }}
                    onDateChange={val => this.onValueChange('birthdate', val)}
                    />
                </Row>
              </Grid>
            </Item>
            <ListItem >
              <Grid>
                <Row>
                  <Text style={styles.label}>Género</Text>
                </Row>
                <Row>
                  <Picker
                    mode="dropdown"
                    renderHeader={backAction =>
                    <Header>
                      <Left>
                        <Button transparent onPress={backAction}>
                          <Icon name="arrow-back" style={{ color: "#00b3ae" }} />
                        </Button>
                      </Left>
                      <Body style={{ flex: 3 }}>
                        <Text style={{ fontSize: 16 }}>Selecciona tu género</Text>
                      </Body>
                      <Right />
                    </Header>}
                    placeholder="Selecciona tu género"
                    placeholderStyle={{ color: "#d3d3d3" }}
                    placeholderIconColor="#007aff"
                    selectedValue={ gender }
                    onValueChange={val => this.onValueChange('gender',val)}
                  >
                    <Picker.Item label="Femenino" value="Femenino" />
                    <Picker.Item label="Masculino" value="Masculino" />
                    <Picker.Item label="Otro" value="Otro" />
                  </Picker>
                </Row>
              </Grid>
            </ListItem>
            <ListItem >
              <Grid>
                <Row>
                  <Text style={styles.label}>Peso (kg)</Text>
                </Row>
                <Row>
                  <Input
                    keyboardType="numeric"
                    onChangeText={(weight) => this.onValueChange('weight', weight)}
                    value={ weight }
                  />
                </Row>
              </Grid>
            </ListItem>
            <ListItem >
              <Grid>
                <Row>
                  <Text style={styles.label}>Estatura (cm)</Text>
                </Row>
                <Row>
                  <Input
                    keyboardType="numeric"
                    onChangeText={(height) => this.onValueChange('height', height)}
                    value={ height }
                  />
                </Row>
              </Grid>
            </ListItem>
            <ListItem >
              <Grid>
                <Row>
                  <Text style={styles.label}>Talla de calzado (cm)</Text>
                </Row>
                <Row>
                  <Input
                    keyboardType="numeric"
                    onChangeText={(shoeSize) => this.onValueChange('shoeSize', shoeSize)}
                    value={ shoeSize }
                  />
                </Row>
              </Grid>
            </ListItem>
            <ListItem noIndent>
              <Grid>
                <Row>
                  <Text style={styles.label}>Lateralidad</Text>
                </Row>
                <Row>
                  <Picker
                    mode="dropdown"
                    renderHeader={backAction =>
                    <Header>
                      <Left>
                        <Button transparent onPress={backAction}>
                          <Icon name="arrow-back" style={{ color: "#00b3ae" }} />
                        </Button>
                      </Left>
                      <Body style={{ flex: 3 }}>
                        <Text style={{ fontSize: 16 }}>Selecciona</Text>
                      </Body>
                      <Right />
                    </Header>}
                    placeholder="Selecciona"
                    placeholderStyle={{ color: "#d3d3d3" }}
                    placeholderIconColor="#007aff"
                    selectedValue={ laterality }
                    onValueChange={val => this.onValueChange('laterality',val)}
                  >
                    <Picker.Item label="Zurdo" value="Zurdo" />
                    <Picker.Item label="Diestro" value="Diestro" />
                  </Picker>
                </Row>
              </Grid>
            </ListItem>

            <ListItem itemHeader style={styles.divider}>
              <Text style={styles.dividerText}>DETALLES</Text>
            </ListItem>
            <ListItem >
              <Grid>
                <Row>
                  <Text style={styles.label}>Causa de amputación</Text>
                </Row>
                <Row>
                  <Textarea
                    style={styles.textarea}
                    rowSpan={2}
                    onChangeText={(amputationReason) => this.onValueChange('amputationReason', amputationReason)}
                    value={ amputationReason }
                    />
                </Row>
              </Grid>
            </ListItem>
            <ListItem picker style={styles.itemPicker}>
              <Grid>
                <Row>
                  <Text style={styles.label}>Tipo de amputación</Text>
                </Row>
                <Row>
                  <Picker
                    mode="dropdown"
                    renderHeader={backAction =>
                    <Header>
                      <Left>
                        <Button transparent onPress={backAction}>
                          <Icon name="arrow-back" style={{ color: "#00b3ae" }} />
                        </Button>
                      </Left>
                      <Body style={{ flex: 3 }}>
                        <Text style={{ fontSize: 16 }}>Tipo de amputación</Text>
                      </Body>
                      <Right />
                    </Header>}
                    style={{ width: '100%' }}
                    placeholder="Selecciona"
                    placeholderStyle={{ color: "#d3d3d3" }}
                    placeholderIconColor="#007aff"
                    selectedValue={amputationType}
                    onValueChange={val => this.onValueChange('amputationType',val)}
                  >
                    <Picker.Item label="Transfemoral" value="Transfemoral" />
                    <Picker.Item label="Transtibial" value="Transtibial" />
                  </Picker>
                </Row>
              </Grid>
            </ListItem>
            <ListItem picker style={styles.itemPicker}>
              <Grid>
                <Row>
                  <Text style={styles.label}>Lado de la amputación</Text>
                </Row>
                <Row>
                  <Picker
                    mode="dropdown"
                    renderHeader={backAction =>
                    <Header>
                      <Left>
                        <Button transparent onPress={backAction}>
                          <Icon name="arrow-back" style={{ color: "#00b3ae" }} />
                        </Button>
                      </Left>
                      <Body style={{ flex: 3 }}>
                        <Text style={{ fontSize: 16 }}>Lado de la amputación</Text>
                      </Body>
                      <Right />
                    </Header>}
                    style={{ width: '100%' }}
                    placeholder="Selecciona"
                    placeholderStyle={{ color: "#d3d3d3" }}
                    placeholderIconColor="#007aff"
                    selectedValue={amputationSide}
                    onValueChange={val => this.onValueChange('amputationSide',val)}
                  >
                    <Picker.Item label="Izquierdo" value="Izquierdo" />
                    <Picker.Item label="Derecho" value="Derecho" />
                  </Picker>
                </Row>
              </Grid>
            </ListItem>
            <ListItem picker style={styles.itemPicker}>
              <Grid>
                <Row>
                  <Text style={styles.label}>
                    Antes de recibir la prótesis me desplazaba con
                  </Text>
                </Row>
                <Row>
                  <Picker
                    mode="dropdown"
                    renderHeader={backAction =>
                    <Header>
                      <Left>
                        <Button transparent onPress={backAction}>
                          <Icon name="arrow-back" style={{ color: "#00b3ae" }} />
                        </Button>
                      </Left>
                      <Body style={{ flex: 3 }}>
                        <Text style={{ fontSize: 16 }}>
                          Me desplazaba con
                        </Text>
                      </Body>
                      <Right />
                    </Header>}
                    style={{ width: '100%' }}
                    placeholder="Selecciona"
                    placeholderStyle={{ color: "#d3d3d3" }}
                    placeholderIconColor="#007aff"
                    selectedValue={prevDisplacementTool}
                    onValueChange={val => this.onValueChange('prevDisplacementTool',val)}
                  >
                    <Picker.Item label="Silla de ruedas" value="Silla de ruedas" />
                    <Picker.Item label="Andadera" value="Andadera" />
                    <Picker.Item label="Muleta" value="Muleta" />
                  </Picker>
                </Row>
              </Grid>
            </ListItem>

            <ListItem noIndent>
              <Body>
                <Text style={styles.label}>Previamente he tomado rehabilitación</Text>
              </Body>
              <Switch
                onValueChange={ value => this.onValueChange('prevRehabilitation', value)}
                value={ prevRehabilitation }
                trackColor= "#00b3ae"
              />
            </ListItem>
          </Form>
          <Footer/>
        </Content>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 5,
    width: '100%'
  },
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
  content: {
    flex: 1,
    width: '100%'
  },
  textarea: {
    width: '100%',
    marginTop: 8
  },
  itemPicker: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start'
  },
  itemList: {
    borderColor: '#c9c9c9',
    paddingTop: 13,
    paddingBottom: 13,
    paddingRight: 16,
    borderBottomWidth: 0.5,
    marginLeft: 16
  }
})
