import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Alert,
  ActivityIndicator
} from "react-native";
import { goHome } from '../navigation';
import AppUser from "../models/AppUser";

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            email: '',
            enableButton: false,
            isLoading: false
        };
      }

    login = async() => {
        const { email } = this.state;
        this.setState({isLoading: true});
        goHome();
        AppUser.logon(email).then(res =>{
            goHome();
            this.setState({isLoading: false});
        }).catch(e => {
            let title = "Error";
            let subtitle = "Ocurrió un problema, intenta más tarde.";
            if(e.statusCode == 401){
                title="Error de autenticación";
                subtitle="Usuario o contraseña incorrecta.";
            }
            Alert.alert(title, subtitle);
            this.setState({isLoading: false});
        })
    }

    setEmail = (email) => {
        const { password } = this.state;
        this.setState({
            email: email,
            enableButton: email != ''
        })
    }

    showLoader = () => {
        const { isLoading } = this.state;
        if (isLoading){
            return (
                <ActivityIndicator size="small" color="#8e06ab" />
            );
        }else{
            return <Text style={ styles.buttonText}>Login</Text>;
        }
    }
  
  render() {
    const { email, enableButton } = this.state;
    return (
        <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
            <View style={styles.inputsContainer}>
            <Image
                    source={require('../assets/img/Habiton_logo.png')}
                    resizeMode="contain"
                    style={styles.logo}
                />
                <TextInput
                    keyboardType="email-address"
                    placeholder="Email"
                    textContentType="emailAddress"
                    style={styles.textInput}
                    onChangeText={(email) => this.setEmail(email)}
                    value={ email }
                    autoCapitalize="none"
                    placeholderTextColor="white"
                />
                <TouchableOpacity
                    activeOpacity={ .9 } 
                    disabled = { !enableButton }
                    onPress={async () => { this.login(); }}
                    style={ enableButton ? styles.button : styles.disabledButton}
                >
                    <View style={ styles.buttonContent }>
                        { this.showLoader() }
                    </View>
    
                </TouchableOpacity>
            </View>
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
    logoContainer: {
        width: '100%',
        padding: 10,
        height: 10,
        backgroundColor: 'red'
    },
    container: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: 'center',
        backgroundColor: "#490073",
        padding: 35
      },
    buttonContent: {
        flex:1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    inputsContainer: {
        width: '100%'
    },
    button: {
        backgroundColor: "#ffffff",
        borderRadius: 20,
        height: 40,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 15
    },
    disabledButton: {
        backgroundColor: "#ffffff",
        borderRadius: 20,
        height: 40,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 15,
        opacity: 0.3
    },
    buttonText: {
        fontSize: 16,
        color: "#303030"
    },
    textInput: {
        paddingHorizontal: 10,
        borderColor: 'red',
        height: 40,
        color: "#ffffff",
        marginBottom: 30     
    },
    logo: {
        marginBottom: 40,
        marginTop: 50,
        maxWidth: '100%'
    }
});